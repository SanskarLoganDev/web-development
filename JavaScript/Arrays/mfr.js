// Map Filter Reduce

let arr = [1, 93, 5, 6, 88]
let newArr = []

for (let i = 0; i<arr.length; i++){
    const element = arr[i]
    newArr.push(element**2)
}
console.log(newArr)


// better way to handle the above function

// let new_arr = arr.map((e)=>{
//     return e**2
// })

let new_arr = arr.map((e, index, array)=>{ // same as above
    return e**2
})
console.log(new_arr)

// filter
const greaterThanSeven = (e)=>{
    if(e>7){
        return true
    }
    return false
}

console.log(arr.filter(greaterThanSeven))

// reduce method

let arr2 = [1,2,3,4,5,6]

const red = (a,b) =>{
    return a*b
}

console.log(arr2.reduce(red))

// advantage of using filter and reduce

const a = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// Get the sum of all even numbers greater than 3 — in one line
const result = a
    .filter(e => e > 3)
    .filter(e => e % 2 === 0)
    .reduce((acc, e) => acc + e, 0);

console.log(result); // 24  (4+6+8 = nope, 4>3✓ 6>3✓ 8>3✓ → 4+6+8 = 18... wait: 4,6,8 → 18)

Array.from("Logan") // converting object to Array