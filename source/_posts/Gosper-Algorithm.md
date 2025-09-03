---
title: Gosper-Algorithm
mathjax: true
date: 2025-09-02 22:53:47
updated: 2025-09-02 22:53:47
categories:
  - Math
tags:
  - sequence
  - prefix-sum
---

有别于 {% post_link finite-calculus %} 的一种裂项方法。

---

直接给出算法流程。

欲对函数 $t\left(k\right)$ 进行裂项，即希望找到 $T\left(k\right)$ 使得 $t\left(k\right)=T\left(k+1\right)-T\left(k\right)$。

对于相邻两项比 $\dfrac{t\left(k+1\right)}{t\left(k\right)}$ 为有理分式的情形，可以尝试应用 Gosper-Algorithm。

---

先将相邻两项比写为

$$
\dfrac{t\left(k+1\right)}{t\left(k\right)} = \dfrac{p\left(k+1\right)}{p\left(k\right)}\cdot\dfrac{q\left(k\right)}{r\left(k+1\right)}
$$

这里要求 $p\left(k\right),q\left(k\right),r\left(k\right)$ 均为多项式函数，且满足

$$
\forall h\in\mathbf{N}^{+},\gcd\left(q\left(k\right),r\left(k+h\right)\right)=1
$$

---

第二个要求不易满足，不妨使用 $p\left(k\right)$ 把 $q\left(k\right),r\left(k\right)$ 中不合适的因式吸收掉。

例如，若 $\left(k+\alpha\right)\mid q\left(k\right),\left(k+\beta\right)\mid r\left(k\right)$，且 $\alpha-\beta\gt 0$，不妨令

$$
\begin{aligned}
  p\left(k\right) &\gets p\left(k\right)\cdot\prod\_{n=1}^{\alpha-\beta-1}\left(k+\beta+n\right) \\\\
  q\left(k\right) &\gets \dfrac{q\left(k\right)}{k+\alpha} \\\\
  r\left(k\right) &\gets \dfrac{r\left(k\right)}{k+\beta}
\end{aligned}
$$

需要指出，若 $\alpha-\beta=1$，则 $q\left(k\right)$ 与 $r\left(k\right)$ 有公因式，可以直接在作比时除掉。

---

记 $\deg\_{\ast}$ 表示多项式的次数，特别的，令 $\deg\_{0}=-1$。

令

$$
\begin{aligned}
  Q\left(k\right) &= q\left(k\right) - r\left(k\right) \\\\
  R\left(k\right) &= q\left(k\right) + r\left(k\right)
\end{aligned}
$$

并记

$$
d=\begin{cases}
  \deg\_{p}-\deg\_{Q}, & \deg\_{Q}\geqslant\deg\_{R} \\\\
  \deg\_{p}-\deg\_{R}+1, & \text{otherwise}
\end{cases}
$$

若 $d\lt 0$，则 Gosper 裂项不适用，反之，则可以应用 Gosper 裂项。

---

解方程

$$
p\left(k\right) = q\left(k\right)s\left(k+1\right)-r\left(k\right)s\left(k\right)
$$

其中 $\deg\_{s}=d$。

---

裂项结果为

$$
T\left(k\right) = \dfrac{r\left(k\right)s\left(k\right)t\left(k\right)}{p\left(k\right)}
$$
