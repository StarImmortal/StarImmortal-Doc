---
title: Python3
---

# Python3入门与进阶

## Python的基本数据类型

### Number：数字

- 整数：int
- 浮点数：float

单斜杠与双斜杠的区别：

>单斜杠得到的是float类型：（type(2/2)）
>
>双斜杠得到的是int类型并且保留整数部分：（type(2//2)）

### bool：布尔类型

> `int(True)：1；int(False)：0`
>
> `bool(1)：True；bool(0)：False`
>
> `bool('abc')：True；bool('')：False`
>
> `bool([1,2,3])：True；bool([])：False`
>
> `bool({1,2,3})：True；bool({})：False`
>
> `bool(None)：False`

**只要非0和非空都表示bool真**

### complex：复数

`36j`

## 各进制的表示与转换

### 表示

- 二进制：0b10
- 八进制：0o10
- 十六进制：0x10

### 转换

- 其他进制转换二进制：bin(10)
- 其他进制转换十进制：int(0b111)
- 其他进制转换十六进制：hex(888)
- 其他进制转换八进制：oct(0b111)

## 字符串

### 单引号与双引号

> `'let "s go'`
>
> `"let 's go"`
>
> `'let \'s go'`

### 多行字符串

- '''

- """

- \（单引号换行）

### 转义字符

- `\n：换行`
- `\'：单引号`
- `\t：横向制表符`
- `\r：回车`

### 原始字符串

r（前提是引号必须成对出现）

### 字符串运算

```python
str='Runoob'
 
print(str)				   # 输出字符串
print(str[0:-1])           # 输出第一个到倒数第二个的所有字符
print(str[0])              # 输出字符串第一个字符
print(str[2:5])            # 输出从第三个开始到第五个的字符
print(str[2:])             # 输出从第三个开始后的所有字符
print(str * 2)             # 输出字符串两次
print(str + '你好')		  # 连接字符串
print('hello\nrunoob')     # 使用反斜杠(\)+n转义特殊字符
print(r'hello\nrunoob')    # 在字符串前面添加一个 r，表示原始字符串，不会发生转义
```

输出结果：

```
Runoob
Runoo
R
noo
noob
RunoobRunoob
Runoob你好
hello
runoob
hello\nrunoob
```

## Python中表示“组”的概念与定义

### 序列

特点：有序、可用下标索引来访问、可用切片操作

#### 列表

- 列表的定义

  ```
  [1,2,3,4,5]

  ["hello","world",1,2,True,False]

  [[1,2],[3,4],[True,False]]
  ```

- 列表的基本操作

  ```python
  list = [ 'abcd', 786 , 2.23, 'runoob', 70.2 ]
  tinylist = [123, 'runoob']
  
  print (list)            # 输出完整列表
  print (list[0])         # 输出列表第一个元素
  print (list[1:3])       # 从第二个开始输出到第三个元素
  print (list[2:])        # 输出从第三个元素开始的所有元素
  print (tinylist * 2)    # 输出两次列表
  print (list + tinylist) # 连接列表
  ```

  输出结果：

  ```
  ['abcd', 786, 2.23, 'runoob', 70.2]
  abcd
  [786, 2.23]
  [2.23, 'runoob', 70.2]
  [123, 'runoob', 123, 'runoob']
  ['abcd', 786, 2.23, 'runoob', 70.2, 123, 'runoob']
  ```

#### 元组

```python
tuple = ( 'abcd', 786 , 2.23, 'runoob', 70.2  )
tinytuple = (123, 'runoob')

print (tuple)             # 输出完整元组
print (tuple[0])          # 输出元组的第一个元素
print (tuple[1:3])        # 输出从第二个元素开始到第三个元素
print (tuple[2:])         # 输出从第三个元素开始的所有元素
print (tinytuple * 2)     # 输出两次元组
print (tuple + tinytuple) # 连接元组
```

输出结果：

```
('abcd', 786, 2.23, 'runoob', 70.2)
abcd
(786, 2.23)
(2.23, 'runoob', 70.2)
(123, 'runoob', 123, 'runoob')
('abcd', 786, 2.23, 'runoob', 70.2, 123, 'runoob')
```

> `表示一个元素的元组：(1,)`
>
> `表示空元组：()`

#### 总结

- 长度：len([1,2,3])
- 最大值：max([1,2,3])
- 最小值：min([1,2,3])
- 转换ASCII值：ord('w')
- 转换字符：chr(102)
- 判断类型：isinstance(a,(list,int,str))
- 判断内存地址：id(a)

### set 集合

特点：无序、不重复、没有索引、不能切片

```python
>>> basket = {'apple', 'orange', 'apple', 'pear', 'orange', 'banana'}
>>> print(basket)                      # 这里演示的是去重功能
{'orange', 'banana', 'pear', 'apple'}
>>> 'orange' in basket                 # 快速判断元素是否在集合内
True
>>> 'crabgrass' in basket
False

>>> # 下面展示两个集合间的运算.
...
>>> a = set('abracadabra')
>>> b = set('alacazam')
>>> a                                  
{'a', 'r', 'b', 'c', 'd'}
>>> a - b                              # 集合a中包含而集合b中不包含的元素
{'r', 'd', 'b'}
>>> a | b                              # 集合a或b中包含的所有元素
{'a', 'c', 'r', 'd', 'b', 'm', 'z', 'l'}
>>> a & b                              # 集合a和b中都包含了的元素
{'a', 'c'}
>>> a ^ b                              # 不同时包含于a和b的元素
{'r', 'd', 'b', 'm', 'z', 'l'}
```

表示空的集合：set()

### dict 字典

   ```python
dict = {'Name': 'Runoob', 'Age': 7, 'Class': 'First'}

print ("dict['Name']: ", dict['Name'])
print ("dict['Age']: ", dict['Age'])
   ```

 输出结果：

     dict['Name']:  Runoob
     dict['Age']:  7
## 变量与运算符

### 什么是变量

变量名只有在第一次出现的时候，才是定义变量。当再次出现时，不是定义变量，而是直接使用之前定义的变量

### 变量的命名规则

- 可以由字母、数字、下画线（_）组成，其中数字不能打头
- 不能是 Python 关键字，但可以包含关键字
- 不能包含空格

### 值类型和引用类型

- int，str，tuple --- 元素不可改变，要改变只能重新声明或者覆盖
- set，list，dict --- 元素的值是可变的

### 算数运算符

<center>以下假设变量a为10，变量b为21</center>

| 运算符 |                      描述                       |          实例           |
| :----: | :---------------------------------------------: | :---------------------: |
|   +    |                加 - 两个对象相加                |    a + b 输出结果 31    |
|   -    |       减 - 得到负数或是一个数减去另一个数       |   a - b 输出结果 -11    |
|   *    | 乘 - 两个数相乘或是返回一个被重复若干次的字符串 |   a * b 输出结果 210    |
|   /    |                  除 - x 除以 y                  |   b / a 输出结果 2.1    |
|   %    |              取模 - 返回除法的余数              |    b % a 输出结果 1     |
|   **   |                幂 - 返回x的y次幂                |    a**b 为10的21次方    |
|   //   |           取整除 - 向下取接近商的整数           | >>> 9//2 4 >>> -9//2 -5 |

负数几种情况的取余和取模运算

**取余运算**

```python
# 1. 正数整除负数
>>> 10 // -3
-4

# 2. 负数整除正数
>>> -10 // 3
-4

# 3. 负数整除负数
>>> -10 // -3
3
```

> 向下取整，结果为负数的情况下，取整将离0更远

**取模运算**

```python
# 1. 正数对负数取模
>>> 10 % -3
-2

# 2.负数对正数取模
>>> -10 % 3
2

# 3. 负数取模负数
>>> -10 % -3
-1
```

> 公式：x % y = x - ( x // y) * y

### 赋值运算符

<center>以下假设变量a为10，变量b为20：</center>

| 运算符 |       描述       |                 实例                  |
| :----: | :--------------: | :-----------------------------------: |
|   =    | 简单的赋值运算符 | c = a + b 将 a + b 的运算结果赋值为 c |
|   +=   |  加法赋值运算符  |        c += a 等效于 c = c + a        |
|   -=   |  减法赋值运算符  |        c -= a 等效于 c = c - a        |
|   *=   |  乘法赋值运算符  |        c *= a 等效于 c = c * a        |
|   /=   |  除法赋值运算符  |        c /= a 等效于 c = c / a        |
|   %=   |  取模赋值运算符  |        c %= a 等效于 c = c % a        |
|  **=   |   幂赋值运算符   |      c ** = a 等效于 c = c ** a       |
|  //=   | 取整除赋值运算符 |       c //= a 等效于 c = c // a       |

### 比较运算符

<center>以下假设变量a为10，变量b为20：</center>

| 运算符 |              描述               |        实例         |
| :----: | :-----------------------------: | :-----------------: |
|   ==   |     等于 - 比较对象是否相等     | (a == b) 返回 False |
|   !=   | 不等于 - 比较两个对象是否不相等 | (a != b) 返回 True  |
|   >    |      大于 - 返回x是否大于y      | (a > b) 返回 False  |
|   <    |      小于 - 返回x是否小于y      |  (a < b) 返回 True  |
|  \>=   |  大于等于 - 返回x是否大于等于y  | (a >= b) 返回 False |
|   <=   |  小于等于 - 返回x是否小于等于y  | (a <= b) 返回 True  |

**不只是数字才能做比较运算符**

### 逻辑运算符

<center>以下假设变量a为True，变量b为False：</center>

| 运算符 |                         描述                          |                      实例                       |
| :----: | :---------------------------------------------------: | :---------------------------------------------: |
|   in   |   如果在指定的序列中找到值返回 True，否则返回 False   |   x 在 y 序列中 , 如果 x 在 y 序列中返回 True   |
| not in | 如果在指定的序列中没有找到值返回 True，否则返回 False | x 不在 y 序列中 , 如果 x 不在 y 序列中返回 True |

### 成员运算符

| 运算符 | 逻辑表达式 |                             描述                             |          实例          |
| :----: | ---------- | :----------------------------------------------------------: | :--------------------: |
|  and   | x and y    |        布尔"与" - 如果 x 为 False，x and y 返回 False        |  (a and b) 返回 Fasle  |
|   or   | x or y     | 布尔"或" - 如果 x 是 True，它返回 x 的值，否则它返回 y 的计算值 |   (a or b) 返回 True   |
|  not   | not x      | 布尔"非" - 如果 x 为 True，返回 False 。如果 x 为 False，它返回 True | not(a and b) 返回 True |

### 身份运算符

<center>身份运算符用于比较两个对象的存储单元</center>

| 运算符 |                 逻辑表达式                  |                             描述                             |                             实例                             |
| :----: | :-----------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
|   is   |   is 是判断两个标识符是不是引用自一个对象   |        布尔"与" - 如果 x 为 False，x and y 返回 False        | **x is y**, 类似 **id(x) == id(y)** , 如果引用的是同一个对象则返回 True，否则返回 False |
| is not | is not 是判断两个标识符是不是引用自不同对象 | 布尔"或" - 如果 x 是 True，它返回 x 的值，否则它返回 y 的计算值 | **x is not y** ， 类似 **id(a) != id(b)**。如果引用的不是同一个对象则返回结果 True，否则返回 False |

## 位运算符

<center>下表中变量 a 为 60，b 为 13二进制格式如下：</center>

```
a = 0011 1100

b = 0000 1101

-----------------

a&b = 0000 1100

a|b = 0011 1101

a^b = 0011 0001

~a  = 1100 0011
```

| 运算符 |                             描述                             |                             实例                             |
| :----: | :----------------------------------------------------------: | :----------------------------------------------------------: |
|   &    | 按位与运算符：参与运算的两个值,如果两个相应位都为1,则该位的结果为1,否则为0 |         (a & b) 输出结果 12 ，二进制解释： 0000 1100         |
|   \|   |  按位或运算符：只要对应的二个二进位有一个为1时，结果位就为1  |         (a\|b) 输出结果 61 ，二进制解释： 0011 1101          |
|   ^    |       按位异或运算符：当两对应的二进位相异时，结果为1        |         (a ^ b) 输出结果 49 ，二进制解释： 0011 0001         |
|   ~    | 按位取反运算符：对数据的每个二进制位取反,即把1变为0,把0变为1。**~x**类似于 **-x-1** | (~a ) 输出结果 -61 ，二进制解释： 1100 0011， 在一个有符号二进制数的补码形式。= |
|   <<   | 左移动运算符：运算数的各二进位全部左移若干位，由"<<"右边的数指定移动的位数，高位丢弃，低位补0。 |         a << 2 输出结果 240 ，二进制解释： 1111 0000         |
|  \>>   | 右移动运算符：把">>"左边的运算数的各二进位全部右移若干位，">>"右边的数指定移动的位数 |         a >> 2 输出结果 15 ，二进制解释： 0000 1111          |

## 表达式

### 什么是表达式

表达式（Expression）是运算符（operator）和操作数（operand）所构成的序列

### 表达式的优先级

<img src="https://s1.ax1x.com/2020/09/26/0Pu4sO.png" alt="0Pu4sO.png"  />

## 分支、循环、条件与枚举

### if 语句

```python
if condition:
    pass
elif condition:
    pass
else:
    pass
```

### if 嵌套

```python
if 表达式1:
    语句
    if 表达式2:
        语句
    elif 表达式3:
        语句
    else:
        语句
elif 表达式4:
    语句
else:
    语句
```

### while 循环

**结构体**

```python
while condition:
    pass
```

**while 循环使用 else 语句**

```python
while condition:
    pass
else:
    pass
```

### for 循环

**结构体**

```python
for target_list in expression_list:
    pass
```

**嵌套循环**

```python
a = [['apple', 'banana', 'orange'], (1, 2, 3)]
for x in a:
    for y in x:
        print(y, end='')
```

**for 循环使用 else 语句**

```python
for target_list in expression_list:
    pass
else:
    pass
```

**break 和 continue 语句**

break相关代码：

```python
a = [1, 2, 3]
for x in a:
    if x == 2:
        break
    print(x)
```

输出结果：

```
1
```

continue相关代码：

```python
a = [1, 2, 3]
for x in a:
    if x == 2:
        break
    print(x)
```

输出结果：

```
1
3
```

**for 循环使用 break 与 else 语句**

```python
a = [1, 2, 3]
for x in a:
    if x == 2:
        break
    print(x)
else:
    print('EOF')
```

输出结果：

```
1
```

**range()函数**

```python
for i in range(0, 10, 2):
    print(i)
```

## 包、模块、函数与变量作用域

### Python包与模块的名字

- **包**

  包是一种管理 Python 模块命名空间的形式，采用"点模块名称"。

  比如一个模块的名称是` A.B`， 那么他表示一个包 A中的子模块 B 。

- **标准模块**

  Python 本身带着一些标准的模块库。

  有些模块直接被构建在解析器里，这些虽然不是一些语言内置的功能，但是他却能很高效的使用，甚至是系统级调用也没问题。

  这些组件会根据不同的操作系统进行不同形式的配置，比如 winreg 这个模块就只会提供给 Windows 系统。

  应该注意到这有一个特别的模块 sys ，它内置在每一个 Python 解析器中。

  变量 sys.ps1 和 sys.ps2 定义了主提示符和副提示符所对应的字符串:

  ```python
  >>> import sys
  >>> sys.ps1
  '>>> '
  >>> sys.ps2
  '... '
  >>> sys.ps1 = 'C> '
  C> print('Runoob!')
  Runoob!
  C> 
  ```

### import导入模块

语法如下：

```python
import module1[, module2[,... moduleN]
```

导入模块 support，需要把命令放在脚本的顶端：

support.py 文件代码：

```python
def print_func( par ):
    print ("Hello : ", par)
    return
```

test.py 引入 support 模块，文件代码：

```python
# 导入模块
import support
 
# 现在可以调用模块里包含的函数了
support.print_func("Runoob")
```

输出结果：

```python
$ python3 test.py 
Hello :  Runoob
```

### from import 导入变量

语法如下：

```python
from modname import name1[, name2[, ... nameN]]
```

例如，要导入模块 fibo 的 fib 函数，使用如下语句：

```python
>>> from fibo import fib, fib2
>>> fib(500)
1 1 2 3 5 8 13 21 34 55 89 144 233 377
```

**from package import * 语句**

把一个模块的所有内容全都导入到当前的命名空间：

```python
from modname import *
```

**\__all__用法**

如果包定义文件 **\__init__.py** 存在一个叫做 **\__all__ ** 的列表变量，那么在使用 **from package import * **的时候就把这个列表中的所有名字作为包内容导入。

```python
__all__ = ["echo", "surround", "reverse"]
```

这表示当你使用 **from sound.effects import * **这种用法时，则只会导入包里面这三个子模块。

### \__init__.py的用法

让一个呈结构化分布(以文件夹形式组织)的代码文件夹变成可以被导入`import`的软件包

### 包与模块的几个常见错误

> 包和模块是不会被重复导入的
> 
> 避免循环导入

### 模块内置变量

### 入口文件和普通模块内置变量的区别

### \__name__的经典应用

### 相对导入和绝对导入

## Python函数

### 定义一个函数

- 函数代码块以 **def** 关键词开头，后接函数标识符名称和圆括号 **()**。
- 任何传入参数和自变量必须放在圆括号中间，圆括号之间可以用于定义参数。
- 函数的第一行语句可以选择性地使用文档字符串—用于存放函数说明。
- 函数内容以冒号起始，并且缩进。
- **return [表达式]** 结束函数，选择性地返回一个值给调用方。不带表达式的return相当于返回 None。

### 语法

```python
def funcname(parameter_list):
    pass
```

### 实例

```python
def add(x, y):
    result = x + y
    return result

def printme(str):
    print(str)

printme(add(1, 2))
```

### 函数返回多个结果

```python
def damage(skill1, skill2):
    damage1 = skill1 * 3
    damage2 = skill2 * 2 + 10
    return damage1, damage2

skill1_damage, skill2_damage = damage(3, 6)
print(skill1_damage, skill2_damage)
```

### 序列解包与链式赋值

- **序列解包**

  ```python
  a, b, c = 1, 2, 3
  d = 1, 2, 3
  print(type(d))
  ```

- **链式赋值**

  ```
  a = b = c = 1
  print(a, b, c)
  ```

### 参数

- **必须参数**

  必需参数须以正确的顺序传入函数。调用时的数量必须和声明时的一样。

- **关键字参数**

  关键字参数和函数调用关系紧密，函数调用使用关键字参数来确定传入的参数值。

  使用关键字参数允许函数调用时参数的顺序与声明时不一致，因为 Python 解释器能够用参数名匹配参数值。

  实例代码：

  ```python
  def add(x, y):
      result = x + y
      return result
  
  c = add(y=1, x=3)
  ```

- **默认参数**

  调用函数时，如果没有传递参数，则会使用默认参数。以下实例中如果没有传入 age 参数，则使用默认值：

  ```python
  # 可写函数说明
  def printinfo(name, age=35):
      "打印任何传入的字符串"
      print("名字: ", name)
      print("年龄: ", age)
      return
  
  # 调用printinfo函数
  printinfo(age=50, name="runoob")
  print("------------------------")
  printinfo(name="runoob")
  ```

  以上实例输出结果：

  ```python
  名字:  runoob
  年龄:  50
  ------------------------
  名字:  runoob
  年龄:  35
  ```

  *注：默认参数必须在必须参数的后面*

- **可变参数**

   ***** 的参数会以元组(tuple)的形式导入

  ```python
  def demo(*param):
      print(param)
      print(type(param))
  
  
  a = (1, 2, 3, 4, 5, 6)
  demo(*a)
  ```

  运行结果：

  ```
  (1, 2, 3, 4, 5, 6)
  <class 'tuple'>
  ```

- **关键字可变参数**

  两个星号 ***\*** 的参数会以字典的形式导入

  单独出现星号 ***** 后的参数必须用关键字传入

  ```python
  def city_temp(**param):
      print(type(param))
      for key, value in param.items():
          print(key, ":", value)
  
  city_temp(bj='32c', xm='23c', sh='31c')
  ```

  运行结果：

  ```
  <class 'dict'>
  bj : 32c
  xm : 23c
  sh : 31c
  ```

### 变量作用域

- **作用域链**

- **global 关键字**

  ```python
  def demo():
      global c
      c = 2
  
  demo()
  print(c)
  ```

  

## 高级部分：面向对象

## 正则表达式与JSON

## Python的高级语法与用法

## 函数式编程： 匿名函数、高阶函数、装饰器

<RightMenu />