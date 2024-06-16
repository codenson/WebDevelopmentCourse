import express from "express";
import morgan from "morgan";
const app = express();
const port = 3000;
var counter = 0;

// app.use(
//   morgan(":method :url :status :res[content-length] - :response-time ms")
// );
app.use((req, res, next) => {
  console.log("req.url : " + req.url);
  next();
});

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

console.log("my  counter : " + counter);
