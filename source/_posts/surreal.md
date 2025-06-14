---
title: Surreal Numbers
categories:
  - Math
date: 2025-05-16 17:14:14
update: "2025-06-07T18:34:16.677+0800"
mathjax: true
tags:
  - surreal-numbers
  - games
---

本文可以视为 weilycoder 阅读 <a href="/files/ONAG.7z" target="_blank"><em>On Numbers and Games</em></a> 的笔记。

## 构造

若 $L,R$ 为任意满足条件的两个 Surreal Number（超现实数，以下简称“数”）构成的集合，则 $\left\\{L\mid R\right\\}$ 为一个数。

规定：

$$
\tag{0} \forall x\_L \in L,x\_R \in R\left(x\_L\in\mathbf{No}\land x\_R\in\mathbf{No}\land x\_L \not \geqslant x\_R\right).
$$

## 约定

+ 定义 $\mathbf{No}$ 表示全体数构成的类（class）。
+ 若 $x:=\left\\{L\mid R\right\\}$，则使用 $x\_L$ 表示 $L$ 中的元素；$x\_R$ 表示 $R$ 中的元素。对于 $x$，也记作 $\left\\{x\_L\mid x\_R\right\\}$。
+ $x:=\left\\{a,b,c,\dots\mid d,e,f\dots\right\\}$ 表示 $x:=\left\\{\left\\{a,b,c,\dots\right\\}\mid\left\\{d,e,f,\dots\right\\}\right\\}$。

## 定义

+ $x\geqslant y$ 和 $x\leqslant y$ 的定义

  $$
  \tag{1}
  \begin{aligned}
    \left(x\geqslant y\right) &\Leftrightarrow \left(\left(\not\exists x\_R\leqslant y\right)\land\left(\not\exists y\_L\geqslant x\right)\right); \\\\
    \left(x\leqslant y\right) &\Leftrightarrow \left(y\geqslant x\right)
  \end{aligned}
  $$

+ $x=y$、$x\gt y$、$x\lt y$、$x\ne y$、$x\parallel y$ 的定义

  $$
  \begin{aligned}
    \left(x=y\right) &\Leftrightarrow \left(\left(x\geqslant y\right)\land\left(y\geqslant x\right)\right) \\\\
    \left(x\gt y\right) &\Leftrightarrow \left(\left(x\geqslant y\right)\land\left(y\not\geqslant x\right)\right) \\\\
    \left(x\lt y\right) &\Leftrightarrow \left(y\gt x\right) \\\\
    \left(x\ne y\right) &\Leftrightarrow \lnot\left(x=y\right) \\\\
    \left(x\parallel y\right) &\Leftrightarrow \left(\left(x\not\geqslant y\right)\land \left(y\not\geqslant x\right)\right)
  \end{aligned}
  $$

+ $x+y$ 的定义

  $$
  \tag{2} x+y:=\left\\{x\_L+y,x+y\_L\mid x\_R+y,x+y\_R\right\\}
  $$

+ $-x$ 的定义

  $$
  \tag{3} -x:=\left\\{-x\_R\mid -x\_L\right\\}
  $$

+ $xy$ 的定义

  $$
  \tag{4} xy:=\left\\{x\_Ly+xy\_L-x\_Ly\_L,x\_Ry+xy\_R-x\_Ry\_R\mid x\_Ly+xy\_R-x\_Ly\_R,x\_Ry+xy\_L-x\_Ry\_L\right\\}
  $$

  以下是一个意义更明确的写法，但是不严谨：

  $$
  xy:=\left\\{xy-\left(x-x\_L\right)\left(y-y\_L\right),xy-\left(x\_R-x\right)\left(y\_R-y\right)\mid xy+\left(x-x\_L\right)\left(y\_R-y\right),xy+\left(x\_R-x\right)\left(y-y\_L\right)\right\\}
  $$

  有时也使用 $x\cdot y$ 表示两个数相乘。

由于等号 $=$ 的特殊性，需要指出，这里的等号意义比“相等”要弱一些，具体表现在，我们可以构造一种运算 $f$，使得 $x=y$ 与 $f\left(x\right)=f\left(y\right)$ 不等价。

