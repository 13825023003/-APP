// Omit以一个类型为基础支持剔除某些属性，然后返回一个新类型
// 语法 Omit<Type,Keys>
// 使用实例：
interface Todo {
  title: string
  description: string
  complete: boolean
  createdAt: number
}
type TodoPreview = Omit<Todo, 'description'>

// TypeScript中如何实现函数重载
// 创建两个名称相同但参数/返回类型不同的函数。两个函数必须接受相同
// 数量的参数。这是TypeScript中多态性的重要组成部分
// 例如创建一个add函数，如果它们是数字，则将两个参数相加，如果它们是字符串，则将它们连接起来
function add(a:string, b:string): string;
function add(a:number, b:number): number;
function add(a:any, b:any):any{
    return a + b
}
