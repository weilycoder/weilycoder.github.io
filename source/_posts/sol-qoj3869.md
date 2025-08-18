---
title: Gastronomic Event (SWERC 2021)
mathjax: true
date: 2025-08-13 18:05:50
categories:
  - OI
  - solution
tags:
  - tree
  - graph
  - tree-centroid
  - Dynamic-Programming
---

感觉是绝世树上好题！

[题目链接 (Qoj)](https://qoj.ac/contest/918/problem/3869)

> 给定一个 $n$ 个节点的树，构造一个 $1\sim n$ 的排列 $p\_1,p\_2,\ldots,p\_n$，使得好的点列最多。其中，一个点列 $\left(a\_1,a\_2,\ldots,a\_k\right)$ 是好的，当且仅当边 $\left(a\_1,a\_2\right),\left(a\_2,a\_3\right),\ldots,\left(a\_{k-1},a\_{k}\right)$ 均存在，且满足 $p\_{a\_{1}}\lt p\_{a\_{2}}\lt\cdots\lt p\_{a\_{k}}$。
>
> 输出好的点列的最大数量。
>
> + $1\leqslant n\leqslant 10^{6}$。

首先有一个简单的题意转化，显然题意等价于将树边定向，要求树上的路径最多。

一个显然的结论是，一条原先的无向路径，定向后不可能有超过两次反向，即不会出现

$$
a\_{1}\to a\_{2}\to a\_{3}\to\cdots\to a\_{k}\gets a\_{k+1}\gets \cdots \gets a\_{k+m-1}\gets a\_{k+m}\to\cdots a\_{n-1}\to a\_{n}
$$

因为不妨将中间“反向”的那一段所连的边全部反向。

---

根据这个性质，容易发现，最终的结构一定是挑出一个点作为树根，其子树要么挂在上面，要么挂在下面。

不经过根（根节点在中间）的路径个数就是每个点的子树大小之和，因为每个点到其子树中的每个点必然有一条路径。

经过根的路径个数显然是挂在上面的子树大小乘挂在下面的子树大小，根据数学知识得到要使两部分的大小尽量接近。

这里可以使用背包处理，复杂度 $\mathcal O\left(n^{3}\right)$。

由于是可行性背包，因此可以使用 bitset 优化，复杂度为 $\mathcal O\left(\dfrac{n^{3}}{\omega}\right)$。

---

然后根据经验猜测选择树的重心比较优，这里不证了。

复杂度降到 $\mathcal O\left(\dfrac{n^{2}}{\omega}\right)$。

---

观察背包，发现保证了背包物品的重量之和为 $\mathcal O\left(n\right)$。

考虑如果重量同为 $w\_{i}$ 的物品超过两个，可以将超过的部分其中两件换成 $2w\_{i}$，正确性参考多重背包的二进制拆分，

这样每种重量不会出现超过 $\mathcal O\left(1\right)$ 次，又因为总重量为 $\mathcal O\left(n\right)$，因此不同物品最多有 $\mathcal O\left(\sqrt{n}\right)$ 个。

复杂度 $\mathcal O\left(\dfrac{n\sqrt{n}}{\omega}\right)$。

---

这里 `dynamic_bitset` 的 Bug 不影响使用。

```cpp
#include <bits/stdc++.h>
#include <tr2/dynamic_bitset>
using namespace std;
using tr2::dynamic_bitset;

static void dfs_siz(size_t u, size_t fa, const vector<vector<size_t>> &tree, vector<size_t> &siz) {
  siz[u] = 1;
  for (size_t v : tree[u])
    if (v != fa)
      dfs_siz(v, u, tree, siz), siz[u] += siz[v];
}

static void dfs_weight(size_t u, size_t fa, const vector<vector<size_t>> &tree, vector<size_t> &siz,
                       vector<size_t> &weight) {
  siz[u] = 1;
  weight[u] = 0;
  for (size_t v : tree[u])
    if (v != fa)
      dfs_weight(v, u, tree, siz, weight), siz[u] += siz[v], weight[u] = max(weight[u], siz[v]);
  weight[u] = max(weight[u], tree.size() - siz[u]);
}

int main() {
  cin.tie(nullptr)->sync_with_stdio(false);
  size_t n;
  cin >> n;
  vector<vector<size_t>> tree(n);
  for (size_t i = 1; i < n; ++i) {
    size_t f;
    cin >> f;
    tree[i].emplace_back(f - 1);
    tree[f - 1].emplace_back(i);
  }

  size_t root = [&]() -> size_t {
    vector<size_t> siz(n), weight(n);
    dfs_weight(0, 0, tree, siz, weight);
    size_t cur = 0;
    for (size_t i = 0; i < n; ++i)
      if (weight[i] < weight[cur])
        cur = i;
    return cur;
  }();

  vector<size_t> siz(n);
  dfs_siz(root, root, tree, siz);
  uint64_t ret = 0;
  for (size_t i = 0; i < n; ++i)
    ret += siz[i];

  vector<size_t> son_siz(n);
  for (size_t son : tree[root])
    ++son_siz[siz[son]];

  for (size_t i = 1; i < n; ++i)
    while (son_siz[i] > 2)
      son_siz[i] -= 2, ++son_siz[i << 1];

  size_t half_n = (n - 1) >> 1;
  dynamic_bitset<> F(half_n + 1);
  F.set(0);
  for (size_t w = 1; w < n; ++w)
    while (son_siz[w]--)
      F |= F << w;
  ret += [&]() -> uint64_t {
    for (size_t i = half_n; ~i; --i)
      if (F[i])
        return i * (n - 1 - i);
    return 0;
  }();
  cout << ret << '\n';
  return 0;
}
```
