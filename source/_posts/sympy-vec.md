---
categories:
- sympy
title: Sympy 向量计算
date: 2025-05-15 22:49:31
---

## 三维坐标系

```python
from sympy.vector import CoordSys3D
N = CoordSys3D('N')
```

坐标系统下有三个正交基向量：`N.i`，`N.j`，`N.k`。

## 零向量

零向量为 `Vector.zero`，与坐标系统无关。

```python
from sympy.vector import Vector
print(Vector.zero)
```

## 坐标原点

```python
from sympy.vector import CoordSys3D
N = CoordSys3D('N')
print(N.origin)
```

## 向量运算

### 四则运算

```python
v = N.i - 2 * N.j
print(v / 3)            # 1/3*N.i + (-2/3)*N.j
print(v + N.k)          # N.i + (-2)*N.j + N.k
print(Vector.zero / 2)  # 0
print((v / 3) * 4)      # 4/3*N.i + (-8/3)*N.j
```

### 点乘、叉乘

```python
v1 = 2*N.i + 3*N.j - N.k
v2 = N.i - 4*N.j + N.k
print(v1.dot(v2))    # -11
print(v1.cross(v2))  # (-1)*N.i + (-3)*N.j + (-11)*N.k
print(v2.cross(v1))  # N.i + 3*N.j + 11*N.k
```

`&` 和 `^` 分别被重载为点乘和叉乘。

### 向量操作

1. 查看元素：

   ```python
   from sympy.vector import CoordSys3D
   C = CoordSys3D('C')
   v = 3*C.i + 4*C.j + 5*C.k
   print(v.components)  # {C.i: 3, C.j: 4, C.k: 5}
   ```

2. 获取向量模长：

   ```python
   v.magnitude()  # 5*sqrt(2)
   ```

3. 将向量标准化：

   ```python
   v.normalize()  # (3*sqrt(2)/10)*C.i + (2*sqrt(2)/5)*C.j + (sqrt(2)/2)*C.k
   ```

4. 其他操作：

   ```python
   from sympy.abc import a, b, c
   from sympy import sin, cos, trigsimp
   from sympy.vector import CoordSys3D
   N = CoordSys3D('N')
   
   v = (sin(a)**2 + cos(a)**2)*N.i - (2*cos(b)**2 - 1)*N.k
   print(trigsimp(v))   # N.i + (-cos(2*b))*N.k
   print(v.simplify())  # N.i + (-cos(2*b))*N.k
   
   v = (a*b + a*c + b**2 + b*c)*N.i + N.j
   v.factor()           # ((a + b)*(b + c))*N.i + N.j
   ```
