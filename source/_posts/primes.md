---
title: 质数判定和快速质因数分解
mathjax: true
date: "2025-08-12T00:57:26.007+0800"
categories:
  - OI
  - template
tags:
  - math(oi)
  - prime
  - number-theory
---

## 质数的定义

{% blockquote OI-wiki https://oi-wiki.org/math/number-theory/basic/ %}
通常，我们在正整数上定义质数与合数：

> 若正整数 $p\lt 2$ 除了 $1$ 和 $p$ 没有其他正约数，那么称 $p$ 为质数（或素数、不可约数）。
>
> 若正整数 $a\gt 2$ 且 $a$ 不是质数，则称 $a$ 是合数。
{% endblockquote %}

质数有一些有名的性质：

+ 对于合数 $a$，存在 $p\leqslant\sqrt{a}$ 满足 $p\mid a$；
+ 大于 $3$ 的质数总可以表示为 $6n\pm 1$ 的形式，这是显然的，其中一个易得而不显然的结论是大于 $3$ 的质数 $p$ 对 $12$ 取模的结果总是 $1$；
+ 质数有无穷多个。

## 质数个数

设 $\pi\left(x\right)$ 表示小于或等于 $x$ 的质数的数量，随着 $x$ 的增大，有 $\pi\left(x\right)\sim\dfrac{x}{\ln x}$。

## 素性判定

所谓素性判定算法，就是判断给定数字是否为质数的算法。

### 暴力枚举

根据性质一，只需要枚举到 $\sqrt{n}$ 以内的数即可。

```cpp
bool is_prime(uint64_t n) {
  for (uint64_t p = 2; p * p <= n; ++p)
    if (n % p == 0)
      return false;
  return true;
}
```

#### 优化 1

在对 $2$ 试除后，我们显然可以不再使用偶数试除。

```cpp
bool is_prime(uint64_t n) {
  if (n % 2 == 0)
    return n == 2;
  for (uint64_t p = 3; p * p <= n; p += 2)
    if (n % p == 0)
      return false;
  return true;
}
```

#### 优化 2

由于大于 $3$ 的质数只可能是 $6m\pm 1$ 的形式，因此可以进一步优化。

这个常数上优化应该不大，不给出实现了。

### 枚举质数

这个在复杂度上是有优化的，因此与暴力枚举分开。

可以将 $\sqrt{n}$ 以内的质数全部使用筛法预处理掉，根据前文结论，这个量级大概是 $\mathcal O\left(\dfrac{\sqrt{n}}{\ln n}\right)$ 的。

预处理质数后分解质因数的效率未必劣于 Pollard Rho 算法。

这种方法的一个神秘优化是在预处理质数的同时预处理其快速取模算法，不知道常数上的优化效果。

---

上述两种方法亦能分解质因数，假如出题人懒得造全质数的测试点，平均情况下的运行效率较高。

好像有定理指出，在区间 $[1,N]$ 随机选择的正整数 $X$ 的最大质因子期望渐进为 $\mathrm{e}^{-\gamma}\dfrac{n}{\ln n}$。

因此在期望意义下只会枚举到 $\mathcal O\left(\sqrt{\dfrac{n}{\ln n}}\right)$ 的因数。

实践上，对于少量 $10^{18}$ 以内的随机数，用这些方法分解质因数的效率是可以接受的。

### 筛法

上文中提到了筛法，但是没有给出实现。

```cpp
for (size_t i = 2; i * i <= N; ++i)
  if (!vis[i])
    for (size_t j = i * i; j <= N; j += i)
      vis[j] = true;
```

这种方法的理论渐进复杂度为 $\mathcal O\left(n\log\log n\right)$ 的，但在 OI 常见数据范围内，通常效率比 $\mathcal O\left(n\right)$ 的欧拉筛来的快。

给出线性筛的常见写法：

```cpp
for (size_t i = 2; i <= N; ++i) {
  if (!vis[i])
    prime.push_back(i);
  for (size_t j : i) {
    if (i * j > N)
      break;
    vis[i * j] = true;
    if (i % j == 0)
      break;
  }
}
```

线性筛的常用领域是递推求数论函数。

### 素性判定算法（素性测试）

在 $n$ 较大的情形，我们常常需要效率更高的算法判断一个数是否为质数。

对于梅森素数形式的数（形如 $2^{p}-1$，$p$ 为质数），有一个叫做 Lucas–Lehmer 测试的方法判定其是否为素数，其时间复杂度是 $\mathcal O\left(p\right)$ 的，相对于输入是 $O\left(\log n\right)$ 的（本文暂且忽略大整数计算的时间复杂度，即采用算术计算 $\mathcal O\left(1\right)$ 的计算模型）。

尽管这个方法只能判断梅森素数，但它的时间复杂度比其他方法都要小，因此最大的梅森素数也是人类目前已知的最大的素数。

对于一般的大质数（对于 OI，一般是 $10^{18}$ 以内）常见的方法是 Miller–Rabin 测试。

#### Fermat 测试

先引入 Fermat 测试。

由于质数总是满足 Fermat 小定理的，因此若一个数不满足费马小定理，则它一定不是质数。

因此我们随机选取 base $a$，检验是否 $a^{x-1}\equiv 1\pmod{x}$。

这个方法的时间复杂度是 $\mathcal O\left(\log x\right)$。

然而，存在一类“伪质数” $C\_{n}$[^1]，满足对于任意 base $a$，满足 $a^{C\_n}\equiv a\pmod{C\_{n}}$。

这样，这类“伪质数”只有我们随机选择时恰好选到与 $c$ 不互质的 base 才能判断，判断次数期望可能到达 $O\left(\sqrt[4]{x}\right)$ 左右。

因此，我们需要对 Fermat 测试进行优化。

#### Miller–Rabin 测试

引入二次探测定理。

> 对于奇质数 $p$，$x^2\equiv 1\pmod{p}$ 的解只有 $x\equiv 1\pmod{p}$ 和 $x\equiv -1\pmod{p}.$
>
> 只需将方程移项，得 $\left(x-1\right)\left(x+1\right)=np$，由 $p$ 为奇质数，命题得证。

因此，我们记 $x-1=u\times 2^{t}$，先计算 $a^{u}$，若其与 $1$ 同余，则通过本轮测试；否则，将其不断平方到 $a^{x-1}$，若过程中未出现 $-1$ 或结果不为 $1$，则本轮测试不通过，不然通过。

```cpp
bool millerRabin(int n) {
  if (n < 3 || !(n & 1)) return n == 2;
  if (n % 3 == 0) return n == 3;
  int u = n - 1, t = 0;
  while (!(u & 1)) u >>=1, ++t;
  for (int i = 0; i < test_time; ++i) {
    int a = rand() % (n - 3) + 2, v = quickPow(a, u, n);
    if (v == 1) continue;
    int s;
    for (s = 0; s < t; ++s) {
      if (v == n - 1) break;
      v = (long long)v * v % n;
    }
    if (s == t) return false;
  }
  return true;
}
```

这里请假装 `rand` 是均匀随机的[^2]。

根据 OI-wiki 上的注释，若 GRH 成立，则只需要使用 $\left[2, \min\left\\{n-2, \left\lfloor 2\ln^2 n \right\rfloor\right\\}\right]$ 内的所有整数作为 base 即可**确定** $x$ 的素性。

仍然是 OI-wiki 的注释，对于 $2^{32}$ 以内的判断，只需要使用 $\left\\{2,7,61\right\\}$ 或前 $8$ 个质数作为 base；

对于 $2^{64}$ 内的判断。只需要使用 $\left\\{2, 325, 9375, 28178, 450775, 9780504, 1795265022\right\\}$ 即可，或者使用前 $12$ 个质数。

这里有一些我曾见过的强伪素数：
+ 46856248255981
+ 341550071728321
+ 84983557412237221
+ 230245660726188031
+ 1134931906634489281
+ 1144336081150073701
+ 1167748053436849501
+ 1646697619851137101
+ 3825123056546413051
+ 4265186605968234451
+ 5474093792130026911
+ 7033671664103127781
+ 7361235187296010651
+ 8276442534101054431
+ 14688059738864848381
+ 16043083915816662841

假如卡常需要不打算使用太多测试，不应该使用固定的 base，即使有时为了方便成绩申诉不愿写随机 base，也尽量不要选择太常用的 base，如 $2$，卡掉是容易的。

随机 base 的 Miller-Rabin 通常不好卡。

[^1]: oeis-A002997，Carmichael 数
[^2]: 在 Windows 下，rand 函数的值域很小，只有 $30000$ 左右

## 快速质因数分解

### SPF 表

若时空允许，可以考虑 $\mathcal O\left(n\right)$ 或 $\mathcal O\left(n\log\log n\right)$ 将每个数的最小质因子（spf）预处理出来（筛法）。

这样可以做到对每个数在质因数个数的复杂度内完成分解，最差情形，复杂度是 $\mathcal O\left(\log n\right)$ 的（质因子全为 $2$）。

### Pollard Rho 算法

~~当代 OI 好像没啥应用空间，但是万一需要卡常呢。~~

简单来讲，对于非质数 $x$（使用素性判断确认），其最小质因子 $p$ 不超过 $\mathcal O\left(\sqrt{n}\right)$。利用生日悖论的结论，可以在 $\mathcal O\left( \sqrt{p}\right)$ 的复杂度极大概率试出 $x$ 的一个非平凡因子。

具体来讲，生日悖论，即下述反直觉的 **事实:** 假定一年有 $365$ 天，则只需要 $23$ 个人，其中存在两人生日相同的概率就超过 $50\\%$；这个结论指出，从 $[1,n]$ 的整数中随机选数，期望选择 $\mathcal O\left(\sqrt{n}\right)$ 次后，会出现两个相同的数。

```cpp
int64_t Pollard_Rho(int64_t x) {
  int64_t s = 0, t = 0;
  int64_t c = (int64_t)rand() % (x - 1) + 1;
  int step = 0, goal = 1;
  int64_t val = 1;
  for (goal = 1;; goal <<= 1, s = t, val = 1) {
    for (step = 1; step <= goal; ++step) {
      t = ((__int128)t * t + c) % x;
      val = (__int128)val * abs(t - s) % x;
      if ((step % 127) == 0) {
        int64_t d = gcd(val, x);
        if (d > 1) return d;
      }
    }
    int64_t d = gcd(val, x);
    if (d > 1) return d;
  }
}
```

请继续假定 `rand() % (x - 1)` 生成的数是均匀的，不过应该没人对着这个卡。

对于那种两个相同量级的大质数相乘得到的数，Pollard Pho 的复杂度期望为 $\mathcal O\left(\sqrt[4]{n}\right)$。

毕竟是期望，可以看作有个大常数。

对于 Pollard Rho 非正解的题目，需要做好被卡的准备。
