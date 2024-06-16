import express from "express";
import morgan from "morgan";

const app = express();
const port = 3000;

// app.use((req, res, next) => {
//   console.log(req.url);
//   console.log(req.method);
//   next();
// });
// created a func to process parse requests
function logger(req, res, next) {
  console.log(req.url);
  console.log(req.method);
  next();
}
app.use(logger);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
