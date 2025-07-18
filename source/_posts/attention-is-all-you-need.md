---
title: Attention is all you need
mathjax: true
date: 2025-07-17 21:14:03
excerpt: "利用积分证明有关 e, pi 不等式的一般构造方法"
categories:
  - Math
tags:
  - integrate
---

{% note 记号说明 open %}
+ 使用大写字母，如 $P,Q$ 等表示的函数，在没有特殊说明的情况下，系有理系数多项式函数；
+ 使用大写字母，如 $A,B$ 等表示的参数或变量，在没有特殊说明的情况下，系有理数；$C$ 出现在不定积分结果时除外；
+ 使用 $m,n$ 表示的参数或变量，在没有特殊说明的情况下，系正整数。
{% endnote %}

## Pi

众所周知：

$$
\dfrac{\mathrm{d}\arctan x}{\mathrm{d}x}=\dfrac{1}{1+x^2}
$$

因此

$$
\int\_{0}^{1}\dfrac{1}{1+x^2}\mathrm{d}x=\dfrac{\pi}{4}
$$

而 $\dfrac{x}{1+x^2}$ 的积分可以利用换元得到，这里令 $u=1+x^2$。

$$
\begin{aligned}
  \int\_{0}^{1}\dfrac{x}{1+x^2}\mathrm{d}x
  &= \int\_{1}^{2}\dfrac{x}{u}\cdot\dfrac{\mathrm{d}u}{2x} \\\\
  &= \dfrac{1}{2}\int\_{1}^{2}\dfrac{1}{u}\mathrm{d}u \\\\
  &= \dfrac{\ln{2}}{2}
\end{aligned}
$$

因此，$\dfrac{P\left(x\right)}{1+x^2}$ 在 $[0,1]$ 上的积分结果是 $1,\ln{2},\pi$ 的线性组合，即

$$
\int\_{0}^{1}\dfrac{P\left(x\right)}{1+x^2}\mathrm{d}x=A+B\ln{2}+C\pi
$$

如果我们可以构造 $P\left(x\right)$ 使得其在 $[0,1]$ 恒非负，即可证明（一般不能取等）：

$$
A+B\ln{2}+C\pi\geqslant 0
$$

一般来说，要求证明的不等式是比较紧的，因此积分结果不能太大，为了实现这一点，通常使用 $x^{n}\left(1-x\right)^{m}$ 作为 $P\left(x\right)$ 的因式。

又因为积分结果中有 $3$ 个参数需要控制，可以取

$$
P\left(x\right)=x^{n}\left(1-x\right)^{m}\left(a+bx+cx^2\right)
$$

这样，我们可以从小到大遍历 $n,m$，并通过控制 $a,b,c$ 的取值调整结果中 $A,B,C$ 的取值，后者可以通过解一个 $3$ 元线性方程组来实现。

假如解得 $a,b,c$ 满足函数 $a+bx+cx^2$ 在 $[0,1]$ 上恒非负，则积分构造成功。

## E

考虑积分

$$
\begin{aligned}
  \int x^{n}\mathrm{e}^{x}\mathrm{d}x
  &= \int x^{n}\mathrm{d}\mathrm{e}^{x} \\\\
  &= x^{n}\mathrm{e}^{x} - \int \mathrm{e}^{x}\mathrm{d}x^{n} \\\\
  &= x^{n}\mathrm{e}^{x} - \int \mathrm{e}^{x}\cdot n\cdot x^{n-1}\mathrm{d}x \\\\
  &= x^{n}\mathrm{e}^{x} - n \cdot \int \mathrm{e}^{x}\cdot x^{n-1}\mathrm{d}x \\\\
  &= \cdots \\\\
  &= \mathrm{e}^{x}\sum\_{k=0}^{n}\left(-1\right)^{n-k}\dfrac{n!}{k!}x^{k}+C \\\\
  &= \mathrm{e}^{x}I\_{n}\left(x\right)+C
\end{aligned}
$$

同理，有

$$
\int P\left(x\right)\mathrm{e}^{x}\mathrm{d}x=P^{\ast}\left(x\right)\mathrm{e}^{x}+C
$$

不难得到

$$
\int\_{0}^{1}x^{n}\left(1-x\right)^{m}\left(a+bx\right)\mathrm{e}^{x}\mathrm{d}x=A+B\mathrm{e}
$$

利用 $n,m$ 控制精度，$a,b$ 控制参数。
