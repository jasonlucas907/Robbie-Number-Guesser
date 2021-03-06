

//******************   Global VARS   ***************************


//*****************  Event Listeners *************************

// create a random number and switch to game page(mute intro video)
$(".main-container").on("click", '.play-button', function() {
    guessButtonEval();
})


// enable clear and guess button on guess input
$('.main-container').on('input', '#the-guess-input', function() {
  enableGuessButton();
  enableClearButton();
})


// guess button submission run guess number against random number
$('.main-container').on('click', '.guess-button', function () {
  guessEvaluation();
  disableGuessButton();
  disableClearButton();
  defaultGuessInput();
})


// clear button: clear input field
$('.main-container').on('click','.clear-button', function() {
  disableGuessButton();
  disableClearButton();
  defaultGuessInput();
})


// reset button: switch to intro page
$('.main-container').on('click','.reset-button', function() {
  resetGame();
  defaultHighLowInput();
})


//*************** Functions   *******************************


// evaluates the users high & low entries for valid 1-100
function guessButtonEval()  {
  lowNumber = parseInt($('.low-number').val());
  highNumber = parseInt($('.high-number').val());
  console.log(lowNumber, highNumber)
  if(lowNumber > 0 && highNumber <= 100 && lowNumber < 100 && lowNumber < highNumber) {
    randomNumberCreator();
    playGame();
    disableGuessButton();
    disableClearButton();
  } else {
    theRules();
    defaultHighLowInput();
  }
}


// Displays the pop-up rules video for the input high/low fields if invalid
function theRules() {
  $('.intro-video').prop('muted', true);
  $(".main-container").append(`<section class='the-rules-box'>
    <video class='rules-video' poster="assests/wrong-input.m4v" id="intro-vid" playsinline autoplay>
      <source src="assests/wrong-input.m4v" type="video/webm">
      <source src="assests/wrong-input.m4v" type="video/mp4">
  </section>`);
  $('.the-rules-box').delay(7000).fadeOut(1000, function(){
  $('.the-rules-box').remove();
    });
  $('.rules-video').delay(6000).fadeIn(1000, function(){
  $('.rules-video').addClass('intro-video-exit');
    });
  $('.intro-video').delay(7000).fadeIn(1000, function(){
  $('.intro-video').prop('muted', false);
    });
}


// creates a random number based on the users low and high input range
function randomNumberCreator() {
  lowNumber = parseInt($('.low-number').val());
  highNumber = parseInt($('.high-number').val());
  randomNumber = Math.floor(Math.random() * (highNumber - lowNumber)) + lowNumber;
  console.log(randomNumber);
}


// creates a random number +10 higher based on the users low and high range
function randomNumberCreatorPLusTen() {
  lowNumber = parseInt($('.low-number').val());
  highNumber = parseInt($('.high-number').val())+10;
  console.log(lowNumber, highNumber)
  randomNumber = Math.floor(Math.random() * (highNumber - lowNumber)) + lowNumber;
  console.log(randomNumber);
  $('.high-number').val(highNumber);
}


// hides the intro page and switches to the game page
function playGame() {
$('.intro-container').delay(1000).fadeOut(2000);
$('.intro-video').prop('muted', true);
$(".main-container").append(`
<section class='guess-input-container'>
  <input class='guess-input' id='the-guess-input' type='number' name='theGuess' placeholder=' Enter your guess'>
  <br>
  <button class='guess-button' id='the-guess-button' type='button'>Guess</button>
  <button class='clear-button' id='the-clear-button' type='button' disabled='true'>Clear</button>
</section>
<section class='result-container'>
  <div class='last-guess-box'>
    <p class='last-guess-title' id='the-last-guess-title' >Your last guess was</p>
    <p class='last-guess-number' id='the-last-guess-number'>?</p>
    <p class='last-guess-hint' id='the-last-guess-hint' >Make a guess</p>
  </div>
  <div class='guess-video-box'>
    <div class='hint-video-container'>
      <video class='hint-video back-video' poster="assests/backdrop.m4v" playsinline autoplay loop>
        <source src="assests/backdrop.m4v" type="video/webm">
        <source src="assests/backdrop.m4v" type="video/mp4">
      </video>
    <div>
  </div>
</section>
<section class='reset-container'>
  <button class='reset-button' id='the-reset-button' type='button'>Reset</button>
</section>`);
}


