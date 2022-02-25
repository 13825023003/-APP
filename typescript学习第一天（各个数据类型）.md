# typescript学习第一天（各个数据类型）

## typescript是啥?

简单来说，typescript是JavaScript的超集，具有类型系统并可以编译为纯JavaScript

## 为什么使用typescript？

typescript是静态类型语言，静态类型语言可以让编译器在编码阶段即使检测到各类语法错误。使用typescript进行开发，能避免许多潜在的bug

### 通过是否允许隐式转换来分类

- 强类型：typescript
- 弱类型：JavaScript

### 通过类型检测的时机来分类

- 静态类型：TS
- 动态类型：JS

### typescript给前端带来的好处主要有以下几点（面试题）

1. 提高开发效率和代码质量
2. 增强了代码的可读性和维护性
3. 胜任大规模应用开发

## typescript的基本数据类型

### 八种内置类型

```ts
const str:string = "中国牛逼";
const num:number = 666;
const bool:boolean = true;
const u:undefined = undefined;
const n:null = null;
const big:bigint = 100n;
const sym:symbol = Symbol('me');
const obj:object = {x:1};
```
**注意：null和undefined是所有类型的子类型，可以把null和undefined赋值给其他任何类型，除非在tsconfig.json里配置了“strictNullChecks”：true，null就只能赋值给any、unknown、和本身的类型，undefined同理**

#### number和bigInt

虽然number和bigint都表示数字，但是这两个类型并不兼容

```ts

let big:bigint = 100n;
let num:number = 1;
num = big //Type 'bigint' is not assignable to type 'number'.
```
### 其他类型

#### Array

定义数组类型有两种方式，下面两种写法都意味着数组里面的值只能是string类型，否则会报错。如果想在数组中存储多个类型值，可以用联合数组：

```ts
let arr:string[] = ['剑圣','蛮王'];
let array:Array<string> = ['剑姬','亚索'];

arr.push(1); //Argument of type 'number' is not assignable to parameter of type 'string'.
array = ['剑姬','亚索',666];//Type 'number' is not assignable to type 'string'

// 联合数组
let arr2:Array<number|string> = [5,"nice"];
```
#### 元组

##### 什么是元组

元组是typescript特有的类型，跟数组类似，元组重要的特征是**可以限制元素个数和类型**

```ts
// [string,number]就是元组类型，数组x的类型必须严格匹配，且个数必须为2
let x:[string,number]

x = ['hi',666];//成功
x = [666,'hi']; //Type 'string' is not assignable to type 'number'
x = ['hi',666,777];//Type '[string, number, number]' is not assignable to type '[string, number]'.
//   Source has 3 element(s) but target allows only 2
```
**注意**：元组只能表示一个已知元素和类型元素的数组，越界就会报错。如果一个数组中可能有多个类型，可以用any[]。

##### 元组类型的解构赋值

```ts
let arr:[string,number] = ['德玛西亚',666];
let [lol,action] = arr;
console.log("lol",lol);
console.log("action",action);
```
当元组中的元素较多时，这种方式就不可取了。结构数组元素个数是不能超过元组中元素个数

```ts
let arr:[string,number] = ['德玛西亚',666];
let [lol,action,hero] = arr;//Tuple type '[string, number]' of length '2' has no element at index '2'.
```
元组类型[string,number]的长度是2，在位置索引2处没有任何元素。

##### 元组类型的可选元素

在定义元组类型时，我们可以通过？来声明元组类型的可选元素

```ts
// 要求包含一个必须的字符串属性，和一个可选的布尔值属性
let arr:[string,boolean?];

arr = ['222',true];
console.log("arr",arr);//arr  ['222', true]

arr = ['333'];
console.log("arr",arr); //arr ['333']
```
##### 元组类型的剩余元素

元组类型里的最后一个元素可以是剩余元素，形式为...x，你可以把它当作es6的剩余参数，剩余参数代表元组类型是开放的，可以有0个或者更多额外的元素

```ts
let arr:[number,...string[]]
arr = [1,'lix']
arr = [2,'lis','lix']
```
##### 只读的元组类型

我们可以为任何元组类型加上readonly关键字前缀，使其成为只读元组

```ts
const arr:readonly [string,number] = ['急急急',777];

// 在使用readonly关键字修饰元组类型后，任何企图改变元组的操作都会报错
arr[0] = "qqq"//Cannot assign to '0' because it is a read-only property.
arr.push(6)//Property 'push' does not exist on type 'readonly [string, number]'.
```
