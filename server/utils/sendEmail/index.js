`use strict`
const sendEmail = require("./sendEmail")

module.exports = async(query) =>{
    const asyncResponse = await sendEmail(query)
    return {asyncResponse}
}