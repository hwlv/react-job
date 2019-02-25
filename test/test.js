//1.遍历对象
// obj={age:10,name:'tom'}
// arr=[]
// console.log(Object.keys(obj));
// Object.keys(obj).map((k)=>{
//     console.log(k);
//     arr[k]=obj[k]
// })
// var obj = {'0':'a','1':'b','44':'c'};
// //for in 可以遍历对象，for of不行
// for(var i in obj) {
//      console.log(i,":",obj[i]);
// }
// console.log(arr);
//3.实现一个promise 



var ob={}
/**
 * attention:
 * 1.数据描述符和存取描述符(get,set)不能混合使用
 * 2.
 */
var newObj=Object.defineProperty(ob,'name',{
    //数据描述符和存取描述符均具有以下可选键值：
    // configurable:false,//该属性是否可以修改和删除
    // enumerable:false,//是否可以for in或者Object.keys()枚举
    // 数据描述符
    value:23,
    writable:true,//属性值是否可以改变。
    // 存取描述符   
    // get:function(){
    //     return 'get value'
    // },
    // set:function(){
    //     console.log('run set ..');
    // }
})
newObj.name='tm'
console.log(newObj);


