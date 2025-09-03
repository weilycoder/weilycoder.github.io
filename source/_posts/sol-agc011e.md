---
title: Increasing Numbers (AGC 011 E)
mathjax: true
date: 2025-08-09 19:33:16
updated: 2025-08-09 19:33:16
categories:
  - OI
  - solution
tags:
  - greedy
  - binary-search
---

[原题链接](https://atcoder.jp/contests/agc011/tasks/agc011_e)

> 称一个数是递增的，当且仅当它在 $10$ 进制表示法下的各位数码从高位到低位单调不降；例如，$145$ 和 $114$ 是递增的，而 $190$ 不是。
>
> 给定一个数 $N$，问其最少可被表示为几个递增数的和。
>
> + $1\leqslant N\leqslant 10^{500000}$。

<!-- more -->

---

我们称一个数是好的，当且仅当其当其在 $10$ 进制表示法下各位数码均为 $1$，注意到任何一个递增的数可以被写成不超过 $9$ 个好数的和；而任意不超过 $9$ 个好数的和也必定是递增的。

因此，假如 $N$ 可以被写成不超过 $9k$ 个好数的和，则 $N$ 可以被写成 $k$ 个递增数的和。

容易得到，一个 $r$ 位的好数可以写成

$$
\dfrac{10^{r}-1}{9}
$$

因此 $N$ 可以被写成不超过 $9k$ 个好数的和时，有

$$
N = \sum_{j=1}^{9k}\dfrac{10^{r_j}-1}{9}
$$

变形后可以得到

$$
9N + 9k = \sum_{j=1}^{9k}10^{r_j}
$$

记 $S(n)$ 表示 $n$ 在 $10$ 进制下的各位数字和，则有

$$
S(9N + 9k) \leqslant 9k
$$

同时注意到，当 $N,k$ 满足上式时，可以逆向得到一组不超过 $9k$ 个的好数，使其和为 $N$。

总之，$S(9N + 9k) \leqslant 9k$ 为 $N$ 可以被表示为不超过 $9k$ 个好数的和的充分必要条件。

又因为条件的成立具有单调性，因此可以进行二分答案。

注意到 $k=L=\left\lfloor\log_{10}X\right\rfloor+1$ 时一定可行，因此在区间 $[1, L]$ 上二分即可，这里 $L$ 表示 $X$ 十进制下长度。

```cpp
#include <algorithm>
#include <cstdint>
#include <iostream>
#include <vector>
using namespace std;

static constexpr uint64_t pow10[9] = {
    1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000};

vector<uint64_t> read_bigint(const string &s) {
  vector<uint64_t> result;
  result.reserve((s.size() + 7) >> 3);
  auto it = s.rbegin();
  size_t cnt = 0, val = 0;
  for (; it != s.rend(); ++it, ++cnt) {
    if (cnt == 8)
      result.emplace_back(val), cnt = val = 0;
    val += (*it - '0') * pow10[cnt];
  }
  result.emplace_back(val);
  return result;
}

vector<uint64_t> add(vector<uint64_t> a, uint32_t b) {
  a.empty() ? a.emplace_back(b) : a[0] += b;
  uint64_t carry = a[0] / pow10[8];
  a[0] %= pow10[8];
  for (size_t i = 1; carry; ++i) {
    if (i == a.size())
      a.emplace_back(0);
    a[i] += carry, carry = a[i] / pow10[8], a[i] %= pow10[8];
  }
  return a;
}

vector<uint64_t> mul(vector<uint64_t> a, uint32_t b) {
  if (a.empty())
    return a;
  uint64_t carry = 0;
  for (size_t i = 0; i < a.size() || carry; ++i) {
    if (i == a.size())
      a.emplace_back(0);
    uint64_t cur = (i < a.size() ? a[i] : (uint64_t)0) * b + carry;
    a[i] = cur % pow10[8], carry = cur / pow10[8];
  }
  return a;
}

uint64_t S(const vector<uint64_t> &a) {
  uint64_t result = 0;
  for (size_t i = 0; i < a.size(); ++i)
    for (uint64_t cur = a[i]; cur; cur /= 10)
      result += cur % 10;
  return result;
}

int main() {
  cin.tie(nullptr)->sync_with_stdio(false);
  string s;
  cin >> s;
  auto nums = read_bigint(s);
  uint64_t L = 0, R = s.length();
  while (L < R) {
    uint64_t k = L + ((R - L) >> 1);
    S(mul(add(nums, k), 9)) <= 9 * k ? R = k : L = k + 1;
  }
  cout << L << '\n';
  return 0;
}
```