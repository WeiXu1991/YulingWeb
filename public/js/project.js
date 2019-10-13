/* jshint esnext: true */
/* jslint browser: true */
/* global window document $ navigator */
$(document).ready(($) => {
  const navHeight = $('nav').outerHeight();
  let navPositionTop = -parseInt($('.navbar.fixed-top').css('top'), 10);
  let preYOffset = window.pageYOffset;
  const backToTopBar = $('section.container-fluid')[2] ? $('section.container-fluid')[2].offsetTop : 1000;
  $(window).scroll(() => {
    if (window.pageYOffset > backToTopBar) {
      $('#back-to-top-btn').addClass('back-btn-show');
    } else {
      $('#back-to-top-btn').removeClass('back-btn-show');
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
  $('#nav-email-copy').click((e) => {
    e.preventDefault();
  });
  $('#nav-email-copy').click((e) => {
    e.preventDefault();
    navigator.permissions.query({ name: 'clipboard-write' }).then((result) => {
      if (result.state === 'granted' || result.state === 'prompt') {
        navigator.clipboard.writeText('ypandesign@gmail.com').then(() => {
          $('#nav-email-copy-success').fadeIn(200).delay(2000).fadeOut(1000);
        }, (err) => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
      }
    });
  });
});