# 学习笔记

## 对象和属性的区别
`对象`
  - Properties
  - Methods
  - Inherit  

`组件`
  - Properties
  - Methods
  - Inherit
  - Attribute
  - Config & State
  - Event
  - Lifecycle
  - Children

Properties 和 Attribute区别  
Attribute强调描述性，Property强调从属关系
Property改变不一定改变Attribute
```html
<a href="//m.test.com">
<script>
  var a = document.getElementByTagName('a');
  a.href  // http://m.test.com 被转换过
  a.getAttribute('href')  // //m.test.com 与上面字符串完全一致
</script>
```

设置差异对比
|           | 标签设置 | JS set | JS Change | 用户输入 |
| --------- | :------: | :----: | :-------: | :------: |
| Property  |          |   √    |     √     |          |
| Attribute |    √     |   √    |     √     |          |
| state     |          |        |           |    √     |
| Config    |          |   √    |           |          |

