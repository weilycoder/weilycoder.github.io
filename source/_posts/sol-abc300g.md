---
title:  P-smooth number (ABC 300 G) 
mathjax: true
date: 2025-09-14 21:04:09
updated: 2025-09-14 21:04:09
categories:
  - OI
  - solution
tags:
  - dfs
  - meet-in-middle
---

> 若一个数的质因数均不超过 $k$，称其为 $k$-smooth number。
>
> 给定 $N,p$ 求 $N$ 以内 $p$-smooth number 的个数。
>
> + $1\leqslant N\leqslant 10^{16}$；
> + $2\leqslant p\leqslant 100$，且 $p$ 为质数。

<!-- more -->

样例 2 极具提示性。

注意到输入为 $N=10^{16},p=97$ 时，输出 $2\ 345\ 134\ 674$，大约只有 $2\times 10^{9}$。

考虑暴搜。

但是 2e9 就算是 AT 神机估计也得跑个 6s 左右。

考虑 meet-in-middle，把 $p$ 以内的质数分成 2 组，分别暴搜。

可以按质数从小到大交替分到两组中，平衡效率：

$$
\begin{aligned}
  P_{0} &= \left\\{2, 5, 11, 17, 23, 31, 41, 47, 59, 67, 73, 83, 97 \right\\} \\\\
  P_{1} &= \left\\{3, 7, 13, 19, 29, 37, 43, 53, 61, 71, 79, 89 \right\\}
\end{aligned}
$$

这样在 $P_{0}$ 中暴搜时枚举量为 $6\ 269\ 654$，在 $P_{1}$ 中暴搜时枚举量为 $1\ 913\ 116$；

也可以把 $97$ 放到 $P_{1}$ 中，这样枚举量分别为 $4\ 221\ 248$ 和 $2\ 864\ 380$。

统计答案时可以排序后双指针。

{% editor cpp vs-dark false 500px %}
#include <bits/stdc++.h>
using namespace std;

array<uint32_t, 12> prime0{2, 5, 11, 17, 23, 31, 41, 47, 59, 67, 73, 83};
array<uint32_t, 13> prime1{3, 7, 13, 19, 29, 37, 43, 53, 61, 71, 79, 89, 97};

template <size_t Len>
void dfs(size_t cur, uint64_t val, uint64_t limit, uint32_t p,
         const array<uint32_t, Len> &prime, vector<uint64_t> &res) {
  if (cur == Len || prime[cur] > p)
    res.push_back(val);
  else
    for (; val <= limit; val *= prime[cur])
      dfs<Len>(cur + 1, val, limit, p, prime, res);
}

template <size_t Len>
vector<uint64_t> get_smooth(uint64_t limit, uint32_t p,
                            const array<uint32_t, Len> &prime) {
  vector<uint64_t> res;
  dfs<Len>(0, 1, limit, p, prime, res);
  sort(res.begin(), res.end());
  return res;
}

int main() {
  cin.tie(nullptr)->sync_with_stdio(false);
  uint64_t N;
  uint32_t p;
  cin >> N >> p;
  auto r1 = get_smooth(N, p, prime0);
  auto r2 = get_smooth(N, p, prime1);
  uint64_t cnt = 0;
  size_t pt = r2.size();
  for (uint64_t x : r1) {
    while (pt == 0 || r2[pt - 1] * x > N)
      --pt;
    cnt += pt;
  }
  cout << cnt << '\n';
  return 0;
}
{% endeditor %}
