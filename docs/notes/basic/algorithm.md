---
title: 算法基础
---

# 算法

## 概率

1. 错排问题

n个信封里，每个信封都有一封信，把它们拿出来。再随机放回去。问给定 `1<=x<=y<=n`，问没有装原来信封的信的个数恰好`[x,y]`闭区间内的概率？

## 分治的特例——二分查找

### 简介

1. 二分（折半）查找（binary search）：分治的一种
2. 基本形式：单调递增数组中，查找一个值是否存在
3. 基本思想：判断一个值是否是解通常比求解容易
4. 查找三要素：二分区间、判断/退出条件、解是什么
   - 二分区间
        ```
        整数区间二分[left, right]，left <= right

        实数区间二分[left, right]，left < right；可以考虑直接循环60次
        ```
   - 判断/退出条件
        ```
        整数区间：left = mid + 1 或 right = mid -1

        实数区间：left = mid 或 right = mid
        ```
   - 解是什么
        ```
        整数区间：可以用变量记录，left - 1 或 right + 1

        实数区间：可以用变量记录，left 或 right 或 (left + right)/2
        ```

### 例题

1. 给定`严格单增`整数数组a，是否存在下标i满足0<=i<a.length满足a[i]=i

:::tip
(a[i] - i) - (a[i-1] - (i - 1)) = a[i] - a[i-1] - 1 >= 0
:::

```java
private static boolean find(int[] array){
    int left = 0, right = array.length - 1;
    while (left <= right){
        final int mid = (left + right) >> 1;
        final int x = array[mid] - mid;
        if (x == 0){
            return true;
        }
        if (x < 0){
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return false;
}
```

2. x 的平方根

:::tip
实现 int sqrt(int x) 函数。

计算并返回 x 的平方根，其中 x 是非负整数。

由于返回类型是整数，结果只保留整数的部分，小数部分将被舍去。

示例 1:

输入: 4
输出: 2
示例 2:
:::

```java
public int mySqrt(int x) {
    long left = 0, right = x;
    while (left <= right) {
        final long mid = (left + right) >> 1;
        if (mid * mid <= x) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return (int) (left - 1);
}
```

## 递归与分治

## 贪心算法

### 简介

贪心算法（又称贪婪算法）是指：在对问题求解时，总是做出在当前看来是最好的选择。也就是说，不从整体最优上加以考虑，算法得到的是在某种意义上的局部最优解

贪心算法不是对所有问题都能得到整体最优解，关键是贪心策略的选择。

每一步选择对当前`最有利`的决策

贪心算法是一种对某些求最优解问题的更简单、更迅速的设计技术。贪心算法的特点是一步一步地进行，常以当前情况为基础根据某个优化测度作最优选择，而不考虑各种可能的整体情况，省去了为找最优解要穷尽所有可能而必须耗费的大量时间。贪心算法采用`自顶向下`，以迭代的方法做出相继的贪心选择，每做一次贪心选择，就将所求问题简化为一个规模更小的子问题，通过每一步贪心选择，可得到问题的一个最优解。虽然每一步上都要保证能获得局部最优解，但由此产生的全局解有时不一定是最优的，所以贪心算法不要回溯

### 例题

1. 拥有最多糖果的孩子

:::tip
给你一个数组`candies`和一个整数`extraCandies`，其中`candies[i]`代表第`i`个孩子拥有的糖果数目。

对每一个孩子，检查是否存在一种方案，将额外的`extraCandies`个糖果分配给孩子们之后，此孩子有`最多`的糖果。注意，允许有多个孩子同时拥有`最多`的糖果数目。
:::

示例 1：

```
输入：candies = [2,3,5,1,3], extraCandies = 3
输出：[true,true,true,false,true] 
解释：
孩子 1 有 2 个糖果，如果他得到所有额外的糖果（3个），那么他总共有 5 个糖果，他将成为拥有最多糖果的孩子。
孩子 2 有 3 个糖果，如果他得到至少 2 个额外糖果，那么他将成为拥有最多糖果的孩子。
孩子 3 有 5 个糖果，他已经是拥有最多糖果的孩子。
孩子 4 有 1 个糖果，即使他得到所有额外的糖果，他也只有 4 个糖果，无法成为拥有糖果最多的孩子。
孩子 5 有 3 个糖果，如果他得到至少 2 个额外糖果，那么他将成为拥有最多糖果的孩子。
```

```java
public List<Boolean> kidsWithCandies(int[] candies, int extraCandies) {
    int num = 0;
    for (int candy : candies) {
        num = Math.max(candy, num);
    }
    num -= extraCandies;
    List<Boolean> ans = new ArrayList<>();
    for (int candy : candies) {
        ans.add(candy >= num);
    }
    return ans;
}
```

2. 非递增顺序的最小子序列

