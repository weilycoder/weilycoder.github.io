---
categories:
  - Math
title: 等差数列的 k 阶前缀和
date: 2025-04-30 20:06:47
mathjax: true
tags:
  - sequence
  - prefix-sum
  - finite-difference
  - OGF
---

本文下标从 $1$ 开始。

形式上，定义 $\\{a_n\\}$ 为其自身的 $0$ 阶前缀和，记为 $\left\\{a_n^{(0)}\right\\}$。

定义 $\\{a_n\\}$ 的 $k$ 阶前缀和 $\left\\{a_n^{(k)}\right\\}$ 为其 $k-1$ 阶前缀和 $\left\\{a_n^{(k-1)}\right\\}$ 的前缀和，即：

$$
\begin{aligned}
a_1^{(k)} &= a_1^{(k-1)}; \\\\
a_n^{(k)} &= a_{n-1}^{(k)}+a_n^{(k-1)}\quad(n>1).
\end{aligned}
$$

依此亦能定义数列的负数阶前缀和（也称差分），不作讨论。

以共差 $d=1$，首项 $a_1=1$ 的等差数列为例，显然有 $a_n=n$。

考虑其 $k$ 阶前缀和的通项公式。

首先，注意到：

+ $k=0$ 时，有 $a_n=n=\dbinom{n}{1}$；
+ $k=1$ 时，有 $a_n^{(1)}=\dfrac{n(n+1)}{2}=\dbinom{n+1}{2}$；

故猜测：

$$
a_n^{(k)}=\dbinom{n+k}{k+1}=\dbinom{n+k}{n-1}
$$

考虑数学归纳，已经验证，$k=0,1$ 时，结论正确，假定 $k=m$ 时结论正确，即

$$
a_n^{(m)}=\dbinom{n+m}{m+1}
$$

考虑证明：

$$
a_n^{(m+1)}=\dbinom{n+m+1}{m+2}
$$

只需证明：

$$
\sum_{i=1}^{n}\dbinom{m+i}{m+1}=\dbinom{n+m+1}{m+2}
$$

考虑组合意义，可以发现上式显然成立。

如果能注意到网格图中的路径计数问题，也可以快速推导出这个结论。

也可以考虑使用母函数证明。

考虑数列 $\\{I_n\\}$，通项为 $I_n=1$；显然其前缀和为 $\\{a_n\\}$；其母函数为：

$$
G_I(x)=1+x+x^2+x^3+\cdots=\dfrac{1}{1-x}
$$

注意到求数列的前缀和等价于与 $\\{I_n\\}$ 求卷积，因此若数列的母函数为 $G(x)$，其前缀和的母函数为 $G(x)G_I(x)$。

因此 $a_n^{(k)}$ 的母函数为

$$
G_I^{k+1}(x)=\dfrac{1}{(1-x)^{k+1}}=(1-x)^{-k-1}
$$

使用二项式定理展开：

$$
\begin{aligned}
G_I^{k+1}(x)
&=(1-x)^{-k-1}\\
&=\sum_{i=0}^{\infty}(-1)^i\dbinom{-k-1}{i}x^i\\
&=\sum_{i=0}^{\infty}\dbinom{k+1+i}{i}x^i\\
\end{aligned}
$$

因此：

$$
a_n^{(k)}=[x^{n-1}]G_I^{k+1}(x)=\dbinom{n+k}{n-1}
$$
