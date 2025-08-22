---
title: Binary Operation (ABC 418 G)
mathjax: true
date: 2025-08-09 21:31:00
categories:
  - OI
  - solution
tags:
---

赛时感觉要分讨，发现不可能写完了，于是决定记一下分讨结果。

感觉也可能是造自动机，赛后看题解吧。

~~这场 F 不会的时候先去写 G 了，发现 G 没时间写完了突然又会 F 了。~~

~~竞速赛，40 min 打完罚坐一个小时。~~

~~排名 300+ 但是赛前点了 unrated。~~

[原题链接](https://atcoder.jp/contests/abc418/tasks/abc418_g)

> 称一个由 $\mathtt{0}$ 和 $\mathtt{1}$ 构成的字符串 $S$ 是好的，当且仅当其可以经过以下任意次操作后得到 $\mathtt{1}$。
>
> (操作) 选择下标 $1\leqslant i\leqslant |S|-1$，若 $\overline{S\_{i}S\_{i+1}}$ 为：
> + $\mathtt{00}$，则替换为 $A$；
> + $\mathtt{01}$，则替换为 $B$；
> + $\mathtt{10}$，则替换为 $C$；
> + $\mathtt{11}$，则替换为 $D$。
>
> 这里 $A,B,C,D\in\left\\{\mathtt{0},\mathtt{1}\right\\}$。
>
> 给定字符串 $S$，求其所有子串中：
> + 最长的好的子串的长度（若没有，输出 $0$）；
> + 好的子串的数量；
>
> *对每一种 $A,B,C,D$ 的取值给出答案（共 $16$ 种），第 $i$ 行输出使式子 $i-1=8A+4B+2C+D$ 成立的取值所对应的答案。*
>
> + $1\leqslant|S|\leqslant 2\times 10^{5}$。

<!-- more -->

---

## Algo 1

分类讨论。

### 0000

+ 显然只有字符串 $\mathtt{1}$ 是好的。

### 0001

+ 显然只有全 $\mathtt{1}$ 的串是好的，即形如 $\mathtt{11...111}$。

### 0010

+ 首先，显然字符串的首位必须为 $\mathtt{1}$；
+ 其次，若字符串开头的极长全 $\mathtt{1}$ 段的长度为 $2$，则去除开头的极长全 $\mathtt{1}$ 段后，字符串必须包含 $\mathtt{1}$。

  换句话说，我们只需要形如 $\mathtt{1......}$ 的字符串，除了 $\mathtt{1100...000}$。

### 0011

+ 显然只要字符串的开头为 $\mathtt{1}$ 即可，即形如 $\mathtt{1......}$。

### 0100

+ 将字符串翻转，然后可以应用 $\mathtt{0010}$ 一节的结论；

  即，需要形如 $\mathtt{......1}$ 的字符串，除了 $\mathtt{00...00011}$。

### 0101

+ 将字符串翻转，然后应用 $\mathtt{0011}$ 一节的结论；

  即，需要形如 $\mathtt{......1}$ 的字符串。

### 0110

+ 显然操作为异或，因此只需要字符串中 $\mathtt{1}$ 的数量为奇数即可。

### 0111

+ 任何含有 $\mathtt{1}$ 的字符串满足要求。

### 1000

+ 通过暴力枚举可以得到一个表：

  $$
  \begin{aligned}
    \mathtt{0} &\to \mathtt{0} \\\\
    \mathtt{1} &\to \mathtt{1} \\\\
    \mathtt{00} &\to \mathtt{1} \\\\
    \mathtt{01} &\to \mathtt{0} \\\\
    \mathtt{10} &\to \mathtt{0} \\\\
    \mathtt{11} &\to \mathtt{0} \\\\
    \mathtt{000} &\to \mathtt{0} \\\\
    \mathtt{010} &\to \mathtt{1} \\\\
    \mathtt{101} &\to \mathtt{0} \\\\
    \mathtt{111} &\to \mathtt{0}
  \end{aligned}
  $$

  表中的字符串的最终状态是唯一的，其余未列出的字符串最终可以转移到 $\mathtt{0}$ 或 $\mathtt{1}$。

  对于较短的字符串可以暴力枚举证明（例如，$7$ 位及以内），而更多位的字符串总可以被分成不短于 $4$ 的两段，故可以归纳证明。

### 1001

+ 注意到 $\mathtt{0}$ 的数量的奇偶性不变，因此 $\mathtt{0}$ 的数量为偶数的字符串均符合要求。

### 1010

+ 暴力枚举打表

  $$
  \begin{aligned}
    \mathtt{0} &\to \mathtt{0} \\\\
    \mathtt{1} &\to \mathtt{1} \\\\
    \mathtt{00} &\to \mathtt{1} \\\\
    \mathtt{01} &\to \mathtt{0} \\\\
    \mathtt{10} &\to \mathtt{1} \\\\
    \mathtt{11} &\to \mathtt{0}
  \end{aligned}
  $$

  其余字符串可以转移到 $\mathtt{0}$ 或 $\mathtt{1}$ 中任何一个。

### 1011

+ 只有首位为 $\mathtt{0}$ 且其余位均为 $\mathtt{1}$ 的字符串不符合要求。

### 1100

+ 暴力打表发现

  $$
  \begin{aligned}
    \mathtt{0} &\to \mathtt{0} \\\\
    \mathtt{1} &\to \mathtt{1} \\\\
    \mathtt{00} &\to \mathtt{1} \\\\
    \mathtt{01} &\to \mathtt{1} \\\\
    \mathtt{10} &\to \mathtt{0} \\\\
    \mathtt{11} &\to \mathtt{0}
  \end{aligned}
  $$

  其余字符串可以转移到 $\mathtt{0}$ 或 $\mathtt{1}$ 中任何一个。

### 1101

+ $\mathtt{1011}$ 的翻转版

  只有末位为 $\mathtt{0}$ 且其余位均为 $\mathtt{1}$ 的字符串不符合要求。

### 1110

+ 暴力打表

  $$
  \begin{aligned}
    \mathtt{0} &\to \mathtt{0} \\\\
    \mathtt{1} &\to \mathtt{1} \\\\
    \mathtt{00} &\to \mathtt{1} \\\\
    \mathtt{01} &\to \mathtt{1} \\\\
    \mathtt{10} &\to \mathtt{1} \\\\
    \mathtt{11} &\to \mathtt{0} \\\\
    \mathtt{000} &\to \mathtt{1} \\\\
    \mathtt{010} &\to \mathtt{1} \\\\
    \mathtt{101} &\to \mathtt{0} \\\\
    \mathtt{111} &\to \mathtt{1}
  \end{aligned}
  $$

  其余字符串可以转移到 $\mathtt{0}$ 或 $\mathtt{1}$ 中任何一个。

### 1111

+ 显然任意字符串均可以转移到 $\mathtt{1}$。