// evaluate user guess against random number/ disable guess and clear button/
// reset guess input field/ runs robbie responses/ displays written hints
function guessEvaluation() {
  var guessValue = parseInt($('.guess-input').val());
  if(guessValue < lowNumber) {
    $('.last-guess-hint').text('Out of Range');
    $('.last-guess-number').text('NO');
    $('.last-guess-title').text('WTF Pay Attention!');
    outOfRangeVideo();
  } else if(guessValue > highNumber) {
    $('.last-guess-hint').text('Out of Range');
    $('.last-guess-number').text('NO');
    $('.last-guess-title').text('WTF Pay Attention!');
    outOfRangeVideo();
  } else if(guessValue === NaN) {
    $('.last-guess-hint').text('Out of Range');
    $('.last-guess-number').text('NO');
    $('.last-guess-title').text('WTF Pay Attention!');
    outOfRangeVideo();
  } else if(guessValue > randomNumber) {
    $('.last-guess-hint').text('That is too high!');
    $('.last-guess-number').text(guessValue);
    $('.last-guess-title').text('Your last guess was');
    randomResponse();
  } else if(guessValue < randomNumber) {
    $('.last-guess-hint').text('That is too low!');
    $('.last-guess-number').text(guessValue);
    $('.last-guess-title').text('Your last guess was');
    randomResponse();
  } else {
    $('.last-guess-hint').text('BOOM');
    $('.last-guess-number').text('YEP');
    $('.last-guess-title').text('OH SHIT!');
    winner();
    theIncreaseVideo();;
    resetGuessHint();
    randomNumberCreatorPLusTen();
    defaultGuessInput();
    disableClearButton();
    disableGuessButton();
    // autoResetGame();
  }
}


// generates a random video response to guess
function randomResponse() {
  var robbieResponses = [response1, response2, response3, response4, response5];
  var RobbieRandomResponse = robbieResponses[Math.floor(Math.random()*robbieResponses.length)]
  RobbieRandomResponse();
}


// robbie winner response video
function winner() {
$('.hint-video-container').remove();
$('.guess-video-box').append(`
  <div class='hint-video-container'>
    <video class='hint-video' poster="assests/winner.m4v" id="bgvid" playsinline autoplay>
      <source src="assests/winner.m4v" type="video/webm">
      <source src="assests/winner.m4v" type="video/mp4">
    </video>
  <div>`);
$('.hint-video-container').delay(8000).fadeOut(0, function() {
  $('.hint-video-container').remove();
  $('.guess-video-box').delay(0).fadeIn(0, function() {
    $('.guess-video-box').append(`
      <div class='hint-video-container'>
        <video class='hint-video' poster="assests/backdrop.m4v" id="bgvid" playsinline autoplay loop>
          <source src="assests/backdrop.m4v" type="video/webm">
          <source src="assests/backdrop.m4v" type="video/mp4">
        </video>
      <div>`);
  })
})
}


// Displays the rules video for the guess is out of range
function outOfRangeVideo() {
  $(".main-container").append(`<section class='the-rules-box'>
    <video class='rules-video' poster="assests/out-of-range.m4v" id="intro-vid" playsinline autoplay>
      <source src="assests/out-of-range.m4v" type="video/webm">
      <source src="assests/out-of-range.m4v" type="video/mp4">
  </section>`);
  $('.the-rules-box').delay(13000).fadeOut(1000, function(){
  $('.the-rules-box').remove();
    });
  $('.rules-video').delay(13000).fadeIn(1000, function(){
  $('.rules-video').addClass('intro-video-exit');
    });
}


// Displays the increase range video for winner
function theIncreaseVideo() {
  $('.main-container').delay(7000).fadeIn(1000, function(){
  $(".main-container").append(`<section class='the-rules-box'>
    <video class='rules-video' poster="assests/range increase.m4v" id="intro-vid" playsinline autoplay>
      <source src="assests/range increase.m4v" type="video/webm">
      <source src="assests/range increase.m4v" type="video/mp4">
  </section>`);
});
  $('.main-container').delay(6000).fadeIn(1000, function(){
  $('.rules-video').addClass('intro-video-exit');
    });
  $('.main-container').delay(4000).fadeIn(1000, function(){
  $('.the-rules-box').remove();
    });
  // resetGuessHint();
}


