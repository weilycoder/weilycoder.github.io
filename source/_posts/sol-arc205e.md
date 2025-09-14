---
title: Subset Product Problem (AGC 205 E)
mathjax: true
date: 2025-09-14 17:27:58
updated: 2025-09-14 17:27:58
categories:
  - OI
  - solution
tags:
  - bits
---

> 给定一个长为 $N$ 的非负整数序列 $A=\left(A\_1,A\_2,\ldots,A\_N\right)$。
>
> 对于每个下标 $k=1,2,\ldots,N$，求：
>
> $$
> \prod\_{i=1}^{k}A\_i^{\left[A\_i\operatorname{OR}A\_k=A\_k\right]}
> $$
>
> + $1\leqslant N\leqslant 4\times 10^{5}$；
> + $0\leqslant A\_i\lt 2^{20}$。

<!-- more -->

下文使用 $V$ 表示值域。

## Algo 1

暴力做法，查询时枚举子集，修改操作 $\mathcal O\left(1\right)$，查询操作 $\mathcal O\left(V\right)$。

## Algo 2

暴力做法，插入时枚举超集，修改操作 $\mathcal O\left(V\right)$，查询操作 $\mathcal O\left(1\right)$。

## Algo 3

考虑根号分治，平衡复杂度，对前 $10$ 位应用做法 1，后 $10$ 位应用做法 2。

显然单次操作复杂度是 $\mathcal O\left(\sqrt{V}\right)$ 的。

## Algo 4

一个复杂度更高的做法。

注意到，如果没有 $i\leqslant k$ 的限制，则可以进行一个 sosdp/FMT/FWT 计算贡献。

考虑一个分块/根号重构。

令块长为 $B$，每加进来一个整块，进行 sosdp 处理贡献，单次 $\mathcal O\left(V\log V\right)$，对于块内贡献，暴力枚举，单次复杂度 $\mathcal O\left(B\right)$。

取 $B=\mathcal O\left(\sqrt{V\log V}\right)$ 平衡复杂度，总复杂度 $\mathcal O\left(n\sqrt{V\log V}\right)$。

## Algo 5

神仙做法。

基于随机化，单次操作期望 $\mathcal O\left(\left(\frac{4}{3}\right)^{\log\_{2} V}\right)$。

考虑每个数的贡献方式，对于每一位，若这一位为 $0$，则要贡献到 $0$ 或 $1$ 上；若这一位为 $1$，则贡献到 $1$ 上。

写成矩阵就是

$$
\begin{bmatrix}
  1 & 1 \\\\
  0 & 1
\end{bmatrix}
$$

这个贡献可以在插入时处理，也可以在查询时处理，从这个视角看，Algo 1 和 Algo 2 就是将矩阵拆成了如下乘积的形式：

{% raw %}
$$
\begin{aligned}
  \begin{bmatrix}
    1 & 1 \\
    0 & 1
  \end{bmatrix}
  =
  \begin{bmatrix}
    1 & 0 \\
    0 & 1
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
    1 & 1 \\
    0 & 1
  \end{bmatrix}
  \\
  \begin{bmatrix}
    1 & 1 \\
    0 & 1
  \end{bmatrix}
  =
  \begin{bmatrix}
    1 & 1 \\
    0 & 1
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
    1 & 0 \\
    0 & 1
  \end{bmatrix}
\end{aligned}
$$
{% endraw %}

当然，这个拆分是 trivial 的，但是，还有一个不太 trivial 的拆分：

{% raw %}
$$
\begin{aligned}
  \begin{bmatrix}
    1 & 1 \\
    0 & 1
  \end{bmatrix}
  =
  \begin{bmatrix}
    1 & 0 \\
    1 & 1
  \end{bmatrix}
  \cdot
  \begin{bmatrix}
    1 & 1 \\
    -1 & 0
  \end{bmatrix}
\end{aligned}
$$
{% endraw %}

