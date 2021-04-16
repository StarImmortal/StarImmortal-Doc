---
title: Java编程题
---

## 流程控制

1. 判断一个正整数是否是回文数

    ```java
    public static void main(String[] args) {
        System.out.println("请输入一个正整数：");
        Scanner scanner = new Scanner(System.in);
        int num = scanner.nextInt();
        int y = 0, t = num;
        while (num > 0) {
            y = y * 10 + num % 10;
            num /= 10;
        }
        if (y == t) {
            System.out.println("输入的数是回文数字！");
        } else {
            System.out.println("输入的数不是回文数字！");
        }
    }
    ```
    
2. 求两个正整数的最大公约数和最小公倍数

    ```java
    public static void main(String[] args) {
        System.out.println("请输入两个正整数：");
        Scanner scanner = new Scanner(System.in);
        int num1 = scanner.nextInt();
        int num2 = scanner.nextInt();
        System.out.println("最大公约数为:" + gcd(num1, num2));
        System.out.println("最小公倍数为:" + num1 * num2 / gcd(num1, num2));
    
    }
    
    private static int gcd(int p, int q) {
        if (q == 0) {
            return p;
        }
        int r = p % q;
        return gcd(q, r);
    }
    ```

3. 输入一行字符统计出其英文字母空格数字和其它字符个数

    ```java
    public static void main(String[] args) {
        System.out.println("请输入一串字符：");
        Scanner scanner = new Scanner(System.in);
        String string = scanner.nextLine();
        int nums = 0, letters = 0, spaces = 0, others = 0;
        char[] arr = string.toCharArray();
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] >= 48 && arr[i] <= 57) {
                nums++;
            } else if (arr[i] >= 65 && arr[i] <= 90 || arr[i] >= 97 && arr[i] <= 122) {
                letters++;
            } else if (arr[i] == 32) {
                spaces++;
            } else {
                others++;
            }
        }
        System.out.println("数字：" + nums);
        System.out.println("字母：" + letters);
        System.out.println("空格：" + spaces);
        System.out.println("其他：" + others);
    }
    ```

4. 验证鬼谷猜想

    ```java
    public static void main(String[] args) {
        System.out.println("请输入一个任意自然数：");
        Scanner scanner = new Scanner(System.in);
        int num = scanner.nextInt();
        System.out.println("原本的数为" + num);
        while (num != 1) {
            System.out.println("产生的新数是" + num);
            if (num % 2 == 0) {
                // 偶数
                num /= 2;
            } else {
                num = num * 3 + 1;
            }
        }
        if (num == 1) {
            System.out.println("验证成功：" + num);
        }
    }
    ```

5. 判断一个正整数是几位数

    ```java
    public static void main(String[] args) {
        System.out.println("请输入一个正整数：");
        Scanner scanner = new Scanner(System.in);
        int num = scanner.nextInt();
        int count = 0;
        if (num == 0) {
            System.out.println("该正整数是一位数");
        }
        while (num != 0) {
            num /= 10;
            count++;
        }
        System.out.println("该正整数是" + count + "位数");
    }
    ```

6. 判断是否是小写字母并转换成大写字母

    ```java
    public static void main(String[] args) {
        System.out.println("请输入一个字母：");
        Scanner scanner = new Scanner(System.in);
        char ch = scanner.next().charAt(0);
        if (ch >= 97 && ch <= 122) { // 判断是否是小写字母
            System.out.println("该字母是小写字母");
            ch = (char) (ch - 32); // 如果是小写字母则 将其转换成大写字母
            System.out.println("转换之后的大写字母是：" + ch);
        } else {
            System.out.println("该字母不是小写字母！");
        }
    }
    ```

7. 输入一行字符串将字符串大写转小写小学转大写

    ```java   
    public static void main(String[] args) {
        System.out.println("请输入一行字符串：");
        Scanner scanner = new Scanner(System.in);
        String string = scanner.nextLine();
        char[] chars = string.toCharArray();
        for (int i = 0; i < chars.length; i++) {
            if (chars[i] >= 65 && chars[i] <= 90) {
                chars[i] += 32;
            } else if (chars[i] >= 97 && chars[i] <= 122) {
                chars[i] -= 32;
            }
        }
        for (int i = 0; i < chars.length; i++) {
            System.out.print(chars[i]);
        }
    }
    ```

8. 将一个正整数因式分解

    ```java
    public static void main(String[] args) {
        System.out.println("请输入一个正整数：");
        Scanner scanner = new Scanner(System.in);
        int num = scanner.nextInt();
        System.out.print(num + "=");
        for (int i = 2; i < num + 1; i++) {
            while (num % i == 0 && num != i) {
                num /= i;
                System.out.print(i + "*");
            }
            if (num == i) {
                System.out.print(i);
                break;
            }
        }
    }
    ```

