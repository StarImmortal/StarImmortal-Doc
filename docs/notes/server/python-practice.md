---
title: Python练习实例
---

# Python练习实例

1. 一个整数，它加上100后是一个完全平方数，再加上168又是一个完全平方数，请问该数是多少？

    #### 分析 
    ```
    x + 100 = n^2, x + 100 + 168 = m^2
    m^2 - n^2 = (m + n)(m - n) = 168
    m + n = i, m - n = j, i * j = 168
    m = (i + j)/2, n = (i - j)/2
    i与j均是大于等于2的偶数
    ```

    #### 代码
    ```
    for i in range(1, 85):
    <!-- 判断i是否是偶数 -->
    if 168 % i == 0:
        <!-- 判断j是否是偶数 -->
        j = 168 / i
        if i > j and (i + j) % 2 == 0 and (i - j) % 2 == 0:
            m = (i + j) / 2
            n = (i - j) / 2
            x = n * n - 100
            print(x)
    ```

    #### 结果
    ```
    -99.0
    21.0
    261.0
    1581.0
    ```

2. 输入一个正数数组，把数组里所有数字拼接起来排成一个数，打印能拼接出的所有数字中最小的一个

    #### 分析
    ```
    1、首先 data 是一个 set 集合,需要将其转换为 列表进行排序    sorted(list(data)))
    2、然后通过python的内置库 itertools.permutations   进行排列组合
    3、将排列组合出来的数先转为字符串
    4、然后通过 join 将其组合成一个字符串
    5、将组合出的数字字符串加入新的 set 集合中
    6、将新的 set 集合转换成列表进行排序,取第一个就是最小的
    7、输出最小排列组合的值
    ```

    #### 代码
    ```
    import itertools
    data = {3, 32, 321, 3432, 435, 64, 324}
    x = list(itertools.permutations(sorted(list(data))))
    new_data = set()
    for i in x:
        new_str = "".join([str(n) for n in i])
        new_data.add(new_str)
    new_min = sorted(list(new_data))[0]
    new_max = sorted(list(new_data), reverse=True)[0]
    print(new_min)
    print(new_max)
    ```

    #### 结果
    ```
    321323243343243564
    644353432332432321
    ```

3. 输入某年某月某日，判断这一天是这一年的第几天？

    #### 分析
    ```
    假设输入的是2019年4月25日
    应该先把前3个月的天数加起来再加上25天即本年的第几天
    特殊情况：闰年且输入月份大于2时需考虑多加一天
    ```

    #### 代码
    ```
    year = int(input("year："))
    month = int(input("month："))
    day = int(input("day："))
    <!-- 12个月每个月天数累加 -->
    months = (0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334)
    if 0 < month <= 12:
        sum = months[month - 1]
    else:
        print("data error")
    sum += day
    leap = 0
    if (year % 400 == 0) or ((year % 4 == 0) and (year % 100 != 0)):
        leap = 1
    if (leap == 1) and (month > 2):
        sum += 1
    print("it is the %dth day" % sum)
    ```

    #### 结果
    ```
    year：2019
    month：4
    day：25
    it is the 115th day
    ```

4. 输入三个整数x，y，z，请把这三个数由小到大输出

    #### 分析
    ```
    分别对应比较三个数的大小
    ```

    #### 代码
    ```
    <!-- 第一种-->
    x = int(input("x："))
    y = int(input("y："))
    z = int(input("z："))
    if x > y:
        x, y = y, x
    if x > z:
        x, z = z, x
    if y > z:
        y, z = z, y
    print(x, y, z)
    <!-- 第二种-->
    L = []
    for i in range(3):
        x = int(input("integer："))
        L.append(x)
    L.sort()
    print(L)
    ```

    #### 结果
    ```
    x：8
    y：6
    z：5
    5 6 8
    integer：8
    integer：6
    integer：5
    [5, 6, 8]
    ```

5. 斐波那契数列
   
    #### 分析
    ```
    斐波那契数列（Fibonacci sequence），又称黄金分割数列。
    指的是这样一个数列：0、1、1、2、3、5、8、13、21、34、……
    在数学上，费波那契数列是以递归的方法来定义：
    F0 = 0  (n=0)
    F1 = 1  (n=1)
    Fn = F[n-1]+ F[n-2]  (n=>2)
    ```

    #### 代码
    ```
    def fib(n):
    if n == 1 or n == 2:
        return 1
    return fib(n - 1) + fib(n - 2)
    <!-- 输出了第10个斐波那契数列 -->
    print(fib(10))
    ```

    #### 结果
    ```
    55
    ```

6. 将一个列表的数据复制到另一个列表中

    #### 分析
    ```
    使用列表[:]
    ```

    #### 代码
    ```
    a = [1, 2, 3]
    b = a[:]
    print(b)
    ```

    #### 结果
    ```
    [1, 2, 3]
    ```