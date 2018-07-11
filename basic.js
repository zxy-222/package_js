//1、清空和截短数组
//最简单的清空和截短数组的方法就是改变length属性
const arr = [11,22,33,44,55];
//截取
arr.length = 3;
console.log(arr);// =>[11,22,33];
//清空
arr.length = 0;
console.log(arr);// =>[];

//2 、使用对象结构模拟命名参数
//之前模式中，在向一个函数中传递多个参数时，可能会采用配置对象的模式
doSomething({foo:'hello',bar:'Hey',baz:40});
function doSomething(config){
  const foo = config.foo !== undefined ? config.foo : 'Hi';
  const bar = config.bar !== undefined ? config.bar : 'He';
  const baz = config.baz !== undefined ? config.baz : 13;
}
//现在有ES6的对象结构
function doSomething({foo='Hi',bar = 'He',baz=13}){

}
//如果需要配置对象参数变成可选的，则：
function doSomething({foo='Hi',bar='He',baz=13}={}){

}

//3、switch语句使用范围
function getWaterState(temp){
  let state;
  switch(true){
    case(temp <= 0):
       state = 'Solid';
       break;
    case(temp > 0 && temp < 100):
      state = 'Liquid';
      break;
    default:
    state = 'Gas';
  }
  return state;
}

//4、格式化 JSON 代码
//JSON.stringify 不仅可以字符串化对象，也可以格式化JSON输出：
const obj = {
  foo:{bar:[11,22,33,44],baz:{bing:true,boom:'Hi'}}
};
JSON.stringify(obj,null,4);
//第三个参数为格式化需要的空格数目
console.log(JSON.stringify(obj,null,4))

//5、移除数组重复项
//使用ES6和扩展运算符，可以轻松移除数组中的重复项
const removeDuplicateItems = arr => [...new Set(arr)];
removeDuplicateItems([40,'foo',true,false,true,'foo']);

//6、扁平化多维数组
//使用扩展运算符可以快速扁平化数组，不过只适用二维数组
const array =[11,22,[33,44],55];
const flatArr = [].concat(...array);
console.log(flatArr);// => [11,22,33,44,55];
//使用递归可以扁平化任意维度的数组
function flattenArray(arr){
  const flattened = [].concat(...arr);
  return flattened.some(item => Array.isArray(item)) ? flattenArray(flattened) : flattened;
}
const arr6 = [11, [22, 33], [44, [55, 66, [77, [88]], 99]]];
const flatArr6 = flattenArray(arr6); 
console.log(flatArr6);

//6、斐波那契数列中的第n项的值
//6.1
let count = 0;
function fn(n){
  let cache = {};
  function _fn(n){
    if(cache[n]){
      return cache[n];
    }
    count++;
    if(n == 1 || n == 2){
      return 1;
    }
    let prev = _fn(n-1);
    cache[n-1] = prev;
    let next = _fn(n-2);
    cache[n-2] = next;
    return prev + next;
  }
  return _fn(n);
}
//6.2
let count2 = 0;
function fn2(n){
  count2++;
  if(n == 1 || n == 2){
    return 1;
  }
  return fn2(n - 1) + fn2(n - 2)
}
console.log(fn(10),count);
console.log(fn2(10),count2)