因此，我们规定，定义变量的时候，使用 $:=$ 表示赋值/定义；使用 $\equiv$ 表示两个数的 $L$ 和 $R$ 分别相等（称为全等/恒等，递归定义，这时若 $x\equiv y$，则显然可以将式子中的一切 $y$ 替换为 $x$）。

{% note code open %}
这里使用 Python(3.13) 编写了一个简单的 Surreal Number 的类，对象不可变，支持了 $\geqslant,\leqslant,+,-,\times$（`__ge__`, `__le__`, `__add__`, `__neg__`, `__sub__`, `__mul__`）；可以使用 `is` 运算判断两个数全等。

由于 Python hashable 对象的相关 feature，定义 `__eq__` 为 $=$ 会导致一些冲突，而定义 `__eq__` 为 $\equiv$（`is`）会导致歧义；故不定义 `__eq__` 方法。

方便验证一些数的大小关系。

```python
# pylint: disable=line-too-long,invalid-name

"""Surreal Numbers"""

from __future__ import annotations

from functools import lru_cache
from typing import Iterable


class SurrealNumber:
    """A surreal number represented by two sets of surreal numbers."""

    aliases: dict[SurrealNumber, str] = {}
    No: dict[tuple[frozenset[SurrealNumber], frozenset[SurrealNumber]], SurrealNumber] = {}

    L: frozenset[SurrealNumber]
    R: frozenset[SurrealNumber]

    def __new__(
        cls,
        left: Iterable[SurrealNumber] = (),
        right: Iterable[SurrealNumber] = (),
        name: str = "",
    ) -> SurrealNumber:
        """Create a new surreal number or return an existing one."""
        key = (frozenset(left), frozenset(right))
        if not all(isinstance(x, SurrealNumber) for x in key[0]):
            raise TypeError("Left set must contain only surreal numbers.")
        if not all(isinstance(x, SurrealNumber) for x in key[1]):
            raise TypeError("Right set must contain only surreal numbers.")
        if key not in cls.No:
            instance = super().__new__(cls)
            instance.L, instance.R = key
            cls.No[key] = instance
        if name != "":
            cls.No[key].set_alias(name)
        return cls.No[key]

    def set_alias(self, name: str) -> None:
        """Set an alias for the surreal number."""
        if self in self.aliases:
            raise ValueError(f"Alias already exists for {self}")
        self.aliases[self] = name

    @lru_cache(maxsize=1 << 24)
    def __ge__(self, other: SurrealNumber) -> bool:
        """Check if this surreal number is greater than or equal to another."""
        return not any(right <= other for right in self.R) and not any(left >= self for left in other.L)

    @lru_cache(maxsize=1 << 24)
    def __le__(self, other: SurrealNumber) -> bool:
        """Check if this surreal number is less than or equal to another."""
        return other >= self

    @lru_cache(maxsize=1 << 24)
    def __add__(self, other: SurrealNumber) -> SurrealNumber:
        """Add two surreal numbers."""
        return SurrealNumber(
            {xL + other for xL in self.L} | {self + yL for yL in other.L},
            {xR + other for xR in self.R} | {self + yR for yR in other.R},
        )

    @lru_cache(maxsize=1 << 24)
    def __neg__(self) -> SurrealNumber:
        """Negate the surreal number."""
        return SurrealNumber({-x for x in self.R}, {-x for x in self.L})

    @lru_cache(maxsize=1 << 24)
    def __sub__(self, other: SurrealNumber) -> SurrealNumber:
        """Subtract two surreal numbers."""
        return self + (-other)

    @lru_cache(maxsize=1 << 24)
    def __mul__(self, other: SurrealNumber) -> SurrealNumber:
        """Multiply two surreal numbers."""
        L1 = {xL * other + self * yL - xL * yL for xL in self.L for yL in other.L}
        L2 = {xR * other + self * yR - xR * yR for xR in self.R for yR in other.R}
        R1 = {xL * other + self * yR - xL * yR for xL in self.L for yR in other.R}
        R2 = {xR * other + self * yL - xR * yL for xR in self.R for yL in other.L}
        return SurrealNumber(L1 | L2, R1 | R2)

    @lru_cache(maxsize=1 << 24)
    def to_string(self, alias: bool = True) -> str:
        """Return a string representation of the surreal number."""
        if alias and self in self.aliases:
            return self.aliases[self]
        left_str = ", ".join(sorted(x.to_string(alias) for x in self.L))
        right_str = ", ".join(sorted(x.to_string(alias) for x in self.R))
        return f"{{{left_str} | {right_str}}}"

    def __repr__(self) -> str:
        """Return a string representation of the surreal number."""
        return self.to_string()

    def __str__(self) -> str:
        """Return a string representation of the surreal number."""
        return self.to_string()
```
{% endnote %}

