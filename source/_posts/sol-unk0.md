---
title: 神秘构造题 1
mathjax: true
date: 2025-08-22 14:59:53
categories:
  - OI
  - solution
tags:
  - Ad-hoc
  - construction
---

@[xixisuper](https://www.luogu.com.cn/user/580107) 给的神秘题。

> 构造长为 $n$ 的数列 $\left\\{a\_n\right\\}$ 满足 $a\_i\in\mathbb{N}^{+}$，且
>
> $$
> \sum\_{i=1}^{n} \operatorname{popcount}\left(a\_i\right) = \overset{n}{\underset{i=1}{\operatorname{lcm}}}~a\_i
> $$

<!-- more -->

---

考虑如下构造，令

$$
L=3\times 2^{m}
$$

命 $\left\\{a\_n\right\\}$ 中包含 $x$ 个 $L$ 和 $n-x$ 个 $1$。

即

$$
\begin{aligned}
  2x+\left(n-x\right) &= 3\times 2^{m} \\\\
  x+n &= 3\times 2^{m} \\\\
  x &= 3\times 2^{m} - n \\\\
\end{aligned}
$$

根据题意，有

$$
0\leqslant x=3\times 2^{m} - n\leqslant n
$$

即

$$
n\leqslant 3\times 2^{m}\leqslant 2n
$$

显然 $n\gt 1$ 时总可以选择合适的 $m$ 完成构造。

$n=1$ 时只能令数列唯一元素为 $1$。
