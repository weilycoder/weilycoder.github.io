---
title: foreverlasting and fried-chicken (HDU 2023(2))
mathjax: true
date: 2025-08-18T15:42:28.177+0800
categories:
  - OI
  - solution
tags:
  - bitset
  - brute-force
---

略典。

[原题链接](https://acm.hdu.edu.cn/showproblem.php?pid=7293)

> 给定一个 $n$ 个点的简单无向图，求图中如下子图的数量，$T$ 组数据：
>
> ![](/image/C1105-1003-1.png)
>
> + $1\leqslant T\leqslant 10$；
> + $1\leqslant n\leqslant 1000,\sum n\leqslant 3000$。
>
> *形式化地，给定简单无向图 $G\left(V,E\right)$，求子图 $G^{\prime}\left(V^{\prime},E^{\prime}\right)\left(V^{\prime}\subset V,E^{\prime}\subset E\right)$ 的数量，其中 $G^{\prime}$ 满足 $V^{\prime}=\left\\{v\_1,v\_2,v\_3,v\_4,v\_5,v\_6,v\_7,v\_8\right\\}s,E^{\prime}=\left\\{\left(v\_1,v\_3\right),\left(v\_2,v\_3\right),\left(v\_3,v\_4\right),\left(v\_3,v\_5\right),\left(v\_3,v\_6\right),\left(v\_3,v\_7\right),\left(v\_4,v\_8\right),\left(v\_5,v\_8\right),\left(v\_6,v\_8\right),\left(v\_7,v\_8\right)\right\\}$*

注意到 $v\_3$ 和 $v\_8$ 的位置比较关键。

考虑枚举 $v\_3$ 和 $v\_8$，求它们直接连接的点集的交，任取 $4$ 个 构成 $\left\\{v\_4,v\_5,v\_6,v\_7\right\\}$。

从剩下的 $v\_3$ 直接连接的点（若包含 $v\_8$，将其排除）中任取 $2$ 个，构成 $\left\\{v\_1,v\_2\right\\}$。

然后就是组合数学的计算了。

使用 `bitset` 加速，复杂度 $\mathcal O\left(\dfrac{n^{3}}{\omega}\right)$。

`dynamic_bitset` 的 Bug 对计算没有影响。

```cpp
#include <cstdint>
#include <iostream>
#include <tr2/dynamic_bitset>
#include <vector>
using namespace std;
using tr2::dynamic_bitset;

static constexpr uint32_t Mod = 1'000'000'007;

template <uint32_t Mod> struct Comb {
  vector<uint32_t> fac, ifac;

  Comb(uint32_t n) : fac(n + 1), ifac(n + 1) {
    fac[0] = 1;
    for (uint32_t i = 1; i <= n; ++i)
      fac[i] = (uint64_t)fac[i - 1] * i % Mod;
    ifac[n] = inv(fac[n]);
    for (uint32_t i = n; i > 0; --i)
      ifac[i - 1] = (uint64_t)ifac[i] * i % Mod;
  }

  uint64_t inv(uint32_t a) {
    uint64_t base = a % Mod, res = 1, exp = Mod - 2;
    for (; exp; exp >>= 1, (base *= base) %= Mod)
      if (exp & 1)
        (res *= base) %= Mod;
    return res;
  }

  uint32_t operator()(uint32_t n, uint32_t k) {
    if (k > n)
      return 0;
    return (uint64_t)fac[n] * ifac[k] % Mod * ifac[n - k] % Mod;
  }
};

Comb<Mod> comb(1'003);

void solve() {
  size_t n, m;
  cin >> n >> m;
  vector<size_t> deg(n);
  vector<dynamic_bitset<>> a(n, dynamic_bitset<>(n));
  for (size_t i = 0; i < m; ++i) {
    size_t u, v;
    cin >> u >> v;
    --u, --v;
    a[u][v] = a[v][u] = true;
    ++deg[u], ++deg[v];
  }
  uint32_t ans = 0;
  for (size_t i = 0; i < n; ++i) {
    for (size_t j = 0; j < n; ++j) {
      if (i == j)
        continue;
      size_t x = (a[i] & a[j]).count();
      size_t y = deg[i] - a[i].test(j);
      if (x < 4 || y < 6)
        continue;
      (ans += (uint64_t)comb(x, 4) * comb(y - 4, 2) % Mod) %= Mod;
    }
  }
  cout << ans << '\n';
}

int main() {
  cin.tie(nullptr)->sync_with_stdio(false);
  size_t T;
  cin >> T;
  while (T--)
    solve();
  return 0;
}
```