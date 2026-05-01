let a = "Logan"

for (let i = 0; i<a.length; i++){
    console.log(a[i])
}

// creating template literal or string interpolation
let real_name = "Logan"
let friend = "Hank"
console.log(`His name is ${real_name} and his friends name is ${friend}`)

console.log("escape sequence: ", "Roh\"an") // could use bactick ` or single quotes '
console.log(a.toUpperCase())
console.log(a.toLowerCase())

sl = "SoldierBoy"
console.log(sl.slice(0,7))
console.log(sl.replace("Bo", "To")) // replace will only replace the first occurence of the letters

console.log(sl.concat(a, "Aishwariya", "Rahul", "Priya"))

// string is immutable in JS, so everythime a modification is applied, it creates a new string

console.log(sl.charAt(3))
console.log(sl.indexOf("ol"))
console.log(sl.startsWith("So"))