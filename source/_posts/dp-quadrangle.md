---
title: 四边形不等式优化 DP
mathjax: true
date: 2025-08-10 11:08:45
updated: 2025-08-10 11:08:45
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
\tag{2} w\left(a,c\right)+w\left(b,d\right)\leqslant w\left(a,d\right)+w\left(b,c\right)
$$

则称函数 $w$ 满足“四边形不等式”。

简单来说，就是“**相交优于包含**”。

顺便，显然若 $w\left(x,y\right)$ 满足四边形不等式，则 $g\_{j-1}+w\left(j,i\right)$ 也满足四边形不等式，因此我们在下文中不妨将 $\mathrm{\left(1\right)}$ 式简写为

$$
\tag{3} F\_{i} = \min\_{j=1}^{i}w\left(j,i\right)
$$

{% blockquote OI-wiki https://oi-wiki.org/dp/opt/quadrangle/ %}
四边形不等式可以理解为在合理的定义域内，$w$ 的二阶混合差分 $\Delta\_{i}\Delta\_{j}w\left(j,i\right)$ 非正。
{% endblockquote %}

因此四边形不等式也可以理解为函数凸性。

## 决策单调性

在式 $\mathrm{\left(3\right)}$ 中，记 $p\_i$ 为最小的最优决策点，即 $j=p\_i$ 是令 $w\left(j,i\right)$ 取最小的、最小的 $j$。

四边形不等式是决策单调性的一个充分不必要条件。

{% note Proof open %}
若存在下标 $i\lt j$ 使得 $p\_i\gt p\_j$，又因为 $p\_i\leqslant i$，因此有

$$
p\_j\lt p\_i\leqslant i\lt j
$$

根据假设，有

$$
\begin{aligned}
  w\left(p\_i,i\right) &\lt w\left(p\_j,i\right) \\\\
  w\left(p\_j,j\right) &\leqslant w\left(p\_i,j\right)
\end{aligned}
$$

因此

$$
w\left(p\_i,i\right)+w\left(p\_j,j\right)\lt w\left(p\_j,i\right)+w\left(p\_i,j\right)
$$

与四边形不等式矛盾。
{% endnote %}

基于决策单调性，有两种主流方法可以将 DP 优化到 $\mathcal O\left(n\log n\right)$。

##　分治

假如 $w\left(j,i\right)$ 与先前计算的 $F\_j$ 无关，则可以利用这个方法。另外对于一些二维 DP 的转移，如

$$
F\_{i,k} = \min\_{j=1}^{i}\left(F\_{j,k-1}+w\left(j,i\right)\right)
$$

则可以对 $k-1\to k$ 转移时应用分治，可以将复杂度从 $\mathcal O\left(N^{2}K\right)$ 优化到 $\mathcal O\left(NK\log N\right)$。

具体来说，我们定义过程 $S\left(l,r,L,R\right)$ 计算 $F\_l$ 到 $F\_r$ 的值，并且根据决策单调性已知其最优决策点在区间 $[L,R]$ 内。

则 $S\left(l,r,L,R\right)$ 可以实现为：

1. 令 $m\gets \dfrac{l+r}{2}$，从 $[L,R]$ 枚举决策点计算 $F\_m$，记录其最优决策点为 $M$；
2. 计算 $S\left(l,m-1,L,M\right)$；
3. 计算 $S\left(m+1,r,M,R\right)$。

容易得到过程的时间复杂度为 $\mathcal O\left(\left(R-L\right)\log \left(r-l\right)\right)$。

一般来说，解决全局问题需要调用 $S\left(1,N,1,N\right)$，故时间复杂度是 $\mathcal O\left(N\log N\right)$。

### Trick：类莫队转移贡献

存在一个很强的结论，就是即使代价函数 $w\left(j,i\right)$ 不好算，但是可以快速移动端点，那么复杂度仍然是 $\mathcal O\left(n\log n\right)$ 的。

分析一下端点移动的操作数就证完了。

## 单调队列 + 二分

在 $F\_i$ 计算不能离线时使用。

在双端队列中维护有序三元组 $\left(l,r,p\right)$，表示 $p$ 为 $[l,r]$ 的当前最优决策点。

+ 初始时将 $\left(1,n,1\right)$ 插入队列；
+ 从 $2\sim n$ 枚举点 $k$，顺便计算 $F\_k$：
  + 检查队头的三元组，令 $l\_{\mathrm{head}}\gets k$，若此时 $l\_{\mathrm{head}}\gt r\_{\mathrm{head}}$，那这个元组已经没用了，将它从队头弹出；
  + 从队头取当前最优决策点转移 $F\_k$；
  + 将决策点 $k$ 插入队尾，具体地，
    + 若队尾的决策点 $p\_{\mathrm{tail}}$ 在 $l\_{\mathrm{tail}}$ 处劣于 $k$，根据决策单调性，这整个元组没用了，将他从队尾弹出；
    + 若队尾的决策点 $p\_{\mathrm{tail}}$ 在 $l\_{\mathrm{tail}}$ 处优于 $k$ 而在 $r\_{\mathrm{tail}}$ 处劣于 $k$，那我们二分这个点 $q$ 使得 $q$ 处 $k$ 较劣而 $q+1$ 处 $k$ 较优；
    + 将队尾的 $r\_{\mathrm{tail}}\gets q$，将 $\left(q+1,n,k\right)$ 插入队尾。

单调队列的均摊是 $\mathcal O\left(1\right)$ 的，而二分的复杂度是 $\mathcal O\left(\log n\right)$，总的复杂度为 $\mathcal O\left(n\log n\right)$。

### Trick：计算代替二分

有时可以直接计算决策的“反超点”，从而做到震撼人心的 $\mathcal O\left(n\right)$ 求解。

+ 例题：[Lightning Conductor (POI 2011)](https://www.luogu.com.cn/problem/P3515)

{% note SOLUTION fold %}
看到限制是全局的，不妨将其拆成两部分，先只考虑 $j < i$ 的部分，再反过来求一遍，最后取最大值。

因此显然有

$$
\begin{aligned}
  F\_{i} 
  &= \max\_{j\lt i}\left\\{a\_{j}-a\_{i}+\sqrt{i-j}\right\\} \\\\
  &= \max\_{j\lt i}\left\\{a\_{j}+\sqrt{i-j}\right\\}-a\_{i} \\\\
\end{aligned}
$$

这个东西做法很多，利用 $\sqrt{i-j}$ 的值最多会有 $\mathcal O\left(\sqrt{n}\right)$，可以做到 $\mathcal O\left(n\sqrt{n}\right)$ 的复杂度。

每个点的转移是完全独立的，因此也可以使用分治法做，复杂度是 $\mathcal O\left(n\log n\right)$ 的。

但是，如果我们使用队列二分的方法，可以将复杂度优化到线性。

假设当前要把决策点 $i$ 插入单调队列，此时队尾的决策点为 $p$，我们希望计算得到一个最小的 $m$，使得 $m$ 点为最小的 $i$ 优于 $p$ 的转移点。

即解不等式

$$
a\_{p}+\sqrt{m-p}\lt a\_{i}+\sqrt{m-i}
$$

移项得

$$
\sqrt{m-p}-\sqrt{m-i} \lt a\_{i}-a\_{p}
$$

由于 $p\lt i$，因此不等式左侧为正数，设 $d=a\_{i}-a\_{p}$，显然 $d\leqslant 0$ 时无解。

若 $d\gt 0$，有

$$
\begin{aligned}
  \sqrt{m-p}-\sqrt{m-i} &\lt d \\\\
  \sqrt{m-p} &\lt d + \sqrt{m-i} \\\\
  m-p &\lt d^{2}+m-i+2d\sqrt{m-i} \\\\
  i-p-d^{2} &\lt 2d\sqrt{m-i} \\\\
  \sqrt{m-i} &\gt \dfrac{i-p-d^{2}}{2d} \\\\
  m &\gt i+\dfrac{\left(i-p-d^{2}\right)^{2}}{4d^{2}} \\\\
\end{aligned}
$$

因此 $m=i+\left\lfloor\dfrac{\left(i-p-d^{2}\right)^{2}}{4d^{2}}\right\rfloor+1$

至此，我们可以 $\mathcal O(1)$ 计算决策点插入的位置，因此总的时间复杂度为 $\mathcal O(n)$ 的。
{% endnote %}
