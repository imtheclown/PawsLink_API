`use strict`

module.exports = (mongoose, Schema) => {
    const AdminLogSchema = new Schema({
        collectionName: {
            type: String,
            required: true
        },
        documentId:{
            type: Schema.Types.ObjectId,
            required: true,
        },
        dateCreated: {
            type: Date,
            default: new Date()
        },
        method:{
            type: String,
            required: true
        }
    })
    return mongoose.model('AdminLog', AdminLogSchema);
}