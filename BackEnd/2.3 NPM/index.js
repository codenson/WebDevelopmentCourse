import generateName from "sillyname";

import superheroes from "superheroes";

console.log("My name is" + generateName());
var ran = Math.floor(Math.random() * superheroes.length);

console.log("my superhero name is : " + superheroes[ran]);
