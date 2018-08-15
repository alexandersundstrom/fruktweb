let clickedRows = []

const loadListFruktkorgar = () => {
  const xmlhttp = new XMLHttpRequest()
  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState === STATE_DONE) {
      glassOff()
      const contentDiv = document.getElementById('spar-content')
      contentDiv.innerHTML = loadPage('fragment/listFruktkorgar.html')

      if (xmlhttp.status === HTTP_OK) {
        const fruktkorgar = JSON.parse(xmlhttp.responseText)
        renderFruktkorgar(fruktkorgar)
        clickedRows = []
      } else {
        showWarningTeknisktFel()
      }
    }
  };

  glassOn('Laddar...')
  xmlhttp.open('GET', 'rest/fruktkorg-list', true)
  xmlhttp.send()
}

const renderFruktkorgar = (fruktkorgar) => {
  const fruktkorgTable = document.getElementById('fruktTable')

  fruktkorgar.forEach((fruktkorg, index) => {
    const tableRow = document.createElement('tr')
    tableRow.onclick = handleRowClick(tableRow, index, fruktkorg.fruktList)
    tableRow.className = 'fruktTableRow'

    const fruktkorgNameCell = document.createElement('td')
    fruktkorgNameCell.innerHTML = fruktkorg.name
    fruktkorgNameCell.className = 'fruktTableCell'

    const fruktkorgFruktAmountCell = document.createElement('td')
    fruktkorgFruktAmountCell.innerHTML = fruktkorg.fruktList.reduce((amount, frukt) => {
      return amount + frukt.amount
    }, 0)
    fruktkorgFruktAmountCell.className = 'fruktTableCell'
    const fruktkorgDateCell = document.createElement('td')
    fruktkorgDateCell.innerHTML = fruktkorg.lastChanged
    fruktkorgDateCell.className = 'fruktTableCell italic'

    tableRow.appendChild(fruktkorgNameCell)
    tableRow.appendChild(fruktkorgFruktAmountCell)
    tableRow.appendChild(fruktkorgDateCell)

    fruktkorgTable.appendChild(tableRow)
  })
}

const handleRowClick = (tableRow, index, fruktList) => {
  return () => {
    const fruktkorgTable = document.getElementById('fruktTable')

    if (clickedRows.includes(index)) {
      fruktkorgTable.removeChild(tableRow.nextSibling)
      clickedRows.splice(clickedRows.indexOf(index), 1)
    } else {
      clickedRows.push(index)
      const fruktkorgDetailsRow = document.createElement('tr')

      const fruktCell = document.createElement('td')
      fruktCell.colSpan = '3'

      const fruktDiv = document.createElement('div')
      fruktDiv.className = 'fruktkorg-details'
      fruktList.forEach((frukt) => {
        const fruktSpan = document.createElement('span')
        fruktSpan.innerHTML = `${frukt.type}: ${frukt.amount}`
        fruktSpan.className = 'frukt-details'
        fruktDiv.appendChild(fruktSpan)
      })

      fruktCell.appendChild(fruktDiv)
      fruktkorgDetailsRow.appendChild(fruktCell)

      fruktkorgTable.insertBefore(fruktkorgDetailsRow, tableRow.nextSibling)
      setTimeout(() => fruktDiv.style.height = `${fruktList.length * 20}px`)
    }
  }
}