var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;  /*started : toggle to true once the game starts and if it's true,
then further key presses should not trigger nextSequence().*/
var level = 0;

//detect when a keyboard key has been pressed
$(document).keypress(function() {
  if (!started) {

    $("#level-title").text("Level" + level);
    nextSequence();
    started = true;
    
  }
});



// detect when any of the buttons are clicked and trigger a handler function
$(".btn").click(function() {

  var userChosenColour = $(this).attr("id"); // store the id of the button that got clicked
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

// Check the User's Answer Against the Game Sequence
function checkAnswer(currentLevel) {

// check if the most recent user answer is the same as the game pattern
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    // check that they have finished their sequence if the user got the most recent answer right
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
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

// Show the Sequence to the User with Animations and Sounds
function nextSequence() {

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4); //random number between 0 and 3
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}

// Add Animations to User Clicks
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  //Calls a function or executes a code snippet after specified delay.
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Play Audio
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Reset if the user gets the sequence wrong
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