9. 打印100~200之间能被9整除的数，并按照5个一行的格式输出

    ```java
    public static void main(String[] args) {
        int n = 0;
        for (int i = 100; i <= 200; i++) {
            if (i % 9 == 0) {
                System.out.print(i + "  ");
                n++;
                if (n % 5 == 0) {
                    System.out.println();
                }
            }
        }
    }
    ```

10. 输出100以内能被3整除且个位数为6的所有整数,并统计输出这些数的个数

    ```java
    int k, n = 0;
    for (int i = 0; i < 10; i++) {
        k = i * 10 + 6;
        if (k % 3 == 0) {
            System.out.print(k + "  ");
            n++;
        }
    }
    System.out.println("\n" + "The number is " + n + ".");
    ```

11. 找出三个数中值的大小位于中间的数，并输出该值

     ```java
      int a = 15, b = 25, c = 5, m;
      if (a > b) {
          if (b > c) {
              m = b;
          } else {
              m = (a > c) ? c : a;
          }
      } else {
          if (a > c) {
              m = a;
          } else {
              m = (b > c) ? c : b;
          }
      }
      System.out.println("median = " + m);
     ```

12. 判断年份是否是闰年

     ```java
     public static void main(String[] args) {
         Scanner scanner = new Scanner(System.in);
         System.out.println("请输入一个年份：");
         int year = scanner.nextInt();
         if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
             System.out.println(year + "是闰年");
         } else {
             System.out.println(year + "不是闰年");
         }
     }
     ```

13. 输入星期几的第一个字母判断是星期几

     ```java
     public static void main(String[] args) {
         System.out.println("请输入第一个英文字母：");
         Scanner scanner = new Scanner(System.in);
         String str1 = scanner.nextLine();
         String str2 = "";
         switch (str1) {
             case "m":
                 System.out.println("Monday");
                 break;
             case "t":
                 System.out.println("请输入第二个字母：");
                 str2 = scanner.nextLine();
                 if (str2.equals("u")) {
                     System.out.println("Tuesday");
                 } else if (str2.equals("h")) {
                     System.out.println("Thursday");
                 } else {
                     System.out.println("你输入的字母有误！");
                 }
                 break;
             case "w":
                 System.out.println("Wednesday");
                 break;
             case "f":
                 System.out.println("Friday");
                 break;
             case "s":
                 System.out.println("请输入第二个字母：");
                 str2 = scanner.nextLine();
                 if (str2.equals("u")) {
                     System.out.println("Sunday");
                 } else if (str2.equals("a")) {
                     System.out.println("Saturday");
                 } else {
                     System.out.println("你输入的字母有误！");
                 }
                 break;
             default:
                 System.out.println("你输入的字母不正确！");
                 break;
         }
     }
     ```

14. 判断学生成绩并统计人数

     ```java
     public static void main(String[] args) {
         Scanner scanner = new Scanner(System.in);
         int count1 = 0, count2 = 0, count3 = 0, count4 = 0, count5 = 0;
         int[] arr = new int[10];
         for (int i = 0; i < arr.length; i++) {
             System.out.println("请输入" + arr.length + "个学生的成绩，当前第" + (i + 1) + "个");
             arr[i] = scanner.nextInt();
             int grade = arr[i] / 10;
             switch (grade) {
                 case 10:
                 case 9:
                     count1++;
                     break;
                 case 8:
                     count2++;
                     break;
                 case 7:
                     count3++;
                     break;
                 case 6:
                     count4++;
                     break;
                 default:
                     count5++;
                     break;
             }
         }
         System.out.println(count1 + "个优秀");
         System.out.println(count2 + "个良好");
         System.out.println(count3 + "个中等");
         System.out.println(count4 + "个及格");
         System.out.println(count5 + "个不及格");
     }
     ```

15. 给出一百分制成绩输出成绩等级

     ```java
     public static void main(String[] args) {
         System.out.println("输入你的百分制成绩：");
         Scanner scanner = new Scanner(System.in);
         int score, level;
         score = scanner.nextInt();
         if (score > 100 || score < 0) {
             System.out.println("你输入的成绩有误");
         }
         switch (score / 10) {
             case 10:
             case 9:
                 level = 65;
                 break;// A
             case 8:
                 level = 66;
                 break;// B
             case 7:
                 level = 67;
                 break;// C
             case 6:
                 level = 68;
                 break;// D
             default:
                 level = 69;// E
                 break;
         }
         System.out.println("你的成绩是" + (char) level);
     }
     ```

16. 输出九九乘法表

     ```java
     public static void main(String[] args) {
         for (int i = 1; i <= 9; i++) {
             for (int j = 1; j <= i; j++) {
                 System.out.print(j + "*" + i + "=" + i * j + "\t");
             }
             System.out.println();
         }
     }
     ```

