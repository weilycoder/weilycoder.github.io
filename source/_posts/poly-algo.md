---
categories:
  - OI
title: 多项式全家桶
mathjax: true
date: "2025-05-23T22:53:19.042+0800"
updated: "2025-05-24T19:12:24.466+0800"
tags:
  - poly
  - template
---

## 多项式乘法

首先，我们应该对多项式乘法给出定义，给定多项式 $f\left(x\right)$ 和 $g\left(x\right)$：

$$
\begin{aligned}
f\left(x\right)=a_0+a_1x+a_2x^2+\cdots+a_nx^n \\\\
g\left(x\right)=b_0+b_1x+b_2x^2+\cdots+b_mx^m
\end{aligned}
$$

定义它们的乘积 $Q\left(x\right)=f\left(x\right)\cdot g\left(x\right)$ 为：

$$
Q\left(x\right)=\sum_{i=0}^{n}\sum_{j=0}^{m}a_ib_jx^{i+j}=c_0+c_1x+c_2x^2+\cdots+c_{n+m}x^{n+m}
$$

### Algo 1 $\quad O\left(n^2\right)$

因此，我们容易想到 $nm$ 暴力模拟。

```cpp
for (int i = 0; i <= n; ++i)
  for (int j = 0; j <= n; ++j)
    c[i + j] += a[i] * b[j];
```

时间复杂度 $O\left(n^2\right)$（假定 $m=O\left(n\right)$）。

### Algo 2 $\quad O\left(n^{\log_2 3}\right)$

在模数难以 NTT 并不想打 MTT 等毒瘤算法时使用。

考虑分治，首先，将 $f\left(x\right)$ 和 $g\left(x\right)$ 都补齐到 $n$ 项。

任取 $0\lt m\lt n$，记

$$
\begin{aligned}
f\left(x\right)=A&=A_1\cdot x^m+A_0 \\\\
g\left(x\right)=B&=B_1\cdot x^m+B_0 \\\\
f\left(x\right)\cdot g\left(x\right)=C&=C_2\cdot x^{2m}+C_1\cdot x^m+C_0
\end{aligned}
$$

这里，$A_0,B_0$ 为次数小于 $m$ 的多项式。

容易得到：

$$
\begin{aligned}
C_2&=A_1\cdot B_1 \\\\
C_1&=A_1\cdot B_0+A_0\cdot B_1 \\\\
C_0&=A_0\cdot B_0
\end{aligned}
$$

这需要 $4$ 次多项式乘法，考虑使用加法替代一次。

注意到：

$$
C_1=\left(A_1+A_0\right)\cdot \left(B_1+B_0\right)-C_2-C_0
$$

因此，我们可以将原问题化为 $3$ 个规模更小的子问题。

取 $m=\dfrac{n}{2}$，记计算多项式乘法的耗时为 $T\left(n\right)$，则

$$
T\left(n\right)=3\left(\dfrac{n}{2}\right)+O\left(n\right)
$$

由主定理，$T\left(n\right)=O\left(n^{\log_2 3}\right)$。

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
f\left(x\right)=\sum_{i=0}^{2^k-1}a_ix^i
$$

考虑分治，将奇数项和偶数项分开。

$$
\begin{aligned}
f\left(x\right)&=\sum_{i=0}^{2^{k-1}-1}a_{2i}x^{2i}+\sum_{i=0}^{2^{k-1}-1}a_{2i+1}x^{2i+1} \\\\
&=\sum_{i=0}^{2^{k-1}-1}a_{2i}x^{2i}+x\sum_{i=0}^{2^{k-1}-1}a_{2i+1}x^{2i}
\end{aligned}
$$

定义 $g\left(x\right)$ 和 $h\left(x\right)$ 是 $2^{k-1}$ 项的多项式：

$$
\begin{aligned}
g\left(x\right)&=\sum_{i=0}^{2^{k-1}-1}a_{2i}x^{i} \\\\
h\left(x\right)&=\sum_{i=0}^{2^{k-1}-1}a_{2i+1}x^{i}
\end{aligned}
$$

则

$$
f\left(x\right)=g\left(x^2\right)+xh\left(x^2\right)
$$

考虑 $f\left(x\right)$ 在 $\omega_{2^k}^{t}$ 处的点值：

