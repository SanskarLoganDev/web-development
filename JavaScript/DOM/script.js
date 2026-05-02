console.log("Hello world")

document.body.firstElementChild 
document.body.firstElementChild.childNodes 
document.body.firstElementChild.children
document.body.lastElementChild

// manipulating CSS

cont = document.body.childNodes[1]
cont.lastElementChild.style.color = "green"

// selects the element previous to the current element
document.body.firstElementChild.children[3].previousElementSibling