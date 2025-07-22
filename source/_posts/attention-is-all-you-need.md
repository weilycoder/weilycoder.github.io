---
title: Attention is all you need
mathjax: true
date: "2025-07-20T22:56:35.068+0800"
excerpt: "利用积分证明有关 e, pi 不等式的一般构造方法"
categories:
  - Math
tags:
  - integrate
  - Calculus
---

{% note 记号说明 open %}
+ 使用大写字母，如 $P,Q$ 等表示的函数，在没有特殊说明的情况下，系有理系数多项式函数；
+ 使用大写字母，如 $A,B$ 等表示的参数或变量，在没有特殊说明的情况下，系有理数；$C$ 出现在不定积分结果时除外；
+ 使用 $m,n$ 表示的参数或变量，在没有特殊说明的情况下，系正整数；
+ 使用 $p,q$ 表示的参数或变量，在没有特殊说明的情况下，系有理数；特别地，$\dfrac{p}{q}$ 没有特殊说明的情形为既约分数。
{% endnote %}

## Pi

众所周知：

$$
\dfrac{\mathrm{d}\left(\arctan x\right)}{\mathrm{d}x}=\dfrac{1}{1+x^2}
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

$$
\boxed{
  \int\_{0}^{1}\dfrac{x^{n}\left(1-x\right)^{m}\left(a+bx+cx^2\right)}{1+x^{2}}\mathrm{d}x = A+B\ln{2}+C\pi
}
$$

## E

考虑积分

$$
\begin{aligned}
  \int x^{n}\mathrm{e}^{x}\mathrm{d}x
  &= \int x^{n}\mathrm{d}\left(\mathrm{e}^{x}\right) \\\\
  &= x^{n}\mathrm{e}^{x} - \int \mathrm{e}^{x}\mathrm{d}\left(x^{n}\right) \\\\
  &= x^{n}\mathrm{e}^{x} - \int \mathrm{e}^{x}\cdot n\cdot x^{n-1}\mathrm{d}x \\\\
  &= x^{n}\mathrm{e}^{x} - n \cdot \int \mathrm{e}^{x}\cdot x^{n-1}\mathrm{d}x \\\\
  &= \cdots \\\\
  &= \mathrm{e}^{x}\sum\_{k=0}^{n}\left(-1\right)^{n-k}\dfrac{n!}{k!}x^{k}+C \\\\
  &= \mathrm{e}^{x}Q\_{n}\left(x\right)+C
\end{aligned}
$$

同理，有

$$
\int P\left(x\right)\mathrm{e}^{x}\mathrm{d}x=P^{\ast}\left(x\right)\mathrm{e}^{x}+C
$$

不难得到

$$
\boxed{
  \int\_{0}^{1}x^{n}\left(1-x\right)^{m}\left(a+bx\right)\mathrm{e}^{x}\mathrm{d}x=A+B\mathrm{e}
}
$$

利用 $n,m$ 控制精度，$a,b$ 控制参数。

## Pi^n

先对积分的几个部分分别作出证明。

### Part 1

$$
\begin{aligned}
  \int\_{0}^{1} x^{m}\left(\ln x\right)^{n}\mathrm{d}x
  &= \int\_{\infty}^{0}\left(\mathrm{e}^{-t}\right)^{m}\cdot\left(-t\right)^{n}\cdot\dfrac{\mathrm{d}x}{\mathrm{d}t}\cdot\mathrm{d}t \\\\
  &= \int\_{\infty}^{0}\left(\mathrm{e}^{-t}\right)^{m}\cdot\left(-t\right)^{n}\cdot\left(-\mathrm{e}^{t}\right)\cdot\mathrm{d}t \\\\
  &= \left(-1\right)^{n}\cdot\int\_{0}^{\infty}t^{n}\mathrm{e}^{-\left(m+1\right)t}\mathrm{d}t \\\\
  &= \left(-1\right)^{n}\cdot\int\_{0}^{\infty}\left(\dfrac{u}{m+1}\right)^{n}\cdot\mathrm{e}^{-u}\cdot\dfrac{\mathrm{d}t}{\mathrm{d}u}\cdot\mathrm{d}u \\\\
  &= \dfrac{\left(-1\right)^{n}}{\left(m+1\right)^{n+1}}\cdot\int\_{0}^{\infty}u^{n}\cdot\mathrm{e}^{-u}\cdot\mathrm{d}u \\\\
  &= \dfrac{\left(-1\right)^{n}}{\left(m+1\right)^{n+1}}\cdot\Gamma\left(n+1\right) \\\\
  &= \dfrac{\left(-1\right)^{n}\cdot n!}{\left(m+1\right)^{n+1}}
