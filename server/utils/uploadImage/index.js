`use strict`

const uploadImage = require("./uploadImage")
module.exports = async (query) =>{
    const asyncResponse = await uploadImage(query)
    return {asyncResponse}
}