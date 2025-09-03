---
title: 合金 (JSOI 2007)
mathjax: true
date: 2025-08-20 12:47:59
updated: 2025-08-20 12:47:59
categories:
  - OI
  - solution
tags:
  - graph
  - geometry
  - linear-algebra
---

神秘图论建模题。

> 给定 $m+n$ 组三维向量 $\left(a\_1,b\_1,c\_1\right),\left(a\_2,b\_2,c\_2\right),\ldots,\left(a\_m,b\_m,c\_m\right),\left(x\_1,y\_1,z\_1\right),\ldots,\left(x\_n,y\_n,z\_n\right)$。
>
> 保证对于任意 $j$，有 $a\_j+b\_j+c\_j=1$ 和 $x\_j+y\_j+z\_j=1$，且 $a\_j,b\_j,c\_j,x\_j,y\_j,z\_j\geqslant 0$。
>
> 从前 $m$ 个向量中选出 $k$ 个 $\left(a\_{p\_1},b\_{p\_1},c\_{p\_1}\right),\ldots,\left(a\_{p\_k},b\_{p\_k},c\_{p\_k}\right)$，使得对于后 $n$ 个向量的任意一个 $\left(x\_j,y\_j,z\_j\right)$，可以选出非负的 $k$ 个实数 $\lambda\_{j1},\lambda\_{j2},\ldots,\lambda\_{jk}$，满足 $\sum\lambda\_{jl}\cdot\left(a\_{p\_l},b\_{p\_l},c\_{p\_l}\right)=\left(x\_j,y\_j,z\_j\right)$。
>
> 找到最小的 $k$ 或报告不可能。
>
> + $1\leqslant m,n\leqslant 500$。

<!-- more -->

---

首先，由于限定了向量三维的和为 $1$，所以三维向量是假的，可以把第三维直接干掉，不过需要加上 $\sum\_{l} \lambda\_{jl}=1$ 的限制。

把 $m+n$ 个点扔到二维平面上，容易发现，任选 $k$ 个点，可以表出的向量为这 $k$ 个点围成的凸包（含边界）。

考虑图论建模，在前 $m$ 个点中，任选两个点 $i,j$ 连成有向线段，若后 $n$ 个点或在线段右侧，或在线段上，就在 $i,j$ 之间连一个权值为 $1$ 的有向边；否则连权值为 $+\infty$ 的有向边。

判断点是否在线段一侧可以使用叉积，也可以全判左侧，相当于将原图的边全部反向。

原问题被转化为最小环问题。

最简单的方式是跑一个 Floyd。

复杂度 $\mathcal O\left(m^{2}n+m^{3}\right)$，注意代码中变量与本文中略有不同。

```cpp
#include <bits/stdc++.h>
using namespace std;

static constexpr double eps = 1e-12;

int main() {
  cin.tie(nullptr)->sync_with_stdio(false);
  size_t n, m;
  double tmp;
  cin >> n >> m;

  vector<pair<double, double>> origin(n);
  for (auto &[x, y] : origin)
    cin >> x >> y >> tmp;

  vector<pair<double, double>> target(m);
  for (auto &[x, y] : target)
    cin >> x >> y >> tmp;

  vector<vector<size_t>> F(n, vector<size_t>(n, numeric_limits<size_t>::max() >> 2));
  for (size_t i = 0; i < n; ++i) {
    const auto [x0, y0] = origin[i];
    for (size_t j = 0; j < n; ++j) {
      const auto [x1, y1] = origin[j];
      if ([&]() -> bool {
            for (size_t k = 0; k < m; ++k) {
              const auto [x2, y2] = target[k];
              const double cross = (x1 - x0) * (y2 - y0) - (y1 - y0) * (x2 - x0);
              bool inside = cross > eps;
              bool onsegment = abs(cross) < eps && (min(x0, x1) - eps <= x2 && x2 <= max(x0, x1) + eps);
              if (!inside && !onsegment)
                return false;
            }
            return true;
          }())
        F[i][j] = 1;
    }
  }
  for (size_t k = 0; k < n; ++k)
    for (size_t i = 0; i < n; ++i)
      for (size_t j = 0; j < n; ++j)
        if (F[i][j] > F[i][k] + F[k][j])
          F[i][j] = F[i][k] + F[k][j];
  size_t ans = numeric_limits<size_t>::max() >> 2;
  for (size_t i = 0; i < n; ++i)
    ans = min(ans, F[i][i]);
  if (ans == numeric_limits<size_t>::max() >> 2)
    cout << "-1\n";
  else
    cout << ans << '\n';
  return 0;
}
```
