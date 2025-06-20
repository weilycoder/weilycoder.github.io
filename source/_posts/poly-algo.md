---
categories:
  - OI
title: 多项式全家桶
mathjax: true
code_fold: -1
date: "2025-05-23T22:53:19.042+0800"
updated: "2025-05-28T00:25:20.904+0800"
tags:
  - poly
  - template-code
---

## 多项式乘法

首先，我们应该对多项式乘法给出定义，给定多项式 $f\left(x\right)$ 和 $g\left(x\right)$：

$$
\begin{aligned}
f\left(x\right)=a\_0+a\_1x+a\_2x^2+\cdots+a\_nx^n \\\\
g\left(x\right)=b\_0+b\_1x+b\_2x^2+\cdots+b\_mx^m
\end{aligned}
$$

定义它们的乘积 $Q\left(x\right)=f\left(x\right)\cdot g\left(x\right)$ 为：

$$
Q\left(x\right)=\sum\_{i=0}^{n}\sum\_{j=0}^{m}a\_ib\_jx^{i+j}=c\_0+c\_1x+c\_2x^2+\cdots+c\_{n+m}x^{n+m}
$$

### Algo 1 $\quad O\left(n^2\right)$

因此，我们容易想到 $nm$ 暴力模拟。

```cpp
for (int i = 0; i <= n; ++i)
  for (int j = 0; j <= n; ++j)
    c[i + j] += a[i] * b[j];
```

时间复杂度 $O\left(n^2\right)$（假定 $m=O\left(n\right)$）。

### Algo 2 $\quad O\left(n^{\log\_2 3}\right)$

在模数难以 NTT 并不想打 MTT 等毒瘤算法时使用。

考虑分治，首先，将 $f\left(x\right)$ 和 $g\left(x\right)$ 都补齐到 $n$ 项。

任取 $0\lt m\lt n$，记

$$
\begin{aligned}
f\left(x\right)=A&=A\_1\cdot x^m+A\_0 \\\\
g\left(x\right)=B&=B\_1\cdot x^m+B\_0 \\\\
f\left(x\right)\cdot g\left(x\right)=C&=C\_2\cdot x^{2m}+C\_1\cdot x^m+C\_0
\end{aligned}
$$

这里，$A\_0,B\_0$ 为次数小于 $m$ 的多项式。

容易得到：

$$
\begin{aligned}
C\_2&=A\_1\cdot B\_1 \\\\
C\_1&=A\_1\cdot B\_0+A\_0\cdot B\_1 \\\\
C\_0&=A\_0\cdot B\_0
\end{aligned}
$$

这需要 $4$ 次多项式乘法，考虑使用加法替代一次。

注意到：

$$
C\_1=\left(A\_1+A\_0\right)\cdot \left(B\_1+B\_0\right)-C\_2-C\_0
$$

因此，我们可以将原问题化为 $3$ 个规模更小的子问题。

取 $m=\dfrac{n}{2}$，记计算多项式乘法的耗时为 $T\left(n\right)$，则

$$
T\left(n\right)=3\left(\dfrac{n}{2}\right)+O\left(n\right)
$$

由主定理，$T\left(n\right)=O\left(n^{\log\_2 3}\right)$。

```cpp
template <typename Int> Int *karatsuba_polymul(Int *a, Int *b, size_t n) {
  if (n <= 32) {
    Int *r = new Int[n << 1 | 1]();
    for (size_t i = 0; i <= n; ++i)
      for (size_t j = 0; j <= n; ++j)
        r[i + j] += a[i] * b[j];
    return r;
  }
  size_t m = (n >> 1) + 1;
  Int *z0, *z1, *z2;
  z0 = karatsuba_polymul(a, b, m - 1);
  z2 = karatsuba_polymul(a + m, b + m, n - m);

  for (size_t i = 0; i + m <= n; ++i) a[i] += a[i + m];
  for (size_t i = 0; i + m <= n; ++i) b[i] += b[i + m];
  z1 = karatsuba_polymul(a, b, m - 1);
  for (size_t i = 0; i + m <= n; ++i) a[i] -= a[i + m];
  for (size_t i = 0; i + m <= n; ++i) b[i] -= b[i + m];

  for (size_t i = 0; i <= (m - 1) << 1; ++i) z1[i] -= z0[i];
  for (size_t i = 0; i <= (n - m) << 1; ++i) z1[i] -= z2[i];

  Int *r = new Int[m << 2 | 1]();
  for (size_t i = 0; i <= (m - 1) << 1; ++i) r[i] += z0[i];
  for (size_t i = 0; i <= (m - 1) << 1; ++i) r[i + m] += z1[i];
  for (size_t i = 0; i <= (n - m) << 1; ++i) r[i + (m << 1)] += z2[i];

  delete[] z0, z1, z2;
  return r;
}
```

