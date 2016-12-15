/* ******************************************

  Cross browser jump link fix
  Jump link fix for browsers that don't support
  focus change after clicking a jump link

******************************************* */

window.addEventListener('hashchange', function() {
  var el = document.getElementById(location.hash.substring(1));
  if (el) {
    if (!/^(?:a|select|input|button|textarea)$/i.test(el.tagName)) {
      el.tabIndex = -1;
    }
    el.focus();
  }
}, false);
