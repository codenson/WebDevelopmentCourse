import express from "express";

const app = express();
const port = 3000;

const birthday = new Date();
const day1 = birthday.getDay();

app.get("/", (req, res) => {
  var day = "Weekend";
  if (day1 === 0 || day === 6) {
    day = "Hey! it is the weekday! It is time to work hard!";
  } else {
    day = "Hey! it is the weekend! It is time to play hard!";
  }

  res.render("index.ejs", { dayOfTheWeek: day });
});

app.listen(port, () => {
  console.log("server is running on port" + port);
});
