class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
    this.wins = 0;
  }
  getScore() {
    return this.score;
  }
  updateScore(points) {
    this.score += points;
  }
  getWins() {
    return this.wins;
  }
  updateWins() {
    this.wins += 1;
  }
}
let p1 = new Player("P1");
let p2 = new Player("P2");

function rollDice() {
  var andomNumber1 = Math.floor(Math.random() * 6 + 1);
  image1 = "./images/dice" + andomNumber1 + ".png";

  // document.querySelector(" img.img1").src = andomNumber1;

  document.querySelector("img.img1").setAttribute("src", image1);

  var andomNumber2 = Math.floor(Math.random() * 6 + 1);
  image2 = "./images/dice" + andomNumber2 + ".png";

  document.querySelector("img.img2").setAttribute("src", image2);

  if (andomNumber1 > andomNumber2) {
    document.querySelector("h1").textContent = "Player 1 wins";
    p1.updateWins();
  } else if (andomNumber1 < andomNumber2) {
    document.querySelector("h1").textContent = "Player 2 wins";
    p2.updateWins();
  } else {
    document.querySelector("h1").textContent = "It is a tie";
  }
  p1.updateScore(andomNumber1);
  p2.updateScore(andomNumber2);

  document.querySelectorAll("p.wins")[0].textContent = "Wins: " + p1.wins;
  document.querySelectorAll("p.wins")[1].textContent = "Wins: " + p2.wins;
  //   document.querySelectorAll("totalPoints")[0].textContent =
  //     "TotalPoints: " + p1.getScore();
  document.querySelectorAll("p.totalPoints")[0].textContent =
    "Points: " + p1.getScore();
  document.querySelectorAll("p.totalPoints")[1].textContent =
    "Points: " + p2.getScore();
}
