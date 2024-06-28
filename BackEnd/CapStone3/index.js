import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";
// import alert from 'alert';


import { writeFileSync } from "fs";
/***These three lines of code set the current relative directory of the project */
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
const port = 5000;
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
const dirPath = path.join(__dirname, "jSon");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/newPost", (req, res) => {
  res.render("newPost.ejs");
});
app.get("/allPosts", (req, res) => {
  const files = parseJSon();
  res.render("list.ejs", { files });
});

app.get("/mainMenu", (req, res) => {
  res.render("index.ejs");
});

app.post("/delete", (req, res) => {
  //   const dirPath = path.join(__dirname, "jSon");
  const userName = req.body.userName.trim() + ".json";
  let filePath = path.join(dirPath, userName);
  //   let filePath = path.join(dirPath, `${req.body.userName}.json`);
  console.log("File path  : " + filePath);

  if (fs.existsSync(filePath)) {
    console.log("Delete");
    fs.unlinkSync(filePath);
  } else {
    console.log(`File ${filePath} does not exist`);
  }

  var files = parseJSon();
  res.render("list", { files });
});

app.post("/update", (req, res) => {
const path = `jSon/${req.body.userName}.json`;
// console.log("file Name : "+ path);

fs.readFile(path,'utf8',  (err, data) => {
  if (err) {
    console.log("ERROR! File does not exist "); 
   return; 
  }
  let obj = JSON.parse(data);
  obj.content =req.body.topic;  
  console.log("text : "+req.body.text );
   obj.text =req.body.content; 
  obj = JSON.stringify(obj);
  fs.writeFileSync(`jSon/${req.body.userName}.json`, obj,'utf8'); 

  // console.log("file was parsed and updated and added to the dir" + data);
});

let files  = parseJSon();
  res.render("list.ejs",{files});

});

function parseJSon() {
  const dir = "jSon";
  const files = fs.readdirSync(dir);
  const jsonDataArray = [];

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (path.extname(filePath) === ".json") {
      const fileData = fs.readFileSync(filePath, "utf8");
      const jsonData = JSON.parse(fileData);
      jsonDataArray.push(jsonData);
    }
  });

  return jsonDataArray;
}

app.post("/submit", (req, res) => {
  console.log("here");
  const data = {
    userName: req.body.userName,
    content: req.body.topic,
    text: req.body.content,
    available: true,
    comments : [],
  };
  const jsonData = JSON.stringify(data);
  const length = fs.readdirSync("jSon").length;
  console.log("length before : " + length);
  let currentUser = length + 1;
  //   let filePath = `jSon/user${currentUser}.json`;
  let filePath = `jSon/${req.body.userName}.json`;
  console.log(length);

  try {
    fs.writeFileSync(filePath, jsonData);
    console.log("JSON data saved to file successfully.");
  } catch (error) {
    console.error("Error writing JSON data to file:", error);
  }

  var files = parseJSon();

  res.render("list.ejs", { files });
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
