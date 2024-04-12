let buttonColours = ['red', 'blue', 'green', 'yellow'];

let gamePattern = [];

let userClickedPattern = [];

var started = false;

var level = 0;

$(document).keypress(function(){
    if (!started){

        $('h1').text('Level ' + level);

        nextSequence();
        started = true;
    }
});

$('.btn').click(function() {

    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

});


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log('success');
        if (userClickedPattern.length === gamePattern.length){

            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
    } else {
        var wrongSound = new Audio("sounds/wrong.mp3");
        wrongSound.play();
        $('body').addClass('game-over');
        $('h1').text('Game Over, Press Any Key to Restart')
        setTimeout(function () {
            $('body').removeClass('game-over');
          }, 200);
        console.log("wrong");
        startOver()
      }
}

function startOver(){
    gamePattern = []
    started = false;
    level = 0;
}

function nextSequence() {
    userClickedPattern = [];

    level++; 
    $('h1').text('Level ' + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber]
    
    gamePattern.push(randomChosenColour)

    $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColour)

};

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }


  