17. 求一到一百累加和

     ```java
     public static void main(String[] args) {
         int sum = 0;
         for (int i = 1; i <= 100; i++) {
             sum += i;
         }
         System.out.println("累加和:" + sum);
     }
     ```

18. n为偶数奇数不同求和

     ```java
     public static void main(String[] args) {
         System.out.println("请输入一个正整数：");
         Scanner scanner = new Scanner(System.in);
         int num = scanner.nextInt();
         double sum = 0;
         if (num % 2 == 0) {
             for (int i = 2; i <= num; i += 2) {
                 sum += 1 / (double) i;
                 if (i == num) {
                     System.out.print("1/" + i);
                     break;
                 }
                 System.out.print("1/" + i + " + ");
             }
         } else {
             for (int i = 1; i <= num; i += 2) {
                 sum += 1 / (double) i;
                 if (i == num) {
                     System.out.print("1/" + i);
                     break;
                 }
                 System.out.print("1/" + i + " + ");
             }
         }
         System.out.println(" = " + sum);
     }
     ```

19. 打印等腰三角形

     ```java
     public static void main(String[] args) {
         for (int i = 1; i <= 5; i++) {
             for (int k = 1; k <= 5 - i; k++) {
                 System.out.print(" ");
             }
             for (int j = 1; j <= 2 * i - 1; j++) {
                 System.out.print("*");
             }
             System.out.println();
         }
     }
     ```

20. 打印菱形

     ```java
     public static void main(String[] args) {
         printHollowRhombus(7);
     }
     
     public static void printHollowRhombus(int size) {
         if (size % 2 == 0) {
             size++;
         }
         for (int i = 0; i < size / 2 + 1; i++) {
             for (int j = size / 2 + 1; j > i + 1; j--) {
                 System.out.print(" ");
             }
             for (int j = 0; j < 2 * i + 1; j++) {
                 if (j == 0 || j == 2 * i) {
                     System.out.print("*");
                 } else {
                     System.out.print(" ");
                 }
                 //System.out.print("*");
             }
             System.out.println();
         }
         for (int i = size / 2 + 1; i < size; i++) {
             for (int j = 0; j < i - size / 2; j++) {
                 System.out.print(" ");
             }
             for (int j = 0; j < 2 * size - 1 - 2 * i; j++) {
                 if (j == 0 || j == 2 * (size - i - 1)) {
                     System.out.print("*");
                 } else {
                     System.out.print(" ");
                 }
                 //System.out.printf("*");
             }
             System.out.println();
         }
     }
     ```

21. 打印出杨辉三角形

     ```java
     public static void main(String[] args) {
         int triangle[][] = new int[10][];
         for (int i = 0; i < triangle.length; i++) {
             triangle[i] = new int[i + 1];
             for (int j = 0; j <= i; j++) {
                 if (j == 0 || i == 0 || j == i) {
                     triangle[i][j] = 1;
                 } else {
                     triangle[i][j] = triangle[i - 1][j] + triangle[i - 1][j - 1];
                 }
                 System.out.print(triangle[i][j] + "\t");
             }
             System.out.println();
         }
     }
     ```

22. 找出1000以内的所有完数

     ```java
     public static void main(String[] args) {
         System.out.println("1000以内的完数有：");
         for (int i = 0; i < 1000; i++) {
             int sum = 0;
             for (int j = 1; j < i / 2 + 1; j++) {
                 if (i % j == 0) {
                     sum += j;
                     if (i == sum && j == i / 2) {
                         System.out.println(i);
                     }
                 }
             }
         }
     }
     ```

23. 有1234四个数字组成互不相同且无重复数字的三位数

     ```java
     public static void main(String[] args) {
         int count = 0;
         for (int bite = 1; bite < 5; bite++) {
             for (int ten = 1; ten < 5; ten++) {
                 for (int hundred = 1; hundred < 5; hundred++) {
                     if (bite != ten && bite != hundred && ten != hundred) {
                         System.out.println(hundred * 100 + ten * 10 + bite);
                         count++;
                     }
                 }
             }
         }
         System.out.println("总共有：" + count + "个这样的数");
     }
     ```

24. 求100之内的素数

     ```java
     public static void main(String[] args) {
         boolean flag;
         int count = 0;
         for (int i = 2; i <= 100; i++) {
             flag = true;
             for (int j = 2; j < i - 1; j++) {
                 if (i % j == 0) {
                     flag = false;
                     break;
                 }
             }
             if (flag) {
                 System.out.println("num=" + i);
                 count++;
             }
         }
         System.out.println("总数：" + count);
     }
     ```