\end{aligned}
$$

有关 $\Gamma$ 函数的结论见{% post_link gamma-function '欧拉第二积分' %}。

### Part 2

$$
\begin{aligned}
  \int\_{0}^{1}\dfrac{x\left(\ln x\right)^{n}}{1+x^2}\mathrm{d}x
  &= \int\_{0}^{1}x\left(\ln x\right)^{n}\left(\sum\_{k=0}^{\infty}\left(-1\right)^{k}x^{2k}\right)\mathrm{d}x \\\\
  &= \sum\_{k=0}^{\infty}\left(-1\right)^{k}\cdot\int\_{0}^{1}x^{2k+1}\left(\ln{x}\right)^{n}\mathrm{d}x \\\\
  &= \sum\_{k=0}^{\infty}\left(-1\right)^{k}\cdot\dfrac{\left(-1\right)^{n}\cdot n!}{\left(2k+2\right)^{n+1}} \\\\
  &= \dfrac{\left(-1\right)^{n}\cdot n!}{2^{n+1}}\cdot\sum\_{k=1}^{\infty}\dfrac{\left(-1\right)^{k-1}}{k^{n+1}} \\\\
  &= \dfrac{\left(-1\right)^{n}\cdot n!}{2^{n+1}}\cdot\eta\left(n+1\right)
\end{aligned}
$$

$2k$ 为正偶数时，有

$$
\zeta\left(2k\right)=-\dfrac{B\_{2k}\cdot\left(2\pi i\right)^{2k}}{2\cdot\left(2k\right)!}
$$

因此

$$
\eta\left(2k\right)=\left(1-2^{1-2k}\right)\zeta\left(2k\right)=\dfrac{\left(-1\right)^{k+1}B\_{2k}\left(2^{2k-1}-1\right)}{\left(2k\right)!}\pi^{2k}
$$

