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

  $$
  \tag{1}
  \begin{aligned}
  (x\ge y) &\Leftrightarrow ((\not\exists x_R\le y)\land(\not\exists y_L\ge x)); \\\\
  (x\le y) &\Leftrightarrow (y\ge x)
  \end{aligned}
  $$

+ $x=y$、$x\gt y$、$x\lt y$ 的定义

  $$
  \begin{aligned}
  (x=y) &\Leftrightarrow ((x\ge y)\land(y\ge x)) \\\\
  (x\gt y) &\Leftrightarrow ((x\ge y)\land(y\not\ge x)) \\\\
  (x\lt y) &\Leftrightarrow (y\gt x)
  \end{aligned}
  $$

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

由于等号 $=$ 的特殊性，需要指出，这里的等号意义比“相等”要弱一些，具体表现在，我们可以构造一种运算 $f$，使得 $x=y$ 于 $f(x)=f(y)$ 不等价。

因此，后文中定义变量的时候，使用 $:=$ 表示赋值；使用 $\equiv$ 表示两个数的 $L$ 和 $R$ 分别相等（这时若 $x\equiv y$，则显然可以将式子中的一切 $y$ 替换为 $x$）。

## 超限归纳

不加说明地引入“超限归纳法”。

假设一个性质 $P$ 满足：$(P(x_L)\land P(x_R))\Rightarrow P(x)$，则任意数 $x$ 都满足性质 $P(x)$。

二元形式为，若 $P$ 满足：$(P(x_L,y)\land P(x_R,y)\land P(x,y_L)\land P(x,y_R))\Rightarrow P(x,y)$，则任意数 $x,y$ 满足 $P(x,y)$。

没有归纳起点 $P(0)$ 的原因留给读者思考。

## 游戏（伪数）

我们同样允许表达式 $x=\\{L\mid R\\}$，这里 $L,R$ 不满足 $\text{(0)}$。

由于这种形式在博弈中被引入，我们称它为游戏（game）；为了表述方便，后文也称它为伪数（pseudo-number）。

显然伪数也应该满足超限归纳法。

## 创造日

由于数的定义是递归进行的，因此每个数的构造必须依赖曾经构造的数。但当我们还没有构造任何一个数的时候，我们所能使用的数集只有 $\varnothing$。

因此，我们在最开始的时候只能构造 $\\{\mid\\}$，我们将它称为 $0$。我们不妨称这是第 $0$ 天。

接下来，我们可以使用 $0$ 作为 $L$ 或 $R$ 中的元素，因此可以构造出 $\\{0\mid \\}$ 和 $\\{\mid 0\\}$，分别称它们为 $1$ 和 $-1$，并称这时为第 $1$ 天。

如此不断进行下去，第 $n$ 天构造的所有数中，$n$ 是最大的一个，而 $-n$ 是最小的一个。

由于允许无限集合的出现，这个过程可以持续到第 $\omega$ 天，并可以继续下去。由此可以看到，Surreal Numbers 的数量至少和序数同样多，这样 $\mathbf{No}$ 不能成为一个集合（set）而只能成为一个类（class）。

![Surreal Numbers](/image/ONAG-22.png)

## 一些构造

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

可以验证，上述命名符合我们使用实数的习惯（$1+1=2,0\lt 1\lt 2,\cdots$）。

这里给出一个可以简化比较的引理：

+ 若 $y\not\ge x$，则 $\\{y,x_L\mid x_R\\}=x$；
+ 若 $y\not\le x$，则 $\\{x_L\mid y,x_R\\}=x$。

## 基础定理

若无说明，以下定理适用于全体游戏。

### 关于比较的定理

#### 等号的自反性

$$
\tag{T0}
\begin{aligned}
\text{(i)} \quad & x \not\ge x_R \\\\
\text{(ii)} \quad & x_L \not\ge x \\\\
\text{(iii)} \quad & x \ge x \\\\
\text{(iv)} \quad & x = x
\end{aligned}
$$

> **证明：**
> 
> 首先，回想“大于”的定义：$x\ge y$ 当且仅当 $\not\exists x_R\le y$ 且 $\not\exists y_L\ge x$。
>
> 1. 将定义中的 $y$ 使用 $x_R$ 替换，发现一定有 $x_R\le x_R'$，因此 $x\ge x_R$ 不成立。
> 2. 同理可证。
> 3. 令 $y:=x$，我们已经证明不存在 $x_R\le y$ 且不存在 $y_L\ge x$，因此 $x\ge y$。
> 4. 由等号的定义得。

#### 不等号的传递性

$$
\tag{T1}
((x\ge y)\land (y\ge z)) \Rightarrow x\ge z
$$

> **证明：**
>
> 因为 $x\ge y$，因此不存在 $x_R\le y$，由归纳假设，不存在 $x_R\le z$，同理得不存在 $z_L\ge x$，因此 $T_1(x,y,z)$ 成立。

请注意这条定理的推论之一是，若 $x=y$，则 $x\gt x$ 等价于 $y\gt z$。

#### 不等号的连接性

这条定理需要用到 $\text{(0)}$，因此对于游戏不适用。

$$
\tag{T2}
\begin{aligned}
\forall &(x\in\mathbf{No})(\forall x_L,x_R (x_L\lt x\lt x_R)) \\\\
\forall &(x,y\in\mathbf{No})(x\le y\lor y\le x)
\end{aligned}
$$

> **证明：**
>
> 1. 已经证明，$x\not\ge x_R$ 故只需证明 $x_R\ge x$。根据定义，它成立当且仅当 $x_{RR}\le x$ 或 $x_R\le x_L$。若前者成立，根据归纳假设，有 $x_R\lt x_{RR}\le x$。而后者根据 $\text{(0)}$ 不成立。
> 2. 若 $x\not\ge y$，则 $x_R\le y$ 或 $x\le y_L$，即 $x\lt x_R\le y$ 或 $x\le y_L\lt y$。

因此，全体数字是全序的。
