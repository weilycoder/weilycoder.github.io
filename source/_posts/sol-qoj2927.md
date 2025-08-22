---
title: Bracket Pairing
mathjax: true
date: 2025-08-18 23:25:06
categories:
  - OI
  - solution
tags:
  - Dynamic-Programming
---

模拟赛赛题，赛时不知道咋想的，这么简单的题写得到处是错。

[可能的原](https://qoj.ac/problem/2927)

> 规定 $4$ 种合法括号类型：`()`,`[]`,`{}`,`<>`。
>
> 定义合法的括号串包括且仅包括：
> 1. 空串；
> 2. $pBq$，其中 $p,q$ 为配对的括号串，$B$ 为合法括号串；
> 3. $BC$，其中 $B,C$ 均为非空合法括号串。
>
> 给定一个仅包含 `()[]{}<>?` 的字符串，将 `?` 替换为其他 $8$ 种字符，以构成合法括号串，求方案数。

<!-- more -->

原题的数据范围是暴搜来着。

一眼区间 DP。

定义 $F\_{l,r}$ 表示 $\left[l,r\right)$ 区间的字符可以构成的合法括号串的方案数；定义 $G\_{l,r}$ 为 $\left[l,r\right)$ 区间，限定第 $2$ 种的合法括号串方案数。

明显有转移

$$
F\_{l,r}\gets G\_{l,k}\times F\_{k,r}
$$

这里 $\gets$ 定义为累加。

$G\_{l,k}$ 用于保证不重不漏。

时间复杂度 $\mathcal O\left(n^{3}\right)$。

```cpp
#include <bits/stdc++.h>
using namespace std;

uint32_t is_left_bracket(char c) {
  switch (c) {
  case '(': return 1;
  case '[': return 2;
  case '{': return 3;
  case '<': return 4;
  default: return 100;
  }
}

uint32_t is_right_bracket(char c) {
  switch (c) {
  case ')': return 1;
  case ']': return 2;
  case '}': return 3;
  case '>': return 4;
  default: return 101;
  }
}

uint64_t calc(char left, char right) {
  if (left == '?' && right == '?') return 4;
  else if (left == '?' && is_right_bracket(right) < 10) return 1;
  else if (is_left_bracket(left) < 10 && right == '?') return 1;
  else if (is_left_bracket(left) == is_right_bracket(right)) return 1;
  else return 0;
}

int main() {
  cin.tie(nullptr)->sync_with_stdio(false);
  string s;
  cin >> s;
  size_t n = s.length();
  vector<vector<uint64_t>> G(n + 1, vector<uint64_t>(n + 1));
  vector<vector<uint64_t>> F(n + 1, vector<uint64_t>(n + 1));
  for (size_t i = 0; i + 2 <= n; ++i)
    G[i][i + 2] = F[i][i + 2] = calc(s[i], s[i + 1]);
  for (size_t len = 4; len <= n; ++len) {
    for (size_t i = 0; i + len <= n; ++i) {
      G[i][i + len] = F[i][i + len] = F[i + 1][i + len - 1] * calc(s[i], s[i + len - 1]);
      for (size_t k = 2; k < len; k += 2)
        F[i][i + len] += G[i][i + k] * F[i + k][i + len];
    }
  }
  cout << F[0][n] << '\n';
  return 0;
}
```