// document.querySelector("button").addEventListener("click", handleClick);

// document.querySelectorAll("button").forEach((button) => {
//   button.addEventListener("click", handleClick);
// });

// document.querySelectorAll("button").addEventListener[1]("click", function () {
//   alert("hey!");
// });

var buttonsTotal = document.querySelectorAll(".drum").length;

for (var i = 0; i < buttonsTotal; i++) {
  document.querySelectorAll("button")[i].addEventListener("click", function () {
    alert("Heya Clicked!");
  });
}
function handleClick() {
  alert("I got clicked!!");
}
