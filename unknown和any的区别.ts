// unknown和any的区别
// 1、unknown的类型是安全的
// 2、同any一样，任何值都可以赋给unknown，但是unknown的值不能赋给除any、unknown的其他值
let vAny: any = 10
let vUnknown: unknown = 10

let s1: string = vAny
// let s2: string = vUnknown //报错

// 3、unknown没有被断言或细化到一个确切类型之前，是不允许在其上进行操作
function foo(callback: unknown) {
  if (typeof callback === 'function') {
    callback()
  }
}
