const STATE_DONE = 4;

var PAGE_NONE = 0;
var PAGE_SEARCHFRUKT = 1;
var PAGE_LISTFRUKTKORG = 2;

let concurrentGlassOnCount = 0

const glassOn = (text) => {
  ++concurrentGlassOnCount

  const loadingBackground = document.getElementById("laddar_bakgrund")
  const loadingText = document.getElementById("laddar_text")

  loadingText.innerHTML = text

  loadingBackground.style.visibility = "visible"
  loadingText.style.visibility = "visible"
}

const glassOff = (text) => {
  if (--concurrentGlassOnCount === 0) {
    const loadingBackground = document.getElementById("laddar_bakgrund")
    const loadingText = document.getElementById("laddar_text")

    loadingBackground.style.visibility = "hidden"
    loadingText.style.visibility = "hidden"
  }
}

const loadPage = (href) => {
  const xmlhttp = new XMLHttpRequest()
  xmlhttp.open("GET", href, false)
  xmlhttp.send()
  return xmlhttp.responseText
}

const getPage = () => {
  switch (location.hash) {
    case "#searchFrukt":
      return PAGE_SEARCHFRUKT
    case "#listFruktkorgar":
      return PAGE_LISTFRUKTKORG
    default:
      return PAGE_NONE
  }
}