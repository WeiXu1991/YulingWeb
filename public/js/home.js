/* jshint esnext: true */
/* jslint browser: true */
/* global window document $ */
$(document).ready(($) => {
  const textChangeSpeed = 250;
  let selfIntroYOffset = $('.self-intro.container').offset().top;
  let navHeight = $('nav').outerHeight();
  const colorSet = ['#5808B6', '#FE336E'];
  let navPositionTop = -parseInt($('.navbar.fixed-top').css('top'), 10);
  let preYOffset = window.pageYOffset;

  $('.navbar-nav').addClass('hide-nav-links');

  $(window).scroll(() => {
    // if (window.pageYOffset + navHeight > selfIntroYOffset) {
    if (window.pageYOffset > navHeight) {
      $('.navbar-nav').removeClass('hide-nav-links');
    } else {
      $('.navbar-nav').addClass('hide-nav-links');
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

  $(window).resize(() => {
    selfIntroYOffset = $('.self-intro').offset().top;
    navHeight = $('nav').outerHeight();
  });

  function appendLetter(letter) {
    $('.txt-rotate .wrap').text($('.txt-rotate .wrap').text() + letter);
  }

  function removerLastLetter() {
    $('.txt-rotate .wrap').text($('.txt-rotate .wrap').text().substring(0, $('.txt-rotate .wrap').text().length - 1));
  }

  function changeTextColor(color) {
    $('.txt-rotate .wrap').css({
      color,
    });
  }

  function showNextLetter(textArray, index, letterIndex, mover) {
    const textString = textArray[index];
    if (letterIndex === 0 && mover === 1) {
      changeTextColor(colorSet[index]);
      appendLetter(textString[letterIndex]);
      window.setTimeout(() => {
        showNextLetter(textArray, index, letterIndex + 1, mover);
      }, textChangeSpeed);
    } else if (letterIndex === 0 && mover === -1) {
      removerLastLetter();
      if (index === textArray.length - 1) {
        window.setTimeout(() => {
          showNextLetter(textArray, 0, 0, 1);
        }, 4 * textChangeSpeed);
      } else {
        window.setTimeout(() => {
          showNextLetter(textArray, index + 1, 0, 1);
        }, 4 * textChangeSpeed);
      }
    } else if (letterIndex === textArray[index].length - 1 && mover === 1) {
      appendLetter(textString[letterIndex]);
      window.setTimeout(() => {
        showNextLetter(textArray, index, letterIndex, -1);
      }, 4 * textChangeSpeed);
    } else if (letterIndex === textArray[index].length - 1 && mover === -1) {
      removerLastLetter();
      window.setTimeout(() => {
        showNextLetter(textArray, index, letterIndex - 1, -1);
      }, textChangeSpeed / 2);
    } else if (mover === 1) {
      appendLetter(textString[letterIndex]);
      window.setTimeout(() => {
        showNextLetter(textArray, index, letterIndex + 1, mover);
      }, textChangeSpeed);
    } else if (mover === -1) {
      removerLastLetter();
      window.setTimeout(() => {
        showNextLetter(textArray, index, letterIndex - 1, -1);
      }, textChangeSpeed / 2);
    }
  }

  const textArray = ['Yuling Pan', 'a UX/UI designer'];
  if (textArray && textArray.length > 0) {
    showNextLetter(textArray, 0, 0, 1);
  }
});
