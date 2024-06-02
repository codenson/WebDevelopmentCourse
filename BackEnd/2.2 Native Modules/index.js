const fs = require("fs");
var str = "Hello Node, Hello World";

const { exit } = require("process");

fs.writeFile("myFile.txt", str, (err) => {
  if (err) throw err;
  console.log("The file was saved successfully");
});

var fileText = "";
fs.readFile("message.txt", "utf8", (err, data) => {
  if (err) throw err;
  fileText = data;
  //   console.log(data);
  console.log("myfile " + fileText);
});
