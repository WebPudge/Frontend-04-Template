# 学习笔记

记录一下 TicTacToe 遇到的一些坑，`ticTacToe.html` 中遇到这种残局时bestChoices不正确，差异如下图：  

残局局面
![right tictactoe](./img/start.png)  

斜侧方落子，黑子落子不正确
![right tictactoe](./img/end.png)  

残局的所有点bestChoice都是输没法赢，所以默认了第一个点落子