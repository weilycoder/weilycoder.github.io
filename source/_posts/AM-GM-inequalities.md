---
title: 均值不等式证明（AM-GM）
mathjax: true
date: 2025-09-10 22:45:53
updated: 2025-09-10 22:45:53
categories:
  - Math
tags:
  - Theorem
---

> 对于非负实数 $x\_{1},x\_{2},\cdots,x\_{n}$，存在不等式：
> 
> $$
> \sqrt[n]{\prod\_{i=1}^{n}x\_{i}}\leqslant \dfrac{1}{n}\sum\_{i=1}^{n}x\_{i}
> $$
>
> 当且仅当 $x\_i$ 均相等时取等。

<!-- more -->

## 0x00

考虑一个加强形式

> 对于非负实数 $x\_{1},x\_{2},\cdots,x\_{n}$，和正实数 $\alpha\_{1},\alpha\_{2},\cdots,\alpha\_{n}$，其中
>
> $$
> \sum\_{i=1}^{n}\alpha\_{i} = 1
> $$
>
> 存在不等式
>
> $$
> \prod\_{i=1}^{n}x\_{i}^{\alpha} \leqslant \sum\_{i=1}^{n}\alpha\_{i}x\_{i}
> $$
>
> 当且仅当 $x\_i$ 均相等时取等。

---

先证二元形式

$$
\tag{1} x^{1-\alpha}y^{\alpha}\leqslant \left(1-\alpha\right) x+\alpha y
$$

---

对于 $xy=0$ 和 $x=y$ 的情形，容易验证不等式成立，并且 $x=y$ 时不等式取等。

不考虑这两种情况，不妨假设 $0\lt x\lt y$。

令

$$
\begin{align\*}
  \tag{2} y &= x+t~\left(t\gt 0\right) \\\\
  \tag{3} \left(x+t\right)^{\alpha} &= x^{\alpha}+R
\end{align\*}
$$

我们证这时不等号取严格小于：

$$
\tag{4}
\begin{aligned}
  x^{1-\alpha}\left(x^{\alpha}+R\right) &\lt \left(1-\alpha\right)x+\alpha\left(x+t\right) \\\\
  x^{1-\alpha}R &\lt \alpha t \\\\
  R &\lt \alpha x^{\alpha-1} t
\end{aligned}
$$

代入式 $\mathrm{\left(3\right)}$，有

$$
\tag{5}
\begin{aligned}
  \left(x+t\right)^{\alpha} &\lt x^{\alpha}+\alpha x^{\alpha-1} t \\\\
  \dfrac{\left(x+t\right)^{\alpha}-x^{\alpha}}{t} &\lt \alpha x^{\alpha-1}
\end{aligned}
$$

---

设辅助函数 $F\left(x\right)=x^{\alpha}$，则 $\mathrm{\left(5\right)}$ 可以写为

$$
\tag{6} \dfrac{F\left(x+t\right)-F\left(x\right)}{t} \lt F^{\prime}\left(x\right)
$$

根据拉格朗日中值定理，存在 $t\_{0}\in\left(0,t\right)$，使得

$$
\tag{7} F^{\prime}\left(x+t\_{0}\right) = \dfrac{F\left(x+t\right)-F\left(x\right)}{t}
$$

代入 $\mathrm{\left(6\right)}$，有

$$
\tag{8} F^{\prime}\left(x+t\_{0}\right) \lt F^{\prime}\left(x\right)
$$

上述变形均为等价变形。

欲证明式 $\mathrm{\left(8\right)}$，只需 $F^{\prime}\left(x\right)$ 单调递减，而

$$
F^{\prime\prime}\left(x\right) = \alpha\left(\alpha-1\right)x^{\alpha-2} \lt 0
$$

证毕。

---

对原命题施数学归纳法。

对于 $n=1,2$，已经验证命题成立。

假设 $n=N$ 时，命题成立，即

$$
\prod\_{i=1}^{N}x\_{i}^{\alpha} \leqslant \sum\_{i=1}^{N}\alpha\_{i}x\_{i}
$$

当且仅当 $x\_{i}$ 全部相等时取等。

下证 $n=N+1$ 时命题亦成立。

---

令

$$
X\_{N}^{1-\alpha\_{N+1}} = \prod\_{i=1}^{N}x\_{i}^{\alpha\_{i}}
$$

则

$$
X\_{N} \leqslant \dfrac{1}{1-\alpha\_{N+1}}\sum\_{i=1}^{N}\alpha\_{i}x\_{i}
$$

因此

$$
\begin{aligned}
  \prod\_{i=1}^{N+1}x\_{i}^{\alpha\_{i}}
  &= X\_{N}^{1-\alpha\_{N+1}}\cdot x\_{N+1}^{\alpha\_{N+1}} \\\\
  &\leqslant \left(1-\alpha\_{N+1}\right)X\_{N}+\alpha\_{N+1}x\_{N+1} \\\\
  &\leqslant \sum\_{i=1}^{N+1}\alpha\_{i}x\_{i}
\end{aligned}
$$

当且仅当 $x\_i$ 全部相等时取等。

---

总之，原不等式成立，当且仅当 $x\_i$ 全部相等时取等。

取 $\alpha\_i$ 全部相等，即均值不等式。

## 0x01

仍考虑 $\mathtt{0x00}$ 中提到的加强形式的二元形式，不妨令 $xy\ne 0$ 且 $y\geqslant x$。

不等式两侧同时除以 $x$，有

