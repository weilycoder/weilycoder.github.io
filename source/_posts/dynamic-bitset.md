---
title: dynamic_bitset
mathjax: true
code_fold: -1
date: 2025-08-13T19:58:38.702+0800
categories:
  - OI
tags:
  - bits
  - data-structure
  - Bugs
---

本来是想简要介绍 `dynamic_bitset<>` 的使用的，结果变成一篇 Bug 警告了，但是还是将用法简单介绍一下。

一般来说，可以将 `dynamic_bitset` 认为是 `vector<bool>` 与 `bitset` 的联合加强版，其常用的功能有：

+ 构造函数，除了复制构造等，还可以
  + 通过一个整数构造（指定长度）；
  + 通过 01 字符串构造（注意低位在先）；
  + 通过一组整数构造（初始化列表，每个整数占 64 位）。
+ 大小有关的接口
  + `resize` 可以更改 `dynamic_bitset` 的大小；
  + `clear` 可以将 `dynamic_bitset` 的大小设为 $0$；
  + `size` 获取 `dynamic_bitset` 的大小；
  + `empty` 判断 `dynamic_bitset` 的大小是否为 $0$。
+ 追加数据
  + `push_back` 用于向**高位**追加一位数据；
  + `append` 用于将高位追加一块数据，接受类型为整数，转换为 $64$ 位追加。
+ 访问数据
  + 可以使用 `[]` 访问；
  + 可以使用 `set`/`unset`/`flip`/`test` 等获取和修改数据。
  + 可以使用 `all`/`any`/`none` 等判断全局数据。
  + 可以使用 `to_ulong`/`to_string` 等。
+ 查找
  + 可以使用 `find_first` 获取从低位开始的第一个 `1`；
  + 可以使用 `find_next(pos)` 获取 `pos` 位置开始的第一个 `1`。
+ 集合操作
  + 可以使用 `&`,`|`,`-`,`~`,`^`；
  + 甚至存在 `is_subset_of`,`is_proper_subset_of`。
+ ***位移***
  + ***可以使用 `<<`,`>>` 进行左移或右移。***

最后标为重点的**位移**操作，正是部分 GCC 版本存在漏洞的功能。

GNU 实现代码如下：

{% codeblock tr2/dynamic_bitset.tcc lang:cpp first_line:41 mark:63,64,91,92 %}
  // Definitions of non-inline functions from __dynamic_bitset_base.
  template<typename _WordT, typename _Alloc>
    void
    __dynamic_bitset_base<_WordT, _Alloc>::_M_do_left_shift(size_t __shift)
    {
      if (__builtin_expect(__shift != 0, 1))
    {
      const size_t __wshift = __shift / _S_bits_per_block;
      const size_t __offset = __shift % _S_bits_per_block;

      if (__offset == 0)
        for (size_t __n = this->_M_w.size() - 1; __n >= __wshift; --__n)
          this->_M_w[__n] = this->_M_w[__n - __wshift];
      else
        {
          const size_t __sub_offset = _S_bits_per_block - __offset;
          for (size_t __n = _M_w.size() - 1; __n > __wshift; --__n)
        this->_M_w[__n] = ((this->_M_w[__n - __wshift] << __offset)
                 | (this->_M_w[__n - __wshift - 1] >> __sub_offset));
          this->_M_w[__wshift] = this->_M_w[0] << __offset;
        }

      //// std::fill(this->_M_w.begin(), this->_M_w.begin() + __wshift,
      ////          static_cast<_WordT>(0));
    }
    }

  template<typename _WordT, typename _Alloc>
    void
    __dynamic_bitset_base<_WordT, _Alloc>::_M_do_right_shift(size_t __shift)
    {
      if (__builtin_expect(__shift != 0, 1))
    {
      const size_t __wshift = __shift / _S_bits_per_block;
      const size_t __offset = __shift % _S_bits_per_block;
      const size_t __limit = this->_M_w.size() - __wshift - 1;

      if (__offset == 0)
        for (size_t __n = 0; __n <= __limit; ++__n)
          this->_M_w[__n] = this->_M_w[__n + __wshift];
      else
        {
          const size_t __sub_offset = (_S_bits_per_block
                       - __offset);
          for (size_t __n = 0; __n < __limit; ++__n)
        this->_M_w[__n] = ((this->_M_w[__n + __wshift] >> __offset)
                 | (this->_M_w[__n + __wshift + 1] << __sub_offset));
          this->_M_w[__limit] = this->_M_w[_M_w.size()-1] >> __offset;
        }

      ////std::fill(this->_M_w.begin() + __limit + 1, this->_M_w.end(),
      ////          static_cast<_WordT>(0));
    }
    }

{% endcodeblock %}

容易发现，可能是调试目的，`dynamic_bitset` 的左移右移的实现中，把填充 `0` 的 `fill` 函数注释了，并不小心进行了发布。

