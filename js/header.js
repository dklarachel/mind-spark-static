var lastKnownScrollY = 0
var currentScrollY = 0
var ticking = false
var idOfHeader = "header"
var eleHeader = null
const classes = {
  pinned: "header-pin",
  unpinned: "header-unpin",
}


function onScroll() {
  currentScrollY = window.pageYOffset;
  if (currentScrollY > lastKnownScrollY) {
    unpin()
  } else if (currentScrollY < lastKnownScrollY) {
    pin()
  }
  lastKnownScrollY = currentScrollY
}
function pin() {
  if (eleHeader.classList.contains(classes.unpinned)) {
    eleHeader.classList.remove(classes.unpinned)
    eleHeader.classList.add(classes.pinned) 
    eleHeader.style.top = '0';
  }
}
function unpin() {
  if (
    eleHeader.classList.contains(classes.pinned) ||
    !eleHeader.classList.contains(classes.unpinned)
  ) {
    eleHeader.classList.remove(classes.pinned)
    eleHeader.classList.add(classes.unpinned)
    eleHeader.style.top = '-7.5em';
  }
}
/*
window.onload = function() {
  eleHeader = document.getElementById(idOfHeader)
  console.log('hi');
  document.addEventListener("scroll", onScroll, false)
}*/

function checkScroll () {
  eleHeader = document.getElementById(idOfHeader)
  document.addEventListener("scroll", onScroll, false)
}

window.addEventListener("load", checkScroll, false); 



