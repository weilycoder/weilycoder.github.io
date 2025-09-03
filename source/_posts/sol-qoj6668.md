---
title: Trokuti (COTS 2023)
mathjax: true
date: 2025-08-23 20:23:17
updated: 2025-08-23 20:23:17
categories:
  - OI
  - solution
tags:
  - Ad-hoc
  - random
  - probability
---

乱搞题。

[题目链接](https://qoj.ac/problem/6668)

> 交互题，**交互库非自适应**。
> 
> 有一张 $N\left(N=100\right)$ 个点的图，每次你可以问 $3$ 个互异的点 $u,v,w\left(u\ne v,v\ne w,w\ne u\right)$，交互库回答这三个点的（点）导出子图包含的边数。
>
> 最多询问 $Q(Q=3400)$ 次。

<!-- more -->

---

方便表述，记 $E\left(u,v,\ldots\right)$ 为 $u,v,\ldots$ 间连边数量。

方便表述，后文也用边的颜色表示连边或否。

---

首先交互库非自适应，因此一眼乱搞题，至少要考虑随机化。

考虑先问出来一个子图，再增量构造。

一种方案是注意到 $\dbinom{5}{3}=\dbinom{5}{2}=10$，因此可以随便选 $5$ 个点询问所有组合，一定能把这个子图解出来。

另一种方案是注意到任取 $6$ 个点必有同色三角形，因此可以随便问，期望 $\mathcal O\left(1\right)$ 次后可以问出一个三角形。

---

增量的过程比较单一。

假设现在已经有一个 $n$ 个点的子图 $G\_{n}$ 已知，新加入一个点 $x$，我们需要知道 $x$ 与 $G\_{n}$ 中每一个点的连边情况（共 $n$ 条边）。

考虑将这 $n$ 条边两两分成一组，例如 $\left(u,x\right)$ 与 $\left(v,x\right)$ 被分为一组，则询问 $\left(u,v,x\right)$，若 $E\left(u,v,x\right)-E\left(u,v\right)$ 为 $0$ 或 $2$，则 $\left(u,x\right),\left(v,x\right)$ 同色且颜色已知；不然，则 $\left(u,x\right),\left(v,x\right)$ 异色但不知道具体颜色，此时只需留下一条边继续询问。

---

假设剩余 $n^{\prime}$ 条边，由于最差情况两条边同色概率也有 $\dfrac{1}{2}$，因此期望意义下 $n^{\prime}=\dfrac{n}{4}$。

将这 $n^{\prime}$ 条边递归问下去，相当于每次花费 $\dfrac{n}{2}$ 的代价将 $n$ 变成 $\dfrac{n}{4}$，即代价函数为 $F\left(x\right)=\dfrac{x}{2}+F\left(\dfrac{x}{4}\right)$。

解得 $F\left(x\right)=\dfrac{2}{3}x+C$。

---

考虑剩下最后一条边的情况，此时相当于维护了一条异色链。
+ 若链长为 $1$ 则必然存在 $\left(u,x\right)$ 与 $\left(v,x\right)$ 异色且均已知；
+ 若链长为 $2$ 则至少存在 $\left(u,x\right)$ 已知；
+ 若链长为 $3$ 则必然存在同色。

总之，一定在 $\mathcal O\left(1\right)$ 次询问内找到同色边。

---

总的期望询问次数大约为 $\dfrac{2}{3}\left(3+4+5+\ldots+N-1\right)$，大约为 $\dfrac{N^{2}}{3}$，可以通过本题。

---

顺便提一下本地调试方法（Linux），使用 `mkfifo input output` 创建管道，然后可以开两个终端，一个终端运行 `./interactor > input < output`，另一个终端运行 `./foo < input > output`；最后可以使用 `rm input output -f` 删除管道。其中 `interactor` 是自己写的交互库，`foo` 是源程序。

`foo` 也可以用 gdb 打开，管道对上就行。

```cpp
#include <bits/stdc++.h>
using namespace std;

static constexpr size_t N = 100;
static mt19937_64 rng(chrono::steady_clock::now().time_since_epoch().count());

static inline size_t randint(size_t l, size_t r) { return uniform_int_distribution<size_t>(l, r)(rng); }

static inline tuple<size_t, size_t, size_t> randtriple(size_t n) {
  size_t u, v, w;
  do
    u = randint(1, n), v = randint(1, n), w = randint(1, n);
  while (u == v || u == w || v == w);
  return {u, v, w};
}

static inline size_t ask_count_of_edges(size_t u, size_t v, size_t w) {
  cout << "? " << u << ' ' << v << ' ' << w << endl;
  size_t res;
  cin >> res;
  return res;
}

int main() {
  cin.tie(nullptr)->sync_with_stdio(false);
  set<size_t> nodes;
  vector<vector<size_t>> adj(N + 1, vector<size_t>(N + 1, numeric_limits<size_t>::max()));

  for (size_t i = 1; i <= N; ++i)
    adj[i][i] = 0;

  while (nodes.empty()) {
    auto [u, v, w] = randtriple(N);
    size_t cnt = ask_count_of_edges(u, v, w);
    if (cnt == 0) {
      nodes.insert({u, v, w});
      adj[u][v] = adj[v][u] = adj[u][w] = adj[w][u] = adj[v][w] = adj[w][v] = 0;
    } else if (cnt == 3) {
      nodes.insert({u, v, w});
      adj[u][v] = adj[v][u] = adj[u][w] = adj[w][u] = adj[v][w] = adj[w][v] = 1;
    }
  }

  vector<size_t> others;
  for (size_t x = 1; x <= N; ++x)
    if (!nodes.count(x))
      others.push_back(x);
  shuffle(others.begin(), others.end(), rng);

  for (const size_t x : others) {
    if (nodes.count(x))
      continue;

    array<size_t, 2> known{};

    vector<vector<size_t>> works;
    for (const size_t u : nodes)
      works.emplace_back(1, u);

    while (works.size() > 1) {
      vector<vector<size_t>> new_works;
      for (size_t i = 0; i < works.size(); i += 2) {
        if (i + 1 == works.size()) {
          new_works.push_back(move(works[i]));
          continue;
        }

        const auto &a = works[i], &b = works[i + 1];
        size_t u = a[0], v = b[0];
        size_t cnt = ask_count_of_edges(u, v, x), s = numeric_limits<size_t>::max();

        if (cnt - adj[u][v] == 0) {
          s = 0;
        } else if (cnt - adj[u][v] == 2) {
          s = 1;
        } else {
          new_works.emplace_back(a.rbegin(), a.rend());
          new_works.back().insert(new_works.back().end(), b.begin(), b.end());
          continue;
        }

        for (size_t j = 0; j < a.size(); ++j)
          known[s ^ (j & 1)] = a[j], adj[a[j]][x] = adj[x][a[j]] = s ^ (j & 1);
        for (size_t j = 0; j < b.size(); ++j)
          known[s ^ (j & 1)] = b[j], adj[b[j]][x] = adj[x][b[j]] = s ^ (j & 1);
      }

      works = std::move(new_works);
      shuffle(works.begin(), works.end(), rng);
    }

    if (works.size() == 1) {
      const auto &work = works[0];
      size_t s = numeric_limits<size_t>::max();
      if (work.size() > 2) {
        size_t u = work[0], v = work[2];
        size_t cnt = ask_count_of_edges(u, v, x);
        s = cnt - adj[u][v];
        assert(s == 0 || s == 2);
        s >>= 1;
      } else if (work.size() == 2) {
        size_t u = work[0], v = known[0] ? known[0] : known[1];
        assert(v != 0);
        size_t cnt = ask_count_of_edges(u, v, x);
        s = cnt - adj[u][v] - adj[v][x];
        assert(s == 0 || s == 1);
      } else {
        assert(work.size() == 1);
        for (size_t v : known) {
          if (v == 0)
            continue;
          size_t u = work[0];
          size_t cnt = ask_count_of_edges(u, v, x);
          s = cnt - adj[u][v] - adj[v][x];
          if (s == 0 || s == 1)
            break;
        }
        assert(s == 0 || s == 1);
      }
      for (size_t j = 0; j < work.size(); ++j)
        adj[work[j]][x] = adj[x][work[j]] = s ^ (j & 1);
    }

    nodes.insert(x);
  }

  cout << "!" << '\n';
  for (size_t i = 1; i <= N; ++i) {
    for (size_t j = 1; j <= N; ++j) {
      assert(adj[i][j] != numeric_limits<size_t>::max());
      cout << adj[i][j];
    }
    cout << '\n';
  }
  cout << flush;
  return 0;
}
```
