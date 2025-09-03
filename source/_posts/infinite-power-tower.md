---
title: 无限幂塔方程
mathjax: true
date: 2025-07-15T05:45:26.771+0800
updated: 2025-07-16T00:43:42.553+0800
categories:
  - Math
tags:
  - equation
  - fixed-point
  - sequence
  - Calculus
---

![PowerTower](/image/PowerTower.gif)

## 一个解错的方程

考虑方程（注意幂运算是右结合的）

$$
x^{x^{x^{x^{⋰}}}} = 4
$$

{% note 解？ open %}
既然 $x^{x^{x^{x^{⋰}}}}=4$，则

$$
\begin{aligned}
  x^{4} &= 4 \\\\
  x &= \sqrt[4]{4} \\\\
  &= \sqrt{2}
\end{aligned}
$$

是吗？
{% endnote %}

如果我们将上述过程抽象，就得到

> 对于方程
> 
> $$
> x^{x^{x^{x^{⋰}}}} = a
> $$
>
> 方程的根为 $\sqrt[a]{a}$。

那么，$a=2$ 时，方程的根也为 $x=\sqrt{2}$ 了。

这就是说，$\sqrt{2}^{\sqrt{2}^{\sqrt{2}^{⋰}}}$ 既等于 $2$，又等于 $4$。

这是荒谬的，解释只有一个，我们引入了增根，得到的两个方程的解不都是真的解。

## 增根？

{% warning 增根！ open %}
为什么会引入增根呢？回想我们解方程时做的变形，例如，我们从 $p$ 式推到 $q$ 式。

通常情况下，我们作等价变形，即

$$
p \leftrightarrow q
$$

例如利用等式基本定理，在等式两侧同时加、减相同的代数式，或在等式两侧同时乘相同的常数。

但在求解复杂的方程时，我们经常作充分变形，即

$$
p \rightarrow q
$$

这种情况下，$q$ 是 $p$ 的充分条件（$p\subset q$），因此 $q$ 的解不都是 $p$ 的解。例如，在等式两侧同时乘一个代数式，或在等式两侧同时平方。

这时，我们需要将解 $q$ 得到的结果进行检验。

也有些时候，我们不小心作了必要变形，即

$$
p \leftarrow q
$$

这时 $p$ 的根不都是 $q$ 的根（$q\subset p$），因此会造成**失根**。这种情况是需要避免的。
{% endwarning %}

那么，我们求解的过程中，哪里可能引入增根呢？

无穷幂塔在形式上不太严格，让我们说得更形式化一些

> 考虑递推数列 $\left\\{a\_n\right\\}$，满足
>
> $$
> \begin{aligned}
> a\_0 &= x \\\\
> a\_n &= x^{a\_{n-1}}\quad \left(n\geqslant 1\right)
> \end{aligned}
> $$
>
> 那么方程实际上就是
>
> $$
> \lim\_{n\to\infty}a\_n=a
> $$
>
> 第一步变形，实际上就是对递推式两侧取了极限
>
> $$
> \lim\_{n\to\infty}a\_n=\lim\_{n\to\infty}x^{a\_{n-1}}
> $$
>
> 这时，自然有
>
> $$
> \begin{aligned}
> a &= x^{a} \\\\
> x &= \sqrt[a]{a}
> \end{aligned}
> $$
>
因此，根本原因在于，只有下式**确实成立**时，我们才能作上述变形。

$$
\lim\_{n\to\infty}a\_n=a
$$

换句话说，若方程有解，则解一定是 $x=\sqrt[a]{a}$，但我们的方法无法排除解不存在的情况。

我们不妨将 $x=\sqrt{2}$ 代入检验一下。

注意到，$a\_0=\sqrt{2}\lt 2$，因此 $a\_1=\sqrt{2}^{a\_0}\lt \sqrt{2}^{2}=2$，数学归纳得 $a\_n\lt 2$；因此 $\lim\_{n\to\infty}\leqslant 2$。

再验证数列单调，即 $\sqrt{2}^{a\_n}\geqslant a\_n$，也就是 $\sqrt{2}\geqslant \sqrt[a\_n]{a\_n}$。由函数 $\sqrt[x]{x}$ 的单调性易证。

因此极限存在且 $\leqslant 2$。

利用递推式两侧取极限的手法，我们容易说明，若极限存在，则极限就是 $2$。

## 最值

让我们考察一下数列 $\left\\{a\_n\right\\}$ 在何时收敛。

先假定数列收敛到 $a\_{\infty}$，根据前文，有 $a\_{0}=\sqrt[a\_{\infty}]{a\_{\infty}}\quad$。

由于函数 $\sqrt[x]{x}$ 在 $x=\mathrm{e}$ 时取最值 $\sqrt[\mathrm{e}]{\mathrm{e}}$，因此不可能有 $a\_0\gt \sqrt[\mathrm{e}]{\mathrm{e}}$，即此时极限不存在。

考虑 $a\_{0}\leqslant\sqrt[\mathrm{e}]{\mathrm{e}}$，我们证明此时极限存在。

