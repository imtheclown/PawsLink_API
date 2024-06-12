`use strict`

const Message = require("../../models").Message;
// used to create message
module.exports = async (query) =>{
    // creates a message
    const newMessage = await Message.create(query);
    // returns statuscode and message
    return {
        statusCode: 201,
        message: "message successfully sent"
    }
}