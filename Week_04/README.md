# 学习笔记

## 产生式（BNF）
- 用尖括号(<>)括起来的名称来标识语法结构名
- 语法结构分成基础结构和需要用其他语法结构定义的复合结构
  - 基础结构称终结符
  - 复合结构称非终结符
- 引号和中间的字符表示终结符
- 可以有括号，组成一组
- * 表示重复多次
- | 表示或
- + 表示至少一次

## 一般命令式编程语言设计方式
1. Atom: 基本单位，如变量名、字符数字直接量
2. Expression: atom加操作符构成表达式，如+、-
3. Statement: 表达式加上关键字或者语句构成语句，如if
4. Structure: 如function、class用来组织语句，形成结构化
5. Program: 用来组织管理代码，如 module


## 类型总结
- Number: IEE 754 float表示方法 [参考链接](https://juejin.im/post/6844903834356023303)
- String: 
  1. ASCII、Unicode字符集
  2. UTF编码方式
- Boolean: true false
- Null: 关键字
- Undefined: 全局变量
- Object: 唯一标识、状态、行为，对象的行为必须改变对象的状态。
- Symbol: 用于对object做键