这种算法叫 Karatsuba 乘法。

### Algo 3 $\quad O\left(n\log n\right)$

我们知道，除了多项式的系数表达法，$n$ 个点值（一般）也可以唯一确定一个 $n$ 项多项式。而点值表示的多项式可以在 $O\left(n\right)$ 的时间复杂度内相乘。

因此考虑选择 $O\left(n\right)$ 个点使得可以快速求出它们的点值。

由于其良好的性质，我们选择 $2^k$ 次单位根，同时称这个过程为 FFT。

先将给定多项式补齐到 $2^k$ 项，例如：

$$
f\left(x\right)=\sum\_{i=0}^{2^k-1}a\_ix^i
$$

考虑分治，将奇数项和偶数项分开。

$$
\begin{aligned}
f\left(x\right)&=\sum\_{i=0}^{2^{k-1}-1}a\_{2i}x^{2i}+\sum\_{i=0}^{2^{k-1}-1}a\_{2i+1}x^{2i+1} \\\\
&=\sum\_{i=0}^{2^{k-1}-1}a\_{2i}x^{2i}+x\sum\_{i=0}^{2^{k-1}-1}a\_{2i+1}x^{2i}
\end{aligned}
$$

定义 $g\left(x\right)$ 和 $h\left(x\right)$ 是 $2^{k-1}$ 项的多项式：

$$
\begin{aligned}
g\left(x\right)&=\sum\_{i=0}^{2^{k-1}-1}a\_{2i}x^{i} \\\\
h\left(x\right)&=\sum\_{i=0}^{2^{k-1}-1}a\_{2i+1}x^{i}
\end{aligned}
$$

则

$$
f\left(x\right)=g\left(x^2\right)+xh\left(x^2\right)
$$

考虑 $f\left(x\right)$ 在 $\omega\_{2^k}^{t}$ 处的点值：

$$
\begin{aligned}
f\left(\omega\_{2^k}^{t}\right)&=g\left(\left(\omega\_{2^k}^{t}\right)^2\right)+\omega\_{2^k}^{t}h\left(\left(\omega\_{2^k}^{t}\right)^2\right) \\\\
&=g\left(\omega\_{2^k}^{2t}\right)+\omega\_{2^k}^{t}h\left(\omega\_{2^k}^{2t}\right) \\\\
&=g\left(\omega\_{2^{k-1}}^{t}\right)+\omega\_{2^k}^{t}h\left(\omega\_{2^{k-1}}^{t}\right)
\end{aligned}
$$

同理有：

$$
\begin{aligned}
f\left(\omega\_{2^k}^{t+2^{k-1}}\right)&=g\left(\left(\omega\_{2^k}^{t+2^{k-1}}\right)^2\right)+\omega\_{2^k}^{t+2^{k-1}}h\left(\left(\omega\_{2^k}^{t+2^{k-1}}\right)^2\right) \\\\
&=g\left(\omega\_{2^k}^{2t}\right)-\omega\_{2^k}^{t}h\left(\omega\_{2^k}^{2t}\right) \\\\
&=g\left(\omega\_{2^{k-1}}^{t}\right)-\omega\_{2^k}^{t}h\left(\omega\_{2^{k-1}}^{t}\right)
\end{aligned}
$$

因此，只需计算 $g\left(x\right)$ 和 $h\left(x\right)$ 在 $2^{k-1}$ 次单位根上的点值，就能计算出 $f\left(x\right)$ 在 $2^k$ 次单位根上的点值；因此递归对 $g\left(x\right)$ 和 $h\left(x\right)$ 做 FFT 即可。

容易看出，算法的时间复杂度满足 $T\left(n\right)=2T\left(\dfrac{n}{2}\right)+O\left(n\right)$，因此 FFT 的时间复杂度为 $O\left(n\log n\right)$。

#### IFFT

得到多项式的点值后，我们考虑如何将点值形式转化为系数形式。

FFT 可以看作系数向量乘变换矩阵：

