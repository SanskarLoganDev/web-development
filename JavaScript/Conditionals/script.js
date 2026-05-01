console.log("Hello I am conditional tutorial")

let age = 1;
let grace = 2;

age += grace // age = 3
console.log("here is the age:", age)
console.log(age + grace)
console.log(age - grace)
console.log(age * grace)
console.log(age / grace) // 1.5
console.log(age ** grace)
console.log(age % grace)

/*
I am a 
multiline 
comment
*/

if (age >= 18) {
    console.log("You can drive");
}

else if (age == 0) {
    console.log("Are you kidding?")
}

else if (age == 1) {
    console.log("Are you again kidding?")
}

else {
    console.log("You cannot drive");
}

console.log(3=="3") // compares just the value
console.log(3==="3") // compares value and type

a = 6;
b = 8;
let c = a > b ? (a - b) : (b - a);

// grace = 2
console.log("++ check:", grace++) // will add after printing
console.log("++ check:", ++grace) // will add first and then print

/*
translates to:
if(a>b){
    let c = a - b;
}
else {
    let c = a - b;
}

*/