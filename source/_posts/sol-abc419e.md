---
title: Subarray Sum Divisibility (ABC 419)
mathjax: true
code_fold: -1
date: 2025-08-18 22:44:46
categories:
  - OI
  - solution
tags:
  - Dynamic-Programming
---

{% raw %}
被 $\color{#03A89E}{1200}$ 硬控 10min+，死因是想问题的时候老是忘记我只需要做 $N\leqslant 500$。
{% endraw %}

数据范围很重要啊！

> 给你一个长度为 $N$ 的整数序列 $A = \left(A\_1, A\_2, \ldots, A\_N\right)$ 。
>
> 你的目标是重复执行以下操作，使 $A$ 的每个长度为 $L$ 的**连续**子数组的和都是 $M$ 的倍数。
>
> - 选择 $i$ 这样的整数 $1 \leq i \leq N$ ，并将 $A\_i$ 的值增加 $1$ 。
>
> 求达到目标所需的最小运算次数。
>
> + $1\leqslant N,M\leqslant 500$；
> + $1\leqslant L\leqslant N$；
> + $0\leqslant A\_{i}\lt M$。

首先应该观察到最终每相隔 $L$ 的位置上的数模 $M$ 同余，即位置模 $L$ 同余的数是“绑定”的。

因此只需要确认任意一个长为 $L$ 的连续子数组的值。

枚举每一组模 $L$ 同余的位置，同时枚举 $\left[0,M\right)$ 内每一个整数 $x$，确认这些位置所有的数变换到与 $x$ 同余的代价。

最后做一个类似背包的东西，最小化总代价。

```cpp
#include <bits/stdc++.h>
using namespace std;

int main() {
  cin.tie(nullptr)->sync_with_stdio(false);
  size_t n, m, l;
  cin >> n >> m >> l;
  vector<vector<int32_t>> cost(l, vector<int32_t>(m));
  for (size_t i = 0; i < n; ++i) {
    int32_t x;
    cin >> x;
    for (size_t j = 0; j < m; ++j)
      cost[i % l][j] += (j - x + m) % m;
  }
  vector<int32_t> F(m, 0x3f3f3f3f);
  F[0] = 0;
  for (const auto &cc : cost) {
    vector<int32_t> G(m, 0x3f3f3f3f);
    for (size_t i = 0; i < m; ++i)
      for (size_t j = 0; j < m; ++j)
        G[(i + j) % m] = min(G[(i + j) % m], F[i] + cc[j]);
    F = move(G);
  }
  cout << F[0] << '\n';
  return 0;
}
```
