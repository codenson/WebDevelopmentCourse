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
  var topicToDeleteFrom = req.body.topic.trim() + ".json";
  var userNameToDeleteFrom = req.body.userName; 
  var textToDelete = req.body.content; 

  var currThread = ""; 

   
  if (fs.existsSync(`threads/${req.body.threadId}.json`)){
    currThread = JSON.parse(fs.readFileSync(`threads/${req.body.threadId}.json`)); 

    fs.unlinkSync(`threads/${req.body.threadId}.json`);
    // console.log(currThread.topic);
    
    let currTopic = JSON.parse(fs.readFileSync(`topics/${currThread.topic}.json`));
    var index = currTopic.threadsNumber.findIndex(item => item === Number(req.body.threadId) );
    if (index !== -1) {
      currTopic.threadsNumber.splice(index, 1);
    }
    fs.writeFileSync(`topics/${currTopic.topic}.json`,JSON.stringify(currTopic),'utf8'); 

    let currUser = JSON.parse(fs.readFileSync(`users/${req.body.userName}.json`));
     index = currUser.activity.findIndex(item => item === Number(req.body.threadId) );
    if (index !== -1) {
      currUser.activity.splice(index, 1);
    }
    fs.writeFileSync(`users/${currUser.userName}.json`,JSON.stringify(currUser),'utf8');
      var files = parseJSon();
  res.render("list", { files });
//////////////////////////////////////////////////////////////////////////////////////////////////////////////

  //     var currentUser  = JSON.parse(fs.readFileSync(`users/${req.body.userName}.json`));
  //     const threadId = Number(req.body.threadId);


  //      var index = currentUser.activity.findIndex(item2 => item2 === threadId);
  //     // var temp =  currentUser.activity.findIndex(req.body.threadId);

  //     var arr = currentUser.activity; 
  //    const val  = (element) => element === threadId ;

  //    console.log("Data : " + arr + " looing for : "+ threadId);

  //     console.log("index : "+( arr.findIndex(val)));
      
  //   if (index !== -1) {
  //     currentUser.activity.splice(index, 1);
  //   }
  //   console.log(currentUser.activity); 
  //   fs.writeFileSync(`users/${currentUser.userName}.json`, JSON.stringify(currentUser),'utf8'); 

  // var files = parseJSon();
  // res.render("list", { files });
  // return ; 

  }
  else {
      res.render("newPost");

  }


  

   
  

  // let filePath = path.join(dirPath, userName);
  // //   let filePath = path.join(dirPath, `${req.body.userName}.json`);
  // console.log("File path  : " + filePath);

  // if (fs.existsSync(filePath)) {
  //   console.log("Delete");
  //   fs.unlinkSync(filePath);
  // } else {
  //   console.log(`File ${filePath} does not exist`);
  // }

  // var files = parseJSon();
  // res.render("list", { files });
});

app.post("/update", (req, res) => {
const path = `threads/${req.body.threadId}.json`;
// console.log("file Name : "+ path);
if (fs.existsSync(path)){
  var currThread = JSON.parse(fs.readFileSync(path)); 
   currThread.text= req.body.content; 
  // let currThread  = JSON.parse(fs.readFileSync(path)).content; 
  fs.writeFileSync(path, JSON.stringify(currThread), 'utf-8' );


}

// fs.readFile(path,'utf8',  (err, data) => {
//   if (err) {
//     console.log("ERROR! File does not exist "); 
//    return; 
//   }
//   let obj = JSON.parse(data);
//   obj.content =req.body.topic;  
//   console.log("text : "+req.body.text );
//    obj.text =req.body.content; 
//   obj = JSON.stringify(obj);
//   fs.writeFileSync(`jSon/${req.body.userName}.json`, obj,'utf8'); 

//   // console.log("file was parsed and updated and added to the dir" + data);
// });

let files  = parseJSon();
  res.render("list.ejs",{files});

});



// app.post("/update", (req, res) => {
// const path = `jSon/${req.body.userName}.json`;
// // console.log("file Name : "+ path);

// fs.readFile(path,'utf8',  (err, data) => {
//   if (err) {
//     console.log("ERROR! File does not exist "); 
//    return; 
//   }
//   let obj = JSON.parse(data);
//   obj.content =req.body.topic;  
//   console.log("text : "+req.body.text );
//    obj.text =req.body.content; 
//   obj = JSON.stringify(obj);
//   fs.writeFileSync(`jSon/${req.body.userName}.json`, obj,'utf8'); 

//   // console.log("file was parsed and updated and added to the dir" + data);
// });

// let files  = parseJSon();
//   res.render("list.ejs",{files});

// });

function parseJSon() {
  const dir = "threads";
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
  // const data = {
  //   userName: req.body.userName,
  //   content: req.body.topic,
  //   text: req.body.content,
  //   available: true,
  //   comments : [],
  //   activity : [], 
  // };
  var userData = {}; 

  var threadRandomId = Math.floor(Math.random() * 100000);

  while (fs.existsSync(`threads/${threadRandomId}.json`)){
    threadRandomId = Math.floor(Math.random() * 100000);

  }
  

  const thread  = {
    userName : req.body.userName, 
    threadId: threadRandomId,
    topic : req.body.topic,
    text: req.body.content,
    comments : [],

  }; 

  if (fs.existsSync(`users/${req.body.userName}.json`)){

    userData = JSON.parse( fs.readFileSync(`users/${req.body.userName}.json`)); 

  }
  else {
       userData = {
    userName: req.body.userName,
    content: req.body.topic,
    text: req.body.content,
    available: true,
    comments : [],
    activity : [], 
  };
  }  
  userData.activity.push(threadRandomId); 
  fs.writeFileSync(`users/${thread.userName}.json`, JSON.stringify(userData), 'utf8'); 
  fs.writeFileSync(`threads/${threadRandomId}.json`, JSON.stringify(thread), 'utf8'); 


  let topicPath  = `topics/${req.body.topic}.json`; 
  console.log(topicPath);

  if (!fs.existsSync(`topics/${req.body.topic}.json`)){
    documentTopics(req.body.topic , threadRandomId);
  }else {
    var topicData = JSON.parse(fs.readFileSync(topicPath));
    topicData.threadsNumber.push(threadRandomId);
     fs.writeFileSync(topicPath, JSON.stringify(topicData),'utf8'); 

  }

  var files = parseJSon();

  res.render("list.ejs", { files });
});
/**
 * helper function to write files into directories. 
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
function documentTopics(userTopic , threadID){
  const data ={
    topic : userTopic, 
    threadsNumber : [], 
  }; 
  data.threadsNumber.push(threadID);
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
  console.log(myData.threadsNumber.length);

  var users = []; 
  for (var i  = 0; i < myData.threadsNumber.length; i++){
    let fileName  = `threads/${myData.threadsNumber[i]}.json`;
    if (fs.existsSync(fileName)){
       const fileData = fs.readFileSync(fileName, "utf8");
      const jsonData = JSON.parse(fileData);
      users.push(jsonData);
    }
  }
 res.render("commentPage", {users,currentTopic });



});

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
