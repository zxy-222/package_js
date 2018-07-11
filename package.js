/**
 * 1、随机循环
 * 要求：（1）、一个提示列表里面，提示的信息每隔500ms随机展示
 *       （2）、同一轮循环里面，一个提示信息只能展示一次。
 *       （3）、列表的提示信息全部展示完了，进行下一轮展示
 */
var tipList = ['1','2','3','4','5','6','7','8','9'];
var tipListShow = [];
tipListShow = Object.assign([],tipList);
//Object.assign是ES6新添的接口，主要idea用途是用来合并多个Javascript对象。
//可接受多个参数，抵押给参数是目标对象，后面是源对象
var i = 0, time = null;
function play(){
  //随机显示一个，显示之后，把这个项从tipListShow中删除掉，防止在同一轮中出现
  console.log(tipListShow.splice(Math.floor(Math.random()*tipListShow.length),1)[0]);
 //当循环完了之后，tipListShow的长度就会是0，然后就重新赋值，准备进行下一轮的随机循环
  if(tipListShow.length === 0){
    console.log('已经执行完一轮了')
    tipListShow = Object.assign([],tipList);
    i = 0;
  }
  //如果需要暂停或者停止的，清除这个定时器即可，下次执行就重新这样创建定时器，执行play();
  timer = setTimeout(function(){
    play();
  },500);
}
//play();

/**
 * 2、格式化字符串
 *  这个最常见的就是在金额方面的显示需求上，比如后台返回10000。前端要显示成10,000或者其他格式等！
 */
function formatText(str,size,delimiter){
  //str
  //size —— 每隔几个字符进行分割， 默认是3
  //delimiter —— 分割符 默认是 ','
  var _str = str.toString();
  var _size = size || 3,
      _delimiter = delimiter || ',';
  var regText = '\\d{1,'+_size+'}(?=(\\d{'+_size+'})+$)';
/*   /\d{1,3}(?=(\d{3})+$)/g     这个正则的意思：匹配连续的三个数字，
     但是这些三个数字不能是字符串的开头1-3个字符   */
  var reg = new RegExp(regText,'g');
  /*
  (-?)匹配前面的 - 号 
  (\d+)匹配中间的数字
  ((\.\d+)?)匹配小数点后面的数字
   $0-匹配结果，$1-第一个括号返回的内容----(-?)    $2,$3如此类推
  */
 return _str.replace(/^(-?)(\d+)((\.\d+)?)$/,function($0, $1, $2, $3){
   return $1 + $2.replace(reg,'$&,')+$3;
 })
}
console.log(formatText(1234546789.12345))
//formatText(1234546789.12345);

/**
 * 3、命名方式转换
 */
function changeNameStyle1(name){ 
  // var str = "name";
  //$1 - 第一个括号匹配的内容
  //这个实例， $1 = "N"
  str = name.replace(/([A-Z])/g,"-$1").toLowerCase();
  return str;
}
console.log(changeNameStyle1("replaceName"))

function changeNameStyle2(name){
//  var str2 = "replace-name";
//这个实例$0='-n'    $1='n'
  str = name.replace(/-(\w)/g,function($0,$1){
    return $1.toUpperCase();
  });
  return str;
 }
 console.log(changeNameStyle2("replace-name"));

 /**
  * 4、数组比较
  */
 var arrayA = ['b','c'];
 var arrayB = [{key:'a',num1:'1',num2:'2',num3:'3',tot:'6'},{key:'b',num1:'11',num2:'22',num3:'33', tot:'66'},{key:'c',num1:'111',num2:'222',num3:'333',tot:'666'}];
 //1、如果arrayA中有a，arrayB中没有，则在B中增加一个key值为a的obj,且其他属性值可均为'0'。如：{key:'0',num1:'0',num2:'0',num3:'0'tot:'0'}
 //2、如果arrayA中有a，arrayB中也有key值为a的obj，arrayB不变，并且该obj里的其他属性和属性值均不变
//3、如果在arrayA中删除了a，那么arrayB中key值为a的obj整个删掉
function compareArr(arr1,arr2){
  var result = [],arr;
  for(var i = 0; i < arr1.length;i++){
    //根据arr[i]的值，查找arrayB，如果arr2中有满足条件的，就返回该项
    arr?result.push(arr):result.push({key:arrayA[i],num1:'0',num2:'0',num3:'0',tot:'0'});
  }
  return result;
}
console.log(compareArr(arrayA,arrayB));

/**
 * 4、数组去重的两种方式
 * 4.1、利用indexOf方法查找数组中是否以及存在该值，找不到则返回-1
 */
function unique1(arr){
  var newArr = [arr[0]];
  for(i = 1;i < arr.length;i++){
    if(newArr.indexOf(arr[i]) == -1){
      newArr.push(arr[i]);
    }
  }
  return newArr;
}
//4.2、利用对象的属性去重
function unique2(arr){
  var res = [];
  var json = {};
  for(var i = 0;i<arr.length;i++){
    if(!json[arr[i]]){
      res.push(arr[i]);
      json[arr[i]] = 1;
    }
  }
};
/**
 * 5、冒泡排序
 */
function sort(arr){
  for(var i = 0;i < arr.length-1;i++){
    var flag = true;
    for(var j = 0; j< arr.length-1-i;j++){
      flag = false;
      if(arr[j]>arr[j+1]){
        var temp = arr[j+1];
        arr[j+1] = arr[j];
        arr[j] = temp;
      }
    }
    if(flag){
      break;
    }
  }
  return arr;
}
/** 
 * 6、定时器
 * 6.1、setTiemout()
 */
