const createComment = require("./createComment");

module.exports = async (query) =>{
    const asyncResponse = await createComment(query);

    return {
        asyncResponse
    }
}