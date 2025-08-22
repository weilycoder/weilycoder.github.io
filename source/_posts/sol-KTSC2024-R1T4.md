---
title: 铁路 2 (KTSC 2024 R1)
mathjax: true
date: 2025-08-13 16:20:17
categories:
  - OI
  - solution
tags:
  - tree
  - graph
  - tree-diameter
  - MST
---

我想的时候按 MaxST 想的，故有 MST 的标签。

[题目链接 (Luogu)](https://www.luogu.com.cn/problem/P11238)

> 给定一棵无根树，大小为 $N$，边有边权，第 $i$ 条边的节点记作 $u\_i,v\_i$，边权记作 $w\_i$。
>
> 定义 $J\left(u,v\right)$ 为最大的满足以下条件的正整数 $D$：
> + 从节点 $u$ 开始，每次跳到距离 $u$ 至少为 $D$ 的节点，可以在有限次内跳到 $v$。
>
> 对于任意 $u\ne v$，求 $\sum J\left(u,v\right)$。
>
> - $2 \leq N \leq 5\cdot 10^5$；
> - 保证输入为树；
> - $0 \leq u\_i, v\_i \leq N-1 ; u\_i \neq v\_i$；
> - $1 \leq w\_i \leq 10^9$。

<!-- more -->

---

## 暴力

一眼先糊了一个对任意图有效的暴力。

使用 Floyd 将任意两点最短路求出，这相当于生成了一个边权为原图最短路的完全图。

接着用类似 Floyd 的方法转移，求出任意两点路径最小边权的最大值。

时间复杂度 $\mathcal O\left(N^{3}\right)$。

## 正解

然后马上发现，不妨在生成的完全图上做一个最大生成树，在最大生成树的树边上做总是不劣的。

这时时间复杂度已经可以做到 $\mathcal O\left(N^{2}\log N\right)$。

考虑进一步优化求最大生成树的过程，发现我们每次尝试将一个点的最长链放进去总是不劣的，这个操作让我们联想到树直径的某些性质。

注意到一个点的最长链的另一端总是直径的一端，因此对于每个不为直径端点的点 $u$，检查其与直径的哪个端点更远，将其加入最大生成树中即可。

这些边加上直径共 $N-1$ 条，显然联通，因此为一个生成树，又因为取了每个点开始的最长链，因此是最大的。

考虑一个类似 Kruskal 重构树的过程，将边按边权降序排列后依次加到图里，每次加边的贡献是连接的两个连通块的大小乘积再乘边权。

注意取模的时机。

时间复杂度为 $\mathcal O(N\log N)$，瓶颈在排序。

```cpp
#include <bits/stdc++.h>
#include "railroad2.h"
using namespace std;

static constexpr int64_t Mod = 1e9 + 7;
static constexpr int64_t INF = numeric_limits<int64_t>::max() >> 2;

struct dsu {
  vector<size_t> fa, siz;
  dsu(size_t n) : fa(n), siz(n) {
    iota(fa.begin(), fa.end(), 0);
    fill(siz.begin(), siz.end(), 1);
  }
  size_t findf(size_t x) { return fa[x] == x ? x : fa[x] = findf(fa[x]); }
  pair<size_t, size_t> merge(size_t u, size_t v) {
    size_t x = findf(u), y = findf(v);
    if (x == y)
      return {0, 0};
    if (siz[x] > siz[y])
      swap(x, y); // Ensure siz[x] <= siz[y]
    size_t sx = siz[x], sy = siz[y];
    fa[x] = y, siz[y] += siz[x];
    return {sx, sy};
  }
};

void get_depth(size_t u, size_t fa, const vector<vector<pair<size_t, int64_t>>> &tree,
               vector<int64_t> &depth) {
  for (const auto &[v, w] : tree[u])
    if (v != fa)
      depth[v] = depth[u] + w, get_depth(v, u, tree, depth);
}

int travel(vector<int> U, vector<int> V, vector<int> W) {
  size_t n = U.size() + 1;
  vector<vector<pair<size_t, int64_t>>> tree(n);
  for (size_t i = 0; i < n - 1; ++i) {
    size_t u = U[i], v = V[i];
    int64_t w = W[i];
    tree[u].emplace_back(v, w);
    tree[v].emplace_back(u, w);
  }
  size_t u = [&]() -> size_t {
    size_t uu = 0;
    vector<int64_t> depth(n);
    get_depth(0, 0, tree, depth);
    for (size_t i = 0; i < n; ++i)
      if (depth[i] > depth[uu])
        uu = i;
    return uu;
  }();
  vector<int64_t> depth_from_u(n);
  get_depth(u, u, tree, depth_from_u);
  size_t v = [&]() -> size_t {
    size_t vv = 0;
    for (size_t i = 0; i < n; ++i)
      if (depth_from_u[i] > depth_from_u[vv])
        vv = i;
    return vv;
  }();
  vector<int64_t> depth_from_v(n);
  get_depth(v, v, tree, depth_from_v);
  vector<tuple<int64_t, size_t, size_t>> es;
  es.reserve(n);
  for (size_t i = 0; i < n; ++i) {
    if (depth_from_u[i] > depth_from_v[i])
      es.emplace_back(depth_from_u[i], i, u);
    else
      es.emplace_back(depth_from_v[i], i, v);
  }
  sort(es.rbegin(), es.rend());
  dsu dd(n);
  int64_t sum = 0;
  for (const auto &[w, uu, vv] : es) {
    auto [sx, sy] = dd.merge(uu, vv);
    (sum += (sx * sy % Mod * (w % Mod)) % Mod) %= Mod;
  }
  return (sum << 1) % Mod;
}
```
