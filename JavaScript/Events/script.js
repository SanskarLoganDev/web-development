let btn = document.getElementById("btn")

btn.addEventListener("click", ()=>{ // could also use dblclick
    // alert("I was clicked!")

    // List of all mouse events 
    // https://developer.mozilla.org/en-US/docs/Web/API/Element#mouse_events

    // the following command will change the content currently inside HTML of class box
    document.querySelector(".box").innerHTML = "<b> Yay you were clicked </b> Enjoy your click"
})

btn.addEventListener("contextmenu", ()=>{
    alert("Did you press right click? I am listening ;)")
})

document.addEventListener("keydown", (e)=>{
    console.log(e, e.key, e.keyCode)
})


// different ways

// Inline arrow function (what you're doing)
btn.addEventListener("click", () => {
    alert("clicked!")
})

// Named function passed in — exactly the same behaviour
function handleClick() {
    alert("clicked!")
}
btn.addEventListener("click", handleClick)  // notice: no () here