方便描述，这里设 $a\_{0}=\sqrt[\alpha]{\alpha},0\lt\alpha\leqslant\mathrm{e}$，显然此时满足 $0\lt a\_{0}\leqslant\sqrt[\mathrm{e}]{\mathrm{e}}$。

### 1 <= alpha <= e

先证明数列有界，考虑利用数学归纳法得到 $a\_n\leqslant\alpha$。

1. 首先，显然有 $a\_{0}\leqslant\sqrt[\alpha]{\alpha}\leqslant\alpha$。
2. 其次，若对于 $n\leqslant k$ 均有 $a\_{n}\leqslant\alpha$，则 $a\_{n+1}=a\_{0}^{a\_{n}}=\sqrt[\alpha]{\alpha}^{a\_{n}}\leqslant\sqrt[\alpha]{\alpha}^{\alpha}=\alpha$。

再证明数列单调，即 $a\_{n+1}=\sqrt[\alpha]{\alpha}^{a\_{n}}\geqslant a\_{n}$。

根据函数单调性知识，等价于 $\sqrt[\alpha]{\alpha}\geqslant\sqrt[a\_{n}]{a\_{n}}$。又 $a\_{n}\leqslant\alpha$，证毕。

### 0 < alpha < 1

这里的分析更困难一些，实际上，此时数列未必收敛——它有可能发散到两个点。即数列的奇数列和偶数列分别收敛，但这两个极限未必相等。

容易证明（根据函数 $f\left(x\right)=a\_0^{x}$ 的单调性）有

$$
\begin{aligned}
  a\_{0} &\in \left(0,1\right) \\\\
  a\_{1} &\in \left(a\_0,1\right) \\\\
  &\cdots \\\\
  a\_{2k} &\in \left(a\_{2k-2},a\_{2k-1}\right) \\\\
  a\_{2k+1} &\in \left(a\_{2k},a\_{2k-1}\right) \\\\
  a\_{2k+2} &\in \left(a\_{2k},a\_{2k+1}\right) \\\\
  &\cdots
\end{aligned}
$$

> 形式上，也可以记 $a\_{-2}=0,a\_{-1}=1$。

因此显然数列的奇数列和偶数列分别收敛，然而，$\alpha\lt\dfrac{1}{\mathrm{e}}$ 时两个极限不再相等（此时 $a\_0\lt\mathrm{e}^{-\mathrm{e}}$）。

也就是说，数列极限 $a\_{\infty}$ 的取值范围为 $\left[\dfrac{1}{\mathrm{e}},\mathrm{e}\right]$。

{% note proof fold %}
这里尝试给出一个证明。

方便起见，记首项 $a\_0=a$，递推公式 $f\left(x\right)=a^{x}$。

---

记 $g\left(x\right)=f\left(f\left(x\right)\right)-x$，易得 $\mathrm{e}^{-\mathrm{e}}\leqslant a\lt 1$ 时 $g\left(x\right)$ 为减函数，从而 $g\left(x\right)$ 有且只有一个零点。

{% note 函数性质证明 fold %}
对 $g\left(x\right)=f\left(f\left(x\right)\right)-x$ 求导，得

$$
\begin{aligned}
  g^{\prime}\left(x\right) &= a^{a^{x}}a^{x}\ln^{2}{a}-1 \\\\
  g^{\prime\prime}\left(x\right) &= a^{a^{x}}a^{2x}\ln^{4}{a}+a^{a^{x}}a^{x}\ln^{3}{a} \\\\
  g^{\prime\prime\prime}\left(x\right) &= a^{a^{x}}a^{3x}\ln^{6}{a}+3a^{a^{x}}a^{2x}\ln^{5}{a}+a^{a^{x}}a^{x}\ln^{4}{a}
\end{aligned}
$$

只需证 $g^{\prime}\left(x\right)$ 在 $\mathrm{e}^{-\mathrm{e}}\leqslant a\lt 1$ 时恒不大于 $0$。

只需证其最大值小于 $0$，因此考察 $g^{\prime\prime}\left(x\right)$ 的零点 $x\_0$：

$$
a^{a^{x\_0}}a^{2x\_0}\ln^{4}{a}+a^{a^{x\_0}}a^{x\_0}\ln^{3}{a} = 0
$$

显然 $a^{a^{x\_0}}a^{x\_0}\ln^{3}{a}\ne 0$，因此

$$
a^{x\_0}\ln{a}+1 = 0
$$

解得

$$
x\_0 = \dfrac{\ln{\left(-\dfrac{1}{\ln{a}}\right)}}{\ln{a}}
$$

将结果代入 $g^{\prime\prime\prime}\left(x\right)$，易得 $g^{\prime\prime\prime}\left(x\_0\right)=\dfrac{\ln^{3}{a}}{e}\lt 0$，故 $x\_0$ 为 $g^\prime\left(x\right)$ 的极大值点，由于极大值点唯一，这也是其最大值点。因此 $g^{\prime}\left(x\right)$ 的最大值为 $g^{\prime}\left(x\_0\right)=-\dfrac{\ln{a}}{e}-1\leqslant -\dfrac{\ln \left(\mathrm{e}^{-\mathrm{e}}\right)}{e}-1=0$。
{% endnote %}

