---
title: 有限微积分
mathjax: true
date: "2025-05-26T23:39:30.671+0800"
categories:
  - Math
tags:
  - prefix-sum
  - finite-difference
---

本质上是对裂项求和的系统化和机械化。

## 引入：裂项求和

对于数列 $\left\\{a\_n\right\\}$，我们希望求它的前 $n$ 项和数列 $\left\\{s\_n\right\\}$。

其中一个方法是将 $\left\\{a\_n\right\\}$ 的生成函数乘上 $\dfrac{1}{1-x}$，但是这个方法有时较为笨重。

考虑一个小学奥数做法，假如我们可以求出数列 $\left\\{b\_n\right\\}$ 使得 $b\_{n+1}-b\_{n}=a\_i$，那么我们的求和变为：

$$
\begin{aligned}
\sum\_{i=1}^{n}a\_i
&=\sum\_{i=1}^{n}\left(b\_{i+1}-b\_i\right) \\\\
&=\sum\_{i=2}^{n+1}b\_i-\sum\_{i=1}^{n}b\_i \\\\
&=b\_{n+1}-b\_1
\end{aligned}
$$

这种做法被称为裂项求和（裂项相消法）。

换句话说，我们其实是直接“注意”到了 $\left\\{a\_n\right\\}$ 的前缀和数列 $\left\\{b\_n\right\\}$。

例如，对 $\dfrac{1}{i\left(i+1\right)}$ 求和，我们将其转化为 $\dfrac{1}{i}-\dfrac{1}{i+1}$，立即得到和为 $\dfrac{n}{n+1}$。

由于前缀和与差分的关系类似微积分基本定理，我们考虑将微积分的内容类比到数列差分上。

## 定义

### 位移算子

$$
\operatorname{E}f\left(x\right)=f\left(x+1\right)
$$

类似地，$\operatorname{E}^kf\left(x\right)$ 就是 $k$ 阶位移

$$
\operatorname{E}^kf\left(x\right)=f\left(x+k\right)
$$

### 差分算子

$$
\operatorname{\Delta}f\left(x\right)=f\left(x+1\right)-f\left(x\right)
$$

类似地，$\operatorname{\Delta}^kf\left(x\right)$ 为 $k$ 阶差分

$$
\operatorname{\Delta}^kf\left(x\right)=\operatorname{\Delta}^{k-1}\left(\operatorname{\Delta}f\left(x\right)\right)
$$

另外，显然有 $\operatorname{\Delta}=\operatorname{E}-1$。

### 求和算子

求和算子是隐式定义的：

$$
\operatorname{\sum} f\left(x\right)\operatorname{\delta} x=g\left(x\right)\Leftrightarrow \operatorname{\Delta}g\left(x\right)=f\left(x\right)
$$

因此，求和算子与差分算子互为逆运算，即 $\begin{aligned}\operatorname{\Delta}^{-1}=\operatorname{\sum}\end{aligned}$。

### 定和式

有限微积分的定求和是左闭右开的：

$$
\operatorname{\sum}\_a^b=\sum\_{x=a}^{b}
$$

这是为了满足

$$
\operatorname{\sum}\_a^c+\operatorname{\sum}\_c^b=\operatorname{\sum}\_a^b
$$

以及

$$
\operatorname{\sum}\_a^a=0
$$
同时指出，这里定和式的形式不要求 $a\lt b$。

## 差分的运算法则

### 加法法则

$$
\operatorname{\Delta}\left(u+v\right)=\operatorname{\Delta}u+\operatorname{\Delta}v
$$

直接套用定义即可证明。

### 减法法则

本质与加法法则相同：

$$
\operatorname{\Delta}\left(u-v\right)=\operatorname{\Delta}u-\operatorname{\Delta}v
$$

### 数乘法则

$$
\operatorname{\Delta}\left(Cu\right)=C\operatorname{\Delta}u
$$

这里 $C$ 为与 $x$ 无关的常数。

仍然直接套用定义即可。

### 乘法法则

$$
\operatorname{\Delta}\left(uv\right)=u\operatorname{\Delta}v+\operatorname{E}v\operatorname{\Delta}u
$$

这里可以通过插入中间项 $-u\operatorname{E}v+u\operatorname{E}v$ 证明。

## 定和式的运算法则

重新强调一次定义：

$$
\operatorname{\sum}\_a^b f\left(x\right)\operatorname{\delta}x=\sum\_{k=a}^{b-1}f\left(k\right)
$$

由裂项求和法，有

$$
\operatorname{\sum}\_a^b\operatorname{\Delta}f\left(x\right)\operatorname{\delta}x=f\left(b\right)-f\left(a\right)
$$

套用定义，易证明以下性质：

