---
title: WQS 二分优化 DP
mathjax: true
date: 2025-08-11 02:08:43
categories:
  - OI
tags:
  - Dynamic-Programming
---

WQS 二分，在不同的文章里，也常称作带权二分、凸优化 DP、凸完全单调性 DP、Lagrange 乘子法等，在国外也称作 Aliens Trick。它最早由王钦石（wqs）在《浅析一类二分方法》一文中总结。

WQS 二分的典型特征是限制“恰好取 $K$ 个”的最优化问题。

应用 WQS 二分要求函数具有凸性；例如，设“从 $n$ 个中恰好取 $k$ 个”的最优解为 $w(n,k)$，则一般要求 $w(n,k)$ 关于 $k$ 是凸的。

## 二分

假如将 $k$ 作为 $x$ 轴，$w(n,k)$ 作为 $y$ 轴，则函数图像可能形如：

<img src="/image/wqs.svg" alt="wqs" style="background: white;">

这里使用下凸函数为例。

我们其实不知道这个函数具体长什么样子，只知道它是凸的，我们尝试使用一条直线去切这个凸壳，检查切点的位置：

+ 若切点的横坐标恰为所求的 $k$，则问题解决；
+ 否则，由于凸壳的斜率是单调的，因此可以二分斜率。

可以结合上图理解。

现在的问题是，如何求出切点的位置。

考虑这个东西的含义，假设斜率为 $k$ 的直线 $y=kx+b$ 恰好经过点 $(m,w(n,m))$，则截距 $b=w(n,m)-km$。

而 $b=w(n,m)-km$ 可以理解为每次选择都花费了 $k$ 的代价。

注意到直线切到凸壳时截距取最小值，因此在做完转化后求一个不带限制的最小化 DP 即可。

## 易错点

凸壳上可能有相邻一系列点的斜率相同，这时 dp 和二分的一些端点未处理好可能会把正确的斜率排除到二分区间以外。

我代码中的习惯是，dp 时使用最小的转移点，这样计算出的分割数是最小的；二分时将小于等于 $m$ 的区间归结到 $m$ 上并将大于 $m$ 的区间扔掉。

```cpp
// Luogu P4983
#include <cstdint>
#include <deque>
#include <iostream>
#include <utility>
#include <vector>
using namespace std;

static constexpr int64_t INF = 1e18;

int main() {
  cin.tie(nullptr)->sync_with_stdio(false);
  int64_t n, m;
  cin >> n >> m;
  vector<int64_t> S(n + 1);
  for (int64_t i = 1; i <= n; ++i)
    cin >> S[i], S[i] += S[i - 1];

  auto check = [&](int64_t k) -> pair<int64_t, int64_t> {
    vector<int64_t> F(n + 1), G(n + 1);
    auto gX = [&](int64_t j) { return S[j]; };
    auto gY = [&](int64_t j) { return F[j] + S[j] * S[j] - 2 * S[j]; };
    auto gF = [&](int64_t i, int64_t j) {
      return F[j] + k + (S[i] - S[j] + 1) * (S[i] - S[j] + 1);
    };
    deque<int64_t> q;
    q.emplace_back(0);
    for (int64_t i = 1, j = 0; i <= n; ++i) {
      while (j + 1 < q.size() && gF(i, q[j + 1]) < gF(i, q[j]))
        ++j;
      if (j >= q.size())
        j = q.size() - 1;
      F[i] = gF(i, q[j]), G[i] = G[q[j]] + 1;
      while (q.size() >= 2) {
        int64_t j1 = q[q.size() - 2], j2 = q[q.size() - 1];
        int64_t k1 = (gY(j2) - gY(j1)) * (gX(i) - gX(j2));
        int64_t k2 = (gY(i) - gY(j2)) * (gX(j2) - gX(j1));
        if (k1 < k2)
          break;
        q.pop_back();
      }
      q.emplace_back(i);
    }
    return {F[n], G[n]};
  };

  int64_t l = 0, r = INF;
  while (l < r) {
    int64_t mid = l + ((r - l) >> 1);
    auto [f, g] = check(mid);
    if (g <= m)
      r = mid;
    else
      l = mid + 1;
  }
  auto [f, g] = check(l);
  cout << f - l * m << '\n';
  return 0;
}
```