设偶数列的极限为 $p$，奇数列的极限为 $q$，若 $p\ne q$，则显然 $p,q$ 均为 $g\left(x\right)$ 的零点，矛盾，故此时 $p=q$。

---

设 $x\_0$ 满足 $f\left(x\right)=x$，显然有 $x\_0$ 唯一且 $x\_0=-\dfrac{W\left(- \ln{a}\right)}{\ln{a}}$，这里 $W$ 表示 [*Lambert-W*](https://mathworld.wolfram.com/LambertW-Function.html) 函数。

考虑 $f^{\prime}\left(x\_0\right)$ 的值，显然有

$$
\begin{aligned}
  f^{\prime}\left(x\right) &= a^{x}\ln a \\\\
  f^{\prime}\left(x\_0\right) &= -W\left(-\ln{a}\right)
\end{aligned}
$$

在 $0\lt a\lt \mathrm{e}^{-\mathrm{e}}$ 时，有 $-\ln{a}\gt \mathrm{e}$。

由于 $W\left(x\right)$ 在其定义域为增函数，则 $W\left(-\ln{a}\right)\gt W\left(\mathrm{e}\right)=1$，因此 $\left|f^{\prime}\left(x\_0\right)\right|\gt 1$。

根据导数的定义

$$
\lim\_{\Delta x\to 0}\dfrac{\left|f\left(x\_0+\Delta x\right)-f\left(x\_0\right)\right|}{\left|\Delta x\right|} \gt 1
$$

由极限相关性质，存在正实数 $\delta$ 使得对于任意 $\left|\Delta x\right|\lt \delta$，有

$$
\dfrac{\left|f\left(x\_0+\Delta x\right)-f\left(x\_0\right)\right|}{\left|\Delta x\right|} \gt 1
$$

即

$$
\left|f\left(x\_0+\Delta x\right)-f\left(x\_0\right)\right|\gt \left|\Delta x\right|
$$

显然不存在 $a\_n=x\_0$，否则得到任意 $a\_n=x\_0$。

此时若 $\left\\{a\_n\right\\}$ 收敛到 $x\_0$，由数列极限的定义，取 $\epsilon<\delta$，存在 $N$ 使得任意 $n\geqslant N$ 满足 $0\lt|a\_n-x\_0|\lt\epsilon\lt\delta$。

则根据递推公式形式，$0\lt|a\_n-x\_0|\lt |a\_{n+1}-x\_0|\lt |a\_{n+2}-x\_0|\lt\cdots\lt\epsilon\lt\delta$，矛盾。
{% endnote %}

## 构造

最后，还剩下一个小问题，对于文章开头的构造，可以构造出多少有理解？

换句话说，方程 $\sqrt[a]{a}=\sqrt[b]{b}$ 有多少有理解满足 $a\ne b$？

两侧同时乘方，得

$$
a^{b} = b^{a}
$$

不妨设 $b=ka,k\ne 1$，则

$$
\begin{aligned}
  a^{ka} &= \left(ka\right)^{a} \\\\
  \left(a^{k}\right)^{a} &= \left(ka\right)^{a} \\\\
  a^{k} &= ka \\\\
  a^{k-1} &= k \\\\
\end{aligned}
$$

因此得到

$$
\begin{cases}
  a &= k^{\frac{1}{k-1}} \\\\
  b &= k^{\frac{k}{k-1}}
\end{cases}
$$

假设 $k$ 可以表示为既约分数 $\dfrac{p}{q}$，则

$$
\begin{cases}
  a &= \left(\dfrac{p}{q}\right)^{\frac{q}{p-q}} \\\\
  b &= \left(\dfrac{p}{q}\right)^{\frac{p}{p-q}}
\end{cases}
$$

若 $p-q=1$，则显然 $a,b$ 恒为有理数。

否则，设 $p-q=\alpha\ne 1$，则 $p,q$ 均为完全 $\alpha$ 次方数，不妨 $p=u^{\alpha},q=v^{\alpha}$。

则有

$$
\begin{aligned}
  \alpha
  &= u^{\alpha}-v^{\alpha} \\\\
  &= \left(u-v\right)\left(\sum\_{i=0}^{\alpha-1}u^{i}v^{\alpha-i-1}\right) \\\\
  &\geqslant \sum\_{i=0}^{\alpha-1}u^{i}v^{\alpha-i-1} \\\\
  &\geqslant \sum\_{i=0}^{\alpha-1}1 \\\\
  &= \alpha
\end{aligned}
$$

同时取等当且仅当 $u-v=1$ 且 $u=v=1$，矛盾。

总之，若 $a,b\in\mathbf{Q}$，则 $p-q=1$。

将其代入 $a,b$ 表达式，得

$$
\begin{cases}
  a &= \left(\dfrac{q+1}{q}\right)^{q} \\\\
  b &= \left(\dfrac{q+1}{q}\right)^{q+1}
\end{cases}
$$

$q=1$ 时，即为文章开头的示例 $\left(2,4\right)$。

有趣的是，$q\to\infty$ 时，$a\to\mathrm{e}$ 且 $b\to\mathrm{e}$。
