---
title: 排序问题 (JXOI 2018)
mathjax: true
date: 2025-08-20T15:46:53.360+0800
updated: 2025-08-20T15:46:53.360+0800
categories:
  - OI
  - solution
tags:
  - greedy
  - math(oi)
  - combinatorics
---

不知道是我变强了还是题确实水，总之先建议降蓝。

不会评紫是因为包含期望吧。

[题目链接](https://www.luogu.com.cn/problem/P4561)

> 给定一个长为 $n$ 的数列 $\left(a\_1,a\_2,\ldots,a\_n\right)$，和 $m,l,r$，要求向数列尾部加入 $m$ 个 $\left[l,r\right]$ 之间的整数，最大化通过随机重排使数列有序的期望次数。
>
> $T$ 次询问。
>
> + $1\leqslant T\leqslant 10^{5}$；
> + $1\leqslant n\leqslant 2\times 10^{5},\sum n\leqslant 2\times 10^{6}$；
> + $1\leqslant m\leqslant 10^{7}$；
> + $1\leqslant l,r\leqslant 10^{9}$；
> + $1\leqslant a\_i\leqslant 10^{9}$；

<!-- more -->

---

首先应该都知道多重集的全排列公式

$$
P=\dfrac{n!}{\prod n\_i!}
$$

将题目数据代入，就是

$$
P=\dfrac{\left(n+m\right)!}{\prod c\_j!}
$$

这里 $c\_j$ 表示 $j$ 在数列中的出现次数。

因为共有 $P$ 种不同的排列，因此随机重排后有 $\dfrac{1}{P}$ 的概率有序，根据相关期望知识，期望操作 $P$ 次。

因此目标就是最大化 $P$，也就是最小化 $\prod c\_j!$。

---

考虑将 $m$ 个数依次插入数列。

假如这次插入 $j$，插入前 $j$ 的出现次数为 $c\_j$，则插入 $j$ 后，对分母有一个 $\times \left(c\_j+1\right)$ 的贡献。

显然贪心地每次选择 $c\_j$ 最小的 $j$ 是不劣的。

---

因此可以把 $c\_j$ 的值和对应值的出现次数 $\mathrm{cnt}\_{c\_j}$ 扔到优先队列里去，每次从队头取出最小的 $c\_j$ 并更新答案。

交一发后发现 TLE 70pts。

---

分析一下时间复杂度，发现只要将 $\mathrm{cnt}\_{c\_j}$ 都搞成 $1$，很容易把单次查询的复杂度干到 $\mathcal O\left(m\log m\right)$（这里假定 $n\leqslant m$）。

题目只保证了 $\sum n$，因此总复杂度是 $\mathcal O\left(Tm\log m\right)$，不可接受。

---

分析一下算法流程，每次我们从队头取出 $\left(c\_j,\mathrm{cnt}\right)$，将 $m$ 减去 $\mathrm{cnt}$，向分母乘上 $\left(c\_j+1\right)^{\mathrm{cnt}}$ 的贡献，再将 $\left(c\_j+1,\mathrm{cnt}\right)$ 插回队头。

我们提出一些优化（为讨论方便，这里 $m$ 和队列长度均较大，不出现减到 $0$ 的边界情况）：

第一，假如 $c\_j+1$ 已经存在于队中，此时其一定在队头，可以不将 $\left(c\_j+1,\mathrm{cnt}\right)$ 插到队中，而是将 $\mathrm{cnt}$ 累加到队头。

第二，假如 $c\_j+1$ 不存在于队列中，设此时队头为 $c\_k$，则 $c\_j+1\sim c\_k$ 一段可以“打包处理”，直接向分母贡献一个 $\left(\dfrac{c\_k!}{c\_j!}\right)^{\mathrm{cnt}}$。

阶乘可以记忆化，做到均摊 $\mathcal O\left(m\right)$。

单次询问中，由于队列初始长度为 $\mathcal O\left(n\right)$，因此这两个优化过程进行最多 $\mathcal O\left(n\right)$ 次后，队列中只剩下一个元素，此时应用优化 $2$ 一定可以将 $m$ 次插入全部处理。

---

这样单次询问复杂度是 $\mathcal O\left(n\left(\log n+\log m\right)\right)$ 的，总复杂度大概是 $\mathcal O\left(m+\sum n\left(\log n+\log m\right)\right)$。

这里 $\log m$ 是求逆元的复杂度，感觉实现精细一点可以干掉。

~~复杂度分析不出数量级问题就问题不大。~~

```cpp
#include <bits/stdc++.h>
using namespace std;

static constexpr uint32_t mod = 998244353;

static inline uint32_t factorial(uint32_t n) {
  static vector<uint32_t> fact{1};
  while (fact.size() <= n)
    fact.push_back((uint64_t)fact.back() * fact.size() % mod);
  return fact[n];
}

static inline uint32_t fast_power(uint32_t base, uint32_t exp) {
  uint32_t result = 1;
  for (base %= mod; exp; exp >>= 1, base = (uint64_t)base * base % mod)
    if (exp & 1)
      result = (uint64_t)result * base % mod;
  return result;
}

static inline uint32_t inverse(uint32_t x) { return fast_power(x, mod - 2); }

static void solve() {
  size_t n, m;
  uint32_t l, r;
  cin >> n >> m >> l >> r;

  uint32_t ans = factorial(n + m), den = 1;

  vector<uint32_t> arr(n + 1);
  for (size_t i = 0; i < n; ++i)
    cin >> arr[i];
  arr[n] = numeric_limits<uint32_t>::max();
  sort(arr.begin(), arr.end());

  vector<size_t> count;
  vector<pair<size_t, size_t>> pq;
  {
    size_t zero_count = r - l + 1;
    uint32_t val = arr[0], cnt = 1;
    for (size_t i = 1; i <= n; ++i)
      if (arr[i] == val)
        ++cnt;
      else {
        den = (uint64_t)den * factorial(cnt) % mod;
        if (l <= val && val <= r)
          --zero_count, count.push_back(cnt);
        val = arr[i], cnt = 1;
      }
    if (zero_count != 0)
      pq.emplace_back(0, zero_count);
  }

  if (!count.empty()) {
    sort(count.begin(), count.end());
    uint32_t val = count[0], cnt = 1;
    for (size_t i = 1; i < count.size(); ++i) {
      if (count[i] == val)
        ++cnt;
      else
        pq.emplace_back(val, cnt), val = count[i], cnt = 1;
    }
    pq.emplace_back(val, cnt);
  }
  pq.emplace_back(numeric_limits<size_t>::max(), 0);
  reverse(pq.begin(), pq.end());

  while (m != 0) {
    auto [val, cnt] = pq.back();
    pq.pop_back();
    if (m <= cnt)
      den = (uint64_t)den * fast_power(val + 1, m) % mod, m = 0;
    else {
      size_t next_val = pq.back().first;
      size_t diff = next_val - val;
      size_t take = min(diff, m / cnt);
      uint32_t base = (uint64_t)factorial(val + take) * inverse(factorial(val)) % mod;

      m -= take * cnt;
      den = (uint64_t)den * fast_power(base, cnt) % mod;

      if (next_val > val + take)
        pq.emplace_back(val + take, cnt);
      else
        pq.back().second += cnt;
    }
  }
  ans = (uint64_t)ans * inverse(den) % mod;
  cout << ans << '\n';
}

int main() {
  cin.tie(nullptr)->sync_with_stdio(false);
  int t;
  cin >> t;
  while (t--)
    solve();
  return 0;
}
```