## 超限归纳

不加说明地引入“超限归纳法”。

假设一个性质 $P$ 满足：$\left(P\left(x\_L\right)\land P\left(x\_R\right)\right)\Rightarrow P\left(x\right)$，则任意数 $x$ 都满足性质 $P\left(x\right)$。

二元形式为，若 $P$ 满足：$\left(P\left(x\_L,y\right)\land P\left(x\_R,y\right)\land P\left(x,y\_L\right)\land P\left(x,y\_R\right)\right)\Rightarrow P\left(x,y\right)$，则任意数 $x,y$ 满足 $P\left(x,y\right)$。

没有归纳起点 $P\left(0\right)$ 的原因留给读者思考。

## 博弈

我们同样允许表达式 $x=\left\\{L\mid R\right\\}$，这里 $L,R$ 不满足 $\mathrm{\left(0\right)}$。

由于这种形式在非公平博弈中被引入，我们称它为博弈（game）。

{% hide （值得指出的是，公平博弈属于非公平博弈，因此 Nim 数也可以使用博弈表述）。 %}

显然博弈也应该满足超限归纳法。

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
  0 &= \left\\{\mid\right\\} \\\\
  1 &= \left\\{0\mid\right\\} \\\\
  -1 &=\left\\{\mid 0\right\\} \\\\
  2 &= \left\\{1\mid\right\\}=\left\\{0,1\mid\right\\}=\cdots \\\\
  -2 &= \left\\{\mid -1\right\\}=\left\\{\mid -1,0\right\\}=\cdots \\\\
  \frac{1}{2} &= \left\\{0\mid 1\right\\}=\left\\{-1,0\mid 1\right\\}=\cdots \\\\
  &\cdots \\\\
  \omega &= \left\\{0,1,2,\cdots,\mid\right\\} \\\\
  \epsilon &= \left\\{0\mid 1,\frac{1}{2},\frac{1}{4},\cdots\right\\} \\\\
  \frac{1}{3} &= \left\\{\frac{1}{4},\frac{1}{4}+\frac{1}{16},\cdots\mid \frac{1}{2},\frac{1}{2}-\frac{1}{8},\cdots\right\\} \\\\
  &\cdots
\end{aligned}
$$

可以验证，上述命名符合我们使用实数的习惯（$1+1=2,0\lt 1\lt 2,\cdots$）。

这里给出一个可以简化比较的引理：

+ 若 $y\not\geqslant x$，则 $\left\\{y,x\_L\mid x\_R\right\\}=x$；
+ 若 $y\not\leqslant x$，则 $\left\\{x\_L\mid y,x\_R\right\\}=x$。

## 基础定理

若无说明，以下定理适用于全体博弈。

### 比较运算律

#### 等号的自反性

$$
\tag{T0}
\begin{align\*}
  \tag{i} x \not\geqslant x\_R \\\\
  \tag{ii} x\_L \not\geqslant x \\\\
  \tag{iii} x \geqslant x \\\\
  \tag{iv} x = x
\end{align\*}
$$

