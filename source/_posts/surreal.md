---
title: Surreal Numbers
categories:
  - OI
date: 2025-05-16 17:14:14
mathjax: true
tags:
  - math
  - surreal-numbers
  - games
---

本文可以视为 weilycoder 阅读 *On Numbers and Games* 的笔记。

## 构造

若 $L,R$ 为任意两个 Surreal Number（超现实数，以下简称“数”）构成的集合，则 $\\{L\mid R\\}$ 为一个数。

规定：

$$
\tag{0} \forall x_L \in L,x_R \in R(x_L \not \ge x_R).
$$

## 约定

+ 定义 $\mathbf{No}$ 表示全体数构成的类（class）。
+ 若 $x:=\\{L\mid R\\}$，则使用 $x_L$ 表示 $L$ 中的元素；$x_R$ 表示 $R$ 中的元素。对于 $x$，也记作 $\\{x_L\mid x_R\\}$。
+ $x:=\\{a,b,c,\dots\mid d,e,f\dots\\}$ 表示 $x:=\\{\\{a,b,c,\dots\\}\mid\\{d,e,f,\dots\\}\\}$。

## 定义

+ $x\ge y$ 和 $x\le y$ 的定义

  + $x\ge y$ 当且仅当

    $$
    \tag{1} (\not\exists x_R\le y)\land(\not\exists y_L\ge x);
    $$

  + $x\le y$ 当且仅当 $y\ge x$。

+ $x=y$，$x\gt y$，$x\lt y$ 的定义

  + $x=y$ 当且仅当 $(x\ge y)\land(y\ge x)$；
  + $x\gt y$ 当且仅当 $(x\ge y)\land(y\not\ge x)$；
  + $x\lt y$ 当且仅当 $y\gt x$。

+ $x+y$ 的定义

  $$
  \tag{2} x+y=\\{x_L+y,x+y_L\mid x_R+y,x+y_R\\}
  $$

+ $-x$ 的定义

  $$
  \tag{3} -x=\\{-x_R\mid -x_L\\}
  $$
  
+ $xy$ 的定义

  $$
  \tag{4} xy=\\{x_Ly+xy_L-x_Ly_L,x_Ry+xy_R-x_Ry_R\mid x_Ly+xy_R-x_Ly_R,x_Ry+xy_L-x_Ry_L\\}
  $$

## 超限归纳

不加说明地引入“超限归纳法”。

假设一个性质 $P$ 满足：$(P(x_L)\land P(x_R))\Rightarrow P(x)$，则任意数 $x$ 都满足性质 $P(x)$。

二元形式为，若 $P$ 满足：$(P(x_L,y)\land P(x_R,y)\land P(x,y_L)\land P(x,y_R))\Rightarrow P(x,y)$，则任意数 $x,y$ 满足 $P(x,y)$。

没有归纳起点 $P(0)$ 的原因留给读者思考。

## 游戏（伪数）

我们同样允许表达式 $x=\\{L\mid R\\}$，这里 $L,R$ 不满足 $\text{(0)}$。

由于这种形式在博弈中被引入，我们称它为游戏（game）；为了表述方便，后文也称它为伪数（pseudo-number）。

显然伪数也应该满足超限归纳法。

## 一些构造

<p class="item-img" data-src="/image/ONAG-22.png" data-lg-id="1fbdc6d4-9755-4bc2-ae7d-fbb453610836">
  <img src="/image/ONAG-22.png" style="zoom:27%; float:right"/>
</p>

$$
\begin{aligned}
0&=\\{\mid\\} \\\\
1&=\\{0\mid\\} \\\\
-1&=\\{\mid 0\\} \\\\
2&=\\{1\mid\\}=\\{0,1\mid\\}=\cdots \\\\
-2&=\\{\mid -1\\}=\\{\mid -1,0\\}=\cdots \\\\
\frac{1}{2}&=\\{0\mid 1\\}=\\{-1,0\mid 1\\}=\cdots \\\\
&\cdots \\\\
\omega&=\\{0,1,2,\cdots,\mid\\} \\\\
\epsilon&=\left\\{0\mid 1,\frac{1}{2},\frac{1}{4},\cdots\right\\} \\\\
\frac{1}{3}&=\left\\{\frac{1}{4},\frac{1}{4}+\frac{1}{16},\cdots\mid \frac{1}{2},\frac{1}{2}-\frac{1}{8},\cdots\right\\} \\\\
&\cdots
\end{aligned}
$$

可以验证，上述命名符合我们的习惯（$1+1=2,0\lt 1\lt 2,\cdots$）。

这里给出一个可以简化比较的引理：

+ 若 $y\not\ge x$，则 $\\{y,x_L\mid x_R\\}=x$；
+ 若 $y\not\le x$，则 $\\{x_L\mid y,x_R\\}=x$。

## 未完待续