25. 有一分数序列：2/1，3/2，5/3，8/5，13/8，21/13...求出这个数列的前20项之和

     ```java
     public static void main(String[] args) {
         float up = 2, down = 1, temp, sum = 0;
         float fraction = up / down;
         for (int i = 0; i < 20; i++) {
             sum += fraction;
             temp = up + down;
             down = up;
             up = temp;
             fraction = up / down;
         }
         System.out.println(sum);
     }
     ```

26. 分数累加和

     ```java
     public static void main(String[] args) {
         System.out.println("请输入一个正整数：");
         Scanner scanner = new Scanner(System.in);
         int num = scanner.nextInt();
         double sum = 0;
         for (int i = 1; i <= num; i++) {
             sum += 1 / (double) i;
             if (i == num) {
                 System.out.print("1/" + i);
                 break;
             }
             System.out.print("1/" + i + " + ");
         }
         System.out.println(" = " + sum);
     }
     ```

27. 1阶层到1/20阶层求和

     ```java
     public static void main(String[] args) {
         BigDecimal sum = new BigDecimal(0.0);
         BigDecimal factorial = new BigDecimal(1.0);
         int i = 1;
         while (i <= 20) {
             sum = sum.add(factorial);
             i++;
             factorial = factorial.multiply(new BigDecimal(1.0 / i));
         }
         System.out.println("1 + 1／2! + 1／3! + ··· + 1／20!的计算结果等于：\n" + sum);
         /******************************/
         double e = 0, t = 1.0;
         for (int i = 1; i <= 20; i++) {
             t /= i;
             e += t;
         }
         System.out.print("e 的近似值为： " + e);
     }
     ```

28. 求1阶层到20阶层的和

     ```java
     public static void main(String[] args) {
         long sum = 0;
         for (int i = 1; i <= 20; i++) {
             sum += method(i);
         }
         System.out.println(sum);
     }
     
     public static long method(int n) {
         if (n < 1) {
             return 0;
         }
         if (n == 1) {
             return 1;
         } else {
             return n * method(n - 1);
         }
     }
     ```

29. 产生一个0到20之间的随机整数,然后计算并打印它的阶乘

     ```java
     public static void main(String[] args) {
         Random random = new Random();
         float x = random.nextFloat();
         int n = Math.round(20 * x);
         long f = 1;
         int i = 1;
         do {
             f *= i;
             i++;
         } while (i <= n);
         System.out.println(n + "!=" + f);
     }
     ```

30. 计算并打印1,3,5,7的阶乘以及这些阶乘的和

     ```java
     public static void main(String[] args) {
         long sum = 0;
         for (int i = 1; i < 8; i += 2) {
             long b = 1;
             for (int j = 1; j <= i; j++) {
                 b *= j;
             }
             System.out.println(i + "!=" + b);
             sum += b;
         }
         System.out.println(sum);
     }
     ```

31. 求0到7所能组成的奇数个数

     ```java
     public static void main(String[] args) {
         int sum = 0, count = 0;
         for (int i = 1; i <= 8; i++) {
             if (i == 1) {
                 count = 4;
             } else if (i == 2) {
                 count *= 7;
             } else {
                 count *= 8;
             }
             System.out.println("0-7组成" + i + "位数时，奇数有" + count + "个");
             sum += count;
         }
         System.out.println("一共有奇数：" + sum + "个");
     }
     ```

32. 求s=a+aa+aaa+aaaa+aa...a的值

     ```java
     public static void main(String[] args) {
         int sum = 0, i = 1;
         Scanner scanner = new Scanner(System.in);
         System.out.println("请输入a的值：");
         int a = scanner.nextInt();
         System.out.println("请输入n的值：");
         int n = scanner.nextInt();
         int[] arr = new int[n];
         arr[0] = a;
         while (i < n) {
             a *= 10;
             arr[i] = a + arr[i - 1];
             i++;
         }
         for (int s : arr) {
             sum += s;
             if (s == arr[n - 1]) {
                 System.out.print(s);
                 break;
             }
             System.out.print(s + "+");
         }
         System.out.print("=" + sum);
     }
     ```

33. 求一个3乘3矩阵对角线元素之和

     ```java
     public static void main(String[] args) {
         System.out.println("请输入九个数字：");
         Scanner scanner = new Scanner(System.in);
         int[][] arr = new int[3][3];
         for (int i = 0; i < 3; i++) {
             for (int j = 0; j < 3; j++) {
                 arr[i][j] = scanner.nextInt();
             }
         }
         System.out.println("第一条对角线之和：" + (arr[0][0] + arr[1][1] + arr[2][2]));
         System.out.println("第二条对角线之和：" + (arr[0][2] + arr[1][1] + arr[2][0]));
     }
     ```