// reset the game to intro page
function resetGame() {
$('.guess-input-container').fadeOut(1000, function(){
$('.guess-input-container').remove();
  });
$('.result-container').fadeOut(1000, function(){
$('.result-container').remove();
  });
$('.reset-container').fadeOut(1000, function(){
$('.reset-container').remove();
  });
$('.intro-container').delay(1000).fadeIn(1000);
  $('.intro-video').prop('muted', false);
}


// resets the written guess hint responses to default
function resetGuessHint() {
  $('.main-container').fadeIn(1, function(){
  $('.last-guess-hint').text('Make a guess');
  $('.last-guess-number').text('?');
  $('.last-guess-title').text('Your last guess was');
  });
}


// clear the guess input field
function defaultGuessInput() {
  $('#the-guess-input').val('test')
}


// clear the high low input
function defaultHighLowInput() {
  $('#the-low-number').val('test')
  $('#the-high-number').val('test')
}


// disable clear button
function disableClearButton()  {
$('#the-clear-button').prop('disabled', true);
}


// enable clear button
function enableClearButton()  {
$('#the-clear-button').prop('disabled', false);
}


// disable guess button
function disableGuessButton()  {
$('#the-guess-button').prop('disabled', true);
}


// enable guess button
function enableGuessButton()  {
$('#the-guess-button').prop('disabled', false);
}


//*************** robbie random response videos var functions   *******************************


// robbie yesterday response video
var response1 = function yesterday() {
$('.hint-video-container').remove();
$('.guess-video-box').append(`
  <div class='hint-video-container'>
    <video class='hint-video' poster="assests/yesterday.m4v" id="bgvid" playsinline autoplay>
      <source src="assests/yesterday.m4v" type="video/webm">
      <source src="assests/yesterday.m4v" type="video/mp4">
    </video>
  <div>`);
$('.hint-video-container').delay(6000).fadeOut(0, function() {
  $('.hint-video-container').remove();
  $('.guess-video-box').delay(0).fadeIn(0, function() {
    $('.guess-video-box').append(`
      <div class='hint-video-container'>
        <video class='hint-video' poster="assests/backdrop.m4v" id="bgvid" playsinline autoplay loop>
          <source src="assests/backdrop.m4v" type="video/webm">
          <source src="assests/backdrop.m4v" type="video/mp4">
        </video>
      <div>`);
  })
})
}


// Van Halen response video
var response2 = function vanHalen() {
$('.hint-video-container').remove();
$('.guess-video-box').append(`
  <div class='hint-video-container'>
    <video class='hint-video' poster="assests/vanhalen.m4v" id="bgvid" playsinline autoplay>
      <source src="assests/vanhalen.m4v" type="video/webm">
      <source src="assests/vanhalen.m4v" type="video/mp4">
    </video>
  <div>`);
$('.hint-video-container').delay(6000).fadeOut(0, function() {
  $('.hint-video-container').remove();
  $('.guess-video-box').delay(0).fadeIn(0, function() {
    $('.guess-video-box').append(`
      <div class='hint-video-container'>
        <video class='hint-video' poster="assests/backdrop.m4v" id="bgvid" playsinline autoplay loop>
          <source src="assests/backdrop.m4v" type="video/webm">
          <source src="assests/backdrop.m4v" type="video/mp4">
        </video>
      <div>`);
  })
})
}


// pathetic response video
var response3 = function pathetic() {
$('.hint-video-container').remove();
$('.guess-video-box').append(`
  <div class='hint-video-container'>
    <video class='hint-video' poster="assests/pathetic.m4v" id="bgvid" playsinline autoplay>
      <source src="assests/pathetic.m4v" type="video/webm">
      <source src="assests/pathetic.m4v" type="video/mp4">
    </video>
  <div>`);
$('.hint-video-container').delay(6000).fadeOut(0, function() {
  $('.hint-video-container').remove();
  $('.guess-video-box').delay(0).fadeIn(0, function() {
    $('.guess-video-box').append(`
      <div class='hint-video-container'>
        <video class='hint-video' poster="assests/backdrop.m4v" id="bgvid" playsinline autoplay loop>
          <source src="assests/backdrop.m4v" type="video/webm">
          <source src="assests/backdrop.m4v" type="video/mp4">
        </video>
      <div>`);
  })
})
}