{% note Proof fold %}
1. 将定义中的 $y$ 使用 $x\_R$ 替换，发现一定有 $x\_R\leqslant x\_R'$，因此 $x\geqslant x\_R$ 不成立。
2. 同理可证。
3. 令 $y:=x$，我们已经证明不存在 $x\_R\leqslant y$ 且不存在 $y\_L\geqslant x$，因此 $x\geqslant y$。
4. 由等号的定义得。
{% endnote %}

#### 不等号的传递性

$$
\tag{T1}
\left(\left(x\geqslant y\right)\land \left(y\geqslant z\right)\right) \Rightarrow x\geqslant z
$$

{% note Proof fold %}
因为 $x\geqslant y$，因此不存在 $x\_R\leqslant y$，由归纳假设，不存在 $x\_R\leqslant z$，同理得不存在 $z\_L\geqslant x$，因此命题成立。
{% endnote %}

$\mathrm{\left(T1\right)}$ 的推论很多，下面列出一部分：

$$
\begin{align\*}
  \tag{i} \left(\left(x\leqslant y\right)\land \left(y\leqslant z\right)\right) &\Rightarrow x\leqslant z \\\\
  \tag{ii} \left(\left(x=y\right)\land \left(y=z\right)\right) &\Rightarrow x=z \\\\
  \tag{iii} \left(\left(x=y\right)\land \left(y\ne z\right)\right) &\Rightarrow x\ne z \\\\
  \tag{iv} \left(\left(x=y\right)\land \left(y\geqslant z\right)\right) &\Rightarrow x\geqslant z \\\\
  \tag{v} \left(\left(x\geqslant y\right)\land \left(y=z\right)\right) &\Rightarrow x\geqslant z \\\\
  \tag{vi} \left(\left(x\geqslant y\right)\land \left(y\gt z\right)\right) &\Rightarrow x\gt z \\\\
  \tag{vii} \left(\left(x\gt y\right)\land \left(y\geqslant z\right)\right) &\Rightarrow x\gt z \\\\
  \tag{viii} \left(\left(x=y\right)\land \left(y\gt z\right)\right) &\Rightarrow x\gt z \\\\
  \tag{ix} \left(\left(x\gt y\right)\land \left(y=z\right)\right) &\Rightarrow x\gt z \\\\
  \tag{x} \left(\left(x\geqslant y\right)\land \left(y\not\leqslant z\right)\right) &\Rightarrow x\not\leqslant z \\\\
  \tag{xi} \left(\left(x\not\leqslant y\right)\land \left(y\geqslant z\right)\right) &\Rightarrow x\not\leqslant z \\\\
  \tag{xii} \left(\left(x=y\right)\land \left(y\parallel z\right)\right) &\Rightarrow x\parallel z
\end{align\*}
$$

{% note Proof fold %}
+ $\mathrm{\left(i\right)}$：将 $\mathrm{T1}\left(x,y,z\right)$ 换成 $\mathrm{T1}\left(z,y,x\right)$ 即可；
+ $\mathrm{\left(ii\right)}$：由 $\mathrm{\left(T1\right)}$ 和 $\mathrm{\left(i\right)}$ 得；
+ $\mathrm{\left(iii\right)}$：反证，不成立由 $\mathrm{\left(ii\right)}$ 得矛盾；
+ $\mathrm{\left(iv\right)}$：显然是 $\mathrm{\left(T1\right)}$ 的子集；
+ $\mathrm{\left(v\right)}$：同上；
+ $\mathrm{\left(vi\right)}$：由 $\mathrm{\left(T1\right)}$ 得 $x\geqslant z$，又 $x=z$ 导出矛盾；
+ $\mathrm{\left(vii\right)}$：与 $\mathrm{vi}$ 类似；
+ $\mathrm{\left(viii\right)}$：$\mathrm{\left(vi\right)}$ 的子集；
+ $\mathrm{\left(ix\right)}$：$\mathrm{\left(vii\right)}$ 的子集；
+ $\mathrm{\left(x\right)}$：反证法；
+ $\mathrm{\left(xi\right)}$：反证法；
+ $\mathrm{\left(xii\right)}$：由 $\mathrm{\left(x\right)}$ 和 $\mathrm{\left(xi\right)}$ 得。
{% endnote %}

