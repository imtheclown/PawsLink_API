const { query } = require("express");

`use strict`

const ForumEntry = require("../../models").ForumEntry;
const deleteComment = require("../deleteComment");

module.exports = async(query) =>{
    console.log(query);

    // delete the forum entry first
    await ForumEntry.findByIdAndDelete(query);

    const forumEntryId = query._id;

    // delete the comments related to the forum entry
    const info = await deleteComment({forumEntryId});

    return {
        statusCode: 200,
        status: "OK",
        message: 'post deleted successfully'
    }
}