---
title: sqrt(n²+n+X) (ABC 420)
mathjax: true
date: 2025-08-24 21:56:54
categories:
  - OI
  - solution
tags:
  - math(oi)
---

这是 G 题？

> 给定一个整数 $X$，找出所有整数 $n$，使得 $\sqrt{n^{2}+n+X}$ 是一个整数。
>
> + $|X|\leqslant 10^{14}$

<!-- more -->

---

注意到

$$
\begin{aligned}
  n^{2}+n+X &= m^{2} \\\\
  4n^{2}+4n+4X &= 4m^{2} \\\\
  4n^{2}+4n+1-4m^{2} &= 1-4X \\\\
  \left(2n+1\right)^{2}-\left(2m\right)^{2} &= 1-4X \\\\
  \left(2n+2m+1\right)\left(2n-2m+1\right) &= 1-4X \\\\
\end{aligned}
$$

显然枚举 $1-4X$ 的所有因子即可。

~~这不是初中题吗。~~

{% editor cpp vs-dark false 500px %}
#include <bits/stdc++.h>
using namespace std;

vector<int64_t> solve(int64_t X) {
  int64_t D = 1 - 4 * X;
  vector<int64_t> ans;
  for (int64_t p = 1; p * p <= abs(D); ++p) {
    if (D % p)
      continue;
    {
      int64_t u = p, v = D / u;
      int64_t r = u + v - 2;
      if (r % 4 == 0)
        ans.push_back(r / 4);
    }
    {
      int64_t u = -p, v = D / u;
      int64_t r = u + v - 2;
      if (r % 4 == 0)
        ans.push_back(r / 4);
    }
  }
  sort(ans.begin(), ans.end());
  return ans;
}

int main() {
  cin.tie(nullptr)->sync_with_stdio(false);
  int64_t X;
  cin >> X;
  auto ans = solve(X);
  cout << ans.size() << '\n';
  for (int64_t n : ans)
    cout << n << ' ';
  cout << '\n';
  return 0;
}
{% endeditor %}