console.log("Hey this is tutorial 55");
// prefer to use let over var as we can change its value in a block and the changes will remain within the block
var a = 5;
// a = a + 1
let b = 6;
let c = "Harry";
let _a = "Shubham";
// var 55a = "Rohan"; // Not Allowed

// console.log(a +  b + 8);
// console.log(typeof a, typeof b, typeof c); // gives the data type
{
    // let a = 66;
    console.log(a)
}
console.log(a)
// const a1 = 6;
// a1 = a1 + 1; // Not Allowed because a1 is constant


let x = "Harry bhai";
let y = 22;
let z = 3.55;
const p = true;
let q = undefined;
let r = null; // null is of type object

console.log(x, y, z, p, q, r)
console.log(typeof x, typeof y, typeof z, typeof p, typeof q, typeof r)

// object in javascript are key value pairs
let o = {
    "name": "Harry", // can remove double quotes from name, it would be same
    "job code": 5600, // cannot remove double quotes from job code as there is space in between
    "is_handsome": true
}

console.log(o);
o.salary = "100crores";
console.log(o);
o.salary = "500crores";
console.log(o);