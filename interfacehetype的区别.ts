// interface和type很多情况下功能都类似，都是用来声明变量的类型，首先用interface实现，
// 若interface无法实现再用type实现，区别：
// 1、都可以声明对象，但type还可以声明基础类型、联合类型、元组
// 2、interface多次声明可以合并，type不能重复声明
// 3、type可以使用typeof获取变量类型

// TS的模块是什么
// Typescript中的模块是相关变量、函数、类和接口的集合。可以将模块视为包含执行任务所需的一切容器
// 可以导入模块以轻松地在项目之间共享代码
module moduleName {
  class xyz {
    sum(x, y) {
      return x + y
    }
  }
}

// 三斜线指令
// 三斜线指令是单行注释，包含用作编译器指令的XML标记，每个指令都表示在编译过程中要加载的内容。三斜杠
// 指令仅在其文件的顶部工作，并且将视为文件中其他任何地方的普通注释
///<reference path="..." />是最常见的指令，定义文件之间的依赖关系
/// <reference type="..." />类似于path但定义了包的依赖性
/// <reference lib="..."></reference> 允许您显示包含内置的lib文件


