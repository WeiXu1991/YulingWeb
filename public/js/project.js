/* jshint esnext: true */
/* jslint browser: true */
/* global window document $ */
$(document).ready(($) => {
  const navHeight = $('nav').outerHeight();
  let navPositionTop = -parseInt($('.navbar.fixed-top').css('top'), 10);
  let preYOffset = window.pageYOffset;
  $(window).scroll(() => {
    if (window.pageYOffset > preYOffset) {
      if (navPositionTop < navHeight) {
        navPositionTop += window.pageYOffset - preYOffset;
        navPositionTop = navPositionTop > navHeight ? navHeight : navPositionTop;
      }
    } else if (window.pageYOffset < preYOffset) {
      if (navPositionTop > 0) {
        navPositionTop += window.pageYOffset - preYOffset;
        navPositionTop = navPositionTop > 0 ? navPositionTop : 0;
      }
    } else {
      preYOffset = window.pageYOffset;
      return;
    }
    $('.navbar.fixed-top').css({
      top: `${-navPositionTop}px`,
    });
    preYOffset = window.pageYOffset;
  });
});
