---
title: 质数判定和快速质因数分解
mathjax: true
date: "2025-08-12T00:57:26.007+0800"
categories:
  - OI
  - template
tags:
  - math(oi)
  - prime
  - number-theory
---

## 质数的定义

{% blockquote OI-wiki https://oi-wiki.org/math/number-theory/basic/ %}
通常，我们在正整数上定义质数与合数：

> 若正整数 $p\lt 2$ 除了 $1$ 和 $p$ 没有其他正约数，那么称 $p$ 为质数（或素数、不可约数）。
>
> 若正整数 $a\gt 2$ 且 $a$ 不是质数，则称 $a$ 是合数。
{% endblockquote %}

质数有一些有名的性质：

+ 对于合数 $a$，存在 $p\leqslant\sqrt{a}$ 满足 $p\mid a$；
+ 大于 $3$ 的质数总可以表示为 $6n\pm 1$ 的形式，这是显然的，其中一个易得而不显然的结论是大于 $3$ 的质数 $p$ 对 $12$ 取模的结果总是 $1$；
+ 质数有无穷多个。

## 质数个数

设 $\pi\left(x\right)$ 表示小于或等于 $x$ 的质数的数量，随着 $x$ 的增大，有 $\pi\left(x\right)\sim\dfrac{x}{\ln x}$。

## 素性判定

所谓素性判定算法，就是判断给定数字是否为质数的算法。

### 暴力枚举

根据性质一，只需要枚举到 $\sqrt{n}$ 以内的数即可。

```cpp
bool is_prime(uint64_t n) {
  for (uint64_t p = 2; p * p <= n; ++p)
    if (n % p == 0)
      return false;
  return true;
}
```

#### 优化 1

在对 $2$ 试除后，我们显然可以不再使用偶数试除。

```cpp
bool is_prime(uint64_t n) {
  if (n % 2 == 0)
    return n == 2;
  for (uint64_t p = 3; p * p <= n; p += 2)
    if (n % p == 0)
      return false;
  return true;
}
```

#### 优化 2

由于大于 $3$ 的质数只可能是 $6m\pm 1$ 的形式，因此可以进一步优化。

这个常数上优化应该不大，不给出实现了。

### 枚举质数

这个在复杂度上是有优化的，因此与暴力枚举分开。

可以将 $\sqrt{n}$ 以内的质数全部使用筛法预处理掉，根据前文结论，这个量级大概是 $\mathcal O\left(\dfrac{\sqrt{n}}{\ln n}\right)$ 的。

预处理质数后分解质因数的效率未必劣于 Pollard Rho 算法。

这种方法的一个神秘优化是在预处理质数的同时预处理其快速取模算法，不知道常数上的优化效果。

---

上述两种方法亦能分解质因数，假如出题人懒得造全质数的测试点，平均情况下的运行效率较高。

好像有定理指出，在区间 $[1,N]$ 随机选择的正整数 $X$ 的最大质因子期望渐进为 $\mathrm{e}^{-\gamma}\dfrac{n}{\ln n}$。

因此在期望意义下只会枚举到 $\mathcal O\left(\sqrt{\dfrac{n}{\ln n}}\right)$ 的因数。

实践上，对于少量 $10^{18}$ 以内的随机数，用这些方法分解质因数的效率是可以接受的。

## 筛法

上文中提到了筛法，但是没有给出实现。

```cpp
for (size_t g i = 2; i * i <= N; ++i)
  if (!vis[i])
    for (size_t j = i * i; j <= N; j += i)
      vis[j] = true;
```

这种方法的理论渐进复杂度为 $\mathcal O(n\log\log n)$ 的，但在 OI 常见数据范围内，通常效率比 $\mathcal O(n)$ 的欧拉筛来的快。

给出线性筛的常见写法：

```cpp
for (size_t i = 2; i <= N; ++i) {
  if (!vis[i])
    prime.push_back(i);
  for (size_t j : i) {
    if (i * j > N)
      break;
    vis[i * j] = true;
    if (i % j == 0)
      break;
  }
}
```
