/* ******************************************

  Basic Touch Device Check

******************************************* */

(function deviceCheck() {
  var supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints,
    html = document.getElementsByTagName('HTML')[0];

  // add appropriate classes for touch support
  if (supportsTouch) {
    html.classList.add('is-touch-device');
  } else {
    html.classList.add('not-touch-device');
  }
})();
