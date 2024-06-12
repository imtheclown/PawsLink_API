`use strict`

const CommentSchema = require("../../models").Comment;
// delete comment in the forum
module.exports = async (condition) => {
    // delete comment given a forum entry id
    const result = await CommentSchema.deleteMany(condition);
    // return a statuscode and a message
    return {
        statusCode: 200,
        message: 'comments on the specified post are deleted'
    }
}