34. 水仙花数

     ```java
     public static void main(String[] args) {
     	for (int i = 100; i <= 1000; i++) {
     		int c = i % 10;
     		int b = i / 10 % 10;
     		int a = i / 100;
     		if ((a * 100 + b * 10 + c) == (a * a * a + b * b * b + c * c * c)) {
     			System.out.println(i);
     		}
     	}
     }
     ```

35. 二分法查找

     ```java
     public static void main(String[] args) {
         int[] arr = new int[]{12, 23, 34, 45, 56, 67, 77, 89, 90};
         System.out.println(search(arr, 12));
         System.out.println(search(arr, 45));
         System.out.println(search(arr, 67));
         System.out.println(search(arr, 89));
         System.out.println(search(arr, 99));
     }
     
     public static int search(int[] arr, int key) {
         int start = 0;
         int end = arr.length - 1;
         while (start <= end) {
             int middle = (start + end) / 2;
             if (key < arr[middle]) {
                 end = middle - 1;
             } else if (key > arr[middle]) {
                 start = middle + 1;
             } else {
                 return middle;
             }
         }
         return -1;
     }
     ```

36. 斐波拉契数列问题

     ```java
     public static void main(String[] args) {
         System.out.println("第1个月的兔子对数：1");
         System.out.println("第2个月的兔子对数：2");
         int f1 = 1, f2 = 1, f, M = 24;
         for (int i = 3; i <= M; i++) {
             f = f2;
             f2 = f1 + f2;
             f1 = f;
             System.out.println("第" + i + "个月的兔子对数：" + f2);
         }
         // 递归方法
         public static long fibRec(int num) {
         if (num == 1 || num == 2) {
             return 1;
         } else {
             return fibRec(num - 1) + fibRec(num - 2);
         }
         }
     }
     ```

37. 输入某年某月某日，判断这一天是这一年的第几天？

     ```java
     public static void main(String[] args) {
         System.out.println("请输入3个整数，分别表示年月日：");
         Scanner scanner = new Scanner(System.in);
         int year = scanner.nextInt();
         int month = scanner.nextInt();
         int day = scanner.nextInt();
         int sum = 0;
         int[][] arr = {{31, 28, 31, 30, 31, 30, 31, 30, 31, 30, 31, 30}, {31, 29, 31, 30, 31, 30, 31, 30, 31, 30, 31, 30}};
         for (int i = 0; i < month - 1; i++) {
             if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
                 sum += arr[1][i];
             } else {
                 sum += arr[0][i];
             }
         }
         sum += day;
         System.out.println(year + "年" + month + "月" + day + "是这一年的第" + sum + "天");
     }
     ```

38. 统计一个英文文本字符串中包含的英文元音字母的个数

     ```java
     public static void main(String[] args) {
         String text = "Beijing, the Capital City, is the political,"
                 + "cultural and diplomatic centre of China. It has"
                 + "become a modern international cosmopolitan city"
                 + "with more than 11 million people. The Capital"
                 + "International Airport, 23.5 km from the city centre,"
                 + "is China's largest and most advanced airport.";
         int vowels = 0;
         for (int i = 0; i < text.length(); i++) {
             char ch = Character.toLowerCase(text.charAt(i));
             if (ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') {
                 vowels++;
             }
         }
         System.out.println("The text contained vowels: " + vowels + "\n");
     }
     ```

39. 打印一个序列的前10项，该序列的第1项和第2项都是1，以后的每一顶都是前面两项之和

     ```java
     public static void main(String[] args) {
         int[] arr = new int[10];
         arr[0] = arr[1] = 1;
         for (int i = 2; i < arr.length; i++) {
             arr[i] = arr[i - 1] + arr[i - 2];
         }
         for (int i = 0; i < arr.length; i++) {
             System.out.print(arr[i] + " ");
         }
     }
     ```


## 数组及其常用操作

1. 创建一个二维整型数组，并将其以4行5列对齐的格式输出

    ```java
    public static void main(String[] args) {
        int[][] aMatrix = {{1, 1, 1, 1, 1}, {2, 2, 2, 2, 2}, {3, 3, 3, 3, 3}, {4, 4, 4, 4, 4}};
        for (int i = 0; i < aMatrix.length; i++) {
            for (int j = 0; j < aMatrix[i].length; j++) {
                System.out.print(aMatrix[i][j] + " ");
            }
            System.out.println();
        }
    }
    ```