$$
\begin{align\*}
\tag{1} \operatorname{\sum}\_a^a &= 0 \\\\
\tag{2} \operatorname{\sum}\_a^b f\left(x\right)\operatorname{\delta}x &=-\operatorname{\sum}\_b^af\left(x\right)\operatorname{\delta}x \\\\
\tag{3} \operatorname{\sum}\_a^bf\left(x\right)\operatorname{\delta}x+\operatorname{\sum}\_b^cf\left(x\right)\operatorname{\delta}x &=\operatorname{\sum}\_a^cf\left(x\right)\operatorname{\delta}x \\\\
\tag{4} \operatorname{\sum}\_a^bf\left(x\right)\operatorname{\delta}x\pm\operatorname{\sum}\_a^bg\left(x\right)\operatorname{\delta}x &= \operatorname{\sum}\_a^b\left(f\left(x\right)\pm g\left(x\right)\right)\operatorname{\delta}x \\\\
\tag{5} \operatorname{\sum}\_a^bCf\left(x\right)\operatorname{\delta}x &= C\operatorname{\sum}\_a^bf\left(x\right)\operatorname{\delta}x
\end{align\*}
$$

## 分部求和

对乘法法则变形：

$$
\begin{aligned}
  \operatorname{\Delta}\left(uv\right) &= u\operatorname{\Delta}v+\operatorname{E}v\operatorname{\Delta}u \\\\
  u\operatorname{\Delta}v &= \operatorname{\Delta}\left(uv\right)-\operatorname{E}v\operatorname{\Delta}u \\\\
  \operatorname{\sum}u\operatorname{\Delta}v &= uv-\operatorname{\sum}\operatorname{E}v\operatorname{\Delta}u
\end{aligned}
$$

## 常见数列的差分

### 常数列

$$
\operatorname{\Delta}c=0
$$

### 一次/等差数列

$$
\begin{align\*}
\operatorname{\Delta} x &= 1 \\\\
\operatorname{\Delta} \left(kx\right) &= k
\end{align\*}
$$

### 指数函数

$$
\begin{align\*}
\operatorname{\Delta} 2^x &= 2^x \\\\
\operatorname{\Delta} a^x &= \left(a-1\right)^x \\\\
\end{align\*}
$$

### 下降幂

定义下降幂：

$$
x^{\underline{n}}=
\begin{cases}
1, & n=0 \\\\
\begin{aligned}\prod\_{i=1}^n\left(x-i+1\right)\end{aligned}, & n\in\mathbf{Z\_+} \\\\
\begin{aligned}\prod\_{i=1}^{-n}\dfrac{1}{x+i}=\dfrac{1}{\left(x+1\right)^{\underline{n}}}\end{aligned}, & n\in\mathbf{Z\_-} \\\\
\end{cases}
$$

则有

$$
\operatorname{\Delta}x^{\underline n}=\left(x+1\right)^{\underline n}-x^{\underline n}=nx^{\underline{n-1}}
$$

#### 下降幂与普通幂的互化

{% note 前置知识-斯特林数 fold %}
（无符号）第一类斯特林数（斯特林轮换数），$\begin{bmatrix}n \\\\ k\end{bmatrix}$，也可记作 $s\left(n,k\right)$，表示将 $n$ 个两两不同的元素，划分为 $k$ 个互不区分的非空轮换的方案数。

第二类斯特林数（斯特林子集数）$\begin{Bmatrix}n \\\\ k\end{Bmatrix}$ ，也可记作 $S\left(n,k\right)$ ，表示将 $n$ 个两两不同的元素，划分为 $k$ 个互不区分的非空子集的方案数。

根据组合意义，有递推公式：

$$
\begin{aligned}
  \begin{bmatrix}n \\\\ m\end{bmatrix} &=
  \begin{cases}
    [n=0], & m=0 \\\\
    \begin{bmatrix}n-1 \\\\ m-1\end{bmatrix}+\left(n-1\right)\begin{bmatrix}n-1 \\\\ m\end{bmatrix}, & m \ne 0
  \end{cases} \\\\
  \begin{Bmatrix}n \\\\ m\end{Bmatrix} &=
  \begin{cases}
    [n=0], & m=0 \\\\
    \begin{Bmatrix}n-1 \\\\ m-1\end{Bmatrix}+m\begin{Bmatrix}n-1 \\\\ m\end{Bmatrix}, & m \ne 0
  \end{cases}
\end{aligned}
$$

其中第二类斯特林数可以利用二项式反演得到通项公式：