尽量选用了大于号形式的结果，如果将 $x,z$ 轮换，可以得到小于号形式的结果（就像 $\mathrm{\left(i\right)}$）。

#### 不等号的连接性

这条定理需要用到 $\mathrm{\left(0\right)}$，因此对于博弈不适用。

$$
\tag{T2}
\begin{aligned}
  \forall &\left(x\in\mathbf{No}\right)\left(\forall x\_L,x\_R \left(x\_L\lt x\lt x\_R\right)\right) \\\\
  \forall &\left(x,y\in\mathbf{No}\right)\left(x\leqslant y\lor y\leqslant x\right)
\end{aligned}
$$

{% note Proof fold %}
1. 已经证明 $x\not\geqslant x\_R$，故只需证明 $x\_R\geqslant x$。根据定义，它成立当且仅当 $x\_{RR}\leqslant x$ 或 $x\_R\leqslant x\_L$。若前者成立，根据归纳假设，有 $x\_R\lt x\_{RR}\leqslant x$。而后者根据 $\mathrm{\left(0\right)}$ 不成立。
2. 若 $x\not\geqslant y$，则 $x\_R\leqslant y$ 或 $x\leqslant y\_L$，即 $x\lt x\_R\leqslant y$ 或 $x\leqslant y\_L\lt y$。
{% endnote %}

因此，全体数是全序的。

### 加法运算律

$$
\tag{T3}
\begin{align\*}
  x+0 &\equiv x \\\\
  x+y &\equiv y+x \\\\
  \left(x+y\right)+z &\equiv x+\left(y+z\right)
\end{align\*}
$$

{% note Proof fold %}
$$
\begin{aligned}
  x+0
  &\equiv \left\\{x\_L+0\mid x\_R+0\right\\} \\\\
  &\equiv \left\\{x\_L\mid x\_R\right\\} \\\\
  &\equiv x \\\\
  x+y
  &\equiv \left\\{x\_L+y,x+y\_L\mid x\_R+y,x+y\_R\right\\} \\\\
  &\equiv \left\\{y+x\_L,y\_L+x\mid y+x\_R,y\_R+x\right\\} \\\\
  &\equiv \left\\{y\_L+x,y+x\_L\mid y\_R+x,y+x\_R\right\\} \\\\
  &\equiv y+x \\\\
  \left(x+y\right)+z
  &\equiv \left\\{\left(x+y\right)\_L+z,\left(x+y\right)+z\_L\mid \cdots\right\\} \\\\
  &\equiv \left\\{\left(x\_L+y\right)+z,\left(x+y\_L\right)+z,\left(x+y\right)+z\_L\mid\cdots\right\\} \\\\
  &\equiv \left\\{x\_L+\left(y+z\right),x+\left(y\_L+z\right),x+\left(y+z\_L\right)\mid\cdots\right\\} \\\\
  &\equiv \cdots \\\\
  &\equiv x+\left(y+z\right)
\end{aligned}
$$
{% endnote %}

$x+0\equiv x$ 意味着 $0$ 是加法单位元，这也是我们将 $\left\\{\mid\right\\}$ 称为 $0$ 的原因。

### 减法（相反数）运算律

$$
\tag{T4}
\begin{align\*}
  \tag{i} -\left(x+y\right) &\equiv \left(-x\right)+\left(-y\right) \\\\
  \tag{ii} -\left(-x\right) &\equiv x \\\\
  \tag{iii} x+\left(-x\right) &= 0
\end{align\*}
$$

{% note Proof fold %}
$\mathrm{\left(i\right)}$ 和 $\mathrm{\left(ii\right)}$ 是显然的：

$$
\begin{aligned}
  -\left(x+y\right)
  &\equiv -\left\\{x\_L+y,x+y\_L\mid x\_R+y,x+y\_R\right\\} \\\\
  &\equiv \left\\{-\left(x\_R+y\right),-\left(x+y\_R\right)\mid -\left(x\_L+y\right),-\left(x+y\_L\right)\right\\} \\\\
  &\equiv \left\\{-x\_R-y,-x-y\_R\mid -x\_L-y,-x-y\_L\right\\} \\\\
  &\equiv \left(-x\right)+\left(-y\right) \\\\
  -\left(-x\right)
  &\equiv -\left\\{-x\_R\mid -x\_L\right\\} \\\\
  &\equiv \left\\{x\_L\mid x\_R\right\\} \\\\
  &\equiv x \\\\
