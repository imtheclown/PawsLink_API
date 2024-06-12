const getImageUrl = require("./getImageUrl")
module.exports = async (query) =>{
    const asyncResponse = await getImageUrl(query)

    return {
        asyncResponse
    }
} 