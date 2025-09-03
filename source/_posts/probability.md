---
title: 概率论
mathjax: true
date: "2025-06-06T13:11:18.313+0800"
updated: "2025-06-06T13:11:18.313+0800"
categories:
  - Math
tags:
  - probability
---

{% note note open %}
本节内容基本摘自[普通高中教科书 数学 必修 第二册（A版）](https://book.pep.com.cn/1421001122191/mobile/index.html) 和 [OI-wiki](https://oi-wiki.org/math/probability/basic-conception/)。
{% endnote %}

## 基本概念

### 样本空间和随机事件

将随机试验 $E$ 的每个可能的基本结果称为 **样本点**，全体样本点的集合称为 **样本空间**。一般使用 $\Omega$ 表示样本空间。

一个 **随机事件** 是样本空间 $\Omega$ 的子集，通常使用大写字母 $A,B,C,\cdots$ 表示。

对于一个随机现象的结果（样本点）$\omega$ 和一个随机事件 $A$，称 $A$ 发生当且仅当 $\omega\in A$。

### 必然事件和不可能事件

容易说明，$\Omega$ 在每次随机试验中总会发生，因此称 $\Omega$ 为 **必然事件**；而 $\varnothing$ 在每次试验中都不会发生，因此称 $\varnothing$ 为 **不可能事件**。

### 事件的运算/关系

由于将随机事件定义为 $\Omega$ 的子集，因此可以使用集合运算和关系描述随机事件的运算和关系。

#### 包含

若事件 $A$ 发生，则事件 $B$ 一定发生，就称事件 $B$ **包含** 事件 $A$，或称事件 $A$ **包含于** 事件 $B$：

$$
\omega\in A\Rightarrow \omega\in B
$$

显然这等价于 $B\supseteq A$ 或 $A\subseteq B$。

特别地，若事件 $A$ 包含于事件 $B$ 且事件 $B$ 包含于事件 $A$，则称事件 $A$ 与事件 $B$ 相等，记作 $A=B$。

#### 并事件（和事件）

将事件“事件 $A$ 与事件 $B$ 至少有一个发生”称为事件 $A$ 与事件 $B$ 的 **和事件**（**并事件**），使用集合语言表示，就是 $A\cup B$，也记作 $A+B$。

#### 交事件（积事件）

将事件“事件 $A$ 与事件 $B$ 同时发生”称为事件 $A$ 与事件 $B$ 的 **积事件**（**交事件**），用集合语言表示，就是 $A\cap B$，也记作 $AB$。

#### 互斥（互不相容）

若事件 $A$ 和事件 $B$ 不能同时发生，即积事件 $A\cap B$ 为不可能事件，就称事件 $A$ 和事件 $B$ **互不相容**（**互斥**）。用集合语言，就是 $A\cap B=\varnothing$。

#### 对立

若事件 $A$ 和事件 $B$ 只能发生其中之一，并且必然发生其中之一，即和事件 $A\cup B$ 为必然事件，积事件 $A\cap B$ 为不可能事件，就称事件 $A$ 和事件 $B$ **互为对立**。

若 $A$ 和 $B$ 互为对立，也称 $B$ 是 $A$ 的补事件。

用集合语言，就是 $\left(A\cup B=\Omega\right)\land\left(A\cap B=\varnothing\right)$。

或者，也可以表述为 $\complement\_\Omega A=B$ 或 $\bar{A}=B$（补集的两种符号表示）。

### 事件域

在研究概率事件时，我们可能对其中的一些事件不感兴趣，我们将我们关心的所有事件称为 **事件域**，记作 $\mathcal{F}$。

根据定义，必须有 $\mathcal{F}\subset 2^{\Omega}$，但是 $\mathcal{F}=2^{\Omega}$ 不是必须的。

这在样本空间有限时可能难以理解，但是若 $\Omega$ 为无穷集，$2^{\Omega}$ 的势变得更大，可能出现一些*性质不好*且我们不关心的事件。

但是，由于我们会讨论一些事件的运算结果，因此我们希望事件域 $\mathcal{F}$ 满足：

+ $\varnothing\in \mathcal{F}$；
+ $\forall A\in\mathcal{F}:\bar{A}\in\mathcal{F}$；
+ $\forall A,B\in\mathcal{F}:\left(A\cup B\right)\in\mathcal{F}$。

换句话说，事件域 $\mathcal{F}$ 应该对补运算和可数并封闭，并且包含 $\varnothing$。

容易证明，此时 $\mathcal{F}$ 包含 $\Omega$ 且对于可数交封闭。

{% warning 关于“可数” fold %}
请注意，可数并/可数交中的 **可数** 不可忽略。

例如，如果 $\mathcal{F}$ 为 $\mathbf{Z}$ 的子集族，且 $\forall n\in\mathbb{Z}:\left\\{n\right\\}\in F$，则这时我们不需要偶数集等本身和补集均为无限集的集合。

若要求对任意并也封闭，则显然 $\mathcal{F}=2^{\mathbb{Z}}$。
{% endwarning %}

### 概率

#### 古典定义

若一个随机试验满足

1. 有限性：样本空间有限大；
2. 等可能性：每个样本点发生的可能性相等。

则称这个随机试验为 **古典概型试验**，其数学模型称为 **古典概率模型**，简称 **古典概型**。

在古典概型中，事件 $A$ 的概率为

$$
P\left(A\right)=\dfrac{\\#\left(A\right)}{\\#\left(\Omega\right)}
$$

其中 $\\#\left(\cdot\right)$ 表示对于集合大小的度量，在集合 $A$ 为有限集时，也用 $\operatorname{card}\left(A\right)$，$n\left(A\right)$，$|A|$ 等表示 $A$ 的大小。

直觉上，这个定义可以扩充到 $\Omega$ 无限大的部分情形上，因此有了所谓的“几何概型”。

#### 公理化定义

但是，如果仅仅依照直觉定义 $\Omega$ 无限的情形，将引出 [Bertrand 悖论](https://en.wikipedia.org/wiki/Bertrand_paradox_(probability)) 等一系列问题。

对于一般的 $\Omega$，规定：

概率函数 $P$ 是一个从事件域 $\mathcal{F}$ 到闭区间 $[0,1]$ 的映射，满足：

1. 规范性：$P\left(\Omega\right)=1$；
2. 可数可加性，若 $A\_1,A\_2,\cdots,A\_n$ 两两不交，则 $P\left(\bigcup A\right)=\sum P\left(A\right)$。

我们将由样本空间 $\Omega$、事件域 $\mathcal{F}$ 以及概率函数 $P$ 构成的三元组 $\left(\Omega,\mathcal{F},P\right)$ 称为概率空间。

概率只有在确定的概率空间下讨论才有意义。

#### 概率函数的性质

从概率函数的定义中，容易得到：

对于任意随机事件 $A,b\in\mathcal{F}$，有

+ 单调性：若 $A\subset B$，则 $P\left(A\right)\leqslant P\left(B\right)$；
+ 容斥原理：$P\left(A+B\right)=P\left(A\right)+P\left(B\right)-P\left(AB\right)$；
+ $P\left(A-B\right)=P\left(A\right)-P\left(AB\right)$，这里 $A-B$ 表示差集。

## 条件概率

在某事件已经发生时，一些随机事件的概率会随已知信息的增加发生变化。因此我们需要研究在某些已知条件下事件发生的概率。

已知事件 $A$ 发生，此时事件 $B$ 发生的概率称为 **条件概率**，记作 $P\left(B\mid A\right)$。

在概率空间 $\left(\Omega,\mathcal{F},P\right)$ 中，若事件 $A$ 满足 $P\left(A\right)\ge 0$，则条件概率 $P\left(B\mid A\right)$ 定义为：

$$
P\left(B\mid A\right)=\dfrac{P\left(AB\right)}{P\left(A\right)}
$$

容易证明 $P\left(\cdot\mid A\right)$ 是 $\left(\Omega,\mathcal{F}\right)$ 上的概率函数。

根据条件概率的定义，容易证明：

+ **概率乘法公式**：在概率空间 $\left(\Omega,\mathcal{F},P\right)$ 中，若 $P\left(A\right)\ge 0$，则

  $$
  P\left(AB\right)=P\left(A\right)P\left(B\mid A\right)
  $$

+ **全概率公式**：在概率空间 $\left(\Omega,\mathcal{F},P\right)$ 中，若 $A\_1,A\_2,\cdots,A\_n$ 两两不交且和为 $\Omega$，则对于任意事件 $B$:

  $$
  P\left(B\right)=\sum\_{i=1}^{n}P\left(A\_i\right)P\left(B\mid A\_i\right)
  $$

### Bayes 公式

用于通过事件 $B$ 发生反推各个原因事件的发生概率：

$$
P\left(A\mid B\right)=\dfrac{P\left(AB\right)}{P\left(B\right)}=\dfrac{P\left(A\right)P\left(B\mid A\right)}{P\left(B\right)}
$$

若 $A\_1,A\_2,\cdots A\_n$ 两两不交且和为 $\Omega$，则 Bayes 公式写为：

$$
\forall i: P\left(A\_i\mid B\right)=\dfrac{P\left(A\_i\right)P\left(B\mid A\_i\right)}{P\left(B\right)}=\dfrac{P\left(A\_i\right)P\left(B\mid A\_i\right)}{\sum\_{j=1}^{n}P\left(A\_j\right)P\left(B\mid A\_j\right)}
$$

## 独立事件

在条件概率中，可能出现 $P\left(B\mid A\right)=P\left(B\right)$ 的情况；从直觉上说，就是事件 $B$ 是否发生不影响事件 $A$ 是否发生。

因此定义：

若同一概率空间的事件 $A,B$ 满足

$$
P\left(AB\right)=P\left(A\right)P\left(B\right)
$$

则称 $A,B$ **独立**。

对于多个事件 $A\_1,A\_2,\cdots,A\_n$，称它们独立，当且仅当对于任意一组事件 $\left\\{A\_{i\_k}\mid 1\le i\_1\le i\_2\le\cdots\le i\_r\le n\right\\}$，都有

$$
P\left(A\_{i\_1}A\_{i\_2},\cdots A\_{i\_r}\right)=\prod\_{k=1}^{r}P\left(A\_{i\_k}\right)
$$

{% warning 多个事件的独立性 open %}
对于多个事件，这些事件独立一般强于这些事件两两独立。

例如，考虑一个古典概型，样本空间 $\Omega=\left\\{1,2,3,4\right\\}$，事件 $A,B,C$ 定义为

$$
\begin{aligned}
  A &= \left\\{1,4\right\\} \\\\
  B &= \left\\{2,4\right\\} \\\\
  C &= \left\\{3,4\right\\} \\\\
\end{aligned}
$$

则不难得到：

+ $P\left(A\right)=P\left(B\right)=P\left(C\right)=\dfrac{1}{2}$；
+ $P\left(AB\right)=P\left(BC\right)=P\left(CA\right)=P\left(ABC\right)=\dfrac{1}{4}$。

因此 $A,B,C$ 两两独立，但 $A,B,C$ 不独立。
{% endwarning %}

## 随机变量

### 定义

给定概率空间 $\left(\Omega,\mathcal{F},P\right)$，若函数 $X:\Omega\to\mathbb{R}$ 满足

$$
\forall t\in \mathbb{R}\left(\left\\{\omega\in\Omega:X\left(\omega\right)\le t\right\\}\in\mathcal{F}\right)
$$

则称 $X$ 为 **随机变量**。

换句话说，事件 $X\left(\omega\right)\le t$ 在样本空间 $\Omega$ 中。

### 示性函数

对于样本空间 $\Omega$ 上的事件 $A$，定义随机变量

$$
I\_A\left(\omega\right)=\begin{cases}
  1, &\omega\in A \\\\
  0, &\omega\notin A
\end{cases}
$$

称 $I\_A$ 为事件 $A$ 的 **示性函数**。

### 分布函数

对于随机变量 $X$，称

$$
F\left(x\right)=P\left(X\le x\right)
$$

为随机变量 $X$ 的 **分布函数**。记作 $X\sim F\left(x\right)$。

分布函数有以下性质：

+ 右连续性：$F\left(x\right)=F\left(x+0\right)$
+ 单调性：在 $\mathbb{R}$ 上单调不降
+ $F\left(-\infty\right)=0,F\left(+\infty\right)=1$

可以证明，满足上述要求的函数都是某个随机变量的分布函数。因此，分布函数与随机变量之间一一对应。

### 随机变量的分类

根据值域是否可数分为 **离散型** 和 **连续型**。

对于离散型随机变量，其所有可能的取值为 $x\_1,x\_2,\cdots$，则可以用一系列形如 $P\left(X=x\_i\right)=p\_i$ 的等式描述 $X$。后者就是高中课本提到的 **分布列**。

对于连续型随机变量，通常 $P\left(X=x\right)$ 为 $0$。

### 密度函数

对于一个随机变量 $X$，$F\left(x\right)$ 为其分布函数，若 $f\left(x\right)$ 满足

$$
F\left(x\_0\right)=\int\_{-\infty}^{x\_0}f\left(x\right)\mathrm{d}x
$$

称 $f\left(x\right)$ 为 $X$ 的 **密度函数**。

显然 $f\left(x\right)$ 不一定存在。

离散情形下的 **频数分布直方图** 在组距趋近于 $0$ 时，就变为密度函数。
