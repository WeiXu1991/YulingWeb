/* jshint esnext: true */
/* jslint browser: true */
/* global window document $ navigator */
$(document).ready(($) => {
  $('[data-toggle="tooltip"]').tooltip();
  // Use 2x image for retina display by default
  // change to 1x for low resolution screen.
  // if (window.devicePixelRatio && window.devicePixelRatio < 2) {
  //   const allImages = $('img');
  //   for (let i = 0; i < allImages.length; i += 1) {
  //     allImages[i].src = allImages[i].src.replace('@2x', '');
  //   }
  // }
  //   function showText(textArray, index) {
  //     const text = textArray[index];
  //   }

  // eslint-disable-next-line no-unused-vars

  $('#back-to-top-btn').click(() => {
    // const topPosition = $(window).scrollTop();
    // console.log(topPosition);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // window.scrollTo(0, topPosition - topPosition / 8);
    // $('html, body').animate({ scrollTop: topPosition }, 500);
    return false;
  });

  $('#email-nav').click((e) => {
    e.preventDefault();
  });
  $('#copy-email').click((e) => {
    e.preventDefault();
    navigator.permissions.query({ name: 'clipboard-write' }).then((result) => {
      if (result.state === 'granted' || result.state === 'prompt') {
        navigator.clipboard.writeText('ypandesign@gmail.com').then(() => {
          $('#email-copy-success').fadeIn(200).delay(2000).fadeOut(1000);
        }, (err) => {
          // eslint-disable-next-line no-console
          console.log(err);
        });
      }
    });
  });
  // let textArray = $('.txt-rotate').data('rotate');
  // console.log(textArray);


  // $(window).scroll(() => {
  //   const offsetTop = window.pageYOffset;
  //   if (offsetTop > 80) {
  //     console.log(80);
  //   }
  // });
});