$$
\begin{bmatrix} a\_0 \\\\ a\_1 \\\\ a\_2 \\\\ a\_3 \\\\ \vdots \\\\ a\_{n-1} \end{bmatrix}
\=
\begin{bmatrix}
  1 & 1 & 1 & 1 & \cdots & 1 \\\\
  1 & \omega\_n^1 & \omega\_n^2 & \omega\_n^3 & \cdots & \omega\_n^{n-1} \\\\
  1 & \omega\_n^2 & \omega\_n^4 & \omega\_n^6 & \cdots & \omega\_n^{2\left(n-1\right)} \\\\
  1 & \omega\_n^3 & \omega\_n^6 & \omega\_n^9 & \cdots & \omega\_n^{3\left(n-1\right)} \\\\
  \vdots & \vdots & \vdots & \vdots & \ddots & \vdots \\\\
  1 & \omega\_n^{n-1} & \omega\_n^{2\left(n-1\right)} & \omega\_n^{3\left(n-1\right)} & \cdots & \omega\_n^{\left(n-1\right)^2}
\end{bmatrix}
$$

因此，IFFT 计算变换矩阵的逆矩阵。

观察到变换矩阵的逆矩阵为：

$$
\dfrac{1}{n}
\cdot
\begin{bmatrix}
  1 & 1 & 1 & 1 & \cdots & 1 \\\\
  1 & \omega\_n^{-1} & \omega\_n^{-2} & \omega\_n^{-3} & \cdots & \omega\_n^{-\left(n-1\right)} \\\\
  1 & \omega\_n^{-2} & \omega\_n^{-4} & \omega\_n^{-6} & \cdots & \omega\_n^{-2\left(n-1\right)} \\\\
  1 & \omega\_n^{-3} & \omega\_n^{-6} & \omega\_n^{-9} & \cdots & \omega\_n^{-3\left(n-1\right)} \\\\
  \vdots & \vdots & \vdots & \vdots & \ddots & \vdots \\\\
  1 & \omega\_n^{-\left(n-1\right)} & \omega\_n^{-2\left(n-1\right)} & \omega\_n^{-3\left(n-1\right)} & \cdots & \omega\_n^{-\left(n-1\right)^2}
\end{bmatrix}
$$

换句话说，IFFT 变换矩阵是将 FFT 变换矩阵的各项取倒数再除以 $n$。

因此只需在 FFT 的算法的基础上修改少量代码。

#### 位逆序置换

朴素的 FFT 递归地将多项式奇偶项系数分开，这个过程需要大量的数组复制，递归进行也将产生更多的时空间开销。

考虑在最开始模拟递归分割数组的结果，然后使用倍增法合并区间。

注意到，新下标为原下标在二进制下的反转（0-index）。

例如：

$$
\begin{aligned}
x\_0,x\_1,x\_2,x\_3,x\_4,x\_5,x\_6,x\_7; \\\\
x\_0,x\_2,x\_4,x\_6,x\_1,x\_3,x\_5,x\_7; \\\\
x\_0,x\_4,x\_2,x\_6,x\_1,x\_5,x\_3,x\_7; \\\\
x\_0,x\_4,x\_2,x\_6,x\_1,x\_5,x\_3,x\_7;
\end{aligned}
$$

因此，我们可以使用递推的方法 $O\left(n\right)$ 计算出每个数反转后的结果并交换：

```cpp
using Complex = complex<double>;

template <typename T> constexpr void change(vector<T> &a) {
  size_t n = a.size();
  vector<size_t> rev(n);
  for (size_t i = 0; i < n; ++i) {
    rev[i] = rev[i >> 1] >> 1;
    if (i & 1)
      rev[i] |= n >> 1;
    if (i < rev[i])
      swap(a[i], a[rev[i]]);
  }
}

template <int32_t on = 1> constexpr void fft(vector<Complex> y) {
  static_assert(on == 1 || on == -1, "on must be 1 or -1");
  change(y);
  for (size_t h = 2; h <= y.size(); h <<= 1) {
    Complex wn(cos(2 * M_PI / h), sin(on * 2 * M_PI / h));
    for (size_t j = 0; j < y.size(); j += h) {
      Complex w(1, 0);
      for (size_t k = j; k < j + (h >> 1); ++k, w *= wn) {
        Complex u = y[k], t = w * y[k + (h >> 1)];
        y[k] = u + t, y[k + (h >> 1)] = u - t;
      }
    }
  }
  if constexpr (on == -1)
    for (int i = 0; i < len; ++i)
      y[i] /= len;
}
```

