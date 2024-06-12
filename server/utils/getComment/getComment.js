`use strict`

const CommentSchema = require("../../models").Comment;

module.exports = async (query) => {
    // get comments by post id
    const data = await CommentSchema.find(query).populate(['userId']);

    return {
        data,
        statusCode: 200
    }
}