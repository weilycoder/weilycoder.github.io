---
title: FWT 入门
mathjax: true
code_fold: -1
date: 2025-09-03T23:28:18.180+0800
categories:
  - OI
  - template
tags:
  - bits
  - Convolution
---

FWT 用于解决位运算卷积，即形如

$$
C\_{i}=\sum\_{i=j\odot k} A\_{j}B\_{k}
$$

的递推。这里 $\odot$ 是二元位运算的某一种。

其核心思想与 FFT 类似，希望找到一个变换 $\mathbf{FWT}\left[F\right]$ 用于将卷积转化为点积。

通常要求 FWT 的数组长度为 $2$ 的整数次幂，可以使用 `n & (n - 1)` 检查，示例代码中没有检查。

## OR

令 $\mathbf{FWT}\left[A\right]\_{i}=\sum\_{i=i\cup j}A\_{j}$，则容易验证

$$
\begin{aligned}
  \mathbf{FWT}\left[A\right]\_{i}\cdot \mathbf{FWT}\left[B\right]\_{i}
  &= \left(\sum\_{i\cup j=i} A\_{j}\right)\left(\sum\_{i\cup k=i} B\_{k}\right) \\\\
  &= \sum\_{i\cup j=i}\sum\_{i\cup k=i} A\_{j}B\_{k} \\\\
  &= \sum\_{i\cup \left(j\cup k\right)=i} A\_{j}B\_{k} \\\\
  &= \mathbf{FWT}\left[C\right]\_i
\end{aligned}
$$

满足要求。

---

考虑将 $\mathbf{FWT}\left[A\right]$ 递推出来，令 $A\_{L}$ 表示 $A$ 的前半段，$A\_{R}$ 表示 $A$ 的后半段，显然有

$$
\begin{aligned}
  \mathbf{FWT}\left[A\right]\_{L} &= \mathbf{FWT}\left[A\_{L}\right] \\\\
  \mathbf{FWT}\left[A\right]\_{R} &= \mathbf{FWT}\left[A\_{L}\right] + \mathbf{FWT}\left[A\_{R}\right] \\\\
\end{aligned}
$$

因此可以在 $\mathcal O\left(n\log n\right)$ 的复杂度内完成递推。

---

反演形式也是显然的

$$
\begin{aligned}
  \mathbf{IFWT}\left[A^{\prime}\right]\_{L} &= \mathbf{IFWT}\left[A^{\prime}\_{L}\right] \\\\
  \mathbf{IFWT}\left[A^{\prime}\right]\_{R} &= \mathbf{IFWT}\left[A^{\prime}\_{R}\right] - \mathbf{IFWT}\left[A^{\prime}\_{L}\right] \\\\
\end{aligned}
$$

---

给出一个实现

```cpp
template <bool inv = false, uint64_t mod = 0> void FWT_or(vector<uint64_t> &arr) {
  size_t n = arr.size();
  for (size_t k = 1; k < n; k <<= 1) {
    for (size_t i = 0; i < n; i += k << 1) {
      for (size_t j = 0; j < k; ++j) {
        if constexpr (!inv)
          arr[i + j + k] += arr[i + j];
        else
          arr[i + j + k] += mod - arr[i + j];
        if constexpr (mod != 0)
          arr[i + j + k] %= mod;
      }
    }
  }
}
```

## AND

类比 $\mathrm{OR}$ 的构造方式，令 $\mathbf{FWT}\left[A\right]\_{i}=\sum\_{i\cap j=i}A\_{j}$，这里不对正确性进行验证。

---

容易得到递推

$$
\begin{aligned}
  \mathbf{FWT}\left[A\right]\_{L} &= \mathbf{FWT}\left[A\_{L}\right] + \mathbf{FWT}\left[A\_{R}\right] \\\\
  \mathbf{FWT}\left[A\right]\_{R} &= \mathbf{FWT}\left[A\_{R}\right] \\\\
  \mathbf{IFWT}\left[A^{\prime}\right]\_{L} &= \mathbf{IFWT}\left[A^{\prime}\_{L}\right] - \mathbf{IFWT}\left[A^{\prime}\_{R}\right] \\\\
  \mathbf{IFWT}\left[A^{\prime}\right]\_{R} &= \mathbf{IFWT}\left[A^{\prime}\_{R}\right] \\\\
