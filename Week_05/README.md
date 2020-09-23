# 学习笔记

## 拆卸转换 

object转换成基本类型 这个过程叫ToPremitive

* toString vs valueOf 在不同的场景调用的方法不一样，比如加法调用valueOf，对象作为属性key则是toString
* Symbol.toPrimitive 如果存在就只调用他

## 装箱转换

object对number、string、boolean、symbol都是有包装类

## Completion Record

* [[type]] : normal、break、continue、return、or throw
* [[value]] : 基本类型
* [[target]] : label