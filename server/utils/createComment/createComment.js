`use strict`

const CommentSchema = require("../../models").Comment;
const ForumEntrySchema = require("../../models").ForumEntry;
const {Types} = require("mongoose");

// creates a new comment document
module.exports = async (query) =>{
    // creates a new comment
    const newComment = await CommentSchema.create(query);
    // destructure the query object to get the forumEntryId
    const {forumEntryId} = query;
    // get the instance of the forum entry given the retrieved primary key
    const forumEntry = await ForumEntrySchema.findById(forumEntryId);
    // destructure the forumEntry object
    const {commentNum} = forumEntry;
    // update the number of comments in the specified post
    const data = {
        commentNum : parseInt(commentNum) + 1
    }
    // update the forum entry document with the updated value for the number of comments
    await ForumEntrySchema.findByIdAndUpdate({_id: new Types.ObjectId(forumEntryId)}, data);
    // returns statuscode and message
    return {
        statusCode: 201,
        message: 'comment created successfully'
    }
}