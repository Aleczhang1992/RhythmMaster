/**
 * 对于ES6中Symbol的极简兼容
 * 方便模拟私有变量
 */

let Symbol  = window.Symbol
let idCounter = 0
//如果不支持symbol，重定义一个新的symbol
if (!Symbol) {
  Symbol = function Symbol(key) {
    return `__${key}_${Math.floor(Math.random() * 1e9)}_${++idCounter}__`
  }

  Symbol.iterator = Symbol('Symbol.iterator')//迭代器?
}

window.Symbol = Symbol
