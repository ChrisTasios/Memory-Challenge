
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClicked = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosen = $(this).attr("id");
  userClicked.push(userChosen);

  playSound(userChosen);
  animatePress(userChosen);

  checkAnswer(userClicked.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClicked[currentLevel]) {
      if (userClicked.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


function nextSequence() {
  userClicked = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random()* 4);
  var randomColor = buttonColors[randomNumber];
  gamePattern.push(randomColor);

  $("#" + randomColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomColor);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
