---
title: 组合数计算模板
code_fold: -1
date: 2025-08-08 10:28:52
categories:
  - OI
tags:
  - template-code
  - math(oi)
---

```cpp
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
```
