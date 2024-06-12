`use strict`

module.exports = (mongoose, Schema) =>{
    const ForumEntrySchema = new Schema({
        username:{
            type: String,
            required: true
        },
        content:{
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        title:{ 
            type: String,
            required: true
        },
        entryImageURL: {
            type: String,
            default: ""
        },
        datePosted :{
            type: Date,
            required: true
        },
        commentNum:{
            type: Number,
            default: 0
        }
    }, {collection: 'ForumEntry'});
    return mongoose.model('ForumEntry', ForumEntrySchema);
}
