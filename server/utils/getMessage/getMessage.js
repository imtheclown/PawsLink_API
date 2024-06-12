'use strict'

const Message = require("../../models").Message;

module.exports = async (query) =>{
    console.log(query);
    // recieverId
    const messageList = await Message.find(query);
    return{
        statusCode: 200,
        status: "OK",
        data: messageList
    }
}