### Algo 4 $\quad O\left(n\log n\right)$

题目中为了避免精度问题，常常让我们对大质数取模。

这时，我们可以使用 NTT 替代 FFT。

其实，NTT 就是模意义下的 FFT。

根据原根的定义和存在性定理，对于奇质数 $p$，其原根 $g$ 就是它的 $p-1$ 次单位根；因此，模 $p$ 意义下存在 $n$ 次单位根当且仅当 $n$ 可以整除 $p-1$。

由于 FFT 中使用的是 $2^k$ 次单位根，我们需要的是 $p=s\times 2^t+1$ 形式的质数，这里 $t$ 需要足够大。

常见的模数有：

$$
\begin{aligned}
p=167772161=5\times 2^{25}+1 ,& g=3 \\\\
p=469762049=5\times 7^{26}+1 ,& g=3 \\\\
p=754974721=3^2\times 5\times 2^{24}+1 ,& g=11 \\\\
p=998244353=7\times 17\times 2^{23}+1 ,& g=3 \\\\
p=1004535809=479\times 2^{21}+1 &, g=3
\end{aligned}
$$

```cpp
template <uint64_t p, uint64_t g, bool inv = false>
constexpr void ntt(vector<uint64_t> &a) {
  change(a);
  const int64_t n = a.size();
  constexpr uint64_t gg = inv ? fast_pow<p>(g, p - 2) : g;
  for (uint64_t h = 2; h <= n; h <<= 1) {
    uint64_t wn = fast_pow<p>(gg, (p - 1) / h);
    for (uint64_t i = 0; i < n; i += h) {
      for (uint64_t j = i, w = 1; j < i + (h >> 1); ++j, w = w * wn % p) {
        uint64_t u = a[j], v = a[j + (h >> 1)] * w % p;
        a[j] = (u + v) % p, a[j + (h >> 1)] = (u + p - v) % p;
      }
    }
  }
  if constexpr (inv) {
    const int64_t inv_n = fast_pow<p>(n, p - 2);
    for (uint64_t &x : a)
      x = x * inv_n % p;
  }
}
```

## 多项式初等函数

如无说明，以下内容中的多项式很可能是在模 $x^n$ 意义下讨论的（截断到 $n$ 项）。

### 多项式对数函数

首先，根据多项式复合的定义，若 $\ln f\left(x\right)$ 存在，则 $[x^0]f\left(x\right)=1$。

考虑将 $\ln f\left(x\right)$ 求导后积分：