\end{aligned}
$$

也可以从 $\mathrm{AND}$ 和 $\mathrm{OR}$ 的对称性理解。

---

```cpp
template <bool inv = false, uint64_t mod = 0> void FWT_and(vector<uint64_t> &arr) {
  size_t n = arr.size();
  for (size_t k = 1; k < n; k <<= 1) {
    for (size_t i = 0; i < n; i += k << 1) {
      for (size_t j = 0; j < k; ++j) {
        if constexpr (!inv)
          arr[i + j] += arr[i + j + k];
        else
          arr[i + j] += mod - arr[i + j + k];
        if constexpr (mod != 0)
          arr[i + j] %= mod;
      }
    }
  }
}
```

## XOR

构造不易。

令 $x\circ y$ 表示 $\left\lvert x\cap y\right\rvert\bmod 2$，则 $\left(x\circ y\right)\oplus\left(x\circ z\right)=x\circ\left(y\oplus z\right)$。

令 $\mathbf{FWT}\left[A\right]\_{i}=\sum\_{i\circ j=0}A\_{j}-\sum\_{i\circ j=1}A\_{j}$，下证构造的正确性：

$$
\begin{aligned}
  \mathbf{FWT}\left[A\right]\_{i}\cdot\mathbf{FWT}\left[B\right]\_{i}
  &= \left(\sum\_{i\circ j=0}A\_{j}-\sum\_{i\circ j=1}A\_{j}\right)\left(\sum\_{i\circ k=0}B\_{k}-\sum\_{i\circ k=1}B\_{k}\right) \\\\
  &= \left(\sum\_{i\circ j=0}A\_{j}\sum\_{i\circ k=0}B\_{k}+\sum\_{i\circ j=1}A\_{j}\sum\_{i\circ k=1}B\_{k}\right)-\left(\sum\_{i\circ j=0}A\_{j}\sum\_{i\circ k=1}B\_{k}+\sum\_{i\circ j=1}A\_{j}\sum\_{i\circ k=0}B\_{k}\right) \\\\
  &= \sum\_{i\circ \left(j\oplus k\right)=0}A\_{j}B\_{k}-\sum\_{i\circ \left(j\oplus k\right)=1}A\_{j}B\_{k} \\\\
  &= \mathbf{FWT}\left[C\right]\_{i}
\end{aligned}
$$

---

容易得到递推

$$
\begin{aligned}
  \mathbf{FWT}\left[A\right]\_{L} &= \mathbf{FWT}\left[A\_{L}\right] + \mathbf{FWT}\left[A\_{R}\right] \\\\
  \mathbf{FWT}\left[A\right]\_{L} &= \mathbf{FWT}\left[A\_{L}\right] - \mathbf{FWT}\left[A\_{R}\right] \\\\
  \mathbf{IFWT}\left[A^{\prime}\right]\_{L} &= \mathbf{IFWT}\left[A^{\prime}\_{L}\right] + \mathbf{IFWT}\left[A^{\prime}\_{R}\right] \\\\
  \mathbf{IFWT}\left[A^{\prime}\right]\_{L} &= \mathbf{IFWT}\left[A^{\prime}\_{L}\right] - \mathbf{IFWT}\left[A^{\prime}\_{R}\right] \\\\
\end{aligned}
$$

---

