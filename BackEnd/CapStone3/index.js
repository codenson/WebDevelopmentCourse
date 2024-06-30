import express from "express";
// import bodyParser, { json } from "body-parser";
import bodyParser from 'body-parser';
import fs from "fs";
import path from "path";
// import alert from 'alert';


import { writeFileSync } from "fs";
/***These three lines of code set the current relative directory of the project */
import { dirname } from "path";
import { fileURLToPath } from "url";
import { render } from "ejs";
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

  const length = fs.readdirSync("jSon").length;
  let currentUser = length + 1;
  //  let filePath = `jSon/${req.body.userName}.json`;
  
  writeFiles(`jSon/${req.body.userName}.json`,data ); 
  let topicPath  = `topic/${req.body.userName}.json`; 

  if (!fs.existsSync(topicPath)){
    documentTopics(req.body.topic , req.body.userName);
  }else {
    fs.readFile(topicPath,'utf8',  (err, topicData) => {
      if (err) {
         console.log("ERROR! File does not exist "); 
         return; 
         }
          let obj = JSON.parse(topicData);
          obj.nameOfUser.push(req.body.userName); 
           obj = JSON.stringify(obj);
           writeFiles(topicPath, obj); 
           fs.writeFileSync(`jSon/${req.body.userName}.json`, obj,'utf8'); 
        }); 

  }

  var files = parseJSon();

  res.render("list.ejs", { files });
});
/**
 * helper funcition to write files into directories. 
 * @param {h} filePath 
 * @param {*} data 
 */
function writeFiles(filePath,data ){
  const jsonData = JSON.stringify(data);

  try {
    fs.writeFileSync(filePath, jsonData);
    console.log("JSON data saved to file successfully.");
  } catch (error) {
    console.error("Error writing JSON data to file:", error);
  }
}
/**create a new docuent to user's comments on topic */
function documentTopics(userTopic , userName){
  const data ={
    topic : userTopic, 
    nameOfUser : [], 
  }; 
  data.nameOfUser.push(userName);
  let filePath = `topics/${userTopic}.json`;

  writeFiles(filePath, data ); 
}
app.get("/postsByTopic", (req, res)=>{
  let dir = "topics"; 
  // let length = fs.readdirSync(path);
  var files = parseJSon2(dir);
  res.render("postsByTopic.ejs", {files}); 
});
function parseJSon2(dir) {
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

app.get("/commentPages", (req, res)=>{

  const currentTopic = req.query.topic; // Access the 'topic' from the query parameter
    console.log('Received topic:', currentTopic);

  let dir  = "topics";
    const length = fs.readdirSync("topics").length;
    var f = `topics/${currentTopic}.json`; 
    console.log("file Name : "+ f);

  var myData  = fs.readFileSync(`topics/${currentTopic}.json`);
  myData = JSON.parse(myData);
  console.log(myData.nameOfUser);

  var users = []; 
  for (var i  = 0; i < myData.nameOfUser.length; i++){
    let fileName  = `jSon/${myData.nameOfUser[i]}.json`;
    if (fs.existsSync(fileName)){
       const fileData = fs.readFileSync(fileName, "utf8");
      const jsonData = JSON.parse(fileData);
      users.push(jsonData);
    }
   


  }




// res.sendFile(temp); 
 res.render("commentPage", {users});



});

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
