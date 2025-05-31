---
title: Surreal Numbers
categories:
  - Math
date: 2025-05-16 17:14:14
mathjax: true
tags:
  - surreal-numbers
  - games
---

本文可以视为 weilycoder 阅读 *On Numbers and Games* 的笔记。

## 构造

若 $L,R$ 为任意两个 Surreal Number（超现实数，以下简称“数”）构成的集合，则 $\left\\{L\mid R\right\\}$ 为一个数。

规定：

$$
\tag{0} \forall x\_L \in L,x\_R \in R\left(x\_L \not \ge x\_R\right).
$$

## 约定

+ 定义 $\mathbf{No}$ 表示全体数构成的类（class）。
+ 若 $x:=\left\\{L\mid R\right\\}$，则使用 $x\_L$ 表示 $L$ 中的元素；$x\_R$ 表示 $R$ 中的元素。对于 $x$，也记作 $\left\\{x\_L\mid x\_R\right\\}$。
+ $x:=\left\\{a,b,c,\dots\mid d,e,f\dots\right\\}$ 表示 $x:=\left\\{\left\\{a,b,c,\dots\right\\}\mid\left\\{d,e,f,\dots\right\\}\right\\}$。

## 定义

+ $x\ge y$ 和 $x\le y$ 的定义

  $$
  \tag{1}
  \begin{aligned}
  \left(x\ge y\right) &\Leftrightarrow \left(\left(\not\exists x\_R\le y\right)\land\left(\not\exists y\_L\ge x\right)\right); \\\\
  \left(x\le y\right) &\Leftrightarrow \left(y\ge x\right)
  \end{aligned}
  $$

+ $x=y$、$x\gt y$、$x\lt y$ 的定义

  $$
  \begin{aligned}
  \left(x=y\right) &\Leftrightarrow \left(\left(x\ge y\right)\land\left(y\ge x\right)\right) \\\\
  \left(x\gt y\right) &\Leftrightarrow \left(\left(x\ge y\right)\land\left(y\not\ge x\right)\right) \\\\
  \left(x\lt y\right) &\Leftrightarrow \left(y\gt x\right)
  \end{aligned}
  $$

+ $x+y$ 的定义

  $$
  \tag{2} x+y=\left\\{x\_L+y,x+y\_L\mid x\_R+y,x+y\_R\right\\}
  $$

+ $-x$ 的定义

  $$
  \tag{3} -x=\left\\{-x\_R\mid -x\_L\right\\}
  $$

+ $xy$ 的定义

  $$
  \tag{4} xy=\left\\{x\_Ly+xy\_L-x\_Ly\_L,x\_Ry+xy\_R-x\_Ry\_R\mid x\_Ly+xy\_R-x\_Ly\_R,x\_Ry+xy\_L-x\_Ry\_L\right\\}
  $$

由于等号 $=$ 的特殊性，需要指出，这里的等号意义比“相等”要弱一些，具体表现在，我们可以构造一种运算 $f$，使得 $x=y$ 于 $f\left(x\right)=f\left(y\right)$ 不等价。

因此，后文中定义变量的时候，使用 $:=$ 表示赋值；使用 $\equiv$ 表示两个数的 $L$ 和 $R$ 分别相等（这时若 $x\equiv y$，则显然可以将式子中的一切 $y$ 替换为 $x$）。

## 超限归纳

不加说明地引入“超限归纳法”。

假设一个性质 $P$ 满足：$\left(P\left(x\_L\right)\land P\left(x\_R\right)\right)\Rightarrow P\left(x\right)$，则任意数 $x$ 都满足性质 $P\left(x\right)$。

二元形式为，若 $P$ 满足：$\left(P\left(x\_L,y\right)\land P\left(x\_R,y\right)\land P\left(x,y\_L\right)\land P\left(x,y\_R\right)\right)\Rightarrow P\left(x,y\right)$，则任意数 $x,y$ 满足 $P\left(x,y\right)$。

没有归纳起点 $P\left(0\right)$ 的原因留给读者思考。

## 游戏（伪数）

我们同样允许表达式 $x=\left\\{L\mid R\right\\}$，这里 $L,R$ 不满足 $\mathrm{\left(0\right)}$。

由于这种形式在博弈中被引入，我们称它为游戏（game）；为了表述方便，后文也称它为伪数（pseudo-number）。

显然伪数也应该满足超限归纳法。

## 创造日

由于数的定义是递归进行的，因此每个数的构造必须依赖曾经构造的数。但当我们还没有构造任何一个数的时候，我们所能使用的数集只有 $\varnothing$。

因此，我们在最开始的时候只能构造 $\left\\{\mid\right\\}$，我们将它称为 $0$。我们不妨称这是第 $0$ 天。