这个漏洞直到 [gcc-mirror/gcc@bd3a312](https://github.com/gcc-mirror/gcc/commit/bd3a312728fbf8c35a09239b9180269f938f872e) 才被修复，具体来说，直到 GCC 14.3。

容易在自己的环境中复现这个 Bug：

```cpp
#include <bitset>
#include <iostream>
#include <tr2/dynamic_bitset>
using namespace std;
using tr2::dynamic_bitset;

int main() {
  cin.tie(nullptr)->sync_with_stdio(false);
  bitset<128> bit0("00000000000000000000000000000000"
                   "00000000000000000000001000000010"
                   "00000000000000000000000000000000"
                   "00000000000000000000000001110010");
  dynamic_bitset<> bit1{114, 514};

  cout << "Origin\n";
  cout << "bitset<128>:      " << bit0 << '\n';
  cout << "dynamic_bitset<>: " << bit1 << '\n';
  cout << '\n';

  cout << "Left-Shift 32\n";
  cout << "bitset<128>:      " << (bit0 << 32) << '\n';
  cout << "dynamic_bitset<>: " << (bit1 << 32) << '\n';
  cout << '\n';
  cout << "Right-Shift 32\n";
  cout << "bitset<128>:      " << (bit0 >> 32) << '\n';
  cout << "dynamic_bitset<>: " << (bit1 >> 32) << '\n';
  cout << '\n';

  cout << "Left-Shift 64\n";
  cout << "bitset<128>:      " << (bit0 << 64) << '\n';
  cout << "dynamic_bitset<>: " << (bit1 << 64) << '\n';
  cout << '\n';
  cout << "Right-Shift 64\n";
  cout << "bitset<128>:      " << (bit0 >> 64) << '\n';
  cout << "dynamic_bitset<>: " << (bit1 >> 64) << '\n';
  cout << '\n';

  cout << "Left-Shift 72\n";
  cout << "bitset<128>:      " << (bit0 << 72) << '\n';
  cout << "dynamic_bitset<>: " << (bit1 << 72) << '\n';
  cout << '\n';
  cout << "Right-Shift 72\n";
  cout << "bitset<128>:      " << (bit0 >> 72) << '\n';
  cout << "dynamic_bitset<>: " << (bit1 >> 72) << '\n';
  cout << '\n';

  cout << "Left-Shift 128\n";
  cout << "bitset<128>:      " << (bit0 << 128) << '\n';
  cout << "dynamic_bitset<>: " << (bit1 << 128) << '\n';
  cout << '\n';
  cout << "Right-Shift 128\n";
  cout << "bitset<128>:      " << (bit0 >> 128) << '\n';
  cout << "dynamic_bitset<>: " << (bit1 >> 128) << '\n';
  cout << '\n';

  return 0;
}
```

可能的输出：

```text
Origin
bitset<128>:      00000000000000000000000000000000000000000000000000000010000000100000000000000000000000000000000000000000000000000000000001110010
dynamic_bitset<>: 00000000000000000000000000000000000000000000000000000010000000100000000000000000000000000000000000000000000000000000000001110010

Left-Shift 32
bitset<128>:      00000000000000000000001000000010000000000000000000000000000000000000000000000000000000000111001000000000000000000000000000000000
dynamic_bitset<>: 00000000000000000000001000000010000000000000000000000000000000000000000000000000000000000111001000000000000000000000000000000000

Right-Shift 32
bitset<128>:      00000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000001000000000000000000000000000000000
dynamic_bitset<>: 00000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000001000000000000000000000000000000000

Left-Shift 64
bitset<128>:      00000000000000000000000000000000000000000000000000000000011100100000000000000000000000000000000000000000000000000000000000000000
dynamic_bitset<>: 00000000000000000000000000000000000000000000000000000000011100100000000000000000000000000000000000000000000000000000000001110010

Right-Shift 64
bitset<128>:      00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000010
dynamic_bitset<>: 00000000000000000000000000000000000000000000000000000010000000100000000000000000000000000000000000000000000000000000001000000010

Left-Shift 72
bitset<128>:      00000000000000000000000000000000000000000000000001110010000000000000000000000000000000000000000000000000000000000000000000000000
dynamic_bitset<>: 00000000000000000000000000000000000000000000000001110010000000000000000000000000000000000000000000000000000000000000000001110010

Right-Shift 72
bitset<128>:      00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010
dynamic_bitset<>: 00000000000000000000000000000000000000000000000000000010000000100000000000000000000000000000000000000000000000000000000000000010

Left-Shift 128
bitset<128>:      00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
dynamic_bitset<>: 00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000

Right-Shift 128
bitset<128>:      00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
dynamic_bitset<>: 00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
```

值得指出的是，如果在左移右移后立刻和自己取或，那么结果是不影响的，很多为了美观和可扩展性而从 `bitset` 换成 `dynamic_bitset` 的代码可能仍可以正常运行。

另外，由于实现中特判了足以清空 `dynamic_bitset` 的左右移，因此最后一个测试是通过的。
