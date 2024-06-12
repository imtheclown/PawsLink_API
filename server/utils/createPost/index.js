`use strict`

const createPost = require("./creatPost")

module.exports = async (query) => {
    const asyncResponse = await createPost(query);
    return {asyncResponse}
}