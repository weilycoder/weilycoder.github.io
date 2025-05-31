---
categories:
  - OI
title: CF2109C (Div. 2) Hacking Numbers
date: 2025-05-20 15:27:23
mathjax: true
tags:
  - solution
  - interactive
  - constructive
  - number-theory
  - math
  - Ad-hoc
  - codeforces
---

## 题意

[原题链接](https://codeforces.com/contest/2109/problem/C3)

> **中文简化版：**
>
> 本题为交互题。
>
> 交互库保存一个隐藏的变量 $x$，最开始保证 $x$ 为 $[1,1\times 10^9]$ 以内的整数；你需要经过若干次操作使得它变为给定的 $n$，保证 $n$ 为 $[1,1\times 10^9]$ 以内的整数。
>
> 如果操作失败，交互库会告知你，但是仍然消耗一次操作机会。
>
> 提交答案不消耗操作机会。
>
> | **Command** |        **Constraint**        | **Result**                         | **Case**                                    | **Update**                  | **response** |
> | :---------: | :--------------------------: | :--------------------------------- | ------------------------------------------- | --------------------------- | :----------: |
> |   `add y`   | $-10^{18} \le y \le 10^{18}$ | $\mathrm{res} = x + y$             | $\mathrm{if } 1 \le \mathrm{res} \le 10^{18}$ | $x \leftarrow \mathrm{res}$ |     `1`      |
> |             |                              |                                    | $\mathrm{else}$                             | $x \leftarrow x$            |     `0`      |
> |   `mul y`   |    $1 \le y \le 10^{18}$     | $\mathrm{res} = x \cdot y$         | $\mathrm{if } 1 \le \mathrm{res} \le 10^{18}$ | $x \leftarrow \mathrm{res}$ |     `1`      |
> |             |                              |                                    | $\mathrm{else}$                             | $x \leftarrow x$            |     `0`      |
> |   `div y`   |    $1 \le y \le 10^{18}$     | $\mathrm{res} = x/y$               | $\mathrm{if } y$ divides $x$                  | $x \leftarrow \mathrm{res}$ |     `1`      |
> |             |                              |                                    | $\mathrm{else}$                             | $x \leftarrow x$            |     `0`      |
> |   `digit`   |              —               | $\mathrm{res} = S(x)$$^{\mathrm{∗}}$ | —                                           | $x \leftarrow \mathrm{res}$ |     `1`      |
>
> $*$：这里 $S(x)$ 表示求 $x$ 的 $10$ 进制下的各位数字和，例如 $f(123)=1+2+3=6$。
>
> + Easy: $7$ 次操作；
> + Medium：$4$ 次操作；
> + Hard：最优化操作次数。

## Algo 0: 31 op

首先想到二分，考虑不断从 $x$ 中减去 $2^k$，由于 $1\times 10^9\le 2^{30}$，因此只需减 $30$ 次即可将 $x$ 变为 $1$。最后乘 $n$ 即可。

## Algo 1: 7 op

然后考虑使用 $S$ 函数，使用 $1$ 次后值域缩小到 $[1,81]$，再使用 $1$ 次后值域缩小到 $[1,16]$，因此再减 $4$ 次即可减到 $1$。

## Algo 2: 4 op

回想我们小学二年级学过的 $9$ 的整除性判定，考虑再先乘 $9$。这样再取一次 $S$ 函数后，结果只会为 $9,18,\dots,81$ 中的一个。

再取一次 $S$ 函数，$x$ 变为 $9$，下一步加 $n-9$ 即可。

## Algo 3: 2~3 op

注意到：

$$
S((10^d-1)\times x)=9d,\qquad \forall 1\le x\le 10^d.
$$

这是因为：

$$
\begin{aligned}
x \cdot (10^d-1)
&= x \cdot 10^d - x \\\\
&= (x - 1) \cdot 10^d + 10^d - x \\\\
&= (x - 1) \cdot 10^d + [(10^d - 1) - (x - 1)].
\end{aligned}
$$

因此，我们只需要在最开始乘 $999999999$，接着取 $S$ 函数，答案一定为 $81$。

若 $n=81$，则已经做完，使用 $2$ 次操作。

否则，再加 $n-81$，共使用 $3$ 次操作。

### 最优性证明

容易证明，至少花费 $2$ 次操作，才能使 $x$ 变成某一个确定的数。

因此，只需证，经过 $2$ 次操作，将 $x$ 变为一个确定的数，则这个数一定为 $81$。

首先，容易证明至少需要一次 $S$ 操作，因为其他每种操作都最多将值域缩小一半。

其次，不能连用两次 $S$ 操作，因为此时值域为 $[1,16]$。

再次，第一次操作不能为 $S$ 操作，原因同样是其他每种操作都最多将值域缩小一半。

最后，考虑第一次操作的类型。

由于 $S(n)\ne S(n+1)$ 恒成立，而 $+$ 操作和 $/$ 操作必定剩下相邻的数，因此第一次操作必须为 $\times$。

假设存在 $y\ne 999999999$ 使得 $S(x\cdot y)$ 为常数，考虑 $x=1$ 和 $x=999999999$：

$$
S(1\cdot y)=S(y)\le 80 \lt S(999999999\cdot y)=81.
$$

综上所述，只有先乘 $999999999$，再取 $S$ 函数，才能使 $x$ 变为定值，且定值为 $81$。
