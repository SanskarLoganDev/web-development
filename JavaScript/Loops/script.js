// for loop
let a = 1
for (let i = 0; i<15; i++){
    console.log(a+i);
}

// for in loop
let obj = {
    name: "Logan",
    role: "Developer",
    website: "SanskarLoganDev"
}

for (const key in obj) {
    const element = obj[key];
    console.log(element) ;   
}

// for of loop
for (const c of "Logan") {
    console.log(c);
}

// while loop

let i =0
while (i<6) {
    console.log(i);
    i++;
}

// do while loop, runs at least once
let j = 10;
do {
    console.log(j)
    j++;
} while (j<6);