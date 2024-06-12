`use strict`

const getMessage = require("./getMessage");

module.exports = async(query) =>{
    const asyncResponse = await getMessage(query);
    return{
        asyncResponse
    }
}