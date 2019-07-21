/* jshint esnext: true */
// eslint-disable-next-line no-undef
$(document).ready(($) => {
  const textChangeSpeed = 250;

  function appendLetter(letter) {
    $('.txt-rotate .wrap').text($('.txt-rotate .wrap').text() + letter);
  }

  function removerLastLetter() {
    $('.txt-rotate .wrap').text($('.txt-rotate .wrap').text().substring(0, $('.txt-rotate .wrap').text().length - 1));
  }

  //   function showText(textArray, index) {
  //     const text = textArray[index];
  //   }

  // eslint-disable-next-line no-unused-vars
  function showNextLetter(textArray, index, letterIndex, mover) {
    const textString = textArray[index];
    if (letterIndex === 0 && mover === 1) {
      appendLetter(textString[letterIndex]);
      window.setTimeout(() => { showNextLetter(textArray, index, letterIndex + 1, mover); }, textChangeSpeed);
    } else if (letterIndex === 0 && mover === -1) {
      removerLastLetter();
      if (index === textArray.length - 1) {
        window.setTimeout(() => { showNextLetter(textArray, 0, 0, 1); }, 4 * textChangeSpeed);
      } else {
        window.setTimeout(() => { showNextLetter(textArray, index + 1, 0, 1); }, 4 * textChangeSpeed);
      }
    } else if (letterIndex === textArray[index].length - 1 && mover === 1) {
      appendLetter(textString[letterIndex]);
      window.setTimeout(() => { showNextLetter(textArray, index, letterIndex, -1) ;}, 4 * textChangeSpeed);
    } else if (letterIndex === textArray[index].length - 1 && mover === -1) {
      removerLastLetter();
      window.setTimeout(() => { showNextLetter(textArray, index, letterIndex - 1, -1); }, textChangeSpeed / 2);
    } else if (mover === 1) {
      appendLetter(textString[letterIndex]);
      window.setTimeout(() => { showNextLetter(textArray, index, letterIndex + 1, mover); }, textChangeSpeed);
    } else if (mover === -1) {
      removerLastLetter();
      window.setTimeout(() => { showNextLetter(textArray, index, letterIndex - 1, -1) ;}, textChangeSpeed / 2);
    }
  }

  $('#email-nav').click((e) => {
    e.preventDefault();
  });
  $('#copy-email').click((e) => {
    e.preventDefault();
    navigator.permissions.query({name: "clipboard-write"}).then(result => {
      if (result.state == "granted" || result.state == "prompt") {
        navigator.clipboard.writeText("ypandesign@gmail.com").then(() => {
          $('#email-copy-success').fadeIn(200).delay(2000).fadeOut(1000);
        }, (err) => {
        // eslint-disable-next-line indent
        console.log(err);
          return;
        });
      }
    });
  });
  // let textArray = $('.txt-rotate').data('rotate');
  // console.log(textArray);
  const textArray = ['Yuling Pan', 'an UX/UI designer'];
  if (textArray && textArray.length > 0) {
    // showNextLetter(textArray, 0, 0, 1);
  }
});
