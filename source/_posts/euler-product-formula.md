---
title: 欧拉乘积公式
mathjax: true
date: 2024-10-09 22:47:34
categories:
  - Math
tags:
  - prime
  - Calculus
  - Theorem
---

考虑求和式：

$$
\epsilon\left(s\right)=\dfrac{1}{1^s}+\dfrac{1}{2^s}+\dfrac{1}{3^s}+\dfrac{1}{4^s}+\cdots
$$

等式两边同时乘 $\dfrac{1}{2^s}$，

$$
\dfrac{1}{2^s}\epsilon\left(s\right)=\dfrac{1}{2^s}+\dfrac{1}{4^s}+\dfrac{1}{6^s}+\dfrac{1}{8^s}+\cdots
$$

则

$$
\left(1-\dfrac{1}{2^s}\right)\epsilon\left(s\right)=1+\dfrac{1}{3^s}+\dfrac{1}{5^s}+\dfrac{1}{7^s}+\dfrac{1}{9^s}+\cdots
$$

等式两边同时乘 $\dfrac{1}{3^s}$，

$$
\dfrac{1}{3^s}\left(1-\dfrac{1}{2^s}\right)\epsilon\left(s\right)=\dfrac{1}{3^s}+\dfrac{1}{9^s}+\dfrac{1}{15^s}+\dfrac{1}{21^s}+\cdots
$$

则

$$
\left(1-\dfrac{1}{3^s}\right)\left(1-\dfrac{1}{2^s}\right)\epsilon\left(s\right)=1+\dfrac{1}{5^s}+\dfrac{1}{7^s}+\dfrac{1}{11^s}+\dfrac{1}{13^s}+\cdots
$$

仿照埃氏筛，每次在等式两边除以质数的 $s$ 次方，得

$$
\epsilon\left(s\right)=\prod\_{p}\left(1-\dfrac{1}{p^s}\right)^{-1}
$$

这里 $p$ 取全体质数。