\end{aligned}
$$

---

注意 $\mathrm{\left(iii\right)}$ 中的符号不是 $\equiv$。

若 $x+\left(-x\right)\not\geqslant 0$，则存在 $\left(x+\left(-x\right)\right)\_R\leqslant 0$，即 $x+\left(-x\_L\right)\leqslant 0$ 或 $x\_R+\left(-x\right)\leqslant 0$，但是后者不成立，因为根据归纳假设，有 $x\_L+\left(-x\_L\right)\geqslant 0$ 和 $x\_R+\left(-x\_R\right)\geqslant 0$。同理 $x+\left(-x\right)\not\leqslant 0$ 不成立。故 $x+\left(-x\right)=0$。
{% endnote %}

顺便，后文中将 $x+\left(-y\right)$ 记为 $x-y$。

### 等式/不等式的基本性质（加法消去律）

$$
\tag{T5}
y\geqslant z \Leftrightarrow x+y\geqslant x+z
$$

{% note Proof fold %}
若 $x+y\geqslant x+z$，则不会有

$$
x+y\_R\leqslant x+z\lor x+y\leqslant x+z\_L
$$

根据归纳假设，等价于不会有 $y\_R\leqslant z\lor y\leqslant z\_L$，因此 $y\geqslant z$。

---

若 $x+y\not\geqslant x+z$，则有

$$
x\_R+y\leqslant x+y\lor x+y\_R\leqslant x+z\lor x+y\leqslant x\_L+z\lor x+y\leqslant x+z\_L
$$

此时如果 $y\geqslant z$ 成立，则

$$
x\_R+y\leqslant x+y\lor x+y\_R\leqslant x+y\lor x+z\leqslant x\_L+z\lor x+z\leqslant x+z\_L
$$

以上的每个式子都将导出矛盾。

综上所述，$y\geqslant z\Leftrightarrow x+y\geqslant x+z$。
{% endnote %}

这条定理也有不少推论，简单列一下：

$$
\begin{align\*}
  \forall a=b,c=d &: a+c=b+d \\\\
  \forall a=b,c\leqslant d &: a+c\leqslant b+d \\\\
  \forall a\leqslant b,c\leqslant d &: a+c\leqslant b+d \\\\
  \forall a\lt b,c\leqslant d &: a+c\lt b+d \\\\
  \forall a\not\leqslant b,c\geqslant d &: a+c\not\leqslant b+d
\end{align\*}
$$

顺便，请注意 $\exists a\not\leqslant b, c\not\leqslant d:a+c\leqslant b+d$，例如 $a=c=\ast,b=d=0$，这里 $\ast=\left\\{0\mid 0\right\\}$。

### 加法的封闭性

$$
\tag{T6}
\begin{align\*}
  \tag{i} 0\in\mathbf{No} \\\\
  \tag{ii} x\in\mathbf{No}\Rightarrow -x\in\mathbf{No} \\\\
  \tag{iii} x,y\in\mathbf{No}\Rightarrow x+y\in\mathbf{No}
\end{align\*}
$$

{% note Proof fold %}
由于不存在 $0\_L$ 和 $0\_R$，因此不存在 $0\_L\geqslant 0\_R$，故 $0\in\mathbf{No}$。

---

由于 $x\_L\lt x\lt x\_R$ 且 $x\_L,x\_R\in\mathbf{No}$，因此 $-x\_R\lt -x\lt -x\_L$ 且 $-x\_R,-x\_L\in\mathbf{No}$。

---

容易得到

$$
x\_L+y,x+y\_L\lt x+y\lt x\_R+y,x+y\_R
$$

同时 $x\_L+y,x+y\_L,x\_R+y,x+y\_R\in\mathbf{No}$。
{% endnote %}

