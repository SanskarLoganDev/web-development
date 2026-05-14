async function getData(){ // to use await this must be also an async function
    return new Promise((resolve, reject) =>{
        setTimeout(() => {
            resolve(455)
        }, 10000) // 3.5 seconds
    })
}
// if we add async for the function above and await when calling it, 
// it will run it in background and wait for it to complete and then continue to do further tasks
// instead of running the function in the background
// also await can only be used inside an async function

async function main(){ // await must be inside async function
    console.log("Loading modules")

    console.log("Do the tasks")

    console.log("Load Data")
    let data = await getData() // adding await

    console.log(data)

    console.log("process data")

    console.log("task 2")
}
// instead of using async and await, we could use the following "then" statement too, to continue further tasks after the funciotn is completed

// data.then((v)=>{
//     console.log(data)
//     console.log("process data")
//     console.log("task 2")
// })

// main()

// settle means resolve or reject
// resolve means promise has settled successfully
// reject means promise has not settled successfully

async function getData2(){
    let x = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    let data = await x.json()
    console.log(data)
    return data
}


async function getData3() {
    // Simulate getting data from a server
    // let x = await fetch('https://jsonplaceholder.typicode.com/todos/1')

    let x = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify({
                    title: 'foo',
                    body: 'bar',
                    userId: 1,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
    let data = await x.json() 
    return data
}

async function main2(){ // await must be inside async function
    console.log("Loading modules")

    console.log("Do the tasks")

    console.log("Load Data")
    let data = await getData3() // adding await

    console.log(data)

    console.log("process data")

    console.log("task 2")
}

main2()