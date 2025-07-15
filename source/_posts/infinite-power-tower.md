---
title: 无限幂塔方程
mathjax: true
date: 2025-07-15T05:45:26.771+0800
categories:
  - Math
tags:
  - equation
  - fixed-point
  - sequence
---

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

容易证明有

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

因此显然数列的奇数列和偶数列分别收敛，然而，$\alpha\lt\mathrm{e}^{-\mathrm{e}}$ 时两个极限不再相等，相关证明以后再补。

也就是说，数列极限 $a\_{\infty}$ 的取值范围为 $\left[\dfrac{1}{e},e\right]$。
