
// var ob={}
// var newObj=Object.defineProperty(ob,'name',{
//     value:23,
//     writable:false,
//     configurable:true
// })
// var person={}
// person.name='tom'
// console.log(person);
// console.log(newObj);
// console.log(Object.keys(newObj));


function a(){
    var num=9;
    return function add(){
        num--;
        console.log(num);
        
    }
}
var funcA=a()
console.log(funcA());
console.log(funcA());
console.log(funcA());
