---
title: 期望线性的平面最近点对算法
mathjax: true
date: 2024-09-28 23:19:00
categories:
  - OI
  - template
tags:
  - distance
  - geometry
---

讲述一种**期望**线性复杂度的平面最近点对算法。

1. 将点打乱
2. 对于小常数 $D$，暴力计算前 $D$ 个点的平面最近点对。
3. 考虑从前 $i-1$ 个点推出前 $i$ 个点的平面最近点对：
   + 设前 $i-1$ 个点的平面最近点对距离为 $s$，将平面以 $s$ 为边长划分成若干网格，用哈希表记录每个网格内的点。
   + 检查第 $i$ 个点所在的网格及其周围共 $9$ 个网格内的点是否能更新答案，检查的点的数量是 $O(1)$ 的，因为每个网格最多有 $4$ 个点。
   + 若答案更新，重构网格。前 $i$ 个点的平面最近点对包含第 $i$ 个点的概率为 $O\left(\frac{1}{i}\right)$，重构网格的代价为 $O(i)$，故每个点的期望代价为 $O(1)$。

若给定的点有重，似乎算法效率会减小，建议特判。

更奇怪的是，排序的效率似乎高于打乱的效率。

```cpp
#include <algorithm>
#include <cmath>
#include <cstdint>
#include <iomanip>
#include <iostream>
#include <random>
#include <unordered_map>
#include <unordered_set>
#include <utility>
#include <vector>
#define x first
#define y second
using namespace std;

const int M = 1000;
int n;
double ans = HUGE_VAL;
vector<pair<int, int>> vec;
unordered_map<uint64_t, vector<pair<int, int>>> grid;

inline uint64_t mapping(unsigned a, unsigned b) {
  return (uint64_t)a << 32 | (uint64_t)b;
}

void prework() {
  int m = min(n, M);
  for (int i = 0; i < m; ++i)
    for (int j = i + 1; j < m; ++j)
      ans = min(ans, hypot(vec[i].x - vec[j].x, vec[j].y - vec[i].y));
}

void remake(int m) {
  grid.clear();
  for (int i = 0; i <= m; ++i) {
    int a = floor(vec[i].x / ceil(ans)), b = floor(vec[i].y / ceil(ans));
    grid[mapping(a, b)].push_back(make_pair(vec[i].x, vec[i].y));
  }
}

bool has_same() {
  unordered_set<uint64_t> ust;
  for (auto &&[u, v] : vec) {
    uint64_t hs = mapping(u, v);
    if (!ust.insert(hs).second)
      return true;
  }
  return false;
}

int main() {
  mt19937 rnd; rnd.seed(random_device()());
  ios::sync_with_stdio(false); cin.tie(0);
  cin >> n;
  for (int i = 0; i < n; ++i) {
    int a, b;
    cin >> a >> b;
    vec.emplace_back(a, b);
  }
  if (has_same()) {
    ans = 0;
    goto jump;
  }
  shuffle(vec.begin(), vec.end(), rnd);
  prework(); remake(min(n, M) - 1);
  for (int i = M; i < n; ++i) {
    int a = floor(vec[i].x / ceil(ans)), b = floor(vec[i].y / ceil(ans));
    double ret = ans;
    for (int dx = -1; dx <= 1; ++dx)
      for (int dy = -1; dy <= 1; ++dy) {
        int s = a + dx, t = b + dy;
        if (grid.count(mapping(s, t)) == 0)
          continue;
        for (auto &&[u, v] : grid[mapping(s, t)])
          ret = min(ret, hypot(vec[i].x - u, vec[i].y - v));
      }
    if (ret < ans)
      ans = ret, remake(i);
    else
      grid[mapping(a, b)].emplace_back(vec[i].x, vec[i].y);
  }
jump:
  cout << fixed << setprecision(4) << ans << "\n";
  return 0;
}
```

也可以参考我在 [Qoj 上的提交记录](https://qoj.ac/submission/1017630)。
