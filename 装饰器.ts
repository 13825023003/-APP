// 装饰器定义
function sealed(target) {
  // 给目标值添加一些特性
}
// 1、定义一个enumerable
function enumerable(value: boolean) {
  return function (
    target: any,
    propertyKey: string,
    description: PropertyDescriptor
  ) {
    description.enumerable = value
  }
}
// 2、使用装饰器，给greet方法限制不可枚举
class Greeter {
  greeting: string
  constructor(message: string) {
    this.greeting = message
  }

  @enumerable(false)
  greet() {
    return 'Hello,' + this.greeting
  }
}
