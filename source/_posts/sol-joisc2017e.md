---
title: Broken Device (JOISC 2017)
mathjax: true
date: 2025-08-09 01:26:52
updated: 2025-08-09 01:26:52
categories:
  - OI
  - solution
tags:
  - communication
  - constructive
  - Ad-hoc
---

[题目链接 (Qoj)](https://qoj.ac/problem/364)

> Anna 与 Bruno 通信。
>
> Anna 有一个大小为 $N$ 的数组 $A$ 和一个希望使 Bruno 知道的数 $X~\left(0\leqslant X\leqslant 10^{18}\right)$。数组只能存放 $0$ 或 $1$。
>
> 数组有 $K$ 个位置损坏，即 Anna 无论向这个位置存放什么，Bruno 收到时都只能看到 $0$。
>
> *交互细节：*
>
> *作为 Anna，你需要包含 `Annalib.h`，并实现函数 `void Anna(int N, long long X, int K, int P[])`；你使用函数 `void Set(int pos, int bit)` 操作数组。注意，你必须为数组的每个位置指定存储内容，即使你知道这个位置损坏。*
>
> *作为 Bruno，你需要包含 `Bruno.h`，并实现函数 `long long Bruno(int N, int A[])`。*
>
> 原题保证 $N=150,K\leqslant 40$。

<!-- more -->

---

## Algo 1

考虑相邻两位数组表示一个三进制位：

+ 如果可行，使用
  1. $\mathtt{01}$ 表示 $\mathtt{0}$；
  2. $\mathtt{10}$ 表示 $\mathtt{1}$；
  3. $\mathtt{11}$ 表示 $\mathtt{2}$；
+ 若不可行，则令两位均为 $0$，表示这两位没有有效信息；

最劣情况下，我们可以表示的值域为 $3^{\frac{N}{2}-K}=3^{35}\approx 5\times 10^{16}$。

不妨将数组随机打乱，这样我们可以假定每一位损坏的概率是均匀的，为 $\dfrac{K}{N}$。

同样，我们可以对 $X$ 三进制表示下每一位分别作随机映射，因此 $X$ 也可以视为随机的。

因此对于数组的相邻两位，可以成功表示出三进制的一位的概率为

$$
\begin{aligned}
  P
  &= \dfrac{2}{3}\times\dfrac{N-K}{N}+\dfrac{1}{3}\times\left(\dfrac{N-K}{N}\right)^{2} \\\\
  &= 1 - \dfrac{4NK-K^{2}}{3N^{2}}
\end{aligned}
$$

在本题数据中，$P\approx 0.6681$，因此期望意义下有超过 $50$ 个位可用，而我们实际上只需要 $\left\lfloor\log\_{3}{x}\right\rfloor+1=38$ 位，看起来基本够用了。

当然，我们也可以计算无法表示的概率，这个值可以估计为

$$
\binom{N}{\left\lfloor\log\_{3}{x}\right\rfloor}\cdot\left(\dfrac{3N^{2}-4NK+K^{2}}{3N^{2}}\right)^{\left\lfloor\log\_{3}{x}\right\rfloor}\cdot\left(\dfrac{4NK-K^{2}}{3N^{2}}\right)^{N-\left\lfloor\log\_{3}{x}\right\rfloor}
$$

代入计算一下发现不超过 $4.54\times 10^{-26}$。

## Algo 2

有一个保证正确的很聪明的做法。

考虑使用数组的 $3$ 个连续位置为单位存储信息。

我们建立这样的表示关系：

$$
\begin{aligned}
  \mathtt{000} &\to \mathtt{none} \\\\
  \mathtt{001} &\to \mathtt{00} \\\\
  \mathtt{010} &\to \mathtt{0} \\\\
  \mathtt{011} &\to \mathtt{1} \\\\
  \mathtt{100} &\to \mathtt{1} \\\\
  \mathtt{101} &\to \mathtt{01} \\\\
  \mathtt{110} &\to \mathtt{10} \\\\
  \mathtt{111} &\to \mathtt{11} \\\\
\end{aligned}
$$

容易说明，对于 $3$ 个位置均完好的单元，至少可以表示 $2$ 个二进制位；对于存在一个位置损坏的单元，至少可以表示 $1$ 个二进制位。

具体来说，对于一个位置损坏的单元

+ 希望表示 $\mathtt{1}$：
  + 若第一个位置损坏，则使用 $\mathtt{011}$ 表示；
  + 若后两个位置损坏，使用 $\mathtt{100}$ 表示；
+ 希望表示 $\mathtt{0}$：
  + 若中间位置未损坏，使用 $\mathtt{010}$；
  + 若中间位置损坏，使用 $\mathtt{001}$ 或 $\mathtt{101}$，此时可以额外表示下一位。

显然最劣情况会有 $20$ 个完全损坏的单元或 $40$ 个损坏一位的单元，又因为总共有 $\dfrac{N}{3}=50$ 个单元，因此总可以表示 $60$ 位。
