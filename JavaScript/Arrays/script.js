let arr = [1,2,3,4,5,9]

console.log(arr)
console.log(arr.length)
console.log(arr[0])

// array is immutable
arr[0] = 5666;
// console.log(arr, typeof arr);
// console.log(arr.length)

console.log(arr[0])
// console.log(arr[2])
// console.log(arr[4])

console.log(arr.toString())
console.log(arr.join(" and ")) // puts and between each element of array after converting it to string


 
let numbers = [1, 2, 3, 4, 5] 
console.log(numbers.pop())
console.log(numbers) // removed 5 from the end due to pop earlier
numbers.push("Logan")
console.log(numbers) 
numbers.shift() // works similar to popleft in queue of python
console.log(numbers) 
numbers.unshift("jack") // add from left, similar to appendLeft in python queue
// [ 'jack', 2, 3, 4, 'Logan' ]
delete numbers[4] // deleted the element but the memory is still allocated
console.log(numbers[4], typeof numbers[4]) 

console.log(numbers.sort())
console.log(numbers) // [ 2, 3, 4, 'jack', <1 empty item> ]
// numbers.splice(1, 2)    
console.log(numbers.splice(1, 3)) // splice will remove the 3 elements starting from index 1. Not to be confused with slice
console.log(numbers)  

numbers.splice(1, 3, 222, 333) // will add 222 and 333 at the end
console.log(numbers) 
// (4) [2, 222, 333]