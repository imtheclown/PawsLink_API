`use strict`

const ForumEntrySchema = require("../../models").ForumEntry;

module.exports = async (query) => {
    const data = await ForumEntrySchema.find(query).sort({datePosted: -1});

    return {
        statusCode: 200,
        data
    }
}