const switchApp = () => {
  const searchFruktMenu = document.getElementById("menu_searchfrukt");
  const listFruktkorgarMenu = document.getElementById("menu_listfruktkorgar");

  switch (getPage()) {
    case PAGE_SEARCHFRUKT:
      searchFruktMenu.className = "active";
      listFruktkorgarMenu.className = "";
      loadSearchFrukt();
      break;
    case PAGE_LISTFRUKTKORG:
      searchFruktMenu.className = "";
      listFruktkorgarMenu.className = "active";
      loadListFruktkorgar();
      break
    default:
      loadStart()
  }
  // updateTitleForTjanst()
}