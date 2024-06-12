`use strict`

module.exports = (mongoose, Schema) =>{
    const CommentSchema = new Schema({
        forumEntryId :{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ForumEntry',
            required: true
        },
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'RegisteredUser'
        },
        content:{
            type: String,
            required: true
        },
        datePosted:{
            type: Date,
            default: new Date()
        }
    }, {collection: 'Comment'});
    return mongoose.model("Comment", CommentSchema);
}