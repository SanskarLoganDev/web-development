console.log('This is Promises');

// A Promise represents a value that isn't available yet but will be at some point.
// It has three possible states:
//   - pending   → still waiting (initial state)
//   - fulfilled → the async work succeeded (resolve was called)
//   - rejected  → the async work failed (reject was called)
//
// The executor function (resolve, reject) => {...} runs immediately when the Promise is created.
let prom1 = new Promise((resolve, reject) => {
    let a = Math.random();

    // Simulate a 50/50 chance of failure
    if (a < 0.5) {
        // reject() moves the Promise to the "rejected" state and passes a reason.
        // Execution of the executor stops here in this branch.
        reject("No random number was not supporting you")
    }
    else {
        // Simulating an async operation (e.g. a network request) with setTimeout.
        // resolve() moves the Promise to the "fulfilled" state and passes the result value.
        setTimeout(() => {
            console.log("Yes I am done")
            resolve("Harry") // success — "Harry" becomes the resolved value
        }, 3000);
    }
})

// .then() runs when the Promise is fulfilled — receives the resolved value
// .catch() runs when the Promise is rejected — receives the rejection reason
// These are chained so whichever outcome happens, the right handler fires.
// prom1.then((a) =>{
//     console.log(a) // prints "Harry" if resolved
// }).catch((err=>{
//     console.log(err) // prints the rejection message if rejected
// }))


// A second independent Promise, same pattern but resolves faster (1000ms vs 3000ms)
let prom2 = new Promise((resolve, reject) => {
    let a = Math.random();
    if (a < 0.5) {
        reject("No random number was not supporting you 2")
    }
    else {
        setTimeout(() => {
            console.log("Yes I am done 2")
            resolve("Harry 2") // resolves after 1 second
        }, 1000);
    }
})


// Promise.race() takes an array of Promises and returns a new Promise that
// settles (resolves OR rejects) as soon as the FIRST one settles — the others are ignored.
// Here prom2 resolves in 1s and prom1 in 3s, so p3 will follow prom2 (if both resolve).
// If prom2 rejects first, p3 rejects with prom2's reason instead.
let p3 = Promise.race([prom1, prom2])
p3.then((a)=>{
    console.log(a) // prints the value of whichever Promise won the race
}).catch(err=>{
    console.log(err) // prints the reason of whichever Promise rejected first
})


// Promise.all() waits for ALL promises to resolve, then gives you all results together.
// Think of it as "everything must succeed."
// If even ONE promise rejects, the whole thing immediately rejects — other results are discarded.
// Useful when you need all results before you can proceed (e.g. load user + settings + profile together).
let p4 = Promise.all([prom1, prom2])
p4.then((results) => {
    // results is an array in the same order as the input: [prom1result, prom2result]
    console.log(results) // e.g. ["Harry", "Harry 2"]
}).catch(err => {
    // fires as soon as any ONE promise rejects — you only get that one error, not the others
    console.log("One failed:", err)
})


// Promise.allSettled() also waits for ALL promises, but never rejects itself.
// It waits for every promise to finish (resolve or reject) and gives you a report on each one.
// Useful when you want to know the outcome of every promise regardless of success or failure.
let p5 = Promise.allSettled([prom1, prom2])
p5.then((results) => {
    // results is an array of objects — one per promise — each with a `status` field:
    //   { status: "fulfilled", value: "Harry" }   ← for resolved promises
    //   { status: "rejected",  reason: "No rand..." } ← for rejected promises
    results.forEach(result => {
        if (result.status === "fulfilled") {
            console.log("Succeeded:", result.value)
        } else {
            console.log("Failed:", result.reason)
        }
    })
})
