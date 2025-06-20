---
title: 快速求解 log2
mathjax: true
date: '2025-04-04T13:40:25.840+08:00'
updated: '2025-04-07T22:36:53.432+08:00'
categories:
  - OI
tags:
  - bits
---

## Algo 1

一个非常 naive 的方法是从小到大枚举 $2^k$，直到超过 $n$。

```cpp
inline size_t log2_algo1(uint64_t x) {
  size_t k = 1;
  while (k < 64 && (uint64_t)1 << k <= x)
    ++k;
  return k - 1;
}
```

这种做法的时间复杂度是 $\Theta(\log n)$ 的，非常不优。

## Algo 2

很多搞 OI 的朋友都知道预处理 `logn` 数组的方法；具体来讲，令 $\mathrm{logn}_n=\left\lfloor\log_2 n\right\rfloor$，显然有：

$$
\mathrm{logn}\_{n}=\mathrm{logn}\_{\frac{n}{2}}
$$

递推起点为 $\mathrm{logn}_1=0$。

这种做法的空间复杂度为 $\Theta(n)$，预处理时间复杂度 $\Theta(n)$，单次查询时间复杂度 $\Theta(1)$。

这里的递推式也可以使用递归的形式实现，这样单次查询的复杂度为 $\Theta(\log n)$，但是不需要预处理了。

尽管这种做法的单次查询复杂度很优，预处理的时间复杂度在某些场合也已经够用（如稀疏表），但受限于内存的寻址和读取，这种做法的常数略大。

## Algo 3

在 $n$ 不太大（不会超过 `double` 或 `long double`）范围时，可以考虑使用 `cmath` 库中的 `log2` 函数。

这种做法略慢于 $\mathtt{Algo 2}$，但应该快于 $\mathtt{Algo 1}$。

## Algo 4

考虑使用 GCC 内置函数 `__builtin_clz` / `__builtin_clzll`。

前者的参数类型为 `unsigned int`，后者的参数类型是 `unsigned long long`；其实也有 `__builtin_clzl`，但是现在 `int` 类型一般和 `long` 类型一样长了。

这些函数的作用是计算传入的参数的前导零个数，特别地，若参数为 $0$，则行为未定义。

以 `uint64_t` 为例：

```cpp
inline size_t log2_algo4(uint64_t x) { return 63 - __builtin_clzll(x); }
```

我不知道这种方法的内部实现，但它的速度快于 $\mathtt{Algo 2}$，那就可以认为是 $\Theta(1)$ 的。

## Algo 5

位运算的魔法。

假设一个极端的例子，若你现在要为 `uint128_t`（可以解释为 `unsigned __int128`）实现一个 `log2` 函数。

由于不存在适合这种类型的 `clz` 函数，你不能使用 $\mathtt{Algo 4}$；由于数字可能很大，为了精度，你不能使用 $\mathtt{Algo 3}$；同样的理由，为了空间，你不可能使用 $\mathtt{Algo 2}$。

那么，我们只有回归最 naive 的方法了吗？

事情还未坏到这种地步！

首先，我们令 $x=n-1$，然后考虑计算最小的大于 $x$ 的 $2^k$；我们只需返回 $k-1$。

如何计算最小的大于 $x$ 的 $2^k$ 呢？我们考虑将 $x$ 的低位“填满”，然后加一。

很容易想到：

```cpp
x |= x >> 1;
x |= x >> 2;
x |= x >> 4;
x |= x >> 8;
x |= x >> 16;
x |= x >> 32;
x |= x >> 64;
```

现在，我们得到了 $2^k$，可我们却不知道 $k$ 的值。

这里，我们考虑使用哈希表加速查询。特别的，对于 `uint128_t`，我们可以注意到：

$$
|\{2^k \bmod 131\mid k\in\mathbb{N},k\lt 128\}|=128
$$

实际上，这里的 $131$ 有原根 $2$[^1]。

因此，我们只需要将所有的 $2^k$ 填入哈希表，就可以快速查询 $2^k$ 所对的 $k$。

严格一点说，这种方法的复杂度是 $\Theta(\log n)$ 预处理，$\Theta(\log\log n)$ 查询的。

顺便，除以固定的数字可以优化为乘法。

*PS：如果 CPU 不存在指令快速计算 `clz` 函数的话，我怀疑它的实现方式就是 $\mathtt{Algo 5}$，因为我曾试过 `clz(0)`，它返回 `0`。*

## Algo 6

啊我当然直到二分的复杂度也是 $\Theta(\log\log n)$ 的，但是 $\mathrm{Algo 5}$ 的价值在于它是无需分支语句的，后者可能在部分非传统题中有用。

[^1]: 参见：[A001122](https://oeis.org/A001122)