2. 定义一个数组输出数组中的最大值最小值平均值求和

    ```java
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int[] arr = new int[10];
        for (int i = 0; i < arr.length; i++) {
            System.out.print("请输入" + arr.length + "个数字，当前第" + (i + 1) + "个:");
            arr[i] = scanner.nextInt();
        }
        int max = arr[0], min = arr[0];
        double avg = 0, sum = 0;
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] > max) {
                max = arr[i];
            }
            if (arr[i] < min) {
                min = arr[i];
            }
            sum += arr[i];
        }
        avg = sum / arr.length;
        System.out.println("最大值：" + max);
        System.out.println("最小值：" + min);
        System.out.println("平均数：" + avg);
        System.out.println("总和：" + sum);
    }
    ```

3. 将二维数组中的行列互换

    ```java
    public static void main(String[] args) {
        int[][] arrA = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        System.out.println("行列互调前：");
        printArray(arrA);
        int[][] arrB = new int[arrA.length][arrA.length];
        for (int i = 0; i < arrA.length; i++) {
            for (int j = 0; j < arrA[i].length; j++) {
                arrB[j][i] = arrA[i][j];
            }
        }
        System.out.println("行列互调后：");
        printArray(arrB);
    }

    public static void printArray(int[][] arr) {
        for (int i = 0; i < arr.length; i++) {
            for (int j = 0; j < arr[i].length; j++) {
                System.out.print(arr[i][j] + " ");
            }
            System.out.println();
        }
    }
    ```

4. 输入一个数按规律将它插入已排好序的数组

    ```java
    public static void main(String[] args) {
        System.out.println("请输入一个数字：");
        Scanner scanner = new Scanner(System.in);
        int num = scanner.nextInt();
        int[] arrA = {3, 5, 15, 36, 84, 99};
        int[] arrB = new int[arrA.length + 1];
        if (num > arrA[arrA.length - 1]) {
            for (int i = 0; i < arrA.length; i++) {
                arrB[i] = arrA[i];
            }
            arrB[arrB.length - 1] = num;
        } else {
            for (int i = 0; i < arrA.length; i++) {
                if (num < arrA[i]) {
                    for (int j = 0; j < i; j++) {
                        arrB[j] = arrA[j];
                    }
                    arrB[i] = num;
                    for (int j = i; j < arrA.length; j++) {
                        arrB[j + 1] = arrA[j];
                    }
                    break;
                }
            }
        }
        System.out.println("插入一个数后的数组为：" + Arrays.toString(arrB));
    }
    ```

5. 给一个不多于5位的正整数，要求：一、求它是几位数，二、逆序打印出各位数字

    ```java
    public static void main(String[] args) {
        System.out.println("请输入一个不大于五位数的整数：");
        Scanner scanner = new Scanner(System.in);
        int num = scanner.nextInt();
        int[] arr = new int[5];
        int i = 0;
        do {
            arr[i] = num % 10;
            num /= 10;
            i++;
        } while (num != 0);
        System.out.println("输入的整数是" + i + "位数");
        System.out.println("逆序输出：");
        for (int j = 0; j < i; j++) {
            System.out.print(arr[j]);
        }
        /****************************/
        System.out.println("请输入整数：");
        Scanner scanner = new Scanner(System.in);
        int num = scanner.nextInt();
        int i = 0, a;
        System.out.print(num + " -> ");
        do {
            a = num % 10;
            System.out.print(a);
            num /= 10;
            i++;
        } while (num != 0);
        System.out.println();
        System.out.println("输入的整数是" + i + "位数");
    }
    ```

6. 有n个整数，使其前面各数顺序向后移m个位置，最后m个数变成最前面的m个数

    ```java
    public static void main(String[] args) {
        System.out.println("输入一个十个数的组数：");
        Scanner scanner = new Scanner(System.in);
        int[] arrA = new int[10];
        for (int i = 0; i < arrA.length; i++) {
            arrA[i] = scanner.nextInt();
        }
        System.out.println("没移动前的数组：" + Arrays.toString(arrA));
        System.out.println("请输入要往后移动的个数：");
        int m = scanner.nextInt();
        m %= 10;
        int[] arrB = new int[10];
        int k = m;
        for (int i = m; i < arrA.length; i++) {
            arrB[i] = arrA[i - m];
        }
        for (int i = 0; i < m; i++) {
            arrB[i] = arrA[arrA.length - k];
            k--;
        }
        System.out.println("移动后的数组：" + Arrays.toString(arrB));
    }
    ```

7. 输入数组，最大的与第一s个元素交换，最小的与最后一个元素交换，输出数组

    ```java
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int[] arr = new int[10];
        for (int i = 0; i < arr.length; i++) {
            System.out.print("请输入" + arr.length + "个数字，当前第" + (i + 1) + "个:");
            arr[i] = scanner.nextInt();
        }
        int max = 0, min = 0;
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] > arr[max])
                max = i;
            if (arr[i] < arr[min])
                min = i;
        }
        int temp1 = arr[0];
        int temp2 = arr[min];
        arr[0] = arr[max];
        arr[max] = temp1;
        if (min != 0) {
            arr[min] = arr[arr.length - 1];
            arr[arr.length - 1] = temp2;
        } else {
            arr[max] = arr[arr.length - 1];
            arr[arr.length - 1] = temp1;
        }
        System.out.println(Arrays.toString(arr));
    }
    ```

