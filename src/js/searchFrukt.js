const loadSearchFrukt = () => {
  const xmlhttp = new XMLHttpRequest()
  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState === STATE_DONE) {
      glassOff()
      const contentDiv = document.getElementById('spar-content')
      contentDiv.innerHTML = loadPage('fragment/searchFrukt.html')

      if (xmlhttp.status === HTTP_OK) {
        const fruktTypes = JSON.parse(xmlhttp.responseText)
        const fruktTypeSelector = document.getElementById('frukt-type-selector')

        fruktTypes.forEach((type) => {
          const typeOption = document.createElement('option')
          typeOption.value = type
          typeOption.innerHTML = type
          fruktTypeSelector.appendChild(typeOption)
        })
        // visaFormularReklamsparrStatus();
      } else {
        // loggaOchVisaVarningTeknisktFel();
      }
    }
  };

  // visaSidaReklamsparrStatus();

  glassOn('Laddar...')
  // xmlhttp.open("GET", "rest/reklamsparr/status", true);
  xmlhttp.open('GET', 'rest/frukt/unique-types', true)
  xmlhttp.send()

  // const contentDiv = document.getElementById('spar-content')
  // contentDiv.innerHTML = loadPage('fragment/searchFrukt.html')
}