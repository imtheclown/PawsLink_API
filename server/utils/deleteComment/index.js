`use strict`

const deleteComment = require("./deleteComment");

module.exports = async (condition) =>{
    const asyncResponse = await deleteComment(condition);

    return {
        asyncResponse
    }
} 