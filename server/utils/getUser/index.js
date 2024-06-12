`use strict`

const getUser = require("./getUser");

module.exports = async(query) =>{
    const asyncResponse = await getUser(query);

    return{
        asyncResponse
    }
}