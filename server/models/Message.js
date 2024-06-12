`use strict`
module.exports = (mongoose, Schema) =>{
    const MessageSchema = new Schema({
        content:{
            type: String,
            required: true
        },
        senderEmail:{
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        recieverEmail:{
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        dateSent:{
            type: Date,
            default: new Date()
        }
    });

    return mongoose.model('Messages', MessageSchema);
}