$$
\left(\dfrac{y}{x}\right)^{\alpha}\leqslant \alpha\left(\dfrac{y}{x}\right)+1-\alpha
$$

由于 $\dfrac{y}{x}$ 可以是任何大于等于 $1$ 的实数，不妨将 $\dfrac{y}{x}$ 替换为 $1+x$（这里更换了符号含义），即

$$
\left(1+x\right)^{\alpha}\leqslant 1 + \alpha x
$$

上述变形均为等价变形。

---

考虑辅助函数 $f\left(x\right)=\left(1+x\right)^{\alpha}-\alpha x - 1$。

首先，有 $f\left(0\right)=0$。

考虑函数单调性，有

$$
\begin{aligned}
  f^{\prime}\left(x\right) 
  &= \alpha\left(1+x\right)^{\alpha-1}-\alpha \\\\
  &= \alpha\left[\left(1+x\right)^{\alpha-1}-1\right]
\end{aligned}
$$

由于 $1+x\geqslant 1$ 和 $\alpha-1\lt 0$，有 $f^{\prime}\left(x\right)\leqslant 0$，因此 $f\left(x\right)$ 在 $\left[0,1\right)$ 上单调递减。

综上，$f\left(x\right)\leqslant 0$，当且仅当 $x=0$ 时取等。

---

因此，$\left(1+x\right)^{\alpha}\leqslant 1 + \alpha x$ 成立，当且仅当 $x=0$ 时取等；即原不等式成立，当且仅当 $x=y$ 时取等。

不再重复数学归纳法。

## 0x02

方便起见，令

$$
\begin{aligned}
  \mathbf{A}\_{n} = \dfrac{1}{n}\sum\_{i=1}^{n}x\_i \\\\
  \mathbf{G}\_{n} = \sqrt[n]{\prod\_{i=1}^{n}x\_i}
\end{aligned}
$$

---

原命题即为

$$
A\_{n}\geqslant G\_{n}
$$

记其为 $P\_n$。

对于 $P\_1$ 和 $P\_2$，显然成立。

---

若 $P\_n$ 成立，则 $P\_{2n}$ 显然成立。

例如，对于 $x\_{1},x\_{2},\cdots,x\_{n},x\_{n+1},x\_{n+2},\cdots,x\_{2n}$，有

$$
\begin{aligned}
  \dfrac{x\_{1}+x\_{2}+\cdots+x\_{2n}}{2n}
  &= \dfrac{1}{2}\left(\dfrac{x\_{1}+x\_{2}+\cdots+x\_{n}}{n} + \dfrac{x\_{n+1}+x\_{n+2}+\cdots+x\_{2n}}{n}\right) \\\\
  &\leqslant \dfrac{1}{2}\left(\sqrt[n]{x\_{1}x\_{2}\cdots x\_{n}} + \sqrt[n]{x\_{n+1}x\_{n+2}\cdots x\_{2n}}\right) \\\\
  &\leqslant \sqrt{\sqrt[n]{x\_{1}x\_{2}\cdots x\_{n}}\cdot\sqrt[n]{x\_{n+1}x\_{n+2}\cdots x\_{2n}}} \\\\
  &\leqslant \sqrt[2n]{x\_{1}x\_{2}\cdots x\_{2n}} \\\\
\end{aligned}
$$

---

若 $P\_{n}$ 成立，则 $P\_{n-1}$ 显然成立。

因为 $P\_{n}$ 成立，有

$$
\begin{aligned}
  \mathbf{A}\_{n-1}
  &= \dfrac{x\_{1}+x\_{2}+\cdots+x\_{n-1}+\mathbf{A}\_{n-1}}{n} \\\\
  &\leqslant \sqrt[n]{x\_{1}x\_{2}\cdots x\_{n-1}\mathbf{A}\_{n-1}} \\\\
  &\leqslant \sqrt[n]{\mathbf{G}\_{n-1}^{n-1}\mathbf{A}\_{n-1}} \\\\
\end{aligned}
$$

即

$$
\mathbf{A}\_{n-1} \leqslant \mathbf{G}\_{n-1}
$$

---

根据以上两个陈述，可以得到：

1. 对于任意 $k$，$P\_{2^{k}}$ 成立；
2. 对于任意 $n$，若 $P\_{n}$ 成立，则对于任意 $m\lt n$，$P\_{m}$ 成立。

而对于任意 $m$，总可以找到 $k$，使得 $2^{k}\geqslant m$。

因此 $P\_{n}$ 对于任意 $n$ 成立。

## 0x03

令 $b\_{i}=\dfrac{x\_{i}}{\mathbf{G}\_{n}}$，则 $b\_{1}b\_{2}\cdots b\_{n}=1$。

作代换 $b\_{1}=\dfrac{c\_{1}}{c\_{2}},b\_{2}=\dfrac{c\_{2}}{c\_{3}},\cdots,b\_{n}=\dfrac{c\_{n}}{c\_{1}}$。

根据排序不等式，有

$$
\begin{aligned}
  b\_{1}+b\_{2}+\cdots+b\_{n}
  &= \dfrac{c\_{1}}{c\_{2}}+\dfrac{c\_{2}}{c\_{3}}+\cdots+\dfrac{c\_{n}}{c\_{1}} \\\\
  &\geqslant \dfrac{c\_{1}}{c\_{1}}+\dfrac{c\_{2}}{c\_{2}}+\cdots+\dfrac{c\_{n}}{c\_{n}} \\\\
  &= n
\end{aligned}
$$

移项得

$$
\mathbf{A}\_{n}\geqslant \mathbf{G}\_{n}
$$