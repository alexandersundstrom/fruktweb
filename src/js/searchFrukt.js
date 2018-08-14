const loadSearchFrukt = () => {
  const xmlhttp = new XMLHttpRequest()
  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState === STATE_DONE) {
      glassOff()
      const contentDiv = document.getElementById('spar-content')
      contentDiv.innerHTML = loadPage('fragment/searchFrukt.html')

      if (xmlhttp.status === HTTP_OK) {
        const fruktTypes = JSON.parse(xmlhttp.responseText)

        renderTypeOptions(fruktTypes)
      } else {
        showWarningTeknisktFel()
      }
    }
  };

  glassOn('Laddar...')
  xmlhttp.open('GET', 'rest/frukt/unique-types', true)
  xmlhttp.send()
}

const renderTypeOptions = (fruktTypes) => {
  const fruktTypeSelector = document.getElementById('frukt-type-selector')

  fruktTypes.forEach((type) => {
    const typeOption = document.createElement('option')
    typeOption.value = type
    typeOption.innerHTML = type
    fruktTypeSelector.appendChild(typeOption)
  })
}