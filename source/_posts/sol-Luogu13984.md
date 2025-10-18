---
title: 数列分块入门 9
mathjax: true
date: 2025-10-18 11:51:23
updated: 2025-10-18 11:51:23
categories:
  - OI
  - solution
tags:
  - blocks
---

> 给定一个长为 $n$ 的序列，$n$ 次询问区间最小众数。
>
> + $1\leqslant n\leqslant 3\times 10^{5}$
> + $10.00\mathrm{s}, 1.00\mathrm{GB}$

<!-- more -->

---

## algo 1

首先要离散化。

考虑分块。

令块长为 $B$，我们预处理以下内容：

+ 任意两块之间的最小众数，总的时间复杂度 $\mathcal O\left(\frac{n^{2}}{B}\right)$，空间复杂度 $\mathcal O\left(\frac{n^{2}}{B^{2}}\right)$。
+ 任意两块之间每个数的出现次数，这个前缀和处理，时间复杂度为 $\mathcal O\left(\frac{n^{2}}{B}\right)$，空间复杂度与时间同阶。

---

考虑如何处理查询。对于每次查询，涉及的数分为 **整块间的数** 和 **散块内的数**。对于整块内的数，显然可能成为众数的就是这些数的众数；对于散块内的数，每一个数都可能成为众数，因为我们不知道它们在整块间的出现情况。

我们对于这 $\mathcal O\left(B\right)$ 个数，检查它们出现的次数。对于散块，我们暴力累计；对于整块，我们有预处理时统计的计数数组。

因此单次查询的复杂度是 $\mathcal O\left(B\right)$ 的。

发现取 $B=\mathcal O\left(\sqrt{n}\right)$ 可以达到理论最优复杂度。

---

有一些实现细节。

首先你在查询时需要一个计数数组来维护每个数出现的次数，你发现这个东西不能每次重新建一个，否则单次就 $\mathcal O\left(n\right)$ 了。

同理你也不能每次使用后清空，因此你需要记录哪些数出现了，用于最终撤销对计数数组的修改。

然后你发现你需要对每个出现过的数处理它们在块间出现过几次，但你记录哪些数出现的时候没法去重，这时排序去重又要多一个 $\log$。

你发现你可以利用计数数组，扫一遍所有要记录的数，仅当它是最后一次出现，才记录它的贡献。

当然，你也可以使用 `unordered_map`，这样甚至不需要最开始的离散化，但是常数可能略大。

{% editor cpp vs-dark false 500px %}
#include <bits/stdc++.h>
using namespace std;

int main() {
  cin.tie(nullptr)->sync_with_stdio(false);
  cin.exceptions(cin.failbit | cin.badbit);

  uint32_t n;
  cin >> n;

  vector<int32_t> arr(n);
  for (uint32_t i = 0; i < n; ++i)
    cin >> arr[i];

  vector<int32_t> original = arr;
  sort(original.begin(), original.end());
  original.erase(unique(original.begin(), original.end()), original.end());
  for (uint32_t i = 0; i < n; ++i)
    arr[i] = static_cast<int32_t>(lower_bound(original.begin(), original.end(), arr[i]) -
                                  original.begin());
  const uint32_t vs = original.size();

  const uint32_t B = max<uint32_t>(1, sqrt(n));
  const uint32_t num_blocks = (n - 1) / B + 1;
  vector<vector<uint32_t>> blocks_count(num_blocks, vector<uint32_t>(vs, 0));
  for (uint32_t i = 0; i < n; ++i)
    ++blocks_count[i / B][arr[i]];
  for (uint32_t b = 1; b < num_blocks; ++b)
    for (uint32_t val = 0; val < vs; ++val)
      blocks_count[b][val] += blocks_count[b - 1][val];

  vector<vector<int32_t>> blocks_mode(num_blocks, vector<int32_t>(num_blocks, -1));
  for (uint32_t i = 0; i < num_blocks; ++i) {
    vector<uint32_t> freq(vs, 0);
    int32_t mode = 0;
    for (uint32_t j = i; j < num_blocks; ++j) {
      for (uint32_t k = j * B; k < min(n, (j + 1) * B); ++k) {
        const int32_t val = arr[k];
        ++freq[val];
        if (freq[val] > freq[mode] || (freq[val] == freq[mode] && val < mode))
          mode = val;
      }
      blocks_mode[i][j] = mode;
    }
  }

  vector<uint32_t> freq(vs, 0);
  auto get_mode = [&](uint32_t l, uint32_t r) {
    int32_t mode = 0;
    uint32_t lb = l / B, rb = r / B;
    if (rb - lb <= 1) {
      for (uint32_t i = l; i <= r; ++i)
        ++freq[arr[i]];

      for (uint32_t i = l; i <= r; ++i)
        if (freq[arr[i]] > freq[mode] || (freq[arr[i]] == freq[mode] && arr[i] < mode))
          mode = arr[i];

      for (uint32_t i = l; i <= r; ++i)
        freq[arr[i]] = 0;
    } else {
      vector<int32_t> candidates;

      for (uint32_t i = l; i < (lb + 1) * B; ++i)
        candidates.push_back(arr[i]), ++freq[arr[i]];
      for (uint32_t i = rb * B; i <= r; ++i)
        candidates.push_back(arr[i]), ++freq[arr[i]];
      candidates.push_back(blocks_mode[lb + 1][rb - 1]), ++freq[blocks_mode[lb + 1][rb - 1]];

      for (int32_t val : candidates)
        if (--freq[val] == 0)
          freq[val] = blocks_count[rb - 1][val] - blocks_count[lb][val];

      for (uint32_t i = l; i < (lb + 1) * B; ++i)
        ++freq[arr[i]];
      for (uint32_t i = rb * B; i <= r; ++i)
        ++freq[arr[i]];

      for (int32_t val : candidates)
        if (freq[val] > freq[mode] || (freq[val] == freq[mode] && val < mode))
          mode = val;

      for (int32_t val : candidates)
        freq[val] = 0;
    }
    return original[mode];
  };

  uint32_t q = n;
  while (q--) {
    uint32_t l, r;
    cin >> l >> r, --l, --r;
    cout << get_mode(l, r) << '\n';
  }

  return 0;
}
{% endeditor %}