*式中 $\eta$ 表示 [Dirichlet eta 函数](https://mathworld.wolfram.com/DirichletEtaFunction.html)，$\zeta$ 表示 [Riemann zeta 函数](https://mathworld.wolfram.com/RiemannZetaFunction.html)，$B\_n$ 表示 [伯努利数](https://mathworld.wolfram.com/BernoulliNumber.html)。*

故积分式中 $n$ 为奇数时，积分有较好的结果，且积分结果包含 $\pi^{n+1}$。

上述结果可以参考{% post_link zeta-2k %}。

### Part 3

$$
\begin{aligned}
  \int\_{0}^{1}\dfrac{\left(\ln x\right)^{n}}{1+x^2}\mathrm{d}x
  &= \int\_{0}^{1}\left(\ln x\right)^{n}\left(\sum\_{k=0}^{\infty}\left(-1\right)^{k}x^{2k}\right)\mathrm{d}x \\\\
  &= \sum\_{k=0}^{\infty}\left(-1\right)^{k}\cdot\int\_{0}^{1}x^{2k}\left(\ln x\right)^{n}\mathrm{d}x \\\\
  &= \sum\_{k=0}^{\infty}\left(-1\right)^{k}\cdot\dfrac{\left(-1\right)^{n}\cdot n!}{\left(2k+1\right)^{n+1}} \\\\
  &= \left(-1\right)^{n}\cdot n!\cdot\sum\_{k=0}^{\infty}\dfrac{\left(-1\right)^{k}}{\left(2k+1\right)^{n+1}} \\\\
  &= \left(-1\right)^{n}\cdot n!\cdot\beta\left(n+1\right)
\end{aligned}
$$

若 $n$ 为偶数，记 $n=2k$，则有

$$
\beta\left(2k+1\right)=\dfrac{\left(-1\right)^{k}E\_{2k}\pi^{2k+1}}{4^{k+1}\left(2k\right)!}
$$

*式中 $\beta$ 表示 [Dirichlet beta 函数](https://mathworld.wolfram.com/DirichletBetaFunction.html)，$E\_n$ 表示 [欧拉数](https://mathworld.wolfram.com/EulerNumber.html)。*

此时积分结果较简洁。

### 构造

综合上述 $3$ 个积分，我们考虑如下函数的积分：

$$
F\left(x\right)=\dfrac{x^{m}\left(a+bx^{2}\right)\left(\ln \dfrac{1}{x}\right)^{n-1}}{1+x^2}
$$

*式中使用 $\ln \dfrac{1}{x}$ 而非 $\ln x$ 是为了方便讨论正负号，这时只需确保 $a+bx^{2}$ 在 $[0,1]$ 恒非负。*

若 $n$ 为奇数，我们令 $m$ 为偶数，则 $F\left(x\right)$ 做完大除法后形式必然为

$$
F\left(x\right)=P\left(x\right)\left(\ln x\right)^{n-1}+\dfrac{k\left(\ln x\right)^{n-1}}{1+x^2}
$$

分别应用 $\text{Part 1}$ 和 $\text{Part 3}$ 的结论即可。

否则，$n$ 为偶数，则令 $m$ 为奇数，$F\left(x\right)$ 做大除法后的形式为

$$
F\left(x\right)=P\left(x\right)\left(\ln x\right)^{n-1}+\dfrac{kx\left(\ln x\right)^{n-1}}{1+x^2}
$$

可以分别应用 $\text{Part 1}$ 和 $\text{Part 2}$ 的结论。

总之，我们有

$$
\boxed{
  \begin{aligned}
    \int\_{0}^{1}\dfrac{x^{m}\left(a+bx^{2}\right)\left(\ln x^{-1}\right)^{n-1}}{1+x^2}\mathrm{d}x=A+B\pi^{n} \\\\
    \left(2\not\mid m+n\right)
  \end{aligned}
}
$$

其中

$$
\boxed{
  \begin{aligned}
    \int\_{0}^{1} x^{m}\left(\ln x^{-1}\right)^{n-1}\mathrm{d}x &= \dfrac{\left(n-1\right)!}{\left(m+1\right)^{n}} \\\\
    \int\_{0}^{1} \dfrac{x\cdot\left(\ln x^{-1}\right)^{n-1}}{1+x^{2}}\mathrm{d}x &= \dfrac{\left(2^{n-1}-1\right)\left(n-1\right)!}{2^{2n-1}}\cdot\zeta\left(n\right) \\\\
    \int\_{0}^{1} \dfrac{\left(\ln x\right)^{n-1}}{1+x^{2}}\mathrm{d}x &= \left(n-1\right)!\cdot\beta\left(n\right)
  \end{aligned}
}
$$

{% warning sympy open %}
可能由于这部分涉及的函数的不定积分并没有简单的封闭形式，`sympy` 不能处理这些函数的定积分，尽管后者有简洁的形式。

不过 `sympy` 仍然可以辅助计算，例如，`sympy.zeta` 和 `sympy.dirichlet_eta` 可以计算 $\zeta$ 函数和 $\eta$ 函数。

另外，$E\_n$ 和 $B\_n$ 可以使用 `sympy.euler` 和 `sympy.bernoulli` 计算。
{% endwarning %}

## E^q

考虑积分

$$
\begin{aligned}
  \int x^{n}\mathrm{e}^{qx}\mathrm{d}x
  &= \int x^{n}\mathrm{d}\left(\dfrac{\mathrm{e}^{qx}}{q}\right) \\\\
  &= \dfrac{x^{n}\mathrm{e}^{qx}}{q}-\int\dfrac{\mathrm{e}^{qx}}{q}\mathrm{d}\left(x^{n}\right) \\\\
  &= \dfrac{x^{n}\mathrm{e}^{qx}}{q}-\dfrac{n}{q}\cdot\int x^{n-1}\mathrm{e}^{qx}\mathrm{d}x \\\\
  &= \cdots \\\\
  &= \dfrac{\mathrm{e}^{qx}}{q^{n+1}}\sum\_{k=0}^{n}\left(-1\right)^{n-k}\dfrac{n!}{k!}\left(qx\right)^{k} + C \\\\
  &= \mathrm{e}^{qx} Q\_{q,n}\left(x\right) + C
\end{aligned}
$$

因此有

$$
\boxed{
  \int\_{0}^{1}x^{n}\left(1-x\right)^{m}\left(a+bx\right)\mathrm{e}^{qx}\mathrm{d}x = A + B\mathrm{e}^{q}
}
$$

## E^Pi

由于需要使函数的非负性显然，我们考虑 $[0,\pi]$ 上的积分。

因此有

$$
\boxed{
  \int\_{0}^{\pi}\sin^{n}\left(x\right)\left(1-\sin\left(x\right)\right)^{m}\left(a+b\sin\left(x\right)\right)\mathrm{e}^{x}\mathrm{d}x = A+B\mathrm{e}^{\pi}
}
$$

## E^(q*Pi)

类似地

$$
\boxed{
  \int\_{0}^{\pi}\sin^{n}\left(x\right)\left(1-\sin\left(x\right)\right)^{m}\left(a+b\sin\left(x\right)\right)\mathrm{e}^{qx}\mathrm{d}x = A+B\mathrm{e}^{q\pi}
}
$$
