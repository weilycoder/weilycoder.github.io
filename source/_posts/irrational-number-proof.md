---
title: 证明给定数为无理数
mathjax: true
date: "2025-07-14T17:25:54.928+0800"
updated: "2025-07-14T17:25:54.928+0800"
categories:
  - Math
tag:
  - Calculus
  - Theorem
---

{% note Lemma open %}
若实数 $\alpha$ 满足存在整数列 $\left\\{p\_n\right\\},\left\\{q\_n\right\\}$ 使得 $\lim\_{n\to\infty}\left(q\_n\alpha-p\_n\right)=0$ 且对于任意有限的 $n$，$q\_n\alpha-p\_n\ne 0$，则 $\alpha$ 为无理数。

**证明：**

考虑原命题的逆否命题，对于任意有理数 $\alpha=\dfrac{x}{y},x,y\in\mathbf{Z}$，不存在整数列 $\left\\{p\_n\right\\},\left\\{q\_n\right\\}$ 使得 $\lim\_{n\to\infty}\left(q\_n\alpha-p\_n\right)=0$ 且对于任意有限的 $n$，$q\_n\alpha-p\_n\ne 0$。

任取 $p,q\in\mathbf{Z}$，使得 $q\alpha-p\ne 0$，即 $q\cdot\dfrac{x}{y}-p\ne 0$，则 $qx-py\ne 0$，因此 $\left|qx-py\right|\ge 1$。

故 $\left|q\alpha-p\right|=\left|\dfrac{1}{y}\right|\cdot\left|qx-py\right|\ge \left|\dfrac{1}{y}\right|$，证毕。
{% endnote %}

这里给出一个 $\mathrm{e}$ 为无理数的证明。

根据泰勒展开式，有

$$
\mathrm{e} = \sum\_{i=0}^{\infty}\dfrac{1}{i!}
$$

则

$$
\begin{aligned}
  \mathrm{e} - \sum\_{i=0}^{n}\dfrac{1}{i!} &= \sum\_{i=n+1}^{\infty}\dfrac{1}{i!} \\\\
  \mathrm{e}\cdot n! - P\left(n\right) &= \sum\_{i=1}^{\infty}\dfrac{n!}{\left(n+i\right)!} \\\\
  &\leqslant \dfrac{1}{n+1} + \sum\_{i=1}^{\infty}\dfrac{\left(n+i-1\right)!}{\left(n+i+1\right)!} \\\\
  &= \dfrac{1}{n+1} + \sum\_{i=1}^{\infty}\dfrac{1}{\left(n+i\right)\left(n+i+1\right)} \\\\
  &= \dfrac{1}{n+1} + \sum\_{i=1}^{\infty}\left(\dfrac{1}{n+i}-\dfrac{1}{n+i+1}\right) \\\\
  &= \dfrac{2}{n+1}
\end{aligned}
$$

显然有 $n!,P(n)$ 均为有理数，且 $\dfrac{2}{n+1}\to 0$，故 $\mathrm{e}$ 为无理数。
