---
title: 二次函数的二阶不动点
mathjax: true
date: 2025-07-15T00:45:26.771+0800
categories:
  - Math
tags:
  - equation
  - fixed-point
---

推式子的时候联想到了这类题目，但发现记不清解法了，遂复建。

对于一般的二次函数 $f\left(x\right)=ax^{2}+bx+c$，其一阶不动点为 $f\left(x\right)=x$ 的根；其二阶不动点为 $f\left(f\left(x\right)\right)=x$ 的根，同时不是一阶不动点。

容易说明，二阶不动点成对出现，设存在一对为 $p,q$，即

$$
\begin{aligned}
  q &= f\left(p\right) \\\\
  p &= f\left(q\right)
\end{aligned}
$$

将 $f\left(x\right)$ 的定义代入

$$
\begin{align\*}
  \tag{1} q &= ap^{2}+bp+c \\\\
  \tag{2} p &= aq^{2}+bq+c
\end{align\*}
$$

$\mathrm{\left(1\right)}-\mathrm{\left(2\right)}$，得

$$
\begin{align\*}
  -\left(p-q\right) &= a\left(p^{2}-q^{2}\right)+b\left(p-q\right) \\\\
  -\left(p-q\right) &= a\left(p-q\right)\left(p+q\right)+b\left(p-q\right) \\\\
  -1 &= a\left(p+q\right)+b \\\\
  \tag{3} p+q &= -\dfrac{b+1}{a}
\end{align\*}
$$

将其代回 $\mathrm{\left(1\right)}$ 式：

$$
q = -\dfrac{b+1}{a}-p = ap^{2}+bp+c
$$

整理得

$$
ap^{2}+\left(b+1\right)p+\dfrac{ac+b+1}{a} = 0
$$

由求根公式

$$
\begin{aligned}
  p &= \dfrac{-\left(b+1\right)\pm\sqrt{\left(b+1\right)^2-4\left(ac+b+1\right)}}{2a} \\\\
  &= \dfrac{-\left(b+1\right)\pm\sqrt{b^2-4ac-2b-3}}{2a}
\end{aligned}
$$

由于 $p,q$ 对称，不妨取

$$
\begin{cases}
  p &= \dfrac{-\left(b+1\right)+\sqrt{b^2-4ac-2b-3}}{2a} \\\\
  q &= \dfrac{-\left(b+1\right)-\sqrt{b^2-4ac-2b-3}}{2a}
\end{cases}
$$
