import express from "express";
import bodyParser from "body-parser";
import { renderFile } from "ejs";

const app = express();
const port = 3000;
var nameLength = 0;

app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  if (req.method === "POST") {
    let str1 = req.body.fName;
    let str2 = req.body.lName;
    var string = str1 + str2;
    console.log(string.length);
    nameLength = nameLength + string.length;
  }

  next();
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  console.log(nameLength);
  res.render("index.ejs", {
    numLetters: nameLength,
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
