const loadSearchFrukt = () => {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = () => {
    if (xmlhttp.readyState === STATE_DONE) {
      glassOff();
      const contentDiv = document.getElementById('spar-content');
      contentDiv.innerHTML = loadPage('fragment/searchFrukt.html');

      if (xmlhttp.status === HTTP_OK) {
        const fruktTypes = JSON.parse(xmlhttp.responseText);

        renderTypeOptions(fruktTypes)
      } else {
        showWarningTeknisktFel()
      }
    }
  };

  glassOn('Laddar...');
  xmlhttp.open('GET', 'rest/frukt/unique-types', true);
  xmlhttp.send()
};

const renderTypeOptions = (fruktTypes) => {
  const fruktTypeSelector = document.getElementById('frukt-type-selector');

  fruktTypes.forEach((type) => {
    const typeOption = document.createElement('option');
    typeOption.value = type;
    typeOption.innerHTML = type;
    fruktTypeSelector.appendChild(typeOption);
  })
};

const searchFrukt = () => {
  const selectedFrukt = document.getElementById('frukt-type-selector');

  if (selectedFrukt.value) {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState === STATE_DONE) {
        glassOff();

        if (xmlhttp.status === HTTP_OK) {
          let fruktkorgar = JSON.parse(xmlhttp.responseText);
          fruktkorgar = fruktkorgar.sort(sortFruktKorgar);

          const fruktkorgarDiv = document.getElementById('fruktkorg-container');
          fruktkorgarDiv.innerHTML = '';

          const header = document.createElement('h3');
          header.innerHTML = 'Resultat:';
          fruktkorgarDiv.appendChild(header);

          const fruktkorgList = document.createElement('ul');
          fruktkorgar.forEach((fruktkorg) => {
            const fruktKorgBullet = document.createElement('li');
            fruktkorg.fruktList.some((frukt) => {
                if (frukt.type === selectedFrukt.value) {
                  fruktKorgBullet.innerHTML = `${fruktkorg.name}: ${frukt.amount} st`;
                  return true;
                }
                return false;
              }
            );
            fruktkorgList.appendChild(fruktKorgBullet);
          });
          fruktkorgarDiv.appendChild(fruktkorgList);

        } else {
          showWarningTeknisktFel()
        }
      }
    };
    glassOn('Laddar...');
    xmlhttp.open('GET', 'rest/fruktkorg/search?fruktType=' + selectedFrukt.value, true);
    xmlhttp.send()  }
};