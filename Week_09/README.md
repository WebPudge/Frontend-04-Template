# 学习笔记
## CSS总体结构
- @charset
- @import
- rules
  - @media
  - @page
  - rule

## At-rules 
- @charset ： https://www.w3.org/TR/css-syntax-3/
- @import ：https://www.w3.org/TR/css-cascade-4/
- @media ：https://www.w3.org/TR/css3-conditional/
- @page ： https://www.w3.org/TR/css-page-3/
- @counter-style ：https://www.w3.org/TR/css-counter-styles-3
- @keyframes ：https://www.w3.org/TR/css-animations-1/
- @fontface ：https://www.w3.org/TR/css-fonts-3/
- @supports ：https://www.w3.org/TR/css3-conditional@namespace ：https://www.w3.org/TR/css-namespaces-3/
- @namespace ：https://www.w3.org/TR/css-names
## CSS rule

- 选择器
- 声明
  - key
  - value

## 问题
为什么 first-letter 可以设置 float 之类的，而 first-line 不行呢？
答：因为first-letter是针对字的样式不用关心变化布局所带来的影响，而first-line时必须是布局计算完成才能确定首行，如果first-line支持改变大小或display那么布局又需要重新计算首行很影响性能