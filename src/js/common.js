const STATE_DONE = 4

const HTTP_OK = 200

const PAGE_NONE = 0
const PAGE_SEARCHFRUKT = 1
const PAGE_LISTFRUKTKORG = 2

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

const showWarningTeknisktFel = () => {
  showWarning('Tekniskt fel', "Ett oförutsett fel har inträffat. Var god försök senare eller kontakta kundtjänst.")
}

const showWarning = (rubrik, text) => {
  var content_div = document.getElementById("spar-inner-content")
  content_div.innerHTML = "<p class='brodtextx'>\n"
    + "<div class='viktigtext'>\n"
    + "<h3><strong>" + rubrik + "</strong></h3>\n"
    + text
    + "</div>"
}