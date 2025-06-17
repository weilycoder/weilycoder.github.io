---
title: ZFC 集合论公理体系
categories:
  - Math
date: "2025-06-16T22:27:33.927+0800"
mathjax: true
tags:
  - axiom
  - set-theory
---

ZF 公理体系中，元素有且只有一种类型，即集合（set）。

包含选择公理（AC）时，缩写为 ZFC 公理体系。

## Extensionality 外延公理

$$
\forall x\forall y[\forall z\left(z\in x\leftrightarrow z\in y\right)\rightarrow x=y]
$$

这条公理规定了等号的含义。

## Null Set 空集公理

$$
\exists x\lnot\exists y\left(y\in x\right)
$$

由外延公理可以证明这个集合唯一，我们引入符号 $\varnothing$ 表示这个集合 $x$。

## Pairs 配对公理

$$
\forall x\forall y\exists z\forall w\left(w\in z\leftrightarrow w=x\lor w=y\right)
$$

配对公理规定对于任意的 $x$ 和 $y$，存在一个集合为 $\left\\{x,y\right\\}$；特别地，对于任意的 $x$，存在集合 $\left\\{x\right\\}$。

## Power Set 幂集公理

$$
\forall x\exists y\forall z[z\in y\leftrightarrow \forall w\left(w\in z\rightarrow w\in x\right)]
$$

幂集公理规定对于任意集合 $x$ 存在集合 $y$ 包含且只包含 $x$ 的子集。由于可以证明这种集合唯一，我们使用 $\mathscr{P}\left(x\right)$ 表示这个集合，称它为 $x$ 的幂集。

如果我们规定了子集符号 $x\subseteq y$ 表示 $\forall z\left(z\in x\rightarrow z\in y\right)$，则幂集公理也可以写作

$$
\forall x\exists y\forall z\left(z\in y\leftrightarrow z\subseteq y\right)
$$

## Unions 并集公理

$$
\forall x\exists y\forall z[z\in y\leftrightarrow \exists w\left(w\in x\land z\in w\right)]
$$

并集公理规定，对于任何集合 $x$，存在一个集合 $y$，使得它包含所有 $x$ 的成员的成员。

由于任何集合 $x$ 的并集唯一，我们使用 $\bigcup x$ 表示它。

## Infinity 无穷公理

$$
\exists x[\varnothing\in x\land \forall y\left(y\in x\rightarrow \bigcup\left\\{y,\left\\{y\right\\}\right\\}\in x\right)]
$$

若我们将 $\bigcup\left\\{x,y\right\\}$ 记作 $x\cup y$，则另一种写法为：

$$
\exists x[\varnothing\in x\land \forall y\left(y\in x\rightarrow y\cup \left\\{y\right\\}\in x\right)]
$$

无穷公理保证了以下形式的集合：

$$
\left\\{\varnothing,\left\\{\varnothing\right\\},\left\\{\varnothing,\left\\{\varnothing\right\\}\right\\},\left\\{\varnothing,\left\\{\varnothing\right\\},\left\\{\varnothing,\left\\{\varnothing\right\\}\right\\}\right\\},\ldots\right\\}
$$

这在形式上与自然数集相同，但是无穷公理规定的集合不唯一，若希望取出唯一的自然数集，可以使用分类公理模式。

## Separation 分离公理模式

$$
\forall u\_1\ldots\forall u\_k[\forall w\exists v\forall r\left(r\in v\leftrightarrow r\in w\land \psi\left(r,u\_1,\ldots,u\_k\right)\right)]
$$

分离公理模式使用元变量 $\psi$ 表示一系列满足这个形式的公理。

实际上，公式 $\psi\left(\cdot,u\_1,\ldots,u\_k\right)$ 可以看作一个类（class）。分离公理模式规定可以从任意的集合 $w$ 中取出所有满足公式 $\psi$ 的元素构成一个集合 $v$。可以证明这个集合是唯一的。使用集合建构式符号记作 $\left\\{r\in w:P\left(r\right)\right\\}$。

利用分离公理，可以定义集合的交。

分离公理模式暗示了没有全体集合构成的集合。

## Replacement 替代公理模式

$$
\forall u\_1\ldots\forall u\_k[\forall x\exists!y\phi\left(x,y,u\_1,\ldots,u\_k\right)\rightarrow\forall w\exists v\forall r\left(r\in v\leftrightarrow \exists s\left(s\in w\land \phi\left(s,r,u\_1,\ldots,u\_k\right)\right)\right)]
$$

其中 $\exists!y$ 表示存在唯一的 $y$，这也可以写作

$$
\forall x\forall y\forall z[\phi\left(x,y\right)\land \phi\left(x,z\right)\rightarrow y=z]
$$

因此是合法的，但是前者更简洁。

替代公理的前半部分 $\forall x\exists!y\phi\left(x,y,u\_1,\ldots,u\_k\right)$ 中公式 $\phi$ 实际上可以看作一个函数 $y=P\left(x\right)$，因为 $\phi$ 对于任意的 $x$ 都有唯一输出 $y$。

替代公理的后半部分规定，对于任意一个集合 $w$，都存在一个集合 $v$，后者是由 $P$ 应用到 $w$ 中每个元素上形成的像集。

用更简洁的写法就是：

$$
v=f[w]=\left\\{f\left(s\right):s\in w\right\\}
$$

## Regularity 良基公理

$$
\forall x[x\ne\varnothing\rightarrow\exists y\left(y\in x\land \forall z\left(z\in x\rightarrow \lnot\left(z\in y\right)\right)\right)]
$$

这句话否认了诸如 $x\in y\land y\in z\land z\in x$ 一类的集合。

## Choice 选择公理

即 ZFC 中的 C，缩写为 AC。

$$
\forall X[\varnothing\notin X\Rightarrow \exists f:X\to \bigcup X \forall A\in X\left(f\left(A\right)\in A\right)]
$$

简单来说，给定一些非空集合，存在一个函数，可以从每个集合中选择出一个元素。
