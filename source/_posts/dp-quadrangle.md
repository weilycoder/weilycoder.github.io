---
title: 四边形不等式优化 DP
mathjax: true
date: 2025-08-10 11:08:45
categories:
  - OI
tags:
  - Dynamic-Programming
---

## 引入（DP 形式）

在最优化 DP 中，常见如下形式的 DP 转移方程

$$
\tag{1} F\_{i} = \min\_{j=1}^{i}\left(g\_{j-1}+w\left(j,i\right)\right)
$$

四边形不等式用于证明以上的转移方程具有性质“决策单调性”。

***这里的 $\min$ 操作应该被理解为一个广义上取“最优化”的操作。***

## 四边形不等式

对于任意 $a\leqslant b\leqslant c\leqslant d$，若函数 $w$ 满足

$$
\tag{2} w(a,c)+w(b,d)\leqslant w(a,d)+w(b,c)
$$

则称函数 $w$ 满足“四边形不等式”。

简单来说，就是“**相交优于包含**”。

顺便，显然若 $w(x,y)$ 满足四边形不等式，则 $g\_{j-1}+w\left(j,i\right)$ 也满足四边形不等式，因此我们在下文中不妨将 $\mathrm{(1)}$ 式简写为

$$
\tag{3} F\_{i} = \min\_{j=1}^{i}w\left(j,i\right)
$$

{% blockquote OI-wiki https://oi-wiki.org/dp/opt/quadrangle/ %}
四边形不等式可以理解为在合理的定义域内，$w$ 的二阶混合差分 $\Delta_{i}\Delta_{j}w(j,i)$ 非正。
{% endblockquote %}

因此四边形不等式也可以理解为函数凸性。

## 决策单调性

在式 $\mathrm{(3)}$ 中，记 $p_i$ 为最小的最优决策点，即 $j=p_i$ 是令 $w\left(j,i\right)$ 取最小的、最小的 $j$。

四边形不等式是决策单调性的一个充分不必要条件。

{% note Proof open %}
若存在下标 $i\lt j$ 使得 $p_i\gt p_j$，又因为 $p_i\leqslant i$，因此有

$$
p_j\lt p_i\leqslant i\lt j
$$

根据假设，有

$$
\begin{aligned}
  w(p_i,i) &\lt w(p_j,i) \\\\
  w(p_j,j) &\leqslant w(p_i,j)
\end{aligned}
$$

因此

$$
w(p_i,i)+w(p_j,j)\lt w(p_j,i)+w(p_i,j)
$$

与四边形不等式矛盾。
{% endnote %}

基于决策单调性，有两种主流方法可以将 DP 优化到 $\mathcal O(n\log n)$。

##　分治

假如 $w(j,i)$ 与先前计算的 $F_j$ 无关，则可以利用这个方法。另外对于一些二维 DP 的转移，如

$$
F_{i,k} = \min_{j=1}^{i}(F_{j,k-1}+w(j,i))
$$

则可以对 $k-1\to k$ 转移时应用分治，可以将复杂度从 $\mathcal O(N^{2}K)$ 优化到 $\mathcal O(NK\log N)$。

具体来说，我们定义过程 $S(l,r,L,R)$ 计算 $F_l$ 到 $F_r$ 的值，并且根据决策单调性已知其最优决策点在区间 $[L,R]$ 内。

则 $S(l,r,L,R)$ 可以实现为：

1. 令 $m\gets \dfrac{l+r}{2}$，从 $[L,R]$ 枚举决策点计算 $F_m$，记录其最优决策点为 $M$；
2. 计算 $S(l,m-1,L,M)$；
3. 计算 $S(m+1,r,M,R)$。

容易得到过程的时间复杂度为 $\mathcal O((R-L)\log (r-l))$。

一般来说，解决全局问题需要调用 $S(1,N,1,N)$，故时间复杂度是 $\mathcal O(N\log N)$。

### Trick：类莫队转移贡献

存在一个很强的结论，就是即使代价函数 $w(j,i)$ 不好算，但是可以快速移动端点，那么复杂度仍然是 $\mathcal O(n\log n)$ 的。

分析一下端点移动的操作数就证完了。

## 单调队列 + 二分

在 $F_i$ 计算不能离线时使用。

在双端队列中维护有序三元组 $(l,r,p)$，表示 $p$ 为 $[l,r]$ 的当前最优决策点。

+ 初始时将 $(1,n,1)$ 插入队列；
+ 从 $2\sim n$ 枚举决策点 $k$，顺便计算 $F_k$：
  + 检查队头的三元组，令 $l\gets k$，若此时 $l\gt r$，那这个元组已经没用了，将它从队头弹出；
  + 从队头取当前最优决策点转移 $F_k$；
  + 将决策点 $k$ 插入队尾，具体地，
    + 若队尾的决策点在 $l$ 处劣于 $k$，根据决策单调性，这整个元组没用了，将他从队尾弹出；
    + 若队尾的决策点在 $l$ 处优于 $k$ 而在 $r$ 处劣于 $k$，那我们二分这个点 $q$ 使得 $q$ 处 $k$ 较劣而 $q+1$ 处 $k$ 较优；
    + 将队尾的 $r\gets q$，将 $(q+1,n,k)$ 插入队尾。

单调队列的均摊是 $\mathcal O(1)$ 的，而二分的复杂度是 $\mathcal O(\log n)$，总的复杂度为 $\mathcal O(n\log n)$。

### Trick：计算代替二分

有时可以直接计算决策的“反超点”，从而做到震撼人心的 $\mathcal O(n)$ 求解。

+ 例题：[Lightning Conductor (POI 2011)](https://www.luogu.com.cn/problem/P3515)
