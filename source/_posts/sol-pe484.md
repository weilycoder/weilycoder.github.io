---
categories:
  - OI
title: PE484 Arithmetic Derivative
date: 2025-05-19 22:05:17
mathjax: true
password: "8907904768686152599"
tags:
  - solution
  - number-theory
  - sieve
  - powerful-number
  - project-euler
---

> 定义一个正整数的算术导数：
>
> + $p^\prime=1$，这里 $p$ 为质数；
> + $(ab)^\prime=a^\prime b+ab^\prime$，这里 $a,b$ 为任意正整数。
>
> 例如，$20^\prime=24$。
>
> 求
>
> $$
> \sum_{i=2}^{N}\gcd(i,i^\prime)
> $$
>
> $N=5\times 10^{15}$。

<!-- more -->

## 思路

### 先考虑 $x^\prime$ 是啥

由唯一分解定理，记

$$
x=\prod p_{i}^{\alpha_{i}}
$$

手玩几组可以发现，

$$
x^\prime=x\sum\dfrac{\alpha_{i}}{p_{i}}
$$

使用定义归纳即证。

### 再考虑 $\gcd(x,x^\prime)$

记 $f(x)=\gcd(x,x^\prime)$。

显然可以逐个质因子统计对结果的影响，因此这个函数是积性函数。

### 考虑 $f(p^e)$ 的值

由于 $(p^e)^\prime=ep^{e-1}$，因此

$$
f(p_e)=\gcd(p_e,ep^{e-1})=
\begin{cases}
p^{e},&p\mid e \\\\
p^{e-1},&\text{otherwise}
\end{cases}
$$

至此，问题转化为求积性函数 $f$ 的前缀和。

## 求和

函数没有很明显的容斥特征，并且不能估算，考虑套亚线性筛。

能求数据量 $5\times 10^{15}$ 的亚线性筛只有 Powerful Number 筛。

### PN 筛

这是一种计算积性函数前缀和的方法。

#### 记号约定

+ 默认 $p$ 的取值范围为质数
+ 对于小写字母表示的数论函数，用大写字母表示其前缀和，如 $F(n)=\sum_{i=1}^nf(i)$。
+ 符号 $\ast$ 表示狄利克雷卷积，即：$(g\ast h)(n)=\sum_{d\mid n}g(d)h\left(\dfrac{n}{d}\right)$。

#### Powerful Number

首先，我们引入 PN。

**定义**：由唯一分解定理，记 $n=\prod p_{i}^{\alpha_{i}}$，$n$ 是 PN 当且仅当对所有 $i$，满足 $\alpha_i>1$。特别地，令 $1$ 也属于 $\mathbf{PN}$。

**引理**：任何 PN 可以表为 $a^2b^3$。

> 结论显然，不证。

**性质**：$n$ 以内的 PN 有 $O(\sqrt{n})$ 个。

> 证：枚举 $a$，考虑满足条件的 $b$ 的个数，用积分估算：
> 
> $$
> \int_{1}^{\sqrt{n}} \sqrt[3]{\frac{n}{x^2}} \mathrm{d}x = O\left(\sqrt{n}\right)
> $$
> 

因此，预处理 $\sqrt{n}$ 以内质数后，可以 DFS $O(\sqrt{n})$ 枚举 $n$ 以内 PN。

#### 筛法过程

首先，构造积性函数 $g$，满足 $g(p)=f(p)$，最好能 $O(1)$ 求和。

其次，构造积性函数 $h$，满足 $g\ast h=f$。

对于质数 $p$，$f(p)=g(1)h(p)+g(p)h(1)=h(p)+g(p)\Rightarrow h(p)=0$。由 $h(n)$ 是积性函数，得 $h(n)$ 仅在 PN 处取有效值。

由 $f=g\ast h$，有

$$
\begin{aligned}
F(n)
&=\sum_{i=1}^{n}(g\ast h)(i) \\\\
&=\sum_{i=1}^{n}\sum_{d\mid i}g(d)h\left(\dfrac{i}{d}\right) \\\\
&=\sum_{d=1}^{n}\sum_{i=1}^{\left\lfloor\frac{n}{d}\right\rfloor}h(d)g(i) \\\\
&=\sum_{d=1}^{n}h(d)\sum_{i=1}^{\left\lfloor\frac{n}{d}\right\rfloor}g(i) \\\\
&=\sum_{d=1}^{n}h(d)G\left(\left\lfloor\dfrac{n}{d}\right\rfloor\right) \\\\
&=\sum_{d\in\mathbf{PN}}^{n}h(d)G\left(\left\lfloor\dfrac{n}{d}\right\rfloor\right)
\end{aligned}
$$

注意倒数第二行的结果与杜教筛的变换一致。

#### 构造

对于本题，由于 $f(p)=1$，构造 $g=1$，则 $g^{-1}=\mu$，$G(n)=n$。

考虑 $h=f\ast\mu$ 在 $p^e$ 处的取值：

$$
h(p^e)=\sum_{i=0}^{e}\mu(p^{i})f(p^{e-i})=f(p^e)-f(p^{e-1})
$$

提前 $O(\sqrt{n}\log n)$ 筛出需要的质数和 $h(p^e)$ 的值，注意这个上界不紧。

接下来 $O(\sqrt{n})$ 枚举 PN 求和即可。

> 若构造的 $g(n)$ 需使用杜教筛求和，时间复杂度退化为 $O(n^{2/3})$。

```cpp
#include <bits/stdc++.h>
using namespace std;

constexpr int64_t isqrt_newton(int64_t n) {
  int64_t x = 1ll << ((63 - __builtin_clzll(n)) >> 1);
  bool d = false;
  for (;;) {
    int64_t nx = (x + n / x) >> 1;
    if (x == nx || (nx > x && d))
      break;
    d = nx < x, x = nx;
  }
  return x;
}

const int64_t N = 0x11c37937e08000; // 5e15
const int64_t S = isqrt_newton(N) + 2;

bitset<S> vis;
vector<vector<int64_t>> primes, h;
void sieve() {
  vis[0] = vis[1] = true;
  for (int64_t i = 2; i * i < S; ++i)
    if (!vis[i])
      for (int64_t j = i * i; j < S; j += i)
        vis[j] = true;
  for (int64_t i = 2; i < S; ++i) {
    if (vis[i])
      continue;
    vector<int64_t> a{1}, b{1}, c{1};
    for (int64_t e = 1, pk = i;; ++e, pk *= i) {
      b.push_back(e % i ? a.back() : pk);
      a.push_back(pk);
      c.push_back(b[e] - b[e - 1]);
      if (pk > N / i)
        break;
    }
    h.push_back(c);
    primes.push_back(a);
  }
}

int64_t sum;
void dfs(int64_t now, int64_t mul, int64_t hd) {
  sum += hd * (N / mul);
  for (int64_t i = now; i < primes.size(); ++i) {
    auto &pri = primes[i];
    if (pri.size() <= 2)
      break;
    if (mul > N / pri[2])
      break;
    for (int64_t j = 2; j < pri.size(); ++j) {
      if (mul > N / pri[j])
        break;
      dfs(i + 1, mul * pri[j], hd * h[i][j]);
    }
  }
}

int main() {
  sieve();
  dfs(0, 1, 1);
  cout << sum - 1 << endl;
  return 0;
}
```