根据这些定理，$\mathbf{No}$ 在 $+$ 运算下构成交换群。

### 乘法运算律

$$
\tag{T7}
\begin{align\*}
  x\cdot 0 &\equiv 0 \\\\
  x\cdot 1 &\equiv 1 \\\\
  xy &\equiv yx \\\\
  \left(-x\right)y &\equiv x\left(-y\right) \\\\
  &\equiv -xy \\\\
  \left(x+y\right)z &= xz+yz \\\\
  \left(xy\right)z &= x\left(yz\right)
\end{align\*}
$$

容易证明但证明较繁，故略。

值得指出的是，$=$ 连接的定律是由于 $x+\left(-x\right)=0$ 使用等号连接。

### 乘法的封闭性、等式的基本性质与排序不等式

$$
\tag{T8}
\begin{align\*}
  \tag{i} \forall x,y\in\mathbf{No} &\Rightarrow xy\in\mathbf{No} \\\\
  \tag{ii} \forall x\_1,x\_2,y\in\mathbf{No}\land x\_1=x\_2 &\Rightarrow x\_1y=x\_2y \\\\
  \tag{iii} \forall x\_1,x\_2,y\_1,y\_2\in\mathbf{No}\land x\_1\leqslant x\_2\land y\_1\leqslant y\_2 &\Rightarrow x\_1y\_2+x\_2y\_1\leqslant x\_1y\_1+x\_2y\_2
\end{align\*}
$$

$\mathrm{(iii)}$ 中不等式严格当且仅当条件中两个不等式均严格。

原文没有为 $\mathrm{\left(ii\right)},\mathrm{\left(iii\right)}$ 标注 $\cdot\in\mathbf{No}$，但根据证明可以推断，且不满足时可以举出反例。

另外，其实 $\mathrm{(ii)},\mathrm{(iii)}$ 不需要均满足 $\cdot\in\mathbf{No}$，但是我懒得讨论了，毕竟乘法对于博弈的用途不大。

{% note Proof fold %}

首先，我们将 $\mathrm{\left(iii\right)}$ 记为 $P\left(x\_1,x\_2,y\_1,y\_2\right)$。

考虑证明 $\mathrm{\left(i\right)}$，只需要

$$
x\_{L\_1}y+xy\_L-x\_{L\_1}y\_L\lt x\_{L\_2}y+xy\_R-x\_{L\_2}y\_R
$$

如果 $x\_{L\_1}\leqslant x\_{L\_2}$，有

$$
x\_{L\_1}y+xy\_L-x\_{L\_1}y\_L\leqslant x\_{L\_2}+xy\_{L}-x\_{L\_2}y\_L\lt x\_{L\_2}y+xy\_R-x\_{L\_2}y\_R
$$

上式需要 $P\left(x\_{L\_1},x\_{L\_2},y\_L,y\right)$ 和 $P\left(x\_{L\_2},x,y\_L,y\_R\right)$。

若 $x\_{L\_2}\leqslant x\_{L\_1}$，则

$$
x\_{L\_1}y+xy\_L-x\_{L\_1}y\_L\lt x\_{L\_1}y+xy\_R-x\_{L\_1}y\_R\leqslant x\_{L\_2}y+xy\_R-x\_{L\_2}y\_R
$$

这需要 $P\left(x\_{L\_2},x\_{L\_1},y,y\_R\right)$ 和 $P\left(x\_{L\_1},x,y\_L,y\_R\right)$。

根据归纳假设 $\mathrm{\left(iii\right)}$，以上的 $4$ 个条件应该全部成立，故 $\mathrm{\left(i\right)}$ 成立。

---

考虑 $\mathrm{\left(ii\right)}$，这需要

$$
\begin{aligned}
  \left(x\_1y\right)\_L\lt x\_2y \\\\
  \left(x\_1y\right)\_R\gt x\_2y \\\\
  \left(x\_2y\right)\_L\lt x\_1y \\\\
  \left(x\_2y\right)\_R\gt x\_1y \\\\
\end{aligned}
$$

根据乘法定义