$$
\begin{aligned}
f\left(\omega_{2^k}^{t}\right)&=g\left(\left(\omega_{2^k}^{t}\right)^2\right)+\omega_{2^k}^{t}h\left(\left(\omega_{2^k}^{t}\right)^2\right) \\\\
&=g\left(\omega_{2^k}^{2t}\right)+\omega_{2^k}^{t}h\left(\omega_{2^k}^{2t}\right) \\\\
&=g\left(\omega_{2^{k-1}}^{t}\right)+\omega_{2^k}^{t}h\left(\omega_{2^{k-1}}^{t}\right)
\end{aligned}
$$

同理有：

$$
\begin{aligned}
f\left(\omega_{2^k}^{t+2^{k-1}}\right)&=g\left(\left(\omega_{2^k}^{t+2^{k-1}}\right)^2\right)+\omega_{2^k}^{t+2^{k-1}}h\left(\left(\omega_{2^k}^{t+2^{k-1}}\right)^2\right) \\\\
&=g\left(\omega_{2^k}^{2t}\right)-\omega_{2^k}^{t}h\left(\omega_{2^k}^{2t}\right) \\\\
&=g\left(\omega_{2^{k-1}}^{t}\right)-\omega_{2^k}^{t}h\left(\omega_{2^{k-1}}^{t}\right)
\end{aligned}
$$

因此，只需计算 $g\left(x\right)$ 和 $h\left(x\right)$ 在 $2^{k-1}$ 次单位根上的点值，就能计算出 $f\left(x\right)$ 在 $2^k$ 次单位根上的点值；因此递归对 $g\left(x\right)$ 和 $h\left(x\right)$ 做 FFT 即可。

容易看出，算法的时间复杂度满足 $T\left(n\right)=2T\left(\dfrac{n}{2}\right)+O\left(n\right)$，因此 FFT 的时间复杂度为 $O\left(n\log n\right)$。

#### IFFT

得到多项式的点值后，我们考虑如何将点值形式转化为系数形式。

FFT 可以看作系数向量乘变换矩阵：

$$
\begin{bmatrix} a_0 \\\\ a_1 \\\\ a_2 \\\\ a_3 \\\\ \vdots \\\\ a_{n-1} \end{bmatrix}
\=
\begin{bmatrix}
  1 & 1 & 1 & 1 & \cdots & 1 \\\\
  1 & \omega_n^1 & \omega_n^2 & \omega_n^3 & \cdots & \omega_n^{n-1} \\\\
  1 & \omega_n^2 & \omega_n^4 & \omega_n^6 & \cdots & \omega_n^{2\left(n-1\right)} \\\\
  1 & \omega_n^3 & \omega_n^6 & \omega_n^9 & \cdots & \omega_n^{3\left(n-1\right)} \\\\
  \vdots & \vdots & \vdots & \vdots & \ddots & \vdots \\\\
  1 & \omega_n^{n-1} & \omega_n^{2\left(n-1\right)} & \omega_n^{3\left(n-1\right)} & \cdots & \omega_n^{\left(n-1\right)^2}
\end{bmatrix}
$$

因此，IFFT 计算变换矩阵的逆矩阵。

观察到变换矩阵的逆矩阵为：

$$
\dfrac{1}{n}
\cdot
\begin{bmatrix}
  1 & 1 & 1 & 1 & \cdots & 1 \\\\
  1 & \omega_n^{-1} & \omega_n^{-2} & \omega_n^{-3} & \cdots & \omega_n^{-\left(n-1\right)} \\\\
  1 & \omega_n^{-2} & \omega_n^{-4} & \omega_n^{-6} & \cdots & \omega_n^{-2\left(n-1\right)} \\\\
  1 & \omega_n^{-3} & \omega_n^{-6} & \omega_n^{-9} & \cdots & \omega_n^{-3\left(n-1\right)} \\\\
  \vdots & \vdots & \vdots & \vdots & \ddots & \vdots \\\\
  1 & \omega_n^{-\left(n-1\right)} & \omega_n^{-2\left(n-1\right)} & \omega_n^{-3\left(n-1\right)} & \cdots & \omega_n^{-\left(n-1\right)^2}
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
x_0,x_1,x_2,x_3,x_4,x_5,x_6,x_7; \\\\
x_0,x_2,x_4,x_6,x_1,x_3,x_5,x_7; \\\\
x_0,x_4,x_2,x_6,x_1,x_5,x_3,x_7; \\\\
x_0,x_4,x_2,x_6,x_1,x_5,x_3,x_7;
\end{aligned}
$$

因此，我们可以使用递推的方法 $O\left(n\right)$ 计算出每个数反转后的结果并交换：

```cpp
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
```

```cpp
using Complex = complex<double>;

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
