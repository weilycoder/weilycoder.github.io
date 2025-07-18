---
title: 一类一阶递推数列的通项公式求法
mathjax: true
date: 2025-06-20 15:28:04
categories:
  - Math
tags:
  - sequence
  - general-term
---

本文讨论形如下式的递推数列通项，这里限定 $p\ne 0\land p\ne 1$。

$$
a\_{n+1}=pa\_{n}+f\left(n\right)
$$

## 通法

考虑在递推式两侧同时乘 $\dfrac{1}{p^{n}}$，于是递推式变为

$$
\dfrac{a\_{n+1}}{p^{n}}=\dfrac{a\_{n}}{p^{n-1}}+\dfrac{f\left(n\right)}{p^{n}}
$$

显然有

$$
\dfrac{a\_{n+1}}{p^{n}}-a\_1=\sum\_{i=1}^{n}\dfrac{f\left(i\right)}{p^{i}}
$$

因此问题转化为 $\left\\{\dfrac{f\left(n\right)}{p^{n}}\right\\}$ 的前 $n$ 项和。

$$
a\_{n+1}=\left(a\_1+\sum\_{i=1}^{n}\dfrac{f\left(i\right)}{p^{i}}\right)\cdot p^{n}
$$

## 特解

### f(n) = q

#### 方法 1

可以直接应用等比数列求和公式。

#### 方法 2

参见 {% post_link frac-recursion '一类分式递推数列的通项公式求法' %}。

#### 方法 3

差分

$$
\begin{aligned}
  a\_{n+2} &= pa\_{n+1}+q \\\\
  a\_{n+1} &= pa\_{n}+q \\\\
  a\_{n+2}-a\_{n+1} &= p\left(a\_{n+1}-a\_{n}\right)
\end{aligned}
$$

作换元 $b\_{n}=a\_{n+1}-a\_{n}$

$$
b\_{n}=pb{n}
$$

因此 $\left\\{b\_n\right\\}$ 为等比数列。

再求和

$$
a\_{n+1}=a\_{1}+\sum\_{i=1}^{n}b\_{i}
$$

### f(n) = q^n

此时有

$$
\dfrac{f\left(n\right)}{p^{n}}=\left(\dfrac{p}{q}\right)^{n}
$$

只需要应用等比数列求和公式即可。

### f(n) = qn

#### 方法 1

此时

$$
\dfrac{f\left(n\right)}{p^{n}}=\dfrac{qn}{p^{n}}
$$

这是一个“等差数列乘等比数列”的求和，可以参见 {% post_link finite-calculus '有限微积分' %}。

#### 方法 2

此时数列递推式为

$$
a\_{n+1}=pa\_{n}+qn
$$

考虑待定系数

$$
\begin{aligned}
a\_{n+1}-A\left(n+1\right)-B = C\left(a\_{n}-An-B\right) \\\\
a\_{n+1} = Ca\_{n}+\left(A-AC\right)n+\left(A+B-BC\right)
\end{aligned}
$$

对比系数得

$$
\begin{cases}
  C &= p \\\\
  A-AC &= q \\\\
  A+B-BC &= 0
\end{cases}
$$

则 $\left\\{a\_{n}-An-B\right\\}$ 为等比数列，公比为 $C=p$。

#### 方法 3

差分

$$
\begin{aligned}
  a\_{n+2} &= pa\_{n+1}+qn+q \\\\
  a\_{n+1} &= pa\_{n}+qn \\\\
  a\_{n+2}-a\_{n+1} &= p\left(a\_{n+1}-a\_{n}\right)+q
\end{aligned}
$$

作换元 $b\_{n}=a\_{n+1}-a\_{n}$

$$
b\_{n+1}=pb\_{n}+q
$$

因此 $\left\\{b\_{n}\right\\}$ 符合 $f(n)=q$ 的形式，可以考虑再作差分。

可以观察到，对于 $f(n)$ 为多项式函数时，可以多次差分将数列化为等比形式再反复求和。

### f(n) = sn^2+tn

#### 方法 1

转化为 $\dfrac{f\left(n\right)}{p^{n}}$ 的求和。利用 {% post_link finite-calculus '有限微积分' %} 求解。

#### 方法 2

继续待定系数法，假设原递推式可以化为

$$
a\_{n+1}-A\left(n+1\right)^2-B\left(n+1\right)-C=D\left(a\_{n}-An^2-Bn-C\right)
$$

对比系数解出 $A,B,C,D$，$\left\\{a\_{n}-An^2-Bn-C\right\\}$ 为等比数列。

#### 方法 3

作 $3$ 次差分再作 $3$ 次求和。
