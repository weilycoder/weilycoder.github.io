---
title: 一类分式递推数列的通项公式求法
categories:
  - Math
date: "2025-05-31T12:28:18.002+0800"
mathjax: true
tags:
  - sequence
  - fixed-point
---

考虑数列 $\left\\{a\_n\right\\}$，首项为 $a\_0$，且对于 $n\ge 0$，满足

$$
a\_{n+1}=\dfrac{sa\_n+t}{pa\_n+q}
$$

求数列通项。

## (A) $~p=0$

此时递推数列变为

$$
a\_{n+1}=\dfrac{s}{q}\cdot a\_n+\dfrac{t}{q}
$$

### (a) $~s=q$

此时数列为等差数列，满足

$$
a\_n=a\_0+\dfrac{nt}{q}
$$

### (b) $~s\ne q$

在数列递推式两侧同时加 $\dfrac{t}{s-q}$：

$$
\begin{aligned}
a\_{n+1}+\dfrac{t}{s-q}
&= \dfrac{s}{q}\cdot a\_n+\dfrac{t}{q}+\dfrac{t}{s-q} \\\\
&= \dfrac{s}{q}\cdot \left(a\_n+\dfrac{t}{s-q}\right)
\end{aligned}
$$

因此 $\left\\{a\_n+\dfrac{t}{s-q}\right\\}$ 为公比为 $\dfrac{s}{q}$ 的等比数列

故

$$
a\_n=\left(a\_0+\dfrac{t}{s-q}\right)\cdot \left(\dfrac{s}{q}\right)^n-\dfrac{t}{s-q}
$$

## (B) $~p\ne 0$

### (a) $~t=0$

此时递推公式变为

$$
a\_{n+1}=\dfrac{sa\_n}{pa\_n+q}
$$

#### (1) $~a\_0=0$

显然此时为常数列

$$
a\_n=0
$$

#### (2) $~a\_0\ne 0$

此时满足 $\forall n:a\_n\ne 0$。

因此可以在递推公式两侧同时取倒数：

$$
\begin{aligned}
\dfrac{1}{a\_{n+1}}
&= \dfrac{pa\_n+q}{sa\_n} \\\\
&= \dfrac{q}{s}\cdot\dfrac{1}{a\_n}+\dfrac{p}{s}
\end{aligned}
$$

此时 $\left\\{\dfrac{1}{a\_n}\right\\}$ 为 $\mathrm{\left(A\right)}$ 型，需要分两种情况讨论。

##### (i) $~s=q$

此时 $\left\\{\dfrac{1}{a\_n}\right\\}$ 是公差为 $\dfrac{p}{s}$ 的等差数列。

因此

$$
\begin{aligned}
\dfrac{1}{a\_n} &= \dfrac{1}{a\_0}+\dfrac{np}{s} \\\\
a\_n &= \dfrac{1}{\dfrac{1}{a\_0}+\dfrac{np}{s}} \\\\
&= \dfrac{sa\_0}{npa\_0 + s}
\end{aligned}
$$

##### (ii) $~s\ne q$

由 $\mathrm{\left(A\right)}$ 中的结论，

$$
\begin{aligned}
\dfrac{1}{a\_{n}} &= \left(\dfrac{1}{a\_0}+\dfrac{p}{q-s}\right)\cdot\left(\dfrac{q}{s}\right)^n-\dfrac{p}{q-s} \\\\
a\_n &= \dfrac{\left(q-s\right)a\_{0}}{\left(pa\_{0}+q-s\right)\cdot\left(\dfrac{q}{s}\right)^{n}-pa\_{0}}
\end{aligned}
$$

### (b) $~t\ne 0\land\left(s-q\right)^2+4tp=0$

此时有

$$
a\_{n+1}=\dfrac{sa\_n-\dfrac{\left(q-s\right)^2}{4p}}{pa\_n+q}
$$