8. 找岀已知数组中的最大偶数,然后将这个数与数组中的第一个元素互换

    ```java
    public static void main(String[] args) {
        int[] arr = {5, 9, 2, 8, 7};
        int max = 0, k = 0, t;
        for (int i = 0; i < 5; i++) {
            if (arr[i] % 2 == 0 && max < arr[i]) {
                max = arr[i];
                k = i;
            }
        }
        t = arr[0];
        arr[0] = arr[k];
        arr[k] = t;
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + "  ");
        }
    }
    ```

9. 将一个数组逆序输出

    ```java
    public static void main(String[] args) {
        int[] arrA = { 1, 3, 44, 22, 77, 99 };
        int[] arrB = new int[arrA.length];
        int j = arrA.length;
        for (int i = 0; i < arrA.length; i++) {
            arrB[i] = arrA[j - 1];
            j--;
        }
        System.out.println("数组A逆序输出为：" + Arrays.toString(arrB));
    }
    ```
    
10. 对二维数组进行求和

    ```java
    public static void main(String[] args) {
        int arr[][] = {{22, 33, 12, 32}, {23, 54, 12, 11}, {65, 87, 89, 23}};
        int sum = 0;
        for (int i = 0; i < arr.length; i++) {
            for (int j = 0; j < arr[i].length; j++) {
                sum += arr[i][j];
            }
        }
        System.out.println("sum=" + sum);
    }
    ```

11. 找一个数组中查找一个元素的第一次出现的位置

     ```java
     public static void main(String[] args) {
         int[] arr = new int[]{12, 23, 34, 45, 56, 67, 77, 89, 90};
         System.out.println(getIndex(arr, 12));
     }
     
     public static int getIndex(int[] arr, int key) {
         for (int i = 0; i < arr.length; i++) {
             if (arr[i] == key) {
                 return i;
             }
         }
         return -1;
     }
     ```


## 字符串与包装类

1. 输入一个任意字符串，将字符串首字母转换成大写其余均小写

   ```java
   public static void main(String[] args) {
       System.out.println("请输入一行字符串：");
       Scanner scanner = new Scanner(System.in);
       String str = scanner.nextLine();
       String string = str.substring(0, 1).toUpperCase().concat(str.substring(1).toLowerCase());
       System.out.println(string);
   }
   ```

2. 进制转换

   ```java
   public static void main(String[] args) {
       System.out.println("请输入一个整数：");
       Scanner scanner = new Scanner(System.in);
       int num = scanner.nextInt();
       System.out.println(num + "=" + Integer.toBinaryString(num));
       System.out.println(num + "=" + Integer.toOctalString(num));
       System.out.println(num + "=" + Integer.toHexString(num));
   }
   ```

3. 输入球的半径，计算球的体积

   ```java
   public static void main(String[] args) {
       System.out.println("请输入要求体积的圆球的半径r：");
       Scanner scanner = new Scanner(System.in);
       double r = scanner.nextDouble();
       double v = 4 * Math.PI * Math.pow(r, 3) / 3;
       System.out.println("求得圆球的体积为" + v);
   }
   ```


## 排序题

1. 三个数排序

    ```java
    public static void main(String[] args) {
        System.out.println("请输入三个数：");
        Scanner scanner = new Scanner(System.in);
        int num1 = scanner.nextInt();
        int num2 = scanner.nextInt();
        int num3 = scanner.nextInt();
        int temp = 0;
        if (num1 > num2) {
            temp = num1;
            num1 = num2;
            num2 = temp;
        }
        if (num1 > num3) {
            temp = num1;
            num1 = num3;
            num3 = temp;
        }
        if (num2 > num3) {
            temp = num2;
            num2 = num3;
            num3 = temp;
        }
        System.out.println("这三个数从小到大排列：" + num1 + "  " + num2 + "  " + num3);
        System.out.println("这三个数从大到小排列：" + num3 + "  " + num2 + "  " + num1);
    }
    ```

2. 冒泡排序法

    ```java
    public static void main(String[] args) {
        int[] array = {63, 4, 24, 1, 3, 5};
        bubbleSort(array);
    }

    public static void bubbleSort(int[] array) {
        for (int i = 0; i < array.length - 1; i++) {
            for (int j = 0; j < array.length - i - 1; j++) {
                if (array[j] > array[j + 1]) {
                    int temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                }
            }
        }
        printArray(array);
    }

    public static void printArray(int[] array) {
        for (int i = 0; i < array.length; i++) {
            System.out.print(array[i] + " ");
        }
    }
    ```