$$
\begin{align}
\dfrac{\mathrm{d}}{\mathrm{d}x}\ln f\left(x\right) &= \dfrac{f'\left(x\right)}{f\left(x\right)} \\\\
\ln f\left(x\right) &= \int \dfrac{f'\left(x\right)}{f\left(x\right)} \mathrm{d}x
\end{align}
$$

### 多项式三角/反三角函数

感觉没啥应用？

三角函数直接套用欧拉公式：

$$
\begin{aligned}
  \sin{x} &= \dfrac{\mathrm{e}^{\mathrm{i}x} - \mathrm{e}^{-\mathrm{i}x}}{2\mathrm{i}} \\\\
  \cos{x} &= \dfrac{\mathrm{e}^{\mathrm{i}x} + \mathrm{e}^{-\mathrm{i}x}}{2}
\end{aligned}
$$

反三角函数仍然求导后积分：

$$
\begin{aligned}
  \frac{\mathrm{d}}{\mathrm{d} x} \arcsin{x} &= \frac{1}{\sqrt{1 - x^{2}}} \\\\
  \arcsin{x} &= \int \frac{1}{\sqrt{1 - x^{2}}} \mathrm{d} x \\\\
  \frac{\mathrm{d}}{\mathrm{d} x} \arccos{x} &= - \frac{1}{\sqrt{1 - x^{2}}} \\\\
  \arccos{x} &= - \int \frac{1}{\sqrt{1 - x^{2}}} \mathrm{d} x \\\\
  \frac{\mathrm{d}}{\mathrm{d} x} \arctan{x} &= \frac{1}{1 + x^{2}} \\\\
  \arctan{x} &= \int \frac{1}{1 + x^{2}} \mathrm{d} x
\end{aligned}
$$

将式中的 $x$ 替换为 $f\left(x\right)$ 即可。

### 多项式牛顿迭代法

给定二元函数 $G\left(x,y\right)$，已知多项式 $f\left(x\right)$ 满足

$$
G\left(x, f\left(x\right)\right)\equiv 0\pmod{x^n}
$$

并且存在 $f\_1$ 满足：

+ $G\left(x, f\_1\right)=0$；
+ $\dfrac{\partial G}{\partial y}\left(0, f\_1\right) \neq 0$。

求 $f\left(x\right)$ 在模 $x^n$ 意义下的结果。

考虑倍增构造：

首先，$n=1$ 时，单独求出 $[x^0]G\left(x,f\left(x\right)\right)=0$ 的解，假设中的 $f\_1$ 为一个解。

如果已经得到了模 $x^n$ 意义下的解 $f\_n\left(x\right)$，尝试构造模 $x^{2n}$ 意义下的解。

将 $G\left(x,f\left(x\right)\right)$ 在 $f\_n\left(x\right)$ 处泰勒展开，由题意：

$$
\sum\_{i=0}^{+\infty}\dfrac{\frac{\partial^iG}{\partial y^i}\left(x,f\_n\left(x\right)\right)}{i!}\left(f\left(x\right)-f\_n\left(x\right)\right)^i\equiv 0\pmod{x^{2n}}
$$

由于 $f\left(x\right)-f\_n\left(x\right)$ 的最低非零项次数为 $n$，因此：

$$
\forall i\ge 2:\left(f\left(x\right)-f\_n\left(x\right)\right)^i\equiv 0\pmod{x^{2n}}
$$

代入泰勒展开式：

$$
\begin{aligned}
  \sum\_{i=0}^{+\infty}\dfrac{\frac{\partial^iG}{\partial y^i}\left(x,f\_n\left(x\right)\right)}{i!}\left(f\left(x\right)-f\_n\left(x\right)\right)^i
  & \equiv G\left(x,f\_n\left(x\right)\right)+\dfrac{\partial G}{\partial y}\left(x,f\_n\left(x\right)\right)\left(f\left(x\right)-f\_n\left(x\right)\right) \\\\
  & \equiv 0 \pmod {x^{2n}}
\end{aligned}
$$

因此

$$
f\_{2n}\left(x\right)\equiv f\_n\left(x\right)-\dfrac{G\left(x,f\_n\left(x\right)\right)}{\frac{\partial G}{\partial y}\left(x,f\_n\left(x\right)\right)} \pmod {x^{2n}}
$$

### 多项式求逆

设给定函数为 $h\left(x\right)$。

利用牛顿迭代法，令

$$
G\left(x,y\right)=\dfrac{1}{y}-h\left(x\right)\equiv 0
$$

则

$$
\begin{aligned}
  f\_{2n}
  & \equiv f\_n\left(x\right)-\dfrac{\frac{1}{f\_n\left(x\right)}-h\left(x\right)}{-\frac{1}{f\_n^2\left(x\right)}} \\\\
  & \equiv 2f\_n\left(x\right)-f\_n^2\left(x\right)h\left(x\right)
  \pmod {x^{2n}}
\end{aligned}
$$

### 多项式开方

设给定函数为 $h\left(x\right)$，有

$$
G\left(x,y\right)=y^2-h\left(x\right)\equiv 0
$$

则

$$
\begin{aligned}
  f\_{2n}\left(x\right)
  & \equiv f\_n\left(x\right)-\dfrac{f\_n^2\left(x\right)-h\left(x\right)}{2f\_n\left(x\right)} \\\\
  & \equiv \dfrac{f\_n^2\left(x\right)+h\left(x\right)}{2f\_n\left(x\right)}
  \pmod {x^{2n}}
\end{aligned}
$$

### 多项式指数函数

设给定函数为 $h\left(x\right)$，有

$$
G\left(x,y\right)=\ln y-h\left(x\right)\equiv 0
$$

则

$$
\begin{aligned}
  f\_{2n}\left(x\right)
  & \equiv f\_n\left(x\right)-\dfrac{\ln f\_n\left(x\right)-h\left(x\right)}{\frac{1}{f\_n\left(x\right)}} \\\\
  & \equiv f\_n\left(x\right)\left(1-\ln f\_n\left(x\right)+h\left(x\right)\right)
  \pmod {x^{2n}}
\end{aligned}
$$