:::tip
给你一个数组`nums`，请你从中抽取一个子序列，满足该子序列的元素之和`严格`大于未包含在该子序列中的各元素之和。

如果存在多个解决方案，只需返回`长度最小`的子序列。如果仍然有多个解决方案，则返回`元素之和最大`的子序列。

与子数组不同的地方在于，「数组的子序列」不强调元素在原数组中的连续性，也就是说，它可以通过从数组中分离一些（也可能不分离）元素得到。

注意，题目数据保证满足所有约束条件的解决方案是`唯一`的。同时，返回的答案应当按`非递增顺序`排列。
:::

示例 1：

```
输入：nums = [4,3,10,9,8]
输出：[10,9] 
解释：子序列 [10,9] 和 [10,8] 是最小的、满足元素之和大于其他各元素之和的子序列。但是 [10,9] 的元素之和最大。
```

```java
public List<Integer> minSubsequence(int[] nums) {
    Arrays.sort(nums);
    int sum = 0;
    for (int num : nums) {
        sum += num;
    }
    List<Integer> array = new ArrayList<>();
    for (int i = nums.length - 1, x = 0; i >= 0 && sum - x >= x; i--) {
        x += nums[i];
        array.add(nums[i]);
    }
    return array;
}
```

3. 分割平衡字符串

:::tip
在一个`平衡字符串`中，'L' 和 'R' 字符的数量是相同的。

给你一个平衡字符串`s`，请你将它分割成尽可能多的平衡字符串。

注意：分割得到的每个字符串都必须是平衡字符串。

返回可以通过分割得到的平衡字符串的`最大数量`。
:::

示例 1：

```
输入：s = "RLRRLLRLRL"
输出：4
解释：s 可以分割为 "RL"、"RRLL"、"RL"、"RL" ，每个子字符串中都包含相同数量的 'L' 和 'R' 。
```
```java
public int balancedStringSplit(String s) {
    int depth = 0, result = 0;
    for (char c : s.toCharArray()) {
        depth += (c == 'R' ? (-1) : 1);
        if (depth == 0) {
            result += 1;
        }
    }
    return result;
}
```

## 动态规划

### 简介

动态规划（Dynamic Programming，DP）是运筹学的一个分支，是求解决策过程最优化的过程。

动态规划问题：

状态构成一个图，有起始状态，有目标状态

求起始状态到目标状态的最小代价或者最大收益

状态图上的最短路

定义收益/代价函数为从起始状态到状态S的最大（小）收益（代价）

f(S)只和状态有关，和到达状态的方式无关——无后效性

递推 f(S) = min(f(prev_s)) + cost(prev_s->s)

要到达s，枚举所有prev_s，到达prev_s一定是最优的

### 例题

1. 分隔数组以得到最大和

:::tip
给你一个整数数组`arr`，请你将该数组分隔为长度最多为`k`的一些（连续）子数组。分隔完成后，每个子数组的中的所有值都会变为该子数组中的最大值。

返回将数组分隔变换后能够得到的元素最大和。

注意，原数组和分隔后的数组对应顺序应当一致，也就是说，你只能选择分隔数组的位置而不能调整数组中的顺序。
:::

示例 1：

```
输入：arr = [1,15,7,9,2,5,10], k = 3
输出：84
解释：因为 k=3 可以分隔成 [1,15,7] [9] [2,5,10]，结果为 [15,15,15,9,10,10,10]，和为 84，是该数组所有分隔变换后元素总和最大的。若是分隔成 [1] [15,7,9] [2,5,10]，结果就是 [1, 15, 15, 15, 10, 10, 10] 但这种分隔方式的元素总和（76）小于上一种。
```

示例 2：

```
输入：arr = [1,4,1,5,7,3,6,1,9,9,3], k = 4
输出：83
[1] [4,1,5,7] [3,6,1,9] [9,3]
```

```java
public int maxSumAfterPartitioning(int[] arr, int k) {
    final int n = arr.length;
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; ++i) {
        for (int j = 1, max = 0; j <= i && j <= k; ++j) {
            max = Math.max(max, arr[i - j]);
            dp[i] = Math.max(dp[i], dp[i - j] + max * j);
        }
    }
    return dp[n];
}
```

2. 打家劫舍

:::tip
你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，`如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警`。

给定一个代表每个房屋存放金额的非负整数数组，计算你`不触动警报装置的情况下`，一夜之内能够偷窃到的最高金额。
:::

示例 1：

```
输入：[1,2,3,1]
输出：4
解释：偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。偷窃到的最高金额 = 1 + 3 = 4 。
```

```java
public int rob(int[] nums) {
    final int n = nums.length;
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; ++i) {
        dp[i] = Math.max(dp[i - 1], (i >= 2 ? dp[i - 2] : 0) + nums[i - 1]);
    }
    return dp[n];
}
```

<RightMenu />