---
title: Codeforces Round 1046 (Div 2)
mathjax: true
date: 2025-08-29 20:17:05
categories:
  - OI
  - solution
tags:
  - contest
  - greedy
  - math(oi)
  - constructive
  - data-structure
  - Dynamic-Programming
  - interactive
  - dfs
---

[比赛链接](https://codeforces.com/contest/2136)

$5/7$，rk $108$，$\color{blue}{\mathtt{E}}\to\color{purple}{\mathtt{CM}}$，纪念。

## A. In the Dream

> 两个变量 $a,b$，每次可以选择一个 $+1$，但每个变量不能被连续选择 $3$ 次，给你先后两个时刻的变量取值，问是否可能存在。

检查变量的增量 $\Delta a,\Delta b$，不妨 $\Delta a\leqslant \Delta b$，则需要保证 $2\cdot(\Delta a + 1)\geqslant \Delta b$。

{% editor cpp vs-dark false 500px %}
#include <bits/stdc++.h>
using namespace std;

bool check(size_t a, size_t b) {
  if (a > b)
    swap(a, b); // a <= b
  return (a + 1) * 2 >= b;
}

void solve() {
  size_t a, b, c, d;
  cin >> a >> b >> c >> d;
  if (!check(a, b))
    return cout << "NO\n", void();
  if (c < a || d < b)
    return cout << "NO\n", void();
  if (!check(c - a, d - b))
    return cout << "NO\n", void();
  cout << "YES\n";
}

int main() {
  cin.tie(nullptr)->sync_with_stdio(false);
  int t;
  cin >> t;
  while (t--)
    solve();
  return 0;
}
{% endeditor %}

## B. Like the Bitset

怎么 B 题控了我将近 $10\mathrm{min}$。

大脑退化了。

> 构造一个长为 $n$ 的排列 $p$；有若干限制，以非负整数 $k$ 和 $n$ 位 $\mathtt{01}$ 串 $s$ 的形式给出；若 $s_i=1$，表示任意包含 $p_i$ 的、长度至少为 $k$ 的区间中，$p_i$ 不为其中的最大值。

显然若 $\mathtt{01}$ 串中全 $\mathtt{1}$ 的连续段长度大于等于 $k$ 时，一定无法构造；当然，$\mathtt{01}$ 串全 $\mathtt{1}$ 时当然也无法构造，不过题目保证 $k\leqslant n$ 了。

贪心地将较大的数分配给 $\mathtt{0}$ 的位置，较小的数分配给 $\mathtt{1}$ 的位置，显然一定可以满足要求。

{% editor cpp vs-dark false 500px %}
#include <bits/stdc++.h>
using namespace std;

void solve() {
  size_t n, k;
  cin >> n >> k;
  string s;
  cin >> s;
  s = "0" + s;
  size_t last_zero = 0, max_one = 0;
  for (size_t i = 1; i <= n; ++i) {
    if (s[i] == '0')
      last_zero = i;
    else
      max_one = max(max_one, i - last_zero);
  }
  if (max_one != 0 && (max_one == n || max_one >= k))
    return cout << "NO\n", void();
  size_t cur = 1;
  vector<size_t> ans(n + 1);
  for (size_t i = 1; i <= n; ++i)
    if (s[i] == '1')
      ans[i] = cur++;
  for (size_t i = 1; i <= n; ++i)
    if (s[i] == '0')
      ans[i] = cur++;
  cout << "YES\n";
  for (size_t i = 1; i <= n; ++i)
    cout << ans[i] << " \n"[i == n];
}

int main() {
  cin.tie(nullptr)->sync_with_stdio(false);
  int t;
  cin >> t;
  while (t--)
    solve();
  return 0;
}
{% endeditor %}

## C. Against the Difference

一眼秒掉了。

> 一个长为 $m$ 的段是好的，当且仅当它的每个元素都是 $m$，特别地，长为 $0$ 的段是好的。
>
> 一个序列是好的，当且仅当它是由若干个好的段拼接起来的。
>
> 给定长为 $n$ 的序列 $A$，求最长好的子序列的长度。

显然 DP。

令 $F_{i}$ 表示只考虑 $[1,i]$ 的值，构成的最长好的子序列长度，记 $F_{0}=0$。

若 $A_{i}$ 不作为子序列末尾，答案为 $F_{i-1}$；

否则，子序列最后一个好段是 $A_{i}$ 个 $A_{i}$，找到前 $A_{i}$ 个 $A_{i}$ 的位置为 $j$，（若存在）答案为 $F_{j-1}+A_{i}$；

两者取最大值。

为每个值开一个 `vector`，快速处理 $A_{i}$ 出现的位置，总空间是 $\mathcal O(n)$ 的。

显然时间也是 $\mathcal O(n)$ 的。

{% editor cpp vs-dark false 500px %}
#include <bits/stdc++.h>
using namespace std;

void solve() {
  size_t n;
  cin >> n;
  vector<size_t> arr(n + 1);
  for (size_t i = 1; i <= n; ++i)
    cin >> arr[i];

  vector<size_t> F(n + 1);
  vector<vector<size_t>> occ_pos(n + 1);
  for (size_t i = 1; i <= n; ++i) {
    F[i] = F[i - 1];
    size_t val = arr[i];
    occ_pos[val].push_back(i);
    size_t siz = occ_pos[val].size();
    if (siz >= val) {
      size_t j = occ_pos[val][siz - val];
      F[i] = max(F[i], F[j - 1] + val);
    }
  }
  cout << F[n] << '\n';
}

int main() {
  cin.tie(nullptr)->sync_with_stdio(false);
  int t;
  cin >> t;
  while (t--)
    solve();
  return 0;
}
{% endeditor %}

## D. For the Champion

秒了。

> 交互题。
>
> 二维平面上，有 $n$ 个定点，坐标已知，保证横纵坐标均为整数且绝对值小于 $10^{9}$。
>
> 有一个动点，初始坐标未知，也保证横纵坐标均为整数且绝对值小于 $10^{9}$。
>
> 你可以做最多 $10$ 次操作，每次操作选定一个方向（上、下、左、右）和一个距离 $k$，将动点向你选择的方向移动 $k$ 个单位；你需要保证 $k$ 为非负整数且不大于 $10^{9}$。
>
> 交互库在你的每次操作后回答动点到所有定点的曼哈顿距离的最小值。
>
> 确定定点最初的位置。

将动点移动到角上，可以获取 $x+y$ 和 $x-y$，解方程。

向上移动两次并向右移动两次保证达到右上角；再向左移动四次保证到达左上角，共 $8$ 次。

{% editor cpp vs-dark false 500px %}
#include <bits/stdc++.h>
using namespace std;

static constexpr int64_t limit = 1e9;

int64_t ask(char op, int64_t D) {
  assert(0 <= D && D <= limit);
  cout << "? " << op << ' ' << D << endl;
  int64_t dis;
  cin >> dis;
  return dis;
}

void solve() {
  size_t n;
  cin >> n;
  vector<pair<int64_t, int64_t>> points;
  points.reserve(n);
  for (size_t i = 0; i < n; ++i) {
    int64_t x, y;
    cin >> x >> y;
    points.emplace_back(x, y);
  }
  // (1e9, 1e9)
  int64_t right_top = [&]() -> int64_t {
    int64_t dis = limit * limit;
    for (const auto &[cx, cy] : points)
      dis = min(dis, (limit - cx) + (limit - cy));
    return dis;
  }();
  // (-1e9, 1e9)
  int64_t left_top = [&]() -> int64_t {
    int64_t dis = limit * limit;
    for (const auto &[cx, cy] : points)
      dis = min(dis, (cx + limit) + (limit - cy));
    return dis;
  }();

  // (x + 2e9, y + 2e9) - (1e9, 1e9)  =>  (x + 1e9, y + 1e9)
  int64_t rt_right_top = (ask('U', limit), ask('U', limit), ask('R', limit), ask('R', limit)) - right_top;
  // (x - 2e9, y + 2e9) - (-1e9, 1e9)  => (1e9 - x, y + 1e9)
  int64_t rt_left_top = (ask('L', limit), ask('L', limit), ask('L', limit), ask('L', limit)) - left_top;

  int64_t y_plus_x = rt_right_top - limit * 2;
  int64_t y_minus_x = rt_left_top - limit * 2;

  cout << "! " << (y_plus_x - y_minus_x) / 2 << ' ' << (y_plus_x + y_minus_x) / 2 << endl;
}

int main() {
  cin.tie(nullptr)->sync_with_stdio(false);
  int t;
  cin >> t;
  while (t--)
    solve();
  return 0;
}
{% endeditor %}

## E. By the Assignment

秒了，怎么 clist 评上 2000 了。

> 给定一张带点权无向图，权值值域 $[0,k)$，一些点权未确定。要求对于图中任意互异两点 $u,v$，其任意简单路径上点权异或和相等。
>
> 求方案数，对 $998244353$ 取模。

显然对于一个环，环上的点点权必须相等，更近一步，若环是奇环，则点权必须全为 $0$。

同时，对于一个树，可以任意赋点权。

找到图中全部边双连通分量，则每个边双连通分量中点权应全部相等，若其中存在奇环，点权应全部为 $0$。

对于每个边双连通分量，检查方案数是 $0,1,k$ 中的哪一个即可。

复杂度 $\mathcal O(n+m)$。

{% editor cpp vs-dark false 500px %}
#include <bits/stdc++.h>
using namespace std;

static constexpr uint64_t MOD = 998244353;

void tarjan(size_t u, size_t fa, const vector<vector<size_t>> &edges, vector<size_t> &low, vector<size_t> &dfn,
            size_t &idx, vector<bool> &is_bridge) {
  low[u] = dfn[u] = ++idx;
  for (const size_t v : edges[u]) {
    if (!dfn[v]) {
      tarjan(v, u, edges, low, dfn, idx, is_bridge);
      low[u] = min(low[u], low[v]);
      if (low[v] > dfn[u])
        is_bridge[v] = true;
    } else if (v != fa)
      low[u] = min(low[u], dfn[v]);
  }
}

void remove_bridge(size_t u, size_t fa, vector<bool> &vis, vector<vector<size_t>> &edges,
                   const vector<bool> &is_bridge) {
  vis[u] = true;
  vector<size_t> new_out;
  for (const size_t v : edges[u]) {
    if (v == fa) {
      if (!is_bridge[u])
        new_out.push_back(v);
    } else {
      if (!is_bridge[v])
        new_out.push_back(v);
      if (!vis[v])
        remove_bridge(v, u, vis, edges, is_bridge);
    }
  }
  edges[u] = move(new_out);
}

void node_rnk_count(size_t u, const vector<int64_t> &rnk, const vector<vector<size_t>> &edges, vector<bool> &vis,
                    set<int64_t> &rnk_set) {
  if (rnk[u] != -1)
    rnk_set.emplace(rnk[u]);
  for (const size_t v : edges[u])
    if (!vis[v]) {
      vis[v] = true;
      node_rnk_count(v, rnk, edges, vis, rnk_set);
    }
}

void has_odd_circle(size_t u, const vector<vector<size_t>> &edges, vector<int32_t> &color, bool &found) {
  for (const size_t v : edges[u])
    if (color[v] == 0)
      color[v] = -color[u], has_odd_circle(v, edges, color, found);
    else if (color[v] == color[u])
      found = true;
}

void solve() {
  size_t n, m;
  uint64_t k;
  cin >> n >> m >> k;

  vector<int64_t> rnk(n);
  for (size_t i = 0; i < n; ++i)
    cin >> rnk[i];

  vector<vector<size_t>> edges(n);
  for (size_t i = 0; i < m; ++i) {
    size_t u, v;
    cin >> u >> v, --u, --v;
    edges[u].push_back(v);
    edges[v].push_back(u);
  }

  {
    size_t idx = 0;
    vector<bool> is_bridge(n), vis(n);
    vector<size_t> low(n), dfn(n);
    tarjan(0, 0, edges, low, dfn, idx, is_bridge);
    remove_bridge(0, 0, vis, edges, is_bridge);
  }

  uint64_t ans = 1;
  {
    vector<bool> vis(n);
    vector<int32_t> color(n);
    for (size_t i = 0; i < n; ++i) {
      if (vis[i])
        continue;
      color[i] = 1;
      bool found_odd_circle = false;
      has_odd_circle(i, edges, color, found_odd_circle);
      set<int64_t> rnk_set;
      node_rnk_count(i, rnk, edges, vis, rnk_set);
      if (found_odd_circle) {
        if (rnk_set.size() && !(rnk_set.size() == 1 && *rnk_set.begin() == 0))
          return cout << "0\n", void();
      } else {
        if (rnk_set.size() > 1)
          return cout << "0\n", void();
        if (rnk_set.empty())
          (ans *= k) %= MOD;
      }
    }
  }
  cout << ans << '\n';
}

int main() {
  cin.tie(nullptr)->sync_with_stdio(false);
  int t;
  cin >> t;
  while (t--)
    solve();
  return 0;
}
{% endeditor %}

## F1/2. From the Unknown (Easy/Hard Version)

有点吃分析。

好像 Easy 不太难，可能是凌晨 1 点有沉睡 Debuff，也可能确实思维有点退化，剩余将近 1h 就弃赛了。

有空补题。
