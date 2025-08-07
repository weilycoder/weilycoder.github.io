---
title: Luogu 12003
mathjax: true
date: 2025-08-04T19:43:24.641+0800
categories:
  - OI
  - solution
tags:
  - prime
  - Mo-algo
  - data-structure
---

根号分治好题（雾）。

[题目链接](https://www.luogu.com.cn/problem/P12003)

> 给定一棵 $n$ 个节点的树，点有点权，分别为 $a\_1,a\_2,\ldots a\_n$。
>
> $q$ 次询问，不强制在线，求树上路径点权的不同质因子个数。
>
> + $1\leqslant n,q\leqslant 3\times 10^5$
> + $1\leqslant a\_i\leqslant 10^{8}$

因为是质因子，所以考虑按值域的根号分开讨论，记 $V=\max a\_i$。

### <=sqrt(V)

对于这一部分，由于质数个数不多，因此可以考虑使用 `bitset` 处理。

这里需要一个树链信息合并，但是树上倍增空间会炸。

存在一个神秘技巧是在 Tarjan(LCA) 过程中将并查集改成带权的，这时可以合并询问的一个端点到 LCA 上的信息；将邻接表 reverse 一下再跑一遍，这样两个端点的信息都合并完了。

{% codeblock lang:cpp first_line:61 mark:87,98,103,104 %}
pair<vector<int>, vector<int>> solve_small(const vector<vector<int>> &colors,
                                           const vector<vector<int>> &tree,
                                           const vector<pair<int, int>> &query) {
  int siz = colors.size();
  vector<bitset<PC>> color_set(siz);
  for (int i = 0; i < siz; ++i)
    for (int color : colors[i])
      if (color < LIMIT && small.position[color] != -1)
        color_set[i][small.position[color]] = true;
  vector<int> q_lca(query.size(), -1);
  vector<bitset<PC>> ans(query.size());
  vector<vector<pair<int, int>>> qs(siz);
  for (int i = 0; i < (int)query.size(); ++i) {
    qs[query[i].first].emplace_back(query[i].second, i);
    qs[query[i].second].emplace_back(query[i].first, i);
  }
  auto tarjan = [&](auto to_range) -> void {
    vector<bool> ans_vis(query.size(), false);
    vector<int> fa(siz);
    iota(fa.begin(), fa.end(), 0);
    vector<bitset<PC>> rnk = color_set;
    auto findf = [&](this auto &self, int x) -> int {
      int f = fa[x];
      if (x == f)
        return x;
      fa[x] = self(f);
      rnk[x] |= rnk[f];
      return fa[x];
    };
    auto dfs = [&](this auto &self, int u, int p) -> void {
      for (int v : to_range(u))
        if (v != p)
          self(v, u);
      for (auto [v, idx] : qs[u])
        if (ans_vis[idx] == false)
          ans_vis[idx] = true;
        else
          q_lca[idx] = findf(v), ans[idx] |= rnk[v];
      fa[u] = p;
    };
    dfs(0, -1);
  };
  tarjan([&](int u) { return ranges::subrange(tree[u].begin(), tree[u].end()); });
  tarjan([&](int u) { return ranges::subrange(tree[u].rbegin(), tree[u].rend()); });
  return {
      ranges::views::all(ans) | ranges::views::transform([](const bitset<PC> &x) {
        return x.count();
      }) | ranges::to<vector<int>>(),
      q_lca};
}
{% endcodeblock %}

### >sqrt(V)

显然不会出现两个这样的质因数，因此变为树上数颜色，将树拍成括号序列，然后在序列上应用莫队算法。

{% codeblock lang:cpp first_line:112 mark:131-136,176-182 %}
vector<int> solve_large(const vector<int> &color, const vector<vector<int>> &tree,
                        const vector<pair<int, int>> &query,
                        const vector<int> &q_lca) {
  if (query.empty())
    return {};
  int siz = color.size();
  vector<int> dfn, st_ptr(siz, -1), ed_ptr(siz, -1);
  dfn.reserve(siz << 1);
  auto dfs = [&](this auto self, int u, int p) -> void {
    st_ptr[u] = dfn.size(), dfn.emplace_back(u);
    for (int v : tree[u])
      if (v != p)
        self(v, u);
    ed_ptr[u] = dfn.size(), dfn.emplace_back(u);
  };
  dfs(0, -1);
  vector<tuple<int, int, int>> dn_query =
      ranges::views::iota(0, (int)query.size()) |
      ranges::views::transform([&](int i) {
        auto [u, v] = query[i];
        if (st_ptr[u] > st_ptr[v])
          swap(u, v);
        if (u == q_lca[i] || v == q_lca[i])
          return make_tuple(st_ptr[u], st_ptr[v], i);
        return make_tuple(ed_ptr[u], st_ptr[v], i);
      }) |
      ranges::to<vector<tuple<int, int, int>>>();
  int B = dfn.size() / sqrt(query.size()) + 1;
  ranges::sort(dn_query, [B](const auto &a, const auto &b) -> bool {
    int aB = get<0>(a) / B, bB = get<0>(b) / B;
    if (aB != bB)
      return aB < bB;
    if (aB & 1)
      return get<1>(a) > get<1>(b);
    return get<1>(a) < get<1>(b);
  });
  int color_size = ranges::max(color) + 1;
  int cur_l = 0, cur_r = -1, cc = 0;
  vector<int> ans(query.size(), 0);
  vector<int> cnt(color_size, 0);
  vector<bool> vis(siz, false);
  auto update = [&](int x) -> void {
    if (color[x] == 0)
      return;
    if (vis[x]) {
      vis[x] = false;
      if (--cnt[color[x]] == 0)
        --cc;
    } else {
      vis[x] = true;
      if (cnt[color[x]]++ == 0)
        ++cc;
    }
  };
  for (auto [l, r, idx] : dn_query) {
    assert(l <= r);
    while (cur_l > l)
      update(dfn[--cur_l]);
    while (cur_r < r)
      update(dfn[++cur_r]);
    while (cur_l < l)
      update(dfn[cur_l++]);
    while (cur_r > r)
      update(dfn[cur_r--]);
    if (!vis[q_lca[idx]]) {
      update(q_lca[idx]);
      ans[idx] = cc;
      update(q_lca[idx]);
    } else {
      ans[idx] = cc;
    }
  }
  return ans;
}
{% endcodeblock %}

### Code

```cpp
#include <algorithm>
#include <bitset>
#include <cassert>
#include <cmath>
#include <cstdlib>
#include <iostream>
#include <numeric>
#include <ranges>
#include <stack>
#include <vector>
using namespace std;

#define sq(x) ((x) * (x))

static const int LIMIT = 10000, PC = 1229;

struct init_struct {
  bitset<LIMIT> vis;
  vector<int> primes;
  vector<int> position;
  init_struct() {
    for (int i = 2; i * i < LIMIT; ++i)
      if (vis[i] == false)
        for (int j = i * i; j < LIMIT; j += i)
          vis[j] = true;
    primes.reserve(PC);
    for (int i = 2; i < LIMIT; ++i)
      if (vis[i] == false)
        primes.emplace_back(i);
    position.resize(LIMIT, -1);
    for (int i = 0; i < PC; ++i)
      position[primes[i]] = i;
  }
} small;

vector<int> factor(int x) {
  vector<int> ret;
  for (int i = 0; i < PC && sq(small.primes[i]) <= x; ++i)
    while (x % small.primes[i] == 0)
      x /= small.primes[i], ret.emplace_back(small.primes[i]);
  if (x > 1)
    ret.emplace_back(x);
  return ret;
}

vector<int> discrete_large_color(const vector<vector<int>> &colors) {
  vector<int> color = ranges::views::all(colors) |
                      ranges::views::transform([](const vector<int> &x) {
                        return !x.empty() && x.back() > LIMIT ? x.back() : 0;
                      }) |
                      ranges::to<vector<int>>();
  vector<int> color_set = color;
  color_set.emplace_back(0);
  ranges::sort(color_set);
  color_set.erase(ranges::unique(color_set).begin(), color_set.end());
  for (int &x : color)
    x = ranges::lower_bound(color_set, x) - color_set.begin();
  return color;
}

pair<vector<int>, vector<int>> solve_small(const vector<vector<int>> &colors,
                                           const vector<vector<int>> &tree,
                                           const vector<pair<int, int>> &query) {
  int siz = colors.size();
  vector<bitset<PC>> color_set(siz);
  for (int i = 0; i < siz; ++i)
    for (int color : colors[i])
      if (color < LIMIT && small.position[color] != -1)
        color_set[i][small.position[color]] = true;
  vector<int> q_lca(query.size(), -1);
  vector<bitset<PC>> ans(query.size());
  vector<vector<pair<int, int>>> qs(siz);
  for (int i = 0; i < (int)query.size(); ++i) {
    qs[query[i].first].emplace_back(query[i].second, i);
    qs[query[i].second].emplace_back(query[i].first, i);
  }
  auto tarjan = [&](auto to_range) -> void {
    vector<bool> ans_vis(query.size(), false);
    vector<int> fa(siz);
    iota(fa.begin(), fa.end(), 0);
    vector<bitset<PC>> rnk = color_set;
    auto findf = [&](this auto &self, int x) -> int {
      int f = fa[x];
      if (x == f)
        return x;
      fa[x] = self(f);
      rnk[x] |= rnk[f];
      return fa[x];
    };
    auto dfs = [&](this auto &self, int u, int p) -> void {
      for (int v : to_range(u))
        if (v != p)
          self(v, u);
      for (auto [v, idx] : qs[u])
        if (ans_vis[idx] == false)
          ans_vis[idx] = true;
        else
          q_lca[idx] = findf(v), ans[idx] |= rnk[v];
      fa[u] = p;
    };
    dfs(0, -1);
  };
  tarjan([&](int u) { return ranges::subrange(tree[u].begin(), tree[u].end()); });
  tarjan([&](int u) { return ranges::subrange(tree[u].rbegin(), tree[u].rend()); });
  return {
      ranges::views::all(ans) | ranges::views::transform([](const bitset<PC> &x) {
        return x.count();
      }) | ranges::to<vector<int>>(),
      q_lca};
}

vector<int> solve_large(const vector<int> &color, const vector<vector<int>> &tree,
                        const vector<pair<int, int>> &query,
                        const vector<int> &q_lca) {
  if (query.empty())
    return {};
  int siz = color.size();
  vector<int> dfn, st_ptr(siz, -1), ed_ptr(siz, -1);
  dfn.reserve(siz << 1);
  auto dfs = [&](this auto self, int u, int p) -> void {
    st_ptr[u] = dfn.size(), dfn.emplace_back(u);
    for (int v : tree[u])
      if (v != p)
        self(v, u);
    ed_ptr[u] = dfn.size(), dfn.emplace_back(u);
  };
  dfs(0, -1);
  vector<tuple<int, int, int>> dn_query =
      ranges::views::iota(0, (int)query.size()) |
      ranges::views::transform([&](int i) {
        auto [u, v] = query[i];
        if (st_ptr[u] > st_ptr[v])
          swap(u, v);
        if (u == q_lca[i] || v == q_lca[i])
          return make_tuple(st_ptr[u], st_ptr[v], i);
        return make_tuple(ed_ptr[u], st_ptr[v], i);
      }) |
      ranges::to<vector<tuple<int, int, int>>>();
  int B = dfn.size() / sqrt(query.size()) + 1;
  ranges::sort(dn_query, [B](const auto &a, const auto &b) -> bool {
    int aB = get<0>(a) / B, bB = get<0>(b) / B;
    if (aB != bB)
      return aB < bB;
    if (aB & 1)
      return get<1>(a) > get<1>(b);
    return get<1>(a) < get<1>(b);
  });
  int color_size = ranges::max(color) + 1;
  int cur_l = 0, cur_r = -1, cc = 0;
  vector<int> ans(query.size(), 0);
  vector<int> cnt(color_size, 0);
  vector<bool> vis(siz, false);
  auto update = [&](int x) -> void {
    if (color[x] == 0)
      return;
    if (vis[x]) {
      vis[x] = false;
      if (--cnt[color[x]] == 0)
        --cc;
    } else {
      vis[x] = true;
      if (cnt[color[x]]++ == 0)
        ++cc;
    }
  };
  for (auto [l, r, idx] : dn_query) {
    assert(l <= r);
    while (cur_l > l)
      update(dfn[--cur_l]);
    while (cur_r < r)
      update(dfn[++cur_r]);
    while (cur_l < l)
      update(dfn[cur_l++]);
    while (cur_r > r)
      update(dfn[cur_r--]);
    if (!vis[q_lca[idx]]) {
      update(q_lca[idx]);
      ans[idx] = cc;
      update(q_lca[idx]);
    } else {
      ans[idx] = cc;
    }
  }
  return ans;
}

int main() {
  cin.tie(nullptr)->sync_with_stdio(false);
  int n, q;
  cin >> n >> q;

  vector<vector<int>> colors;
  colors.reserve(n);
  for (int i = 0, x; i < n; ++i)
    cin >> x, colors.emplace_back(factor(x));

  vector<vector<int>> tree(n);
  for (int i = 1, u, v; i < n; ++i) {
    cin >> u >> v;
    tree[u - 1].emplace_back(v - 1);
    tree[v - 1].emplace_back(u - 1);
  }

  vector<pair<int, int>> query;
  query.reserve(q);
  for (int i = 0, u, v; i < q; ++i)
    cin >> u >> v, query.emplace_back(u - 1, v - 1);

  auto [small_ans, q_lca] = solve_small(colors, tree, query);
  auto large_ans = solve_large(discrete_large_color(colors), tree, query, q_lca);

  for (int i = 0; i < q; ++i)
    cout << small_ans[i] + large_ans[i] << '\n';
  return 0;
}
```