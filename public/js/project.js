/* jshint esnext: true */
/* jslint browser: true */
/* global window document $ navigator */
$(document).ready(($) => {
  const navHeight = $('nav').outerHeight();
  let navPositionTop = -parseInt($('.navbar.fixed-top').css('top'), 10);
  let preYOffset = window.pageYOffset;
  const greetingHeight = $('#greeting-bg').height();
  const backToTopBar = $('section.container-fluid')[2] ? $('section.container-fluid')[2].offsetTop : 1000;
  $(window).scroll(() => {
    if (window.pageYOffset > backToTopBar) {
      $('#back-to-top-btn').addClass('back-btn-show');
    } else {
      $('#back-to-top-btn').removeClass('back-btn-show');
    }
    if (window.pageYOffset > greetingHeight) {
      $('#email-icon, #reseum-icon, #linkedin-icon').addClass('show-pp');
    } else {
      $('#email-icon, #reseum-icon, #linkedin-icon').removeClass('show-pp');
    }
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
