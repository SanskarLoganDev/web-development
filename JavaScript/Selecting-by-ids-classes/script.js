console.log("Harry")

// let boxes = document.getElementsByClassName("box")
// console.log(boxes)

// boxes[2].style.backgroundColor = "red"

// document.getElementById("redbox").style.backgroundColor = "red"

// document.querySelector(".box").style.backgroundColor = "green"; // will turn only the first box green
console.log(document.querySelectorAll(".box")) // this will return html collection and therefore .style.backgroundColor will not work directly on it
// will have to use for loop for this

// for each loop used here, can use any kind of for loop
document.querySelectorAll(".box").forEach(e =>{
    e.style.backgroundColor = "green";
}) 