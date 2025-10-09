---
title: 部分重要函数渐进估计的初等证明
mathjax: true
date: 2025-10-09 23:17:33
updated: 2025-10-09 23:17:33
categories:
  - Math
tags:
  - asymptotic
  - prefix-sum
  - prime
  - sieve
---

### (A) 调和级数

考察

$$
\sum\limits\_{i=1}^{n}\dfrac{1}{i}
$$

按照 $\log i$ 分组：

$$
\sum\_{s=0}^{\left\lfloor\log\_{2} n\right\rfloor}\sum\_{k=2^{s}}^{2^{s+1}-1}\dfrac{1}{k}\leqslant\sum\_{i=1}^{n}\dfrac{1}{i}\leqslant\sum\_{s=0}^{\left\lceil\log\_{2} n\right\rceil}\sum\_{k=2^{s}}^{2^{s+1}-1}\dfrac{1}{k}
$$

对上下界分别进一步放缩：

$$
\sum\_{s=0}^{\left\lfloor\log\_{2} n\right\rfloor}\sum\_{k=2^{s}}^{2^{s+1}-1}\dfrac{1}{k}\geqslant\sum\_{s=0}^{\left\lfloor\log\_{2} n\right\rfloor}\sum\_{k=2^{s}}^{2^{s+1}-1}\dfrac{1}{2^{s+1}}=\dfrac{1+\left\lfloor\log\_{2}n\right\rfloor}{2}
$$

$$
\sum\_{s=0}^{\left\lceil\log\_{2} n\right\rceil}\sum\_{k=2^{s}}^{2^{s+1}-1}\dfrac{1}{k}\leqslant\sum\_{s=0}^{\left\lceil\log\_{2} n\right\rceil}\sum\_{k=2^{s}}^{2^{s+1}-1}\dfrac{1}{2^{s}}=1+\left\lceil\log\_{2}n\right\rceil
$$

因此有 $\sum\limits\_{i=1}^{n}\dfrac{1}{i}=\Theta\left(\log n\right)$。

### (B) 质数计数函数

考察

$$
\pi\left(n\right)
$$

本节中 $p$ 取质数。

---

先证明上界。

注意到：

$$
\prod\_{p\leqslant n}\leqslant 4^{n-1}
$$

> 证明：
>
> 应用数学归纳法，对于较小的 $n$ （例如 $n\leqslant 10$），容易验证成立。
>
> 对于奇数 $n=2m+1$，有
>
> $$
> \prod\_{p\leqslant 2m+1}p=\left(\prod\_{m+2\leqslant p\leqslant 2m+1}p\right)\left(\prod\_{p\leqslant m+1}p\right)
> $$
>
> 其中
>
> $$
> \left(\prod\_{m+2\leqslant p\leqslant 2m+1}p\right)\mid \dbinom{2m+1}{m}
> $$
>
> 因此有
>
> $$
> \prod\_{p\leqslant 2m+1}p\leqslant\dbinom{2m+1}{m}\left(\prod\_{p\leqslant m+1}p\right)
> $$
> 
> 只需要注意到
> 
> $$
> \dbinom{2m+1}{m}\leqslant 4^{m}
> $$
> 
> 应用第二数学归纳法即可；对于偶数 $n$，有
> 
> $$
> \prod\limits\_{p\leqslant n}p=\prod\limits\_{p\leqslant n-1}p\leqslant 4^{n-2}\leqslant 4^{n-1}
> $$

---

对不等式两侧取对数，有

$$
\sum\_{p\leqslant n}\log p\leqslant n\log 4
$$

因此

$$
\sum\_{\sqrt{n}\leqslant p\leqslant n}\log p\lt n\log 4
$$

进而有

$$
\begin{aligned}
  \sum\_{\sqrt{n}\leqslant p\leqslant n}\log \sqrt{n} &\lt 2n\log 2 \\\\
  \left(\pi\left(n\right)-\pi\left(\sqrt{n}\right)\right)\log\sqrt{n} &\lt 2n\log 2 \\\\
  \pi\left(n\right) &\lt \dfrac{4n\log 2}{\log n}+\pi\left(\sqrt{n}\right) \\\\
  &\lt \dfrac{4n\log 2}{\log n}+\sqrt{n}
\end{aligned}
$$

