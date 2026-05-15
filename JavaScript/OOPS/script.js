// // Using prototype

// let obj = {
//     a:1,
//     b:"Logan"
// }
// console.log(obj)

// let animal = {
//     eats: true
// }

// let rabbit = {
//     jumps: true
// }

// rabbit.__proto__ = animal; // sets rabbit.[[Prototype]] = animal

class Animal{
    constructor(name){
        this.name = name
        console.log("Object is created...")
    }

    eats(){
        console.log("Animal is eating")
    }
    jumps(){
        console.log("Animal is jumping")
    }
}

class Lion extends Animal{
    constructor(name){ // without super we get this error: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
        super(name) // we wont have to write this.name here as it is already fetched from the parent constructor
        console.log("Object is created and its a lion")
    }
    roars(){
        console.log("Lion is roaring")
    }
    eats(){ // overwriting the parent's eats method
        super.eats() // use super to call the parents method
        console.log("Eating and roaring!!")
    }
}

let a = new Animal("Bunny")
console.log(a)

let b = new Lion("Simba")


// instanceof Operator
// The instanceof operator allows to check whether an object belongs to a certain class.

// <obj> instanceof <class>
//  Returns true if obj belongs to the Class or any other class inheriting from it