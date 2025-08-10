---
title: 斜率优化 DP
mathjax: true
date: 2025-08-10 13:30:28
categories:
  - OI
tags:
  - Dynamic-Programming
---

## 引入（DP 形式）

斜率优化解决形如下式的 DP 转移，其中对一些函数的性质有要求，在后文详细说明。

$$
\tag{1} F\_i = \min\_{j=1}^{i} \left(F\_j + a\left(i\right)b\left(j\right) + c\left(j\right) + d\left(i\right)\right)
$$

## 变形

先将 DP 中的 $\min$ 去掉，然后移项

$$
\tag{2} -a\left(i\right)b\left(j\right) + \left(F\_i - d\left(i\right)\right) = F\_j + c\left(j\right)
$$

将这个式子看作一次函数 $y=kx+b$，其中 $k:=-a\left(i\right),b:=F\_{i} - d\left(i\right)$，那么 $P\_{j}\left(b\left(j\right),F\_{j}-c\left(j\right)\right)$ 被这条直线经过。

注意到函数的斜率 $k$ 是已知的，所有决策点 $P\_{j}$ 也已知，我们需要最小化的就是函数的截距。

<img src="/image/dp-opt-slope.svg" alt="slope_optimization" style="background: white;">

直观上讲，我们将这条斜率为 $k$ 的直线从下往上平移，直到有一个点 $P\_j$ 被直线经过，此时 $j$ 就是最优的 DP 决策。计算完 $F\_i$ 后，我们将新的点 $P\_i$ 加入点集，以作为新的决策点。

显然可能作为决策点的集合只有点集的下凸壳，因此我们只需要需要维护下凸壳即可。

## 特殊性质要求

假如 DP 方程满足性质 $b\left(i\right)$ 单调递增，则每次只会从凸壳的最右侧插入新的点。

这时可以使用单调队列维护下凸壳上的点（下凸壳斜率单调递增）。

假设斜率为 $k=-a\left(i\right)$ 的直线在过 $P\_{m}$ 点时取最小截距，则显然有 $k\_{P\_{m-1}P\_{m}}\leqslant k\leqslant k\_{P\_{m}P\_{m+1}}$，因此可以在单调队列上二分，此时时间复杂度为 $\mathcal O\left(n\log n\right)$。

---

如果 $-a\left(i\right)$ 也单调递增，即每次查询直线的斜率是单调递增的，这时显然凸壳上的决策点的横坐标也是单调递增的，因此可以双指针维护，总的时间复杂度降到 $\mathcal O\left(n\right)$。

---

此外，似乎可以使用李超线段树维护一些东西，有空我再研究研究。

## 无特殊性质

假如新增的点也不单调了。

此时一个最简单的想法是在平衡树上维护凸壳，查询时在平衡树上二分，据（OI-wiki）说写起来实现繁琐，但我觉得好像用 `set` 可以实现这里的平衡树需要的全部功能了，有空尝试实现一下。~~想了一下发现 `set` 上的二分部分不太好写，但我觉得可以使用 `mutable` 表示一些奇怪的东西，例如插入的使候设成 false，插完查询之前再设成 true；想当年我 `set` 里存的类型的成员全是 `mutable` 的，并且对着只读引用直接改。~~

---

一个据（OI-wiki）说好写的东西是 CDQ 分治，具体来说，设过程 $\mathcal C\left(l,r\right)$ 使用 CDQ 分治技巧计算 $[l,r]$ 上的 $F\_i$：
+ 令 $m\gets \dfrac{l+r}{2}$，计算 $\mathcal C\left(l,m\right)$ 并构造其凸包；
+ 利用 $[l,m]$ 的凸包向 $[m+1,r]$ 做转移，然后 $[l,m]$ 对 DP 转移的影响已经处理完了；
+ 计算 $\mathcal C\left(m+1,r\right)$。

时间复杂度为 $\mathcal O\left(n\log^{2}n\right)$。
