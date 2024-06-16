import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));

// app.use((req, res, next) => {
//   // console.log(req);
//   next();
// });

// app.use(morgan("tiny"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log(req.url);

  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", (req, res) => {
  // res.send("<h1>Your brand name is: </h1>");
  var street = req.body.street;
  var pet = req.body.pet;
  var str = street + pet;
  var htmlStr = "<h1>Your brand name is : <h1><h3>" + str + "😀" + " </h3>";
  res.send(htmlStr);
  // res.send("welcome, " + str);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
