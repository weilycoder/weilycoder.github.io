---
title: 棋盘上的守卫 (bzoj 4883)
mathjax: true
date: 2025-08-26 08:41:58
updated: 2025-08-26 08:41:58
categories:
  - OI
  - solution
tags:
  - MST
  - graph
---

题库早炸了，交不了。

> 有一个 $n$ 行 $m$ 列的棋盘，要求每一行放置恰好一个 $\mathtt{A}$ 类棋子，每一列恰好放置一个 $\mathtt{B}$ 类棋子。
> 
> 每个格子最多放一个棋子，且在第 $i$ 行第 $j$ 列放置棋子需要支付 $C_{i,j}$ 的代价。
>
> 最小化代价。
>
> + $2\leqslant n, m\leqslant 100\ 000$；
> + $4\leqslant n\times m\leqslant 100\ 000$。

<!-- more -->

---

考虑图论建模，将行和列对应到 $n+m$ 个点，代价作为边权。

容易发现需要在图上找一个最小生成基环森林，跑一个类 Kruskal 即可。

{% editor cpp vs-dark false 500px %}
#include <bits/stdc++.h>
using namespace std;

struct Dsu {
  vector<size_t> p;
  Dsu(size_t n) : p(n) { iota(p.begin(), p.end(), 0); }
  size_t find(size_t u) { return u == p[u] ? u : p[u] = find(p[u]); }
};

int main() {
  cin.tie(nullptr)->sync_with_stdio(false);
  size_t n, m;
  cin >> n >> m;

  vector<tuple<uint64_t, size_t, size_t>> edges;
  for (size_t i = 0; i < n; ++i) {
    for (size_t j = 0; j < m; ++j) {
      uint64_t w;
      cin >> w;
      edges.emplace_back(w, i, j + n);
    }
  }
  sort(edges.begin(), edges.end());

  Dsu dsu(n + m);
  vector<bool> tg(n + m);
  uint64_t sum = 0;
  for (const auto &[w, u, v] : edges) {
    size_t x = dsu.find(u), y = dsu.find(v);
    if (x == y && !tg[x]) {
      sum += w, tg[x] = true;
    } else if (x != y && (!tg[x] || !tg[y])) {
      dsu.p[x] = y, tg[y] = tg[y] | tg[x], sum += w;
    }
  }

  cout << sum << '\n';
  return 0;
}
{% endeditor %}