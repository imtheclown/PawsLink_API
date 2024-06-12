`use strict`

module.exports = (mongoose, Schema) => {
    const EventEntrySchema = new Schema({
        content:{
            type: String,
            required: true
        },
        contentImgUrl:{
            type: String,
            default: ''
        },
        title:{
            type: String, 
            required: true
        },
        location:{
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        }
    }, {collection: 'EventEntry'});
    return mongoose.model('EventEntry', EventEntrySchema)
}
