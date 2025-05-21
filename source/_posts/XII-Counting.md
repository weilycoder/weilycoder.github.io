---
categories:
  - OI
title: 十二重计数法
date: "2025-05-21T17:46:16.843+0800"
updated: "2025-05-22T00:37:03.624+0800"
mathjax: true
tags:
  - solution
  - math
  - combinatorics
  - OGF
  - luogu
---

[题目链接](https://www.luogu.com.cn/problem/P5824)

> 将 $n$ 个球放进 $m$ 个盒子，求方案数（不计放球的先后顺序）。
>
> $\text{I}$：球之间互不相同，盒子之间互不相同。    
> $\text{II}$：球之间互不相同，盒子之间互不相同，每个盒子至多装一个球。   
> $\text{III}$：球之间互不相同，盒子之间互不相同，每个盒子至少装一个球。  
>
> $\text{IV}$：球之间互不相同，盒子全部相同。        
> $\text{V}$：球之间互不相同，盒子全部相同，每个盒子至多装一个球。   
> $\text{VI}$：球之间互不相同，盒子全部相同，每个盒子至少装一个球。
>
> $\text{VII}$：球全部相同，盒子之间互不相同。  
> $\text{VIII}$：球全部相同，盒子之间互不相同，每个盒子至多装一个球。  
> $\text{IX}$：球全部相同，盒子之间互不相同，每个盒子至少装一个球。   
>
> $\text{X}$：球全部相同，盒子全部相同。   
> $\text{XI}$：球全部相同，盒子全部相同，每个盒子至多装一个球。  
> $\text{XII}$：球全部相同，盒子全部相同，每个盒子至少装一个球。
>
> 答案对 $998244353$ 取模。

## I

显然答案为 $m^n$。

## II

显然答案为 $m^{\underline n}$。

## III

显然答案为 $m!\begin{Bmatrix}n \\\\ m\end{Bmatrix}$。

这里 $\begin{Bmatrix}n \\\\ m\end{Bmatrix}$ 为第二类斯特林数，表示将 $n$ 个元素划分为 $m$ 个互不区分的集合的方案数。

考虑计算第二类斯特林数，首先根据组合意义：

$$
m^n=\sum_{k=0}^{m}\binom{m}{k}\begin{Bmatrix}n \\\\ k\end{Bmatrix}k!
$$

做二项式反演：

$$
\begin{aligned}
  m!\begin{Bmatrix}n \\\\ m\end{Bmatrix} &= \sum_{k=0}^{m}(-1)^{m-k}\binom{m}{k}k^n \\\\
  \begin{Bmatrix}n \\\\ m\end{Bmatrix} &= \frac{1}{m!}\sum_{k=0}^{m}(-1)^{m-k}\binom{m}{k}k^n \\\\
  &= \sum_{k=0}^{m}\frac{(-1)^{m-k}}{(m-k)!}\cdot \frac{k^n}{k!}
\end{aligned}
$$

顺便，这个玩意有 $n^2$ 的递推：

$$
\begin{aligned}
  \begin{Bmatrix}n \\\\ m\end{Bmatrix} &=
  \begin{cases}
    [n=0], & m=0 \\\\
    \begin{Bmatrix}n-1 \\\\ m-1\end{Bmatrix}+m\begin{Bmatrix}n-1 \\\\ m\end{Bmatrix}, & m \ne 0
  \end{cases}
\end{aligned}
$$

## IV

显然答案为 $\begin{aligned}\sum_{k=0}^{m}\begin{Bmatrix}n \\\\ k\end{Bmatrix}\end{aligned}$。

因此根据 $\text{III}$ 中得到的式子做卷积即可。

## V

显然答案为 $[n\leqslant m]$。

## VI

显然答案为 $\begin{Bmatrix}n \\\\ m\end{Bmatrix}$。

## VII

插板法，显然答案为 $\dbinom{n+m-1}{m-1}=\dbinom{n+m-1}{n}$。

## VIII

显然答案为 $\dbinom{m}{n}$。

## IX

继续插板，答案为 $\dbinom{n-1}{m-1}$。

## X

设 $p(n,m)$ 表示将 $n$ 写成不增的 $m$ 个非负整数和的方案数，则 $p(n,m)$ 即为所求。

显然有

$$
p(n,m)=p(n-m,m)+p(n,m-1)
$$

令 $n$ 为主元，考虑 $p(n,m)$ 的生成函数

$$
F_m(x)=\sum_{i=0}^{\infty}p(i,m)x^i
$$

由递推式，有

$$
\begin{aligned}
F_m(x) &= F_{m-1}(x)\cdot \left(\sum_{i=0}^{\infty}x^{im}\right) \\\\
&= \frac{F_{m-1}(x)}{1-x^{m}}
\end{aligned}
$$

因此

$$
F_m(x)=\prod_{k=1}^{m}\frac{1}{1-x^k}
$$

考虑求其多项式 $\ln$，将乘法转化为加法，然后再 $\exp$ 回去。

令

$$
G_k(x)=\ln\left(\frac{1}{1-x^k}\right)
$$

考虑将其写为形式幂级数的形式。

$$
\begin{aligned}
  G_k(x) &= -\ln\left(1-x^k\right) \\\\
  G_k^\prime(x) &= kx^{k-1}\cdot \frac{1}{1-x^k} \\\\
  &= kx^{k-1}\cdot \sum_{i=0}^{\infty}x^{ik} \\\\
  &= \sum_{i=1}^{\infty}kx^{ik-1} \\\\
  G_k(x) &= \sum_{i=1}^{\infty}\frac{x^{ik}}{i}
\end{aligned}
$$

因此

$$
F_m(x)=\exp\left(\sum_{k=1}^{m}\sum_{i=1}^{\infty}\frac{x^{ik}}{i}\right)
$$

## XI

显然答案为 $[n\leqslant m]$。

## XII

显然答案为 $p(n-m,m)$。
