---
title: Jabberwocky I (Ynoi Easy Round 2016)
mathjax: true
date: 2025-10-08 10:52:55
updated: 2025-10-08 10:52:55
categories:
  - OI
  - solution
tags:
  - euler-totient
  - number-theory
  - fenwick
---

早年数论题。

[题目链接](https://www.luogu.com.cn/problem/P3934)

> 给定一个长为 $n$ 的正整数序列 $A$（1-index），维护两种操作（共 $m$ 次）：
> 1. 给定 $l,r,x$，对于所有 $l\leqslant i\leqslant r$，令 $A\_{i}\gets A\_{i}+x$；
> 2. 给定 $l,r,p$，求 $Q\left(l,r\right) \bmod p$，其中
> $$
> Q\left(l,r\right)=\begin{cases}
> A\_{l} ,& l = r \\\\
> A\_{l}^{Q\left(l+1,r\right)} ,& l\lt r
> \end{cases}
> $$
>
> + $1\leqslant n,m\leqslant 5\times 10^{5}$
> + $1\leqslant A\_i\leqslant 2\times 10^{9}$ (At beginning)；
> + $p\leqslant 2\times 10^{7}$；
> + $0\leqslant x\leqslant 2\times 10^{9}$。

<!-- more -->

---

首先熟知欧拉降幂公式（扩展欧拉定理）：

$$
a^{b}\equiv
\begin{cases}
  a^{b\bmod\varphi\left(m\right)} ,& \gcd\left(a,m\right)=1 \\\\
  a^b ,& \gcd\left(a,m\right)\ne1,b<\varphi\left(m\right) \\\\
  a^{b\bmod\varphi\left(m\right)+\varphi\left(m\right)} ,& \gcd\left(a,m\right)\ne1,b\ge\varphi\left(m\right)
\end{cases}
\pmod m
$$

对于第一种情况，$a,m$ 是否互质有时不好讨论，幸好可以直接应用不互质的版本，即

$$
a^{b}\equiv
\begin{cases}
  a^b ,& b\lt\varphi\left(m\right) \\\\
  a^{b\bmod\varphi\left(m\right)+\varphi\left(m\right)} ,& b\geqslant\varphi\left(m\right)
\end{cases}
\pmod m
$$

---

直接应用扩展欧拉定理，我们有

$$
Q\left(l,r,p\right) \equiv A\_{l}^{Q\left(l+1,r,\varphi\left(p\right)\right)+\left[Q\left(l+1,r\right)\geqslant\varphi\left(p\right)\right]\varphi\left(p\right)} \pmod {p}
$$

其中 $\left[\cdot\right]$ 是 Iverson bracket[^1]。

在递归的过程中维护条件是否成立即可。

---

那么，如此计算的复杂度是什么呢？

首先考虑一个剪枝，若 $p=1$，则显然可以直接终止递归过程。

容易证明[^2]，从 $p$ 开始，不断这个数取欧拉函数，最多取 $\mathcal O\left(\log p\right)$ 次，就可以把这个数变成 $1$。

因此递归最多进行 $\mathcal O\left(\log p\right)$ 层。

---

维护区间加是容易的，使用一个差分树状数组，容易做到 $\mathcal O\left(\log n\right)$ 区间加，$\mathcal O\left(\log n\right)$ 单点查值。

总的来讲，操作 1 的单次复杂度为 $\mathcal O\left(\log n\right)$；操作 2 的单次复杂度为 $\mathcal O\left(\log n\log p\right)$。

最开始需要 $\mathcal O\left(p\right)$ 预处理 $p$ 的欧拉函数值。

初始化树状数组可以做到 $\mathcal O\left(n\right)$，但是我懒得写了。

总复杂度 $\mathcal O\left(p+\left(n+m\right)\log n\log p\right)$。

需要特判掉 $0^{0}$ 的情况，由于数组恒正，因此指数取模前是大于 $0$ 的，故计算时应该取 $0^{0}=0$。

---

{% editor cpp vs-dark false 500px %}
#include <bits/stdc++.h>
using namespace std;

template <uint32_t L> struct Jabberwocky {
  bitset<L> not_prime;
  array<uint32_t, L> phi;

  vector<uint64_t> fenwick;

  Jabberwocky() {
    vector<uint32_t> primes;
    primes.reserve(L >> 1);
    not_prime[0] = not_prime[1] = true;
    for (uint32_t i = 2; i < L; ++i) {
      if (!not_prime[i])
        primes.push_back(i), phi[i] = i - 1;
      for (uint32_t j : primes) {
        if (i * j >= L)
          break;
        not_prime[i * j] = true;
        if (i % j == 0) {
          phi[i * j] = phi[i] * j;
          break;
        }
        phi[i * j] = phi[i] * (j - 1);
      }
    }
  }

  void resize(size_t n) { fenwick.resize(n + 1); }

  void suffer_add(size_t p, uint64_t x) {
    for (; p < fenwick.size(); p += p & -p)
      fenwick[p] += x;
  }

  void range_add(size_t l, size_t r, uint64_t x) {
    suffer_add(l, x), suffer_add(r + 1, -x);
  }

  uint64_t get_point(size_t p) const {
    uint64_t ret = 0;
    for (; p; p -= p & -p)
      ret += fenwick[p];
    return ret;
  }

  static void reduce(uint64_t &value, uint32_t mod, bool &mark) {
    if (value >= mod)
      value %= mod, mark = true;
  }

  static pair<uint64_t, bool> fast_pow(uint64_t base, uint64_t exp,
                                       uint32_t mod) {
    bool mark = false;
    uint64_t ret = 1;
    for (reduce(base, mod, mark); exp;
         exp >>= 1, base *= base, reduce(base, mod, mark))
      if (exp & 1)
        ret *= base, reduce(ret, mod, mark);
    return make_pair(ret, mark);
  }

  pair<uint64_t, bool> range_query(size_t l, size_t r, uint32_t p) const {
    if (p == 1)
      return make_pair(static_cast<uint64_t>(0), false);
    if (l == r)
      return make_pair(get_point(l), false);
    uint64_t base = get_point(l);
    if (base < 2)
      return make_pair(base, false);
    if (base % p < 2)
      return make_pair(base % p, true);
    auto [exp, mark] = range_query(l + 1, r, phi[p]);
    return fast_pow(base, mark ? exp + phi[p] : exp, p);
  }
};

static constexpr uint32_t L = 20000003;
static Jabberwocky<L> jabberwocky;

int main() {
  cin.tie(nullptr)->sync_with_stdio(false);
  size_t n, q;
  cin >> n >> q;
  jabberwocky.resize(n);
  for (size_t i = 1; i <= n; ++i) {
    uint64_t x;
    cin >> x;
    jabberwocky.range_add(i, i, x);
  }
  while (q--) {
    uint32_t op;
    cin >> op;
    switch (op) {
    case 1: {
      size_t l, r;
      uint64_t x;
      cin >> l >> r >> x;
      jabberwocky.range_add(l, r, x);
      break;
    }
    case 2: {
      size_t l, r;
      uint32_t p;
      cin >> l >> r >> p;
      cout << jabberwocky.range_query(l, r, p).first % p << endl;
      break;
    }
    }
  }
  return 0;
}
{% endeditor %}

[^1]: 括号内的条件满足则值为 1，不满足则值为 0。
[^2]: 奇数取欧拉函数后必定变为偶数；偶数取欧拉函数后至少减半，证毕。
