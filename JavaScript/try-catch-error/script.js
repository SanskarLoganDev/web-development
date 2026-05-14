let a =prompt("Enter first number")
let b =prompt("Enter second number")

if (isNaN(a) || isNaN(b)){
    throw TypeError("Enter only numbers!") // use to throw an error
}

let sum = parseInt(a) + parseInt(b) // parseInt is used to convert to int

// try catch works synchronously so it will fail to catch error for setTimeout

// try{
//     console.log("The sum is: ", sum*x)
// } catch (error) {
//     console.log(error.name)
//     console.log(error.message)
//     console.log(error.stack)
// }
// finally{
//     console.log("files are being closed and db connection is being closed")
// }

// people usually say whether the code enters try or catch, finally is run
// that is true but not complete. this could be done even without using finally
// finally comes in use when doing this inside functions and there is a return statement before it


function main(){
    let x = 1
    try{
        console.log("The sum is: ", sum*x)
        return true
    } catch (error) {
        console.log(error.name)
        console.log(error.message)
        console.log(error.stack)
        return false
    }
    finally{
        console.log("files are being closed and db connection is being closed")
    }
}

let y = main()


