'use strict'

const SignUp = require("./signUp");
module.exports = async (query) =>{
    const asyncResponse = await SignUp(query)
    // return has an asyncResponse key
    // keys: message, statusCode, status
    return {asyncResponse}
}