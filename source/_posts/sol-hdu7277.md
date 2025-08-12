---
title: Mr. Liang play Card Game (HDU 2023(1))
mathjax: true
date: 2025-08-12 23:23:53
categories:
  - OI
  - solution
tags:
  - Dynamic-Programming
---

组队打 *CPC 的题，不知道独立能不能做出来。

[题目链接](https://acm.hdu.edu.cn/showproblem.php?pid=7277)

> 有 $n$ 个元素，第 $i$ 个元素的初始类型为 $a\_i$，等级为 $1$；第 $j$ 种类型的牌的权值为 $V\_{a\_j}$。
>
> 可以进行两种操作若干次（$R,P$ 为给定常数）：
> 1. 选择一个元素，假设其类型为 $a$，等级为 $k$，删掉这个元素，代价加 $V\_{a}\times P^{k-1}$。
> 2. 选择相邻两个类型相同的元素，设其类型均为 $a$，等级均为 $k$ 且小于 $R$，删掉这两个元素，在原位置加入一个类型为 $a$，等级为 $k+1$ 的新元素。
>
> 求最大代价。
>
> + 多测，$T\leqslant 10$；
> + $1\leqslant n\leqslant 100$；
> + $1\leqslant m\leqslant 20$；
> + $1\leqslant R\leqslant 20$；
> + $1\leqslant P\leqslant 10$。

首先一眼区间 DP 啊，考虑状态如何设计方便合并。

由于合并时挑选两个**相同类型相同等级**的元素，因此我们考虑在状态中维护当前区间**剩下唯一元素**，其类型为 $k$，等级为 $l$ 时的最大代价。

顺便，维护将一个区间全部删除后的最大代价。

假设 $F\_{i,j,k,l}$ 表示在区间 $[i,j]$ 中，只剩下一个类型为 $k$ 且等级为 $l$ 的元素时的最大代价，设 $G\_{i,j}$ 为将区间全部删除后的最大代价。

初始状态的设定为

$$
F\_{i,i,a\_i,1}=0,G\_{i,i}=V\_{a\_i}
$$

其余未指定的状态设为 $-\infty$。

显然有以下的转移方程，方便表述，这里假定 $x \gets a$ 的含义为将 $x$ 的值赋为 $\max\left(x,a\right)$。

$$
\begin{aligned}
  F\_{i,j,k,l} &\gets \max\_{h=i}^{j-1}\left\\{F\_{i,h,k,l}+G\_{h+1,j},G\_{i,h}+F\_{h+1,j,k,l}\right\\} \\\\
  F\_{i,j,k,l} &\gets \max\_{h=i}^{j-1}\left\\{F\_{i,h,k,l-1}+F\_{i,h+1,k,l-1}\right\\} \\\\
  G\_{i,j} &\gets F\_{i,j,k,l}
\end{aligned}
$$

因此时间复杂度为单组测试 $\mathcal O\left(n^{3}mR\right)$ 的，这个计算量看似是 $100^{3}\times 20\times 20=4\times 10^{8}$ 的，乘上多测次数 $T=10$，似乎难以通过。

不过，我们注意到，只有合并两个元素才可以使元素等级升一级，而数据范围保证最多只有 $100$ 个元素，显然最多升级 $6$ 次到 $7$ 级，因此 $R$ 在估算计算量时应取 $7$（或者我们说，时间复杂度实际上是 $\mathcal O\left(n^{3}m\min\left(\log n,R\right)\right)$），此时计算量估计大概降到 $1.4\times 10^{8}$。

实际上，DP 代码可能比大多数人想象的常数都来的小，并且本题转移 DP 时 $n^{3}$ 的计算量来自枚举 $i,h,j$，后者实际上还有一个 $\dfrac{1}{6}$ 的常数。

这样乘上多测的计算量估计大约为 $2.33\times 10^{7}$，原题有 $3\mathrm{s}$，通过本题绰绰有余了。