3. 选择排序法

    ```java
    public static void main(String[] args) {
        int[] array = {63, 4, 24, 1, 3, 5};
        selectSort(array);
    }

    public static void selectSort(int[] array) {
        for (int i = 0; i < array.length - 1; i++) {
            for (int j = i + 1; j < array.length; j++) {
                if (array[i] > array[j]) {
                    int temp = array[i];
                    array[i] = array[j];
                    array[j] = temp;
                }
            }
        }
        printArray(array);
    }

    public static void printArray(int[] array) {
        for (int i = 0; i < array.length; i++) {
            System.out.print(array[i] + " ");
        }
    }
    ```

4. 直接排序法

    ```java
    public static void main(String[] args) {
        int[] a = {49, 38, 65, 97, 76, 13, 27, 50};
        insertSort(a);
    }

    public static void insertSort(int[] arr) {
        for (int i = 1; i < arr.length; i++) {
            for (int j = i; j > 0; j--) {
                if (arr[j] < arr[j - 1]) {
                    int temp = arr[j - 1];
                    arr[j - 1] = arr[j];
                    arr[j] = temp;
                }
            }
        }
        printArray(arr);
    }

    public static void printArray(int[] arr) {
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + " ");
        }
    }
    ```

1. 字符串排序

    ```java
    public static void main(String[] args) {
        String[] str = {"abc", "cad", "m", "fa", "f"};
        for (int i = str.length - 1; i >= 1; i--) {
            for (int j = 0; j <= i - 1; j++) {
                if (str[j].compareTo(str[j + 1]) < 0) {
                    String temp = str[j];
                    str[j] = str[j + 1];
                    str[j + 1] = temp;
                }
            }
        }
        for (String subStr : str) {
            System.out.print(subStr + " ");
        }
    }
    ```

## 应用题

1. 两个乒乓球队进行比赛，各出三人。甲队为a,b,c三人，乙队为x,y,z三人。已抽签决定比赛名单。有人向队员打听比赛的名单。a说他不和x比，c说他不和x,z比，请编程序找出三队赛手的名单

   ```java
   public static void main(String[] args) {
       for (char i = 'x'; i <= 'z'; i++) {
           for (char j = 'x'; j <= 'z'; j++) {
               if (i != j) {
                   for (char k = 'x'; k <= 'z'; k++) {
                       if (i != k && j != k) {
                           if (i != 'x' && k != 'x' && k != 'z') {
                               System.out.println("a:" + i + "\nb:" + j + "\nc:" + k);
                           }
                       }
                   }
               }
           }
       }
   }
   ```

2. 有5个人坐在一起，问第五个人多少岁？他说比第4个人大2岁。问第4个人岁数，他说比第3个人大2岁。问第三个人，又说比第2人大两岁。问第2个人，说比第一个人大两岁。最后问第一个人，他说是10岁。请问第五个人多大？

   ```java
   public static void main(String[] args) {
       int age = 10;
       for (int i = 2; i <= 5; i++) {
           age += 2;
       }
       System.out.println(age);
   }
   ```

3. n个人围成一圈，顺序排号，从第1个人开始报数（1到3报数），凡报到3的人退出圈子，问最后留下的是原来几号？

   ```java
   public static void main(String[] args) {
       System.out.println(game(7));
   }
   
   public static int game(int n) {
       LinkedList<Integer> player = new LinkedList<Integer>();
       for (int i = 1; i <= n; i++) {
           player.add(i);
       }
       while (player.size() > 1) {
           player.addLast(player.removeFirst());
           player.addLast(player.removeFirst());
           player.removeFirst();
       }
       return player.getFirst();
   }
   ```

4. 猴子吃桃子问题

   ```java
   public static void main(String[] args) {
       int x = 1;
       for (int i = 2; i <= 10; i++) {
           x = (x + 1) * 2;
       }
       System.out.println("猴子第一天摘了" + x + "个桃子");
   }
   ```

5. 一球从h米高度自由落下，每次落地后反跳回原高度的一半；再落下，求它在 第n次落地时，共经过多少米？第n次反弹多高？

   ```java
   public static void main(String[] args) {
       Scanner scanner = new Scanner(System.in);
   	System.out.println("请输入小球下落的高度：");
       float h = scanner.nextFloat();
       System.out.println("请输入小球落地的次数：");
       int n = scanner.nextInt();
       float sum = h;
       for (int i = 0; i < n; i++) {
           h /= 2;
           sum += h * 2;
       }
       System.out.println("经过" + n + "次落地，能反弹" + h + "米，经过距离" + sum + "米");
   }
   ```

<RightMenu />