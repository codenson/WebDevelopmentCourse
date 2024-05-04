for (var i = 0; i < buttonsTotal; i++) {
  document.querySelectorAll("button")[i].addEventListener("click", function () {
    var drumAlphaber = document.querySelectorAll(".drum");
    var temp = drumAlphaber[i].innerHTML;
    console.log(drumAlphaber);
    // alert("var : " + drumAlphaber);
    audio.play();
  });
}
