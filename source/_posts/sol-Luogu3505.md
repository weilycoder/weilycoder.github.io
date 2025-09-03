---
title: TEL-Teleportation (POI 2010)
mathjax: true
date: 2025-08-25 09:02:14
updated: 2025-08-25 09:02:14
categories:
  - OI
  - solution
tags:
  - graph
---

[题目链接](https://www.luogu.com.cn/problem/P3505)

> 给定一张 $n$ 个点 $m$ 条边的无向图，保证 $1$ 号点与 $2$ 号点最短路长度存在且不小于 $5$。
>
> 问最多向图中加多少条边，使得 $1$ 号点与 $2$ 号点的最短路长度不小于 $5$。
>
> + $2\leqslant n\leqslant 40\ 000,5\leqslant m\leqslant 10^{6}$

<!-- more -->

---

注意到最终的图一定可以分为 $6$ 个非空点集：

+ 第 $1$ 个点集只包含 $1$，第 $6$ 个点集只包含 $2$；
+ 每个点集内的点两两连边；
+ 第 $i$ 个点集与第 $i+1$ 个点集中的点两两连边（$i=1,2,3,4,5$）。

假设最终图中共有 $m^{\prime}$ 条边，则答案为 $m^{\prime}-m$，由于 $m$ 为定值，只需最大化 $m^{\prime}$。

---

我们证明两条性质：

+ 若一个点可以被划分到 $2$ 号点集或 $3$ 号点集，则被划分到 $3$ 号点集不劣；
+ 若一个点可以被划分到 $4$ 号点集或 $5$ 号点集，则被划分到 $4$ 号点集不劣。

显然是对称的，因此这里只证第一条。

假设现在 $1,2,3,4$ 号点集中点的数量为 $1,a,b,c$，将一个点加入 $2$ 号点集带来的贡献是 $1+a+b$，将一个点加入 $3$ 号点集的贡献是 $a+b+c$，由于 $c\geqslant 1$，因此加入 $3$ 号点集不劣。

---

因此最初有这样一种划分，从 $1$ 号点和 $2$ 号点开始分别 bfs 求其余点到它们的最短路，

+ $1$ 号点在 $1$ 号点集；
+ $2$ 号点在 $6$ 号点集；
+ 若一个点到 $1$ 号点的距离为 $1$，将其划分到 $2$ 号点集；
+ 若一个点到 $1$ 号点的距离为 $2$，将其划分到 $3$ 号点集；
+ 若一个点到 $2$ 号点的距离为 $2$，将其划分到 $4$ 号点集；
+ 若一个点到 $2$ 号点的距离为 $1$，将其划分到 $5$ 号点集；
+ 若一个点到 $1,2$ 号点的距离均大于 $2$，待定。

由于 $1$ 号点与 $2$ 号点的最短路存在且不小于 $5$，因此以上 $7$ 类点无交。

由上文证明的性质，待定的点或者放进 $3$ 号点集，或者放进 $4$ 号点集。

下面证明，待定的点一定全部放进一个点集。

---

假定 $2,3,4,5$ 号点集中的点分别有 $a,b,c,d$ 个，待定点有 $t$ 个。

考虑待定点的贡献：

+ 这些点一定会两两连边，贡献 $\dfrac{t\left(t-1\right)}{2}$；
+ 有 $x$ 个点放进 $3$ 号点集，贡献 $x\left(a+b+c\right)$；
+ 有 $t-x$ 个点放进 $4$ 号点集，贡献 $\left(t-x\right)\left(b+c+d\right)$。

贡献是 $x$ 的一次函数，因此在端点处取最值。

---

{% editor cpp vs-dark false 500px %}
#include <bits/stdc++.h>
using namespace std;

using Graph = vector<vector<size_t>>;

vector<size_t> bfs(size_t s, const Graph &g) {
  vector<size_t> dist(g.size(), numeric_limits<size_t>::max());
  dist[s] = 0;
  queue<size_t> q;
  q.push(s);
  while (!q.empty()) {
    size_t u = q.front();
    q.pop();
    for (size_t v : g[u]) {
      if (dist[v] == numeric_limits<size_t>::max()) {
        dist[v] = dist[u] + 1;
        q.push(v);
      }
    }
  }
  return dist;
}

int main() {
  cin.tie(nullptr)->sync_with_stdio(false);
  size_t n, m;
  cin >> n >> m;
  Graph graph(n);
  for (size_t i = 0; i < m; ++i) {
    size_t u, v;
    cin >> u >> v, --u, --v;
    graph[u].emplace_back(v);
    graph[v].emplace_back(u);
  }
  auto dist0 = bfs(0, graph), dist1 = bfs(1, graph);
  if (dist0[1] < 5)
    return cout << "-1\n", 0;
  size_t a = 0, b = 0, c = 0, d = 0, o = 0;
  for (size_t i = 0; i < n; ++i) {
    if (dist0[i] == 1)
      ++a;
    else if (dist0[i] == 2)
      ++b;
    else if (dist1[i] == 2)
      ++c;
    else if (dist1[i] == 1)
      ++d;
    else if (i != 0 && i != 1)
      ++o;
  }
  auto calc = [](size_t a, size_t b, size_t c, size_t d) -> size_t {
    auto c2 = [](size_t x) -> size_t { return x * (x - 1) >> 1; };
    return a + c2(a) + a * b + c2(b) + b * c + c2(c) + c * d + c2(d) + d;
  };
  size_t ans = max(calc(a, b + o, c, d), calc(a, b, c + o, d));
  cout << ans - m << '\n';
  return 0;
}
{% endeditor %}