$$
\begin{aligned}
x\_{1\_L}y+x\_1y\_L-x\_{1\_L}y\_L &\lt x\_2y \\\\
x\_{1\_R}y+x\_1y\_R-x\_{1\_L}y\_R &\lt x\_2y \\\\
x\_{1\_L}y+x\_1y\_R-x\_{1\_L}y\_R &\gt x\_2y \\\\
x\_{1\_R}y+x\_1y\_L-x\_{1\_R}y\_L &\gt x\_2y \\\\
x\_{2\_L}y+x\_2y\_L-x\_{2\_L}y\_L &\lt x\_1y \\\\
x\_{2\_R}y+x\_2y\_R-x\_{2\_L}y\_R &\lt x\_1y \\\\
x\_{2\_L}y+x\_2y\_R-x\_{2\_L}y\_R &\gt x\_1y \\\\
x\_{2\_R}y+x\_2y\_L-x\_{2\_R}y\_L &\gt x\_1y \\\\
\end{aligned}
$$

利用归纳假设 $\mathrm{\left(iii\right)}$ 并移项：

$$
\begin{aligned}
x\_2y\_L+x\_{1\_L}y &\lt x\_2y+x\_{1\_L}y\_L \\\\
x\_2y\_R+x\_{1\_R}y &\lt x\_2y+x\_{1\_L}y\_R \\\\
x\_2y\_R+x\_{1\_L}y &\gt x\_2y+x\_{1\_L}y\_R \\\\
x\_2y\_L+x\_{1\_R}y &\gt x\_2y+x\_{1\_R}y\_L \\\\
x\_1y\_L+x\_{2\_L}y &\lt x\_1y+x\_{2\_L}y\_L \\\\
x\_1y\_R+x\_{2\_R}y &\lt x\_1y+x\_{2\_L}y\_R \\\\
x\_1y\_R+x\_{2\_L}y &\gt x\_1y+x\_{2\_L}y\_R \\\\
x\_1y\_L+x\_{2\_R}y &\gt x\_1y+x\_{2\_R}y\_L \\\\
\end{aligned}
$$

以 $x\_2y\_L+x\_{1\_L}y\lt x\_2y+x\_{1\_L}y\_L$ 为例，其等价于 $P\left(x\_{1\_L},x\_2,y\_L,y\right)$，即 $P\left(x\_{2\_L},x\_2,y\_L,y\right)$，根据归纳假设 $\mathrm{(iii)}$，后者成立。

---

考虑 $\mathrm{\left(iii\right)}$，注意到 $x\_1=x\_2$ 或 $y\_1=y\_2$ 的情况都可以从 $\mathrm{\left(ii\right)}$ 得到，因此只需要考虑 $x\_1\lt x\_2$ 且 $y\_1\lt y\_2$。

既然 $x\_1\lt x\_2$，则 $x\_1\lt x\_{1\_R}\leqslant x\_2$ 或 $x\_1\leqslant x\_{2\_L}\lt x\_2$。以前者为例，$P\left(x\_1,x\_2,y\_1,y\_2\right)$ 可以从 $P\left(x\_1,x\_{1\_R},y\_1,y\_2\right)$ 和 $P\left(x\_{1\_R},x\_2,y\_1,y\_2\right)$ 得到，其中后者是归纳假设。

总之，我们只需要考虑

$$
\begin{aligned}
  P\left(x\_L,x,y\_L,y\right) \\\\
  P\left(x\_L,x,y,y\_R\right) \\\\
  P\left(x,x\_R,y\_L,y\right) \\\\
  P\left(x,x\_R,y\_L,y\right)
\end{aligned}
$$

这等价于

$$
\left(xy\right)\_L\lt xy\lt \left(xy\right)\_R
$$
{% endnote %}

这样，已经证明全部的数构成环。

#### 推论

$$
\tag{T9} x,y\in\mathbf{No}\land x\geqslant 0\land y\geqslant 0\Rightarrow xy\geqslant 0
$$

{% note Proof fold %}
应用 $P(0,x,0,y)$ 即可。
{% endnote %}
