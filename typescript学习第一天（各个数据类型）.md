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

#### 函数

##### 函数声明

```ts
// 函数声明
function sum(x:number,y:number):number{
    return x + y
}
```
上面代码表示，sum函数接收两个number类型参数，并且它的返回类型也是number类型

##### 函数表达式

```ts
// 函数表达式
const sum2 = function(x:number,y:number):number{
    return x + y
}
```
##### 箭头函数

```ts
// 箭头函数
const sum3 = (x:number,y:number):number=>{
    return x + y
}
```
##### 可选参数

```ts
// 可选参数
function queryUserInfo(name:string,age?:number){
    if(age){
        return `我叫${name},${age}岁`;
    }
    return `我叫${name},年龄未知`
}
console.log(queryUserInfo('你爷爷',80)) //我叫你爷爷,80岁
console.log(queryUserInfo('你奶奶')) //我叫你奶奶,年龄未知
```
**注意：**可选参数后面不能再出现必选参数

##### 参数默认值

可以给参数一个默认值，当调用者没有传入该参数或者传入**undefined**时，这个默认值就生效

```ts
function queryUserInfo(name:string,age:number,sex:string='不详'){
    return `姓名：${name},年龄：${age},性别：${sex}`
}
console.log(queryUserInfo('xxx',26)) //姓名：xxx,年龄：26,性别：不详
```
**注意**：有默认值的参数也可放置在其他参数前，只不过要主动传入**undefined**才能触发这个参数的默认值         

##### 剩余参数

```ts
// 剩余参数
function push(arr:any[],...items:any[]){
    items.forEach(items => arr.push(items))
}

let arr:any[] = []
push(arr,1,2,3,"你爷爷","你奶奶")
console.log(arr) //[1, 2, 3, "你爷爷", "你奶奶"]
```
##### 函数重载

由于JS是动态类型语言，我们经常会使用不同类型的参数来调用同一个函数，该函数会返回不同类型的结果，而在TS里传入的参数同时传入支持string和number类型，我们可以先定义一个联合类型string|number，再给这个联合类型取个名字：

```ts
type UnionType = string | number //类型别名
function sum(x:UnionType,y:UnionType){
    if(typeof x === 'string' || typeof y === 'string'){
        return x.toString() + y.toString()
    }
    return x + y
}

const res = sum('侬','好')
res.split('') //Property 'split' does not exist on type 'string | number'.
//   Property 'split' does not exist on type 'number'
```
**注意**：类型number上不存在split属性

**函数重载或方法重载是使用相同名称和不同参数数量或类型创建多个方法的一种能力**，要解决上面的问题，只需定义函数返回类型为any就可

#### any

在TS中，任何类型都可以被归为any类型，any类型是类型系统的顶级类型

```ts
// 普通类型，在赋值过程中改变类型不允许
let a:string = '你奶奶喜欢你爷爷';
a = 666 //Type 'number' is not assignable to type 'string'.

// 如果是any类型，则允许被赋值为任意类型
let b:any = 666;
b = "呵呵";
b = true;
b = null;
b = undefined;
b = [];
b = {};

// 如果变量在声明的时候，未指定其类型，那么会被识别为any类型
let something; //let something: any
something = '嘻嘻嘻';
something = 555;
something = false;
```
**注意**：使用any类型就失去了使用TS的意义，长此以往会放松我们对自己的要求，尽量不要使用any

##### unknown

unknown与any十分相似，所有类型都可以分配给unknown类型

```ts
let a:unknown = 250;
a = "天动万象";
a = true
```
**注意**：unknown与any最大区别是：任何类型的值都可以赋值给any，同时any类型的值也可以赋值给任何类型（never除外）。任何类型的值都可以赋值给unknown，unknown的值只能赋值给any和unknown

```ts
let a1:any = 666;
let b1:unknown = a1;

let a2:unknown = 777;
let b2:number = a2;//Type 'unknown' is not assignable to type 'number'.
```
如果不缩小类型，就无法对unknown类型执行任何操作：

```ts
function battle(){
    return 'victory!'
}

const record:unknown = {hero:battle};
record.hero(); //Property 'hero' does not exist on type 'unknown'
```
这种机制起到了很强的预防性，更安全

我们可以用**typeof**或者**类型断言**的方式来缩小未知范围：

```ts
const a:unknown = "超神";
a.split('');//Property 'split' does not exist on type 'unknown'

// typeof方法
if(typeof a === 'string'){
    a.split('')
}

// 类型断言
(a as string).split('')
```
