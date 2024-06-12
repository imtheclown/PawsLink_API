`use strict`

const getComment = require("./getComment");

module.exports = async(query) =>{
    const asyncResponse = await getComment(query);

    return {
        asyncResponse
    }
}