因此有 $\pi\left(n\right)=\mathcal O\left(\dfrac{n}{\log n}\right)$。

---

再考察下界。

定义

$$
N=\dbinom{2m}{m}=\dfrac{\left(2m\right)!}{m!m!}
$$

设函数 $v\_{p}\left(x\right)$ 表示 $x$ 的因数分解中质数 $p$ 的次数，在等式两侧应用 $v\_{p}\left(\cdot\right)$，有

$$
\begin{aligned}
  v\_{p}\left(N\right)
  &= v\_{p}\left(\left(2m\right)!\right)-2v\_{p}\left(m!\right) \\\\
  &= \sum\_{k\geqslant 1}\left(\left\lfloor\dfrac{2m}{p^k}\right\rfloor-2\left\lfloor\dfrac{m}{p^{k}}\right\rfloor\right) \\\\
  &\leqslant \left\lfloor\dfrac{\log 2m}{\log p}\right\rfloor
\end{aligned}
$$

---

因此有

$$
\begin{aligned}
  \pi\left(2m\right)\log 2m
  &= \sum\_{p\leqslant 2m}\log 2m \\\\
  &= \sum\_{p\leqslant 2m}\dfrac{\log 2m}{\log p}\cdot\log p \\\\
  &\geqslant \sum\_{p\leqslant 2m}v\_{p}\left(N\right)\log p \\\\
  &= \log\prod\_{p\leqslant 2m}p^{v\_{p}\left(N\right)} \\\\
  &= \log N
\end{aligned}
$$

又因为

$$
N=\dbinom{2m}{m}\geqslant 2^{m}
$$

因此有下界 $\pi\left(n\right)=\Omega\left(\dfrac{n}{\log n}\right)$。

---

总之 $\pi\left(n\right)=\Theta\left(\dfrac{n}{\log n}\right)$，一个推论是 $p\left(n\right)=\Theta\left(n\log n\right)$。

### (C) 质因子个数和

考察 Eratosthenes 筛的复杂度：

$$
\sum\limits\_{i=1}^{n}\omega\left(i\right)
$$

---

显然原式与

$$
\sum\_{i=1}^{\pi\left(n\right)}\dfrac{n}{p\left(n\right)}
$$

在渐进意义上等价。

我们将这个求和的前 $\Theta\left(1\right)$ 项扔掉，方便使用 $\pi\left(n\right)=\Theta\left(\dfrac{n}{\log n}\right)$ 和 $p\left(n\right)=\Theta\left(n\log n\right)$ 的估计。

---

因此只需考察

$$
\sum\_{i=2}^{\frac{n}{\log n}}\dfrac{n}{i\log i}
$$

进行放缩

$$
\sum\_{i=2}^{\sqrt{n}}\dfrac{n}{i\log i} \lt \sum\_{i=2}^{\frac{n}{\log n}}\dfrac{n}{i\log i} \lt \sum\_{i=2}^{n}\dfrac{n}{i\log i}
$$

---

考察求和

$$
\sum\_{i=2}^{n}\dfrac{n}{i\log i}
$$

的渐进。

按 $\log i$ 分组，有

$$
\sum\_{i=2}^{n}\dfrac{n}{i\log i}=n\sum\_{s=1}^{\log n}\sum\_{k=2^{s}}^{2^{s+1}-1}\dfrac{1}{k\log k}
$$

其中

$$
\sum\_{s=1}^{\log n}\sum\_{k=2^{s}}^{2^{s+1}-1}\dfrac{1}{4\cdot s\cdot 2^{s}} \lt \sum\_{s=1}^{\log n}\sum\_{k=2^{s}}^{2^{s+1}-1}\dfrac{1}{k\log k} \lt \sum\_{s=1}^{\log n}\sum\_{k=2^{s}}^{2^{s+1}-1}\dfrac{1}{2^{s}}
$$

因此 $\sum\limits\_{i=2}^{n}\dfrac{n}{i\log i}=\Theta\left(n\log\log n\right)$；同理 $\sum\limits\_{i=2}^{\sqrt{n}}\dfrac{n}{i\log i}=\Theta\left(n\log\log n\right)$。

故 $\sum\limits\_{i=1}^{n}\omega\left(i\right)=\Theta\left(n\log\log n\right)$。