```cpp
template <uint64_t mod> uint64_t inv(uint64_t x) {
  uint64_t res = 1, b = mod - 2;
  for (x %= mod; b; b >>= 1, x = x * x % mod)
    if (b & 1)
      res = res * x % mod;
  return res;
}

template <bool inv = false, uint64_t mod = 0> void FWT_xor(vector<uint64_t> &arr) {
  size_t n = arr.size();
  for (size_t k = 1; k < n; k <<= 1) {
    for (size_t i = 0; i < n; i += k << 1) {
      for (size_t j = 0; j < k; ++j) {
        uint64_t u = arr[i + j], v = arr[i + j + k];
        arr[i + j] = u + v;
        arr[i + j + k] = mod + u - v;
        if constexpr (mod != 0)
          arr[i + j] %= mod, arr[i + j + k] %= mod;
        if constexpr (inv) {
          if constexpr (mod == 0)
            arr[i + j] >>= 1, arr[i + j + k] >>= 1;
          else {
            static constexpr uint64_t inv2 = inv<mod>(2);
            arr[i + j] = arr[i + j] * inv2 % mod;
            arr[i + j + k] = arr[i + j + k] * inv2 % mod;
          }
        }
      }
    }
  }
}
```

这里假定模数 `mod` 总是质数，如果不能保证，需要修改 `inv` 函数。

## 进一步抽象

设 $c\left(i,j\right)$ 为 $A\_{j}$ 对 $\mathbf{FWT}\left[A\right]\_i$ 的贡献系数，即

$$
\mathbf{FWT}\left[A\right]\_{i} = \sum\_{j=0}^{n-1}c\left(i,j\right)A\_{j}
$$

因为

$$
\mathbf{FWT}\left[A\right]\_{i}\cdot \mathbf{FWT}\left[B\right]\_{i}=\mathbf{FWT}\left[C\right]\_{i}
$$

可以证明

$$
c\left(i,j\right)\cdot c\left(i,k\right) = c\left(i,j\odot k\right)
$$

同时，$c$ 函数可以按位处理，因此可以直接写出递推

$$
\begin{bmatrix}
  \mathbf{FWT}\left[A\right]\_{L} \\\\
  \mathbf{FWT}\left[A\right]\_{R} \\\\
\end{bmatrix}
\=
\begin{bmatrix}
  c\left(0,0\right) & c\left(0,1\right) \\\\
  c\left(1,0\right) & c\left(1,1\right) \\\\
\end{bmatrix}
\cdot
\begin{bmatrix}
  \mathbf{FWT}\left[A\_{L}\right] \\\\
  \mathbf{FWT}\left[A\_{R}\right] \\\\
\end{bmatrix}
$$

记变换矩阵为

$$
C = \begin{bmatrix}
  c\left(0,0\right) & c\left(0,1\right) \\\\
  c\left(1,0\right) & c\left(1,1\right) \\\\
\end{bmatrix}
$$

由于需要逆变换，要求矩阵 $C$ 可逆，即要求矩阵 $C$ 任意一行或任意一列不能全为零。

### OR

可以构造

$$
C = \begin{bmatrix}
1 & 0 \\\\
1 & 1
\end{bmatrix}
$$

同样可以

$$
C^{\prime} = \begin{bmatrix}
1 & 1 \\\\
1 & 0
\end{bmatrix}
$$

其中

$$
C^{-1} = \begin{bmatrix}
1 & 0 \\\\
-1 & 1
\end{bmatrix}
$$

### AND

$$
\begin{aligned}
  C &= \begin{bmatrix}
    1 & 1 \\\\
    0 & 1
  \end{bmatrix} \\\\
  C^{-1} &= \begin{bmatrix}
    1 & -1 \\\\
    0 & 1
  \end{bmatrix}
\end{aligned}
$$

### XOR

$$
\begin{aligned}
  C &= \begin{bmatrix}
    1 & 1 \\\\
    1 & -1
  \end{bmatrix} \\\\
  C^{-1} &= \begin{bmatrix}
    \frac{1}{2} & \frac{1}{2} \\\\
    \frac{1}{2} & -\frac{1}{2}
  \end{bmatrix}
\end{aligned}
$$

---

FWT 存在 $k$ 维形式，这里不展开了。
