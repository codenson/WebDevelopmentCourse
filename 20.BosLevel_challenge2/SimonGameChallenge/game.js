/**
 * Game pattern is an array of strings that stores the color sequence picked by the system.
 */
var gamePattern = [];
/**
 * Starts the game and tracks the levels of the game.
 */
var level = -1;
/**
 * Helper int to fetch the correct color from the gamePattern sequence to compare with the user's choice.
 */
var checkCounter = 0;
/**
 * Tracks when a new round is started.
 */
var newRound = 0;
/**
 * The color choices of the buttons on the webpage.
 */
var buttonColours = ["red", "blue", "green", "yellow"];

/**
 *  Function to track keyboard presses to start the game.Then calls the system to choose a random color sequence.
 */
$(document).keypress(function () {
  if (level === -1) {
    nextSequence();
  }
});

/**
 * Button clicks listens for the user's entry choice,
 * then checks that entry against the correct sequence by calling checkPlay() func.
 */
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");

  //   userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);

  $("." + userChosenColour).addClass("pressed");
  setTimeout(function () {
    $("." + userChosenColour).removeClass("pressed");
  }, 100);

  checkPlay(userChosenColour);
});

/**
 * Function to check id user entries are correct,
 * otherwise the game is over and the user is notifies
 * and the game's attributes reset for a new game.
 * @param {*} colorChoice the color of the button clicked by the user.
 */

function checkPlay(colorChoice) {
  if (colorChoice !== gamePattern[checkCounter]) {
    animatePress2("body");

    $("#level-title").text("GAME OVER!! Press A Key to Start");
    gamePattern = [];
    playSound("wrong");
    level = -1;
    checkCounter = 0;
    newRound = 0;
  } else {
    if (newRound === gamePattern.length - 1) {
      nextSequence();
      newRound = 0;
      checkCounter = 0;
    } else {
      newRound++;
      checkCounter++;
    }
  }
}

/**
 * Function to play sound
 * @param {*} name of the sound to be played.
 */
function playSound(name) {
  var myAudio = new Audio("sounds/" + name + ".mp3");
  myAudio.play();
}

/**
 * Function to animate body red when a wrong sequenced button is clicked.
 * @param {*} currentColour  current user's color choice.
 */
function animatePress2(currentColour) {
  $(currentColour).addClass("game-over").show(1000);
  setTimeout(() => {
    $(currentColour).removeClass("game-over");
  }, "100");
}

/**
 * Animation function
 * @param {*} currentColour
 */
function animatePress(currentColour, className) {
  setTimeout(() => {
    $(currentColour).addClass(className).fadeOut(100).fadeIn(100);
    $(currentColour).removeClass(className);
  }, 500);
}
/**
 * Function to return a random number between 0 and 3 and picks a color
 * from buttonColours to be added in the sequence of the game.
 */
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);

  //color selected.
  var randomChosenColour = buttonColours[randomNumber];

  //adds the random color to the game pattern.
  gamePattern.push(randomChosenColour);

  animatePress("#" + randomChosenColour, ".pressed");

  level++;
  $("h1").text("level : " + level);
}
