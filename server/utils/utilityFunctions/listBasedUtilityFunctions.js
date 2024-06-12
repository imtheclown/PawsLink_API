`use strict`
// for list based data preprocessing

// generates a list from newline seperated string
const generateListFromNewLine = (stringInput) => {
    const linesArray = stringInput.split('\n');
    return linesArray;
}

module.exports ={generateListFromNewLine}