对每一位随机分配一种贡献方式，注意到每一位有 $\frac{1}{3}$ 的概率被枚举 $2$ 次，$\frac{2}{3}$ 的概率只被枚举 $1$ 次，平均被枚举 $\frac{4}{3}$ 次。

因此单次期望复杂度 $\mathcal O\left(\left(\frac{4}{3}\right)^{\log\_{2}V}\right)$。

由于随机存在方差，可以多随几次取最小操作次数。

{% editor cpp vs-dark false 500px %}
#include <bits/stdc++.h>
using namespace std;

static constexpr uint32_t mod = 998244353;

static mt19937 rng(random_device{}());

static uint32_t fast_pow(uint32_t base, uint32_t exp) {
  uint32_t ret = 1;
  for (base %= mod; exp; exp >>= 1, base = (uint64_t)base * base % mod)
    if (exp & 1)
      ret = (uint64_t)ret * base % mod;
  return ret;
}

static uint32_t inverse(uint32_t x) { return fast_pow(x, mod - 2); }

int main() {
  cin.tie(nullptr)->sync_with_stdio(false);
  size_t n;
  cin >> n;

  vector<uint32_t> val(n);
  for (size_t i = 0; i < n; ++i)
    cin >> val[i];

  size_t logV = [](uint32_t max_val) -> size_t {
    return max_val == 0 ? 0 : 32 - __builtin_clz(max_val);
  }(*max_element(val.begin(), val.end()));
  uint32_t V = 1u << logV;

  uint32_t mask1 = (V - 1) >> (logV >> 1), mask2 = (V - 1) ^ mask1, mask3 = 0;

  {
    auto eval_cost = [&](uint32_t m1, uint32_t m2, uint32_t m3) -> uint64_t {
      uint64_t sum = 0;
      for (uint32_t v : val) {
        if (v == 0)
          break;
        sum += 1u << __builtin_popcount((~v & m2) | (v & m3));
        sum += 1u << __builtin_popcount((v & m1) | (~v & m3));
      }
      return sum;
    };

    uint64_t best = eval_cost(mask1, mask2, mask3);
    uniform_int_distribution<uint32_t> dist(0, 2);
    for (size_t k = 0; k < 24; ++k) {
      uint32_t m1 = 0, m2 = 0, m3 = 0;
      for (size_t i = 0; i < logV; ++i) {
        switch (dist(rng)) {
        case 0:
          m1 |= 1u << i;
          break;
        case 1:
          m2 |= 1u << i;
          break;
        case 2:
          m3 |= 1u << i;
          break;
        default:
          __builtin_unreachable();
        }
      }
      size_t sum = eval_cost(m1, m2, m3);
      if (sum < best)
        best = sum, mask1 = m1, mask2 = m2, mask3 = m3;
    }
  }

  size_t i;
  vector<uint32_t> ans(V, 1);
  for (i = 0; i < n; ++i) {
    if (val[i] == 0)
      break;
    {
      uint32_t m1 = (val[i] & mask1) | (val[i] & mask2);
      uint32_t m2 = (~val[i] & mask2) | (val[i] & mask3);
      for (uint32_t j = m2;; j = (j - 1) & m2) {
        ans[j | m1] = (uint64_t)ans[j | m1] * val[i] % mod;
        if (j == 0)
          break;
      }
    }
    uint32_t num = 1, den = 1;
    {
      uint32_t m1 = val[i] & mask2;
      uint32_t m2 = (val[i] & mask1) | (~val[i] & mask3);
      for (uint32_t j = m2;; j = (j - 1) & m2) {
        if (__builtin_parity(j & mask3))
          den = (uint64_t)den * ans[j | m1] % mod;
        else
          num = (uint64_t)num * ans[j | m1] % mod;
        if (j == 0)
          break;
      }
    }
    cout << (uint64_t)num * inverse(den) % mod << '\n';
  }

  for (; i < n; ++i)
    cout << "0\n";

  return 0;
}
{% endeditor %}
