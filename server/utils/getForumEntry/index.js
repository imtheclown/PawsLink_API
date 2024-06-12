`use strict`

const getForumEntry = require("./getForumEntry");

module.exports = async (query) => {

    const asyncResponse = await getForumEntry(query);

    return {
        asyncResponse
    }
}