接下来，我们可以使用 $0$ 作为 $L$ 或 $R$ 中的元素，因此可以构造出 $\left\\{0\mid \right\\}$ 和 $\left\\{\mid 0\right\\}$，分别称它们为 $1$ 和 $-1$，并称这时为第 $1$ 天。

如此不断进行下去，第 $n$ 天构造的所有数中，$n$ 是最大的一个，而 $-n$ 是最小的一个。

由于允许无限集合的出现，这个过程可以持续到第 $\omega$ 天，并可以继续下去。由此可以看到，Surreal Numbers 的数量至少和序数同样多，这样 $\mathbf{No}$ 不能成为一个集合（set）而只能成为一个类（class）。

![Surreal Numbers](/image/ONAG-22.png)

## 一些构造

$$
\begin{aligned}
0&=\left\\{\mid\right\\} \\\\
1&=\left\\{0\mid\right\\} \\\\
-1&=\left\\{\mid 0\right\\} \\\\
2&=\left\\{1\mid\right\\}=\left\\{0,1\mid\right\\}=\cdots \\\\
-2&=\left\\{\mid -1\right\\}=\left\\{\mid -1,0\right\\}=\cdots \\\\
\frac{1}{2}&=\left\\{0\mid 1\right\\}=\left\\{-1,0\mid 1\right\\}=\cdots \\\\
&\cdots \\\\
\omega&=\left\\{0,1,2,\cdots,\mid\right\\} \\\\
\epsilon&=\left\\{0\mid 1,\frac{1}{2},\frac{1}{4},\cdots\right\\} \\\\
\frac{1}{3}&=\left\\{\frac{1}{4},\frac{1}{4}+\frac{1}{16},\cdots\mid \frac{1}{2},\frac{1}{2}-\frac{1}{8},\cdots\right\\} \\\\
&\cdots
\end{aligned}
$$

可以验证，上述命名符合我们使用实数的习惯（$1+1=2,0\lt 1\lt 2,\cdots$）。

这里给出一个可以简化比较的引理：

+ 若 $y\not\ge x$，则 $\left\\{y,x\_L\mid x\_R\right\\}=x$；
+ 若 $y\not\le x$，则 $\left\\{x\_L\mid y,x\_R\right\\}=x$。

## 基础定理

若无说明，以下定理适用于全体游戏。

### 比较运算律

#### 等号的自反性

$$
\tag{T0}
\begin{aligned}
\mathrm{\left(i\right)} \quad & x \not\ge x\_R \\\\
\mathrm{\left(ii\right)} \quad & x\_L \not\ge x \\\\
\mathrm{\left(iii\right)} \quad & x \ge x \\\\
\mathrm{\left(iv\right)} \quad & x = x
\end{aligned}
$$

> **证明：**
>
> 首先，回想“大于”的定义：$x\ge y$ 当且仅当 $\not\exists x\_R\le y$ 且 $\not\exists y\_L\ge x$。
>
> 1. 将定义中的 $y$ 使用 $x\_R$ 替换，发现一定有 $x\_R\le x\_R'$，因此 $x\ge x\_R$ 不成立。
> 2. 同理可证。
> 3. 令 $y:=x$，我们已经证明不存在 $x\_R\le y$ 且不存在 $y\_L\ge x$，因此 $x\ge y$。
> 4. 由等号的定义得。

#### 不等号的传递性

$$
\tag{T1}
\left(\left(x\ge y\right)\land \left(y\ge z\right)\right) \Rightarrow x\ge z
$$

> **证明：**
>
> 因为 $x\ge y$，因此不存在 $x\_R\le y$，由归纳假设，不存在 $x\_R\le z$，同理得不存在 $z\_L\ge x$，因此 $T\_1\left(x,y,z\right)$ 成立。

请注意这条定理的推论之一是，若 $x=y$，则 $x\gt x$ 等价于 $y\gt z$。

#### 不等号的连接性

这条定理需要用到 $\mathrm{\left(0\right)}$，因此对于游戏不适用。

$$
\tag{T2}
\begin{aligned}
\forall &\left(x\in\mathbf{No}\right)\left(\forall x\_L,x\_R \left(x\_L\lt x\lt x\_R\right)\right) \\\\
\forall &\left(x,y\in\mathbf{No}\right)\left(x\le y\lor y\le x\right)
\end{aligned}
$$

> **证明：**
>
> 1. 已经证明，$x\not\ge x\_R$ 故只需证明 $x\_R\ge x$。根据定义，它成立当且仅当 $x\_{RR}\le x$ 或 $x\_R\le x\_L$。若前者成立，根据归纳假设，有 $x\_R\lt x\_{RR}\le x$。而后者根据 $\mathrm{\left(0\right)}$ 不成立。
> 2. 若 $x\not\ge y$，则 $x\_R\le y$ 或 $x\le y\_L$，即 $x\lt x\_R\le y$ 或 $x\le y\_L\lt y$。

因此，全体数字是全序的。
