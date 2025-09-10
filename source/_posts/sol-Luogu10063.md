---
title: 平方数 (SNOI 2024)
mathjax: true
date: 2025-08-19 22:01:17
updated: 2025-08-19 22:01:17
categories:
  - OI
  - solution
tags:
  - math(oi)
  - hash
  - number-theory
---

神秘结论题，感觉不太符合当代 OI 风格。

[题目链接](https://www.luogu.com.cn/problem/P10063)

> 给定一列正整数 $\left(a\_1,a\_2,a\_3,\ldots,a\_n\right)$，求区间乘积为完全平方数的区间个数，并输出前 $10^{5}$ 个区间。
>
> + $1\leqslant n\leqslant 3\times 10^{5}$；
> + $1\leqslant a\_i\leqslant 10^{36}$。

<!-- more -->

---

首先可以想到对每个数暴力质因数分解，使用 Pollard-Pho 算法，总复杂度 $\mathcal O\left(n\sqrt[4]{A}\right)$。

如果能做的话，可以给每个质数随机赋权，统计一下异或和为 $0$ 的区间。

可惜出题人甚至不愿意放一个 $a\_{i}\leqslant 10^{18}$ 的点。

---

注意到二次剩余（可以理解为模意义下完全平方数）这个东西。

直觉上讲，我们已知对于一个奇质数 $p$，模 $p$ 意义下有 $\dfrac{p-1}{2}$ 个数是二次剩余，而完全平方数在任何奇质数模数下总是二次剩余。

因此直觉上讲，对于一个非完全平方数，通过随机取质数再判定二次剩余的方法，我们只有 $\dfrac{1}{2}$ 的概率会判断错误，因此取 $\mathcal O\left(\log n\right)$ 个随机质数大概就可以保证正确。

这里可以先给出模奇质数二次剩余的判别法：

{% note 二次剩余判定 open %}
$p$ 为奇质数时，$a$ 在模 $p$ 意义下是二次剩余，当且仅当

$$
a^{\frac{p-1}{2}}\equiv 1\pmod{p}
$$

> *略证*
>
> 对于必要性，假设 $a\equiv x^{2}$，根据 Fermat 小定理，有 $x^{p-1}\equiv 1$，进而 $\left(x^{2}\right)^{\frac{p-1}{2}}\equiv a^{\frac{p-1}{2}}\equiv 1$。
>
> ---
>
> 对于充分性，考虑模 $p$ 的简化剩余系
> 
> $$
> S=\left\\{-\dfrac{p-1}{2},-\dfrac{p-1}{2}+1,\ldots,-1,1,\dfrac{p-1}{2}-1,\dfrac{p-1}{2}\right\\}
> $$
>
> 对于每一个 $j\in S$，可以求出 $k$ 使得 $jk\equiv a$。
> 
> 若不存在 $j=k$，则 $S$ 中所有数可以两两配对，即 $\left(p-1\right)!\equiv a^{\frac{p-1}{2}}=1$，与 Wilson 定理矛盾。

至于二次剩余存在 $\dfrac{p-1}{2}$ 个，可以从 $x^{2}\equiv y^{2}\Leftrightarrow x\equiv\pm y$ 解释。

---

我不太想引入 Legendre 符号等内容，但发现后文不太好描述，因此这里给出定义，对于奇质数 $p$，有：

$$
\left(\dfrac{a}{p}\right)=\begin{cases}
    0,  & p\mid a, \\\\
    1,  & \left(p\nmid a\right) \land \left(\left(\exists x\in\mathbf{Z}\right),~~a\equiv x^2\pmod p\right), \\\\
    -1, & \text{otherwise}. \\\\
\end{cases}
$$

显然

$$
\left(\dfrac{a}{p}\right) \equiv a^{\frac{p-1}{2}}\pmod {p}
$$

{% endnote %}

仅仅从这个判定方式来看，明显 $\left(\dfrac{a}{p}\right)$ 对于 $a$ 是完全积性的，因此显然两个二次剩余或两个非二次剩余相乘是二次剩余；一个二次剩余和一个非二次剩余相乘是非二次剩余（只考虑 $(a,p)=1$）。

不妨维护每个数模 $p$ 意义下 $\left(\dfrac{a}{p}\right)$ 的值，压成一个二进制数，为 $-1$ 则记 $1$，为 $1$ 则记 $0$，为 $0$ 时该位无效，也记为 $0$。

这样若一段区间的异或和为 $0$，则这一段区间的乘积被选择的所有质数均判定为完全平方数，可以认为找到了一个解。

这样的做法是 $\mathcal O\left(nT\log P\right)$ 的，这里 $T$ 为质数数量，根据前文分析，可以取 $T=\mathcal O\left(\log n\right)$。

---

若 $P$ 较小，可以筛法预处理全部二次剩余，遗憾的是这种做法可以被卡掉。

方法很显然，例如算法取前 $n$ 个质数 $p\_i$，则可以另取 $n+1$ 个大质数 $q\_i$，将它们判定结果计算出来，这可以看作 $n+1$ 个 $n$ 维向量，显然是线性相关的。

则一定可以取若干 $q\_i$，使得 $Q=\prod q\_i$ 会被每一个 $p\_i$ 判定为完全平方数，但实际上只是若干互异质数的积。

若取前 $n$ 小的质数，则构造复杂度是 $\mathcal O\left(\dfrac{\pi\left(n\right)^{3}}{\omega}\right)$ 的。

具体内容见 [EI 的文章](https://www.cnblogs.com/Elegia/p/17977037/square-numbers)。

已经有人构造出了 $10^{6}$ 以内质数的 [Hack 数据](https://www.luogu.com.cn/problem/U399621)。

[文件不太大，我决定留个档](/files/sq-1e6.in)。

---

洛谷选择加入 Hack 数据后开大时限，Loj 好像没加 Hack 也没开时限，不过卡一卡可以使用同一份代码在两边都过了。

还是 Loj 快，洛谷我是没跑进 1.5s 的~~，但是也卡成最优解了~~。

一个卡常技巧是我把对每个质数求 Euler 判定的过程展开了，`fast_power` 对每个质数生成特定版本的快速幂，每个质数都是编译期常数，取模可以特化；在洛谷上从 8s+ 干到 1s+；在 Loj 从 T 到 A。

```cpp
#include <bits/stdc++.h>
using namespace std;

istream &operator>>(istream &is, __int128 &x) {
  string s;
  is >> s;
  x = 0;
  for (char c : s)
    x = x * 10 + (c - '0');
  return is;
}

template <uint32_t mod> uint64_t fast_power(uint64_t base) {
  uint32_t power = (mod - 1) / 2;
  uint64_t ret = 1;
  for (; power; (base *= base) %= mod, power >>= 1)
    if (power & 1)
      (ret *= base) %= mod;
  return ret;
}

uint64_t get_hash(__int128 s) {
  uint64_t val = 0;
#define RUN_HASH(prime)                                          \
  val <<= 1, val |= fast_power<prime>(s % prime) != 1
  RUN_HASH(1070951741U);
  RUN_HASH(1170130207U);
  RUN_HASH(1183971839U);
  RUN_HASH(1245300233U);
  RUN_HASH(1268569829U);
  RUN_HASH(1298746283U);
  RUN_HASH(1301668909U);
  RUN_HASH(1302872999U);
  RUN_HASH(1354681189U);
  RUN_HASH(1375924369U);
  RUN_HASH(1405604119U);
  RUN_HASH(1563442729U);
  RUN_HASH(1614890171U);
  RUN_HASH(1668696331U);
  RUN_HASH(1717435817U);
  RUN_HASH(1849065671U);
  RUN_HASH(1930615781U);
  RUN_HASH(2056247341U);
  RUN_HASH(2077402687U);
  RUN_HASH(2167628587U);
  RUN_HASH(2312421899U);
  RUN_HASH(2439093781U);
  RUN_HASH(2464088981U);
  RUN_HASH(2530010933U);
  RUN_HASH(2558376851U);
  RUN_HASH(2664181133U);
  RUN_HASH(2708760871U);
  RUN_HASH(2825940619U);
  RUN_HASH(2896962637U);
  RUN_HASH(2955116233U);
  RUN_HASH(3024086707U);
  RUN_HASH(3111206317U);
  RUN_HASH(3119513693U);
  RUN_HASH(3137383213U);
  RUN_HASH(3249720911U);
  RUN_HASH(3413798779U);
  RUN_HASH(3445601713U);
  RUN_HASH(3450314113U);
  RUN_HASH(3497939789U);
  RUN_HASH(3502169413U);
#undef RUN_HASH
  return val;
}

int main() {
  cin.tie(nullptr)->sync_with_stdio(false);
  size_t n;
  cin >> n;

  vector<uint64_t> hash_val(n + 1);
  for (size_t i = 1; i <= n; ++i) {
    __int128 x;
    cin >> x, hash_val[i] = get_hash(x);
  }
  for (size_t i = 1; i <= n; ++i)
    hash_val[i] ^= hash_val[i - 1];

  unordered_map<uint64_t, pair<size_t, vector<size_t>>> hash_map;
  hash_map.reserve(n * 1.2);
  for (size_t i = 0; i <= n; ++i)
    hash_map[hash_val[i]].second.push_back(i);

  size_t ans = 0;
  for (const auto &[key, val] : hash_map)
    ans += val.second.size() * (val.second.size() - 1) >> 1;
  cout << ans << '\n';

  size_t output_limit = 1e5;
  for (size_t i = 0; i < n; ++i) {
    auto &[st, vec] = hash_map[hash_val[i]];
    for (size_t i = ++st; i < vec.size(); ++i) {
      cout << vec[st - 1] + 1 << ' ' << vec[i] << '\n';
      if (!--output_limit)
        return 0;
    }
  }
  return 0;
}
```

{% note xxxx %}
*我不要求你的题总是开多倍时限，我不是恶魔。*

*但是，std 赛后被 Hack 叉掉是怎么回事？你的验题观念怎么了？18 岁可以给 CCF 供假的 std，36 岁开 $10^{36}$ 不让人 Pollard-Pho，72 岁你就变成 74TrAkToR 了。*

*作为一名 OI 选手，我可能得喷死你，真的。*
{% endnote %}