function showTime() {
  var today = new Date();
  alert("The time is: " + today.toString());
  setTimeout("showTime()", 1000);
}
//6.2、setInterval()
function showTime(){
  var today = new Date();
  alert("The time issjj: " + today.toString());
  setInterval("showTime()", 1000);
}
setInterval("showTime")
 //两者的区别是:setTimeout()是在每次调用完setTimeout五秒后，再执行showtime函数。假如showtime函数的主体部分需要2秒执行完毕，那么整个函数需要7秒才能执行完一次;
  //而setInterval则是每隔指定的时间执行一次函数
//showTime()

/**7、
 * 判断是否断网
 */
window.addEventListener("online",function(e){
  console.log("ok");
  console.log(e.returnValue);
});
/*网络断开时调用*/
window.addEventListener("offline",function(e){
  console.log("no");
  console.log(e.returnValue);
});
 /**
  * 8、时间戳日期转换
  * 8.1、日期格式转换成 时间戳
  * 有三种方式
  */
 var date = new Date('2018-07-10 10:32:11');
 //三种方式获取
 var time1 = date.getTime();
 var time2 = date.valueOf();
 var time3 = Date.parse(date);
 //console.log(time1);
 //console.log(time2);
 //console.log(time3);
 //8.2、时间戳转成日期格式
 function timeChangeStyle(time){
  var date = new Date(time);//时间戳为10位，需要time*1000，13位不需要*1000
  Y =  date.getFullYear() + '-';
  M = (date.getMonth() + 1 < 10? '0'+(date.getMonth()+1):date.getMonth()+1)+'-';
  D = (date.getDate() < 10 ? '0'+date.getDate():date.getDate()) + ' ';
  h =  (date.getHours() < 10 ? '0'+date.getHours():date.getHours())+':';
  m = (date.getMinutes() < 10 ? '0'+date.getMinutes():date.getMinutes())+':';
  s = date.getSeconds() < 10 ? '0' + date.getSeconds():date.getSeconds();
  return Y+M+D+h+m+s;
}
timeChangeStyle(time1);
/**
 * 9、倒计时
 * 9.1、带天数的倒计时
 */
function countDown(times){
  var timer = null;
  timer = setInterval(function(){
    var day = 0,
        hour = 0,
        minute = 0,
        second = 0;
    if(times > 0){
      day = Math.floor(times/(60*60*24)) ;
      day = day < 10 ? '0'+ day : day;
      hour = Math.floor(times/(60*60))-(day*24);
      hour = hour < 10 ? '0'+ hour : hour;
      minute = Math.floor(times/60)-(day*24*60)-(hour*60);
      minute =  minute  < 10 ? '0'+ minute  : minute ;
      second = Math.floor(times) - (day*24*60*60)-(hour*60*60)-(minute*60);
      second = second < 10 ? '0' + second:second;
    }
    console.log(day+"天:"+hour+"小时:"+minute+"分钟:"+second+"秒");
    times--;
  },1000);
  if(times < 0){
    clearInterval(timer)
  }
}
//countDown(182004)

//9.2 时分秒倒计时
function resetTime(time){
  var timer = null;
  timer = setInterval(function(){
    if(time>0){
      var h = Math.floor(time/3600);
          h = h < 10 ? '0' + h : h;
      var m = Math.floor(time/60 %60);
          m = m < 10 ? '0' + m : m;
      var s = Math.floor(time%60);
          s = s < 10 ? '0' + s : s;
       console.log("倒计时 " + h+":"+ m + ":" + s);
      time -- ;
    }
  },1000);
  if(time <= 0){
    clearInterval(timer);
  }
}
//resetTime(3700);
/**
 * 11、随机数
 */
function sum (m,n){
  　var num = Math.floor(Math.random()*(m - n) + n);
    console.log(num);
  }


function setTime(time){
  var timer = null;
   timer = setInterval(function(){
    if(time>=0){
      var h = Math.floor(time/3600);
          h = h < 10 ? '0' + h : h;
      var m = Math.floor(time/60 %60);
          m = m < 10 ? '0' + m : m;
      var s = Math.floor(time%60);
          s = s < 10 ? '0' + s : s;
       console.log("倒计时 " + h+":"+ m + ":" + s);
      time -- ;
      if(time <= 30){
       sum(1,100);
      }
    }
  },1000);
  if(time < 0){
    clearInterval(timer)
  }
}
setTime(10);

/**
 * 11、监听事件封装
 * target:监听对象
 * type: 监听函数类型,如click、mouseover
 * func: 监听函数
 */
//11.1、添加监听事件
function addEventHandler(target,type,func){
  if(target.addEventListener){
    //监听IE9+、谷歌、火狐
    target.addEventListener(type,func,false)
  }else if(target.attachEvent){
    target.attachEvent("on" + type,func);
  }else {
    target["on" + type] = func;
  }
};
//11.2、移除监听事件
//移除时，第三个参数必须为函数名，不能把整个函数写进去
function removeEventHandler(target,type,func){
  if(target.removeEventListener){
    target.removeEventListener(type,func,false)
  }else if(target.detachEvent){
    target.detachEvent("on" + type,func);
  }else{
    delete target["on"+ type]
  }
}