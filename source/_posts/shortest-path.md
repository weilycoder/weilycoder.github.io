---
title: 最短路算法
mathjax: true
date: 2025-08-07 20:35:41
updated: 2025-08-07 20:35:41
categories:
  - OI
tags:
  - graph
  - shortest-path
---

## 记号约定

不一定是通用用法。

+ $n$ 表示图的点数（$V$）；
+ $m$ 表示图的边数（$E$）；
+ 若 $u$ 到 $v$ 有边（将边记作 $u\to v$），则 $w\left(u,v\right)$ 表示其边权；若 $u$ 到 $v$ 没有边，记 $w\left(u,v\right)$ 为 $+\infty$；
+ 若 $u$ 到 $v$ 有路径（将路径记作 $u\leadsto v$），则记 $p\left(u,v\right)$ 为路径长度；
+ 若 $u$ 到 $v$ 有最短路，则 $d\left(u,v\right)$ 表示其最短路；特别地，若 $u$ 到 $v$ 经过负环，则 $d\left(u,v\right)$ 记为 $-\infty$；若 $u$ 到 $v$ 没有路径，则 $d\left(u,v\right)$ 记为 $+\infty$;

## Johnson 全源最短路径算法

今天学了个不常用的玩意，因此先记下来，其他最短路算法有空再补。

算法的核心思想是构造势能函数 $H\left(v\right)$，然后对于边 $u\to v$，将边权重新标记为 $w'\left(u,v\right)=w\left(u,v\right)+H\left(u\right)-H\left(v\right)$。

容易证明，对于任意路径 $s\leadsto t$，其新路径长度为 $p'\left(u,v\right)=p\left(u,v\right)+H\left(s\right)-H\left(t\right)$。

因此其最短路长度变为 $d'\left(u,v\right)=d\left(u,v\right)+H\left(s\right)-H\left(t\right)$。

假如我们可以设计函数使得标记后的边权 $w'\left(u,v\right)$ 非负，则可以通过 $n$ 次 Dijkstra 算法计算全源最短路，时间复杂度为 $O\left(nm\log m\right)$（常见优先队列写法）。

注意到，图论中存在三角不等式 $d\left(s,u\right)+w\left(u,v\right)\geqslant d\left(s,v\right)$，因此可以使用 $H\left(x\right)=d\left(s,x\right)$。

在图中任取一个点可能遇到 $H\left(x\right)=+\infty$ 的情形，因此我们新建一个超级源点 $S$，并向每个点连一条边权为 $0$ 的边，并取 $H\left(x\right)=d\left(S,x\right)$。

可以使用 Bellman–Ford 算法或其队列优化版本（SPFA）计算单源最短路（此时顺便可以检查图中是否存在负环），显然这部分最劣情况下时间复杂度 $O\left(nm\right)$ 不成为复杂度瓶颈。

+ 例题：[Luogu P5905 全源最短路](https://www.luogu.com.cn/problem/P5905)

  *例题的输出格式特殊，作为模板时记得修改。*

```cpp
#include <algorithm>
#include <cassert>
#include <iostream>
#include <numeric>
#include <queue>
#include <utility>
#include <vector>
using namespace std;

static const int64_t MAXV = 1e9;

vector<int64_t> spfa(size_t s,
                     const vector<vector<pair<size_t, int64_t>>> &adj) {
  vector<size_t> cnt(adj.size(), 0);
  vector<int64_t> dist(adj.size(), MAXV);
  dist[s] = 0;
  vector<bool> in_queue(adj.size(), false);
  queue<size_t> q;
  q.push(s);
  in_queue[s] = true;
  while (!q.empty()) {
    size_t u = q.front();
    q.pop();
    in_queue[u] = false;
    for (const auto &[v, w] : adj[u]) {
      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        cnt[v] = cnt[u] + 1;
        if (cnt[v] > adj.size())
          return {};
        if (!in_queue[v]) {
          q.push(v);
          in_queue[v] = true;
        }
      }
    }
  }
  return dist;
}

vector<int64_t> dijkstra(size_t s,
                         const vector<vector<pair<size_t, int64_t>>> &adj) {
  vector<int64_t> dist(adj.size(), MAXV);
  vector<bool> visited(adj.size(), false);
  priority_queue<pair<int64_t, size_t>> q;
  q.emplace(0, s);
  dist[s] = 0;
  while (!q.empty()) {
    auto [d, u] = q.top();
    q.pop();
    if (visited[u])
      continue;
    visited[u] = true;
    for (const auto &[v, w] : adj[u]) {
      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        q.emplace(-dist[v], v);
      }
    }
  }
  return dist;
}

int main() {
  // Input
  cin.tie(nullptr)->sync_with_stdio(false);
  size_t n, m;
  cin >> n >> m;
  vector<vector<pair<size_t, int64_t>>> adj(n + 1);
  for (size_t i = 1; i <= n; ++i)
    adj[0].emplace_back(i, 0);
  for (size_t i = 0; i < m; ++i) {
    size_t u, v;
    int64_t w;
    cin >> u >> v >> w;
    adj[u].emplace_back(v, w);
  }

  auto H = spfa(0, adj);
  if (H.empty()) {
    cout << "-1\n";
  } else {
    for (size_t u = 1; u <= n; ++u)
      for (auto &[v, w] : adj[u])
        w += H[u] - H[v];

    vector<vector<int64_t>> dist;
    dist.reserve(n + 1);
    dist.emplace_back();
    for (size_t i = 1; i <= n; ++i)
      dist.emplace_back(dijkstra(i, adj));

    for (size_t i = 1; i <= n; ++i)
      for (size_t j = 1; j <= n; ++j)
        if (dist[i][j] != MAXV)
          dist[i][j] += H[j] - H[i];

    // Output
    for (size_t i = 1; i <= n; ++i) {
      int64_t ret = 0;
      for (size_t j = 1; j <= n; ++j)
        ret += dist[i][j] * j;
      cout << ret << '\n';
    }
  }
  return 0;
}
```

如果 Dijkstra 使用斐波那契堆实现，则单次 Dijkstra 的时间复杂度为 $O(n\log n + m)$，总的时间复杂度变为 $O(n^{2}\log n+nm)$。
