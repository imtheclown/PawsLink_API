`use strict`

const createMessage = require("./createMessage");

module.exports = async(query) =>{
    const asyncReponse = await createMessage(query);

    return{
        asyncReponse
    }
}