等式两侧同时加 $\dfrac{q-s}{2p}$：

$$
\begin{aligned}
a\_{n+1}+\dfrac{q-s}{2p}
&= \dfrac{sa\_n-\dfrac{\left(q-s\right)^2}{4p}}{pa\_n+q}+\dfrac{q-s}{2p} \\\\
&= \dfrac{q+s}{2pa\_n+2q}\cdot\left(a\_n+\dfrac{q-s}{2p}\right)
\end{aligned}
$$

#### (i) $~a\_0=-\frac{q-s}{2p}$

显然此时数列为常数列。

$$
a\_n=-\dfrac{q-s}{2p}
$$

#### (ii) $~a\_0\ne -\frac{q-s}{2p}$

此时等式不等于零，将等式两侧同时取倒数：

$$
\dfrac{1}{a\_{n+1}+\dfrac{q-s}{2p}}=\dfrac{2pa\_n+2q}{q+s}\cdot\dfrac{1}{a\_n+\dfrac{q-s}{2p}}
$$

令 $b\_n=a\_n+\dfrac{q-s}{2p}$，则 $a\_n=b\_n-\dfrac{q-s}{2p}$。

$$
\begin{aligned}
\dfrac{1}{b\_{n+1}}
&= \dfrac{2pb\_{n}+q+s}{q+s}\cdot\dfrac{1}{b\_n} \\\\
&= \dfrac{2p}{q+s}+\dfrac{1}{b\_n}
\end{aligned}
$$

因此 $\left\\{\dfrac{1}{b\_n}\right\\}$ 构成公差为 $\dfrac{2p}{q+s}$ 的等差数列。

$$
\begin{aligned}
\dfrac{1}{b\_n} &= \dfrac{1}{b\_0}+\dfrac{2pn}{q+s} \\\\
\dfrac{1}{a\_n+\dfrac{q-s}{2p}} &= \dfrac{1}{a\_0+\dfrac{q-s}{2p}}+\dfrac{2pn}{q+s} \\\\
a\_n &= \frac{2p\left(nq-ns+q+s\right)a\_0-n\left(q-s\right)^2}{4np^2a\_0-2p\left(nq-ns-q-s\right)}
\end{aligned}
$$

### (c) $~t\ne 0\land \left(s-q\right)^2+4tp\ne 0$

令 $\alpha,\beta$ 为 $px^2+\left(q-s\right)x-t=0$ 的根，根据假设，$\alpha\ne\beta$，则：

$$
\begin{aligned}
\alpha &= \dfrac{-q+s-\sqrt{4pt+\left(q-s\right)^2}}{2p} \\\\
\beta &= \dfrac{-q+s+\sqrt{4pt+\left(q-s\right)^2}}{2p}
\end{aligned}
$$

#### (i) $~a\_0\in\left\\{\alpha,\beta\right\\}$

此时容易验证数列为常数列。

$$
a\_n=a\_0
$$

#### (ii) $~a\_0\notin\left\\{\alpha,\beta\right\\}$

容易验证 $\forall n: a\_n\notin\left\\{\alpha,\beta\right\\}$。

因此

$$
\begin{align}
a\_{n+1}-\alpha &= \dfrac{sa\_n+t}{pa\_n+q}-\alpha \\\\
a\_{n+1}-\beta &= \dfrac{sa\_n+t}{pa\_n+q}-\beta
\end{align}
$$

假设 $a\_0\notin\left\\{\alpha,\beta\right\\}$，两式作比，

$$
\begin{aligned}
\dfrac{a\_{n+1}-\alpha}{a\_{n+1}-\beta} &= \dfrac{\dfrac{sa\_n+t}{pa\_n+q}-\alpha}{\dfrac{sa\_n+t}{pa\_n+q}-\beta} \\\\
&= \dfrac{\alpha pa\_n-sa\_n+\alpha q-t}{\beta pa\_n-sa\_n+\beta q-t} \\\\
&= \dfrac{\left(\alpha p-s\right)a\_n-\left(t-\alpha q\right)}{\left(\beta p-s\right)a\_n-\left(t-\beta q\right)}
\end{aligned}
$$

