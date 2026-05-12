// Synchronous code runs line-by-line, top to bottom, blocking the next line until done
console.log("Harry is a hacker")
console.log("Rohan is a hecker")


// setTimeout is ASYNCHRONOUS — it schedules the callback to run after 2000ms,
// then immediately hands control back so the rest of the script keeps running.
// The callback (the arrow function) is what gets called when the timer expires.
setTimeout(() => {
    console.log("I am inside settimeout")
}, 2000);

// This prints BEFORE the setTimeout callback above, even though it comes after it in code,
// because setTimeout is non-blocking — JS doesn't wait for the timer.
console.log("The End")

// Even with a 0ms delay, this still runs AFTER all synchronous code finishes.
// The callback is placed in the event queue and only runs once the call stack is empty.
setTimeout(() => {
    console.log("I am inside settimeout 2")
}, 0);

// A simple function we'll pass as a callback later
const fn = () => {
  console.log("Nothing")
}

// This function accepts two arguments:
//   arg — a value to log
//   fn  — a CALLBACK: a function passed in to be called by this function
// Passing functions as arguments is the core idea behind callbacks.
const callback = (arg, fn) => {
    console.log(arg)
    fn() // invoke the callback that was passed in
}

// loadScript dynamically injects a <script> tag into the page.
// The callback pattern here ensures `callback` only runs AFTER the script loads —
// we can't know when the network request will finish, so we pass a function
// to be called whenever the browser fires the onload event.
const loadScript = (src, callback) => {
    let sc = document.createElement("script");
    sc.src = src; // here src is the script source
    sc.onload = callback("Harry", fn); // runs callback once script has loaded
    document.head.append(sc)
}

// Kick it off: load a CDN script, and when it's done, call `callback` with "Harry" and fn.
// This is the classic callback pattern — tell the async operation what to do when it finishes.
loadScript("https://cdnjs.cloudflare.com/ajax/libs/prism/9000.0.1/prism.min.js", callback)



// Here's what happens step by step inside loadScript:

// document.createElement("script") — creates a new <script> element in memory, but it's not in the page yet
// sc.src = src — sets the src attribute on it (the CDN URL)
// sc.onload = callback(...) — registers what to do when the script finishes loading
// document.head.append(sc) — this is the trigger: the moment you attach the element to the DOM, 
// the browser sees a <script> tag with a src and immediately starts fetching that URL from the network
// Without this line, the script element just sits in memory doing nothing — the browser never fetches or runs it. 
// Appending it to <head> is what kicks off the actual network request.