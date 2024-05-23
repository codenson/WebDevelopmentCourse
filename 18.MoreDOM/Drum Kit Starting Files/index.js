// document.querySelector("button").addEventListener("click", handleClick);

// document.querySelectorAll("button").forEach((button) => {
//   button.addEventListener("click", handleClick);
// });

// document.querySelectorAll("button").addEventListener[1]("click", function () {
//   alert("hey!");
// });

// document.addEventListener("keypress", function (event) {
//   console.log("event : " + event.key);
// });
var placeHolder = "";

var buttonsTotal = document.querySelectorAll(".drum").length;
var audio = new Audio("sounds/tom-1.mp3");

// for (var i = 0; i < buttonsTotal; i++) {
//   document.querySelectorAll("button")[i].addEventListener("click", function () {
//     // var drumAlphaber = document.querySelectorAll(".drum");
//     this.style.color = "white";
//     var drumAlphaber = this.innerHTML;
//     placeHolder = this;
//     switch (this.textContent) {
//       case "w":
//         drumAlphaber = "tom-1";
//         break;
//       case "a":
//         drumAlphaber = "tom-2";
//         break;
//       case "s":
//         drumAlphaber = "tom-3";
//         break;
//       case "d":
//         drumAlphaber = "tom-4";
//         break;
//       case "j":
//         drumAlphaber = "snare";
//         break;
//       case "k":
//         drumAlphaber = "crash";
//         break;
//       case "l":
//         drumAlphaber = "kick-bass";
//       default:
//     }

//     // console.log("var : " + drumAlphaber);
//     audio.src = "./sounds/" + drumAlphaber + ".mp3";
//     audio.play();
//   });
// }

function handleClick() {
  alert("I got clicked!!");
}
document.addEventListener("keypress", function (event) {
  console.log("key pressed : " + event.key);
  checkKey(event.key);
});

function checkKey(key) {
  console.log("myKey : " + key);
  var drumAlphaber = "";
  switch (key) {
    case "w":
      drumAlphaber = "tom-1";
      break;
    case "a":
      drumAlphaber = "tom-2";
      break;
    case "s":
      drumAlphaber = "tom-3";
      break;
    case "d":
      drumAlphaber = "tom-4";
      break;
    case "j":
      drumAlphaber = "snare";
      break;
    case "k":
      drumAlphaber = "crash";
      break;
    case "l":
      drumAlphaber = "kick-bass";
      animation(key);
      break;
    default:
  }
  audio.src = "./sounds/" + drumAlphaber + ".mp3";
  audio.play();
}

function animation(keyVal) {
  var tempKey = "." + keyVal;
  var temp = document.querySelector(tempKey).classList.add("pressed");
}
