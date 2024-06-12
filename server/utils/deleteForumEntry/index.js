`use strict`

const deleteForumEntry = require("./deleteForumEntry")

module.exports = async (query) =>{
    const asyncResponse = await deleteForumEntry(query);

    return {
        asyncResponse
    }
}