async function sleep(){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            resolve(45)
        }, 1000);
    })
}

// IIFE (Immediately Invoked Function Expression)
// IIFE is a JavaScript function that runs as soon as it is defined.

// (function() {
//   // ...
//   // ...
// })();   // IIFE Syntax

(async function main(){
    let a = await sleep() // await must be inside async function but here this funciton does not need to be called
    console.log(a)
    let b = await sleep()
    console.log(b)
})()

// destructuring

let [x, y, ...rest] = [6,1,3,2,8,4,7,8] // remaining array goes into rest
console.log(x,y,rest)
console.log(rest)

let obj = {
    a:1,
    b:2,
    c:3
}

let {a, b} = obj
console.log(a, b)

function sum(a,b,c){
    return a+b+c
}

// spread operator
let arr = [1,4,7]
console.log(sum(...arr))

let obj2 = {...arr}
console.log(obj2) // {0: 1, 1: 4, 2: 7}

// Hoisting
// Hoisting refers to the process whereby the interpreter appears to move the declarations to the top of the code before execution. Variables can thus be referenced before they are declared in JavaScript.

// Important Note: JavaScript only hoists declarations, not initializations. The variable will be undefined until the line where its initialized is reached. With let and const, accessing before declaration gives an Error; with var, undefined is printed. Function expressions and class expressions are not hoisted.