注意到

$$
px^2+\left(q-s\right)x-t=0 \Longleftrightarrow x\left(px-s\right)=t-qx
$$

由于 $\alpha,\beta$ 是 $px^2+\left(q-s\right)x-t=0$ 的根，

$$
\begin{aligned}
t-\alpha q=\alpha\left(\alpha p-s\right) \\\\
t-\beta q=\beta\left(\beta p-s\right)
\end{aligned}
$$

代入递推式：

$$
\begin{aligned}
\dfrac{a\_{n+1}-\alpha}{a\_{n+1}-\beta}
&= \dfrac{\left(\alpha p-s\right)a\_n-\left(t-\alpha q\right)}{\left(\beta p-s\right)a\_n-\left(t-\beta q\right)} \\\\
&= \dfrac{\left(\alpha p-s\right)a\_n-\alpha\left(\alpha p-s\right)}{\left(\beta p-s\right)a\_n-\beta\left(\beta p-s\right)} \\\\
&= \dfrac{\alpha p-s}{\beta p-s}\cdot\dfrac{a\_n-\alpha}{a\_n-\beta}
\end{aligned}
$$

因此 $\left\\{\dfrac{a\_n-\alpha}{a\_n-\beta}\right\\}$ 构成等比数列，公比为 $\dfrac{\alpha p-s}{\beta p-s}$。

$$
\dfrac{a\_n-\alpha}{a\_n-\beta}=\dfrac{a\_0-\alpha}{a\_0-\beta}\cdot\left(\dfrac{\alpha p-s}{\beta p-s}\right)^n
$$

整理得

$$
a\_n=\dfrac{\left(-\alpha+\beta\left(\dfrac{\alpha p}{\beta p-s}-\dfrac{s}{\beta p-s}\right)^n\right)a\_0-\alpha\beta\left(\dfrac{\alpha p}{\beta p-s}-\dfrac{s}{\beta p-s}\right)^n+\alpha\beta}{\left(\left(\dfrac{\alpha p}{\beta p-s}-\dfrac{s}{\beta p-s}\right)^n-1\right)a\_0-\alpha\left(\dfrac{\alpha p}{\beta p-s}-\dfrac{s}{\beta p-s}\right)^n+\beta}
$$

将 $\alpha,\beta$ 代入

$$
a_n=\dfrac{a_{0} p \left(q - s + \left(\dfrac{q + s + \sqrt{4 p t + (q - s)^{2}}}{q + s - \sqrt{4 p t + (q - s)^{2}}}\right)^{n} \left(- q + s + \sqrt{4 p t + (q - s)^{2}}\right) + \sqrt{4 p t + (q - s)^{2}}\right) + \dfrac{\left(\left(\dfrac{q + s + \sqrt{4 p t + (q - s)^{2}}}{q + s - \sqrt{4 p t + (q - s)^{2}}}\right)^{n} - 1\right) \left(- q + s + \sqrt{4 p t + (q - s)^{2}}\right) \left(q - s + \sqrt{4 p t + (q - s)^{2}}\right)}{2}}{p \left(2 a_{0} p \left(\left(\dfrac{q + s + \sqrt{4 p t + (q - s)^{2}}}{q + s - \sqrt{4 p t + (q - s)^{2}}}\right)^{n} - 1\right) - q + s + \left(\dfrac{q + s + \sqrt{4 p t + (q - s)^{2}}}{q + s - \sqrt{4 p t + (q - s)^{2}}}\right)^{n} \left(q - s + \sqrt{4 p t + (q - s)^{2}}\right) + \sqrt{4 p t + (q - s)^{2}}\right)}
$$