// moron response video
var response4 = function moron() {
$('.hint-video-container').remove();
$('.guess-video-box').append(`
  <div class='hint-video-container'>
    <video class='hint-video' poster="assests/moron.m4v" id="bgvid" playsinline autoplay>
      <source src="assests/moron.m4v" type="video/webm">
      <source src="assests/moron.m4v" type="video/mp4">
    </video>
  <div>`);
$('.hint-video-container').delay(6000).fadeOut(0, function() {
  $('.hint-video-container').remove();
  $('.guess-video-box').delay(0).fadeIn(0, function() {
    $('.guess-video-box').append(`
      <div class='hint-video-container'>
        <video class='hint-video' poster="assests/backdrop.m4v" id="bgvid" playsinline autoplay loop>
          <source src="assests/backdrop.m4v" type="video/webm">
          <source src="assests/backdrop.m4v" type="video/mp4">
        </video>
      <div>`);
  })
})
}


// body response video
var response5 = function body() {
$('.hint-video-container').remove();
$('.guess-video-box').append(`
  <div class='hint-video-container'>
    <video class='hint-video' poster="assests/body.m4v" id="bgvid" playsinline autoplay>
      <source src="assests/body.m4v" type="video/webm">
      <source src="assests/body.m4v" type="video/mp4">
    </video>
  <div>`);
$('.hint-video-container').delay(9000).fadeOut(0, function() {
  $('.hint-video-container').remove();
  $('.guess-video-box').delay(0).fadeIn(0, function() {
    $('.guess-video-box').append(`
      <div class='hint-video-container'>
        <video class='hint-video' poster="assests/backdrop.m4v" id="bgvid" playsinline autoplay loop>
          <source src="assests/backdrop.m4v" type="video/webm">
          <source src="assests/backdrop.m4v" type="video/mp4">
        </video>
      <div>`);
  })
})
}


//*****************  video tester read instructions *************************

//  the video tester(use this to make the guess button test run robbie response
//  videos.  disable the other guess button function first)

// $('.main-container').on('click', '.guess-button', function () {
//   console.log('vid swap button check')
//   $('.hint-video-container').remove();
//   console.log('video removed')
//   $('.guess-video-box').append(`
//     <div class='hint-video-container'>
//       <video class='hint-video' poster="assests/winner.m4v" id="bgvid" playsinline autoplay>
//         <source src="assests/winner.m4v" type="video/webm">
//         <source src="assests/winner.m4v" type="video/mp4">
//       </video>
//     <div>`);
//   console.log('video installed')
//   $('.hint-video-container').delay(8000).fadeOut(0, function() {
//     $('.hint-video-container').remove();
//     $('.guess-video-box').delay(0).fadeIn(0, function() {
//       $('.guess-video-box').append(`
//         <div class='hint-video-container'>
//           <video class='hint-video' poster="assests/backdrop.m4v" id="bgvid" playsinline autoplay loop>
//             <source src="assests/backdrop.m4v" type="video/webm">
//             <source src="assests/backdrop.m4v" type="video/mp4">
//           </video>
//         <div>`);
//     })
//   })
// })


//*****************  extra code *************************


// autoreset the game to intro page after winner
// function autoResetGame() {
// $('.guess-input-container').delay(10000).fadeOut(1000, function(){
// $('.guess-input-container').remove();
//   });
// $('.result-container').delay(10000).fadeOut(1000, function(){
// $('.result-container').remove();
//   });
// $('.reset-container').delay(10000).fadeOut(1000, function(){
// $('.reset-container').remove();
//   });
// $('.intro-container').delay(10000).fadeIn(1000, function(){
// $('.reset-container').remove();
//   $('.intro-video').prop('muted', false);
//   });
// }
