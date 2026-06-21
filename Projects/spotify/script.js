console.log("Javascript time!!");  // Logs a message to the browser console to confirm the script has loaded

// Declares an async function so we can use 'await' to pause and wait for network responses
async function getSongs() {
  // Sends an HTTP GET request to the local server's songs folder and waits for the response
  let a = await fetch("http://127.0.0.1:5500/Projects/spotify/songs/");

  // Reads the response body as plain text (this will be the HTML of the folder listing) and waits for it
  let response = await a.text();

  // Logs the raw HTML text of the songs folder to the console so you can inspect it
  console.log(response)

  // Creates a temporary <div> element in memory (not added to the page) to parse the HTML
  let div = document.createElement("div")

  // Puts the folder-listing HTML into the div so we can search through it like a real DOM, currently it is just in plain text format
  div.innerHTML = response;

  // Grabs all <a> (anchor/link) elements from inside the div — these are the file links in the folder listing
  let as = div.getElementsByTagName('a')

  // Creates an empty array to collect the URLs of valid song files
  let songs = []

  // Loops through every link found in the folder listing
  for (let index = 0; index < as.length; index++){
    const element = as[index]  // Gets the current link element

    // Checks if the link points to an .mp3 or .mpeg audio file (ignores other links like parent-folder links)
    if (element.href.endsWith(".mp3") || element.href.endsWith(".mpeg")){
      songs.push(element.href)  // Adds the song's full URL to the songs array
    }
  }

  // Logs the final list of song URLs to the console so you can verify they were found correctly
  console.log(songs)

  // Returns the songs array so callers can use it
  return songs
}

getSongs()

async function main(){
  // get the list of all the songs — must await because getSongs() is async
  let songs = await getSongs()
  console.log(songs)

  // play the first audio
  var audio = new Audio(songs[1]);
  audio.play()

  audio.addEventListener("loadeddata", () => {
    let duration = audio.duration;
    console.log(duration)
    // The duration variable now holds the duration in seconds of the audio clip
  });
}

main() 