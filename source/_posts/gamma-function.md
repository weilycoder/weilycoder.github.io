---
title: 第二类欧拉积分
mathjax: true
date: "2025-07-18T21:08:15.127+0800"
categories:
  - Math
tags:
  - integrate
  - Calculus
---

其定义为

$$
\begin{aligned}
\Gamma\left(a\right) 
&= \int\_{0}^{\infty}x^{a-1}\mathrm{e}^{-x}\mathrm{d}x \\\\
&= \int\_{0}^{\infty}x^{a-1}\mathrm{d}\left(-\mathrm{e}^{-x}\right) \\\\
&= \left.-x^{a-1}\mathrm{e}^{-x}\right|\_{0}^{\infty}+\int\_{0}^{\infty}\mathrm{e}^{-x}\mathrm{d}x^{a-1} \\\\
&= \left[a=1\right] + \int\_{0}^{\infty}\mathrm{e}^{-x}\dfrac{\mathrm{d}x^{a-1}}{\mathrm{d}x}\mathrm{d}x \\\\
&= \left[a=1\right] + \left(a-1\right)\cdot\int\_{0}^{\infty}x^{a-2}\mathrm{e}^{-x}\mathrm{d}x \\\\
&= \left[a=1\right] + \left(a-1\right)\cdot\Gamma\left(a-1\right) \\\\
\end{aligned}
$$

取 $a=1$，有 $\Gamma\left(1\right)=1$，则对于正整数 $n$ 有 $\Gamma\left(n\right)=\left(n-1\right)!$

因此 $n! = \Gamma\left(n+1\right)$ 是阶乘的一种解析延拓方式，此时阶乘的定义域为除负整数以外的全体复数。
