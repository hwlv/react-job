// import { Promise } from "mongoose";

// process.nextTick(()=>{console.log('nextTrick');
// })

// Promise

var obj = {}
var newObj=Object.defineProperty(obj, 'txt', {
    get: function () {
        return obj
    },
    set: function (newValue) {
        document.getElementById('txt').value = newValue
        document.getElementById('show').innerHTML = newValue
    }
})
console.log(newObj);
