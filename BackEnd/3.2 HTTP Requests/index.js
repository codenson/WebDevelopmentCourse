import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.get("/", (req, res) => {
  //   console.log(req.rawHeaders);
  //   res.send("Hello World!\n");
  res.send("<h1>Hello World !!</h1>");
});
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.get("/me", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