$$
\begin{aligned}
  m^n &= \sum\_{k=0}^{m}\binom{m}{k}\begin{Bmatrix}n \\\\ k\end{Bmatrix}k! \\\\
  m!\begin{Bmatrix}n \\\\ m\end{Bmatrix} &= \sum\_{k=0}^{m}\left(-1\right)^{m-k}\binom{m}{k}k^n \\\\
  \begin{Bmatrix}n \\\\ m\end{Bmatrix} &= \frac{1}{m!}\sum\_{k=0}^{m}\left(-1\right)^{m-k}\binom{m}{k}k^n \\\\
  &= \sum\_{k=0}^{m}\frac{\left(-1\right)^{m-k}}{\left(m-k\right)!}\cdot \frac{k^n}{k!}
\end{aligned}
$$

阅读 [OI-wiki](https://oi-wiki.org/math/combinatorics/stirling/) 或 [维基百科](https://en.wikipedia.org/wiki/Stirling_number) 的页面获取更多信息。
{% endnote %}

利用第二类斯特林数，可以将普通幂转化为下降幂：

$$
x^n=\sum\_{k} \begin{Bmatrix}n \\\\ k\end{Bmatrix} x^{\underline{k}}
$$

利用第一类斯特林数，可以将下降幂转化为普通幂：

$$
x^{\underline{n}}=\sum\_{k} \left(-1\right)^{n-k} \begin{bmatrix}n \\\\ k\end{bmatrix} x^k
$$

这里 $\left(-1\right)^{n-k} \begin{bmatrix}n \\\\ k\end{bmatrix}$ 被称为有符号第一类斯特林数，记作 $s\left(n, k\right)$。

并且

$$
s\left(n,k\right)=s\left(n-1,k-1\right)-\left(n-1\right)s\left(n-1,k\right)
$$

### 组合数

$$
\operatorname{\Delta}\dbinom{x}{n}=\dbinom{x+1}{n}-\dbinom{x}{n}=\dbinom{x}{n-1}
$$

## 常见数列的定和式

### 等比数列

求 $\begin{align}\sum\_{k=0}^{n-1}a^k\end{align}\left(a\ne 1\right)$。

首先考虑指数函数的差分

$$
\operatorname{\Delta}\left(a^x\right)=\left(a-1\right)a^x \Leftrightarrow a^x=\operatorname{\Delta}\left(\dfrac{a^x}{a-1}\right)
$$

因此

$$
\begin{aligned}
\sum\_{k=0}^{n-1}a^k
&= \operatorname{\sum}\_0^na^x\operatorname{\delta}x \\\\
&= \operatorname{\sum}\_0^n\operatorname{\Delta}\left(\dfrac{a^x}{a-1}\right)\operatorname{\delta}x \\\\
&= \dfrac{a^n}{a-1}-\dfrac{a^0}{a-1} \\\\
&= \dfrac{a^n-1}{a-1}
\end{aligned}
$$

### 等差数列

求 $\begin{align}\sum\_{k=1}^{n}k\end{align}$。

首先，

$$
x^{\underline n}=\operatorname{\Delta}\left(\dfrac{x^{\underline{n+1}}}{n+1}\right)
$$

因此：

$$
\begin{aligned}
\sum\_{k=1}^{n}k
&= \operatorname{\sum}\_1^{n+1}x^{\underline 1}\operatorname{\delta}x \\\\
&= \operatorname{\sum}\_1^{n+1}\operatorname{\Delta}\left(\dfrac{\left(x+1\right)^{\underline 2}}{2}\right)\operatorname{\delta}x \\\\
&= \dfrac{1}{2}\left(\left(n+1\right)^{\underline 2}-1^{\underline 2}\right) \\\\
&= \dfrac{n\left(n+1\right)}{2}
\end{aligned}
$$

### 等差数列乘等比数列

求 $\begin{aligned}\sum\_{k=0}^{n-1}k\cdot p^{k}\end{aligned}\left(p\ne 1\right)$。

$$
\begin{aligned}
  \operatorname{\sum}xp^{x}\operatorname{\delta}x
  &= \dfrac{xp^{x}}{p-1}-\operatorname{\sum}\dfrac{p^{x+1}}{p-1}\operatorname{\delta}x \\\\
  &= \dfrac{xp^{x}}{p-1}-\dfrac{p}{p-1}\operatorname{\sum}p^{x}\operatorname{\delta}x \\\\
  &= \dfrac{xp^{x}}{p-1}-\dfrac{p}{p-1}\cdot\dfrac{p^{x}}{p-1} \\\\
  &= \dfrac{xp^{x}}{p-1}-\dfrac{p^{x+1}}{(p-1)^2}
\end{aligned}
$$

{% note note open %}
更一般地，有：

$$
\operatorname{\sum} x^{\underline{k}}p^x\operatorname{\delta}x=\dfrac{p^x}{p-1}\sum_{i=0}^k{\left(\dfrac{-p}{p-1}\right)}^ik^{\underline{i}}x^{\underline{k-i}}
$$
{% endnote %}

这里略去了常数 $C$。
