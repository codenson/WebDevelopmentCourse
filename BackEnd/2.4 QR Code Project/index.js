/* 
* The assingment description: 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
/**
 * My description :
 * Mini code to prompt the user for a  URL link and then generate a QR code image which gets saved in the current forlder.
 * Used the following code snippets from the following links:
 * https://www.npmjs.com/package/inquirer
 * https://www.npmjs.com/package/qr-image
 * Then pusrpose of this assigment is to practice using npm packages and using ESM (ECMAScript Module):
 */
/**
 * Prompt the user for URL imput.
 */
import input from "@inquirer/input";
/**
 * package to generate QR image.
 */
import qr from "qr-image";
/**
 * File system package.
 */
import fs from "fs";

/**
 * URL entered by the user.
 */
const URL = await input({ message: "Enter your name" });

/**
 * Generates the QR image.
 */
var qr_svg = qr.image(URL, { type: "png" });
/**
 * Saves the QR-image to the current folder.
 */
qr_svg.pipe(fs.createWriteStream(URL + ".png"));

fs.writeFile("userInput.txt", URL, (err) => {
  if (err) throw err;
  console.log("The file has been saved!");
});
