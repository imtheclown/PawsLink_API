`use strict`
const crypto = require("crypto");

// used for string based data preprocessing

// generates a 32 bit hex string (default)
const generateRandomImageName = (bytes = 32) =>{
    return crypto.randomBytes(bytes).toString('hex');
}

// generate a list from a new line seperated string
const seperateByNewLine = (multilineString) => {
    const lineList = multilineString.split('/n');
    return lineList
}
// generate a list from comma seperated string
const seperateByComma = (commaSeperatedString) =>{
    const wordList = commaSeperatedString.split(",");
    return wordList.map(removeFirstCharIfString);
}
// removes the space character at the start of string
const removeFirstCharIfString = (character) =>{
    if(character.charAt(0) === " "){
        return character.substring(1);
    }
    return character
}
module.exports = {generateRandomImageName, seperateByNewLine, seperateByComma, removeFirstCharIfString};