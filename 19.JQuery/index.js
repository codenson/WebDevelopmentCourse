$(document).ready(function () {
  $("h1").css("color", "blue");
});

$("h1").css("color", "red");

$("h1").addClass("big-title");

$("h1").text("New text");

// $("h1").css("font-size", "10pt");

$("button").text("Changed");

document.querySelector("h1").textContent = "changes";

$("button").html("button changed");

$("a").attr("href", "https://www.mguerouji.com/");

// click event Listneer to change h1 tag css color when clicked
$("h1").click(function () {
  $("h1").css("color", "orange");
});

$("button").click(function () {
  $("h1").css("color", "purple");
});

// loging input from html input
$("input").keypress(function (event) {
  console.log(event.key);
});

$(document).keypress(function (event) {
  $("h1").text(event.key);
});

//Changing text when the mouse is over using On method and eventListner
$("h1").on("mouseover", function () {
  $("h1").css("color", "green");
  document.querySelector("h1").innerHTML = "Mouse over";
  // document.querySelector("h1").style.color = "yellow";
});

// Hide annimation using the hide method
$("button").on("click", function () {
  // $("h1").hide(1000); // to hide the element. 1000 ms can be set are args for the duration of hidding.
  // $("h1").show(10000); // to make the element reappear.
  // $("h1").toggle(); // make an elment dissapear with the first click then reappear with the second.
  // $("h1").fadeOut(1000); // fade out the element.
  // $("h1").fadeIn(); // fade in the element.
  // $("h1").fadeToggle(1000); // fade in or out the element.
  // $("h1").slideUp(1000); // slide up the element.
  // $("h1").slideDown(1000); // slide down the element.
  // $("h1").slideToggle(1000); // slide up or down the element.
  $("h1").animate({ opacity: 0.5 });
});
