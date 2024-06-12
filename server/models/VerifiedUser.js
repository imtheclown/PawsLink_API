`use strict`

module.exports = (mongoose, Schema) => {
    const VerifiedUserSchema = new Schema({
        firsName: {
            type: String,
            required: true,
        },
        lastName:{
            type: String,
            required: true
        },
        userId_FK: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'RegisteredUser'
        },
        emailAddress:{
            type: String,
            required: true
        },
        student:{
            type: Boolean,
            required: true
        },
        facebookLink: {
            type: String,
            default: ''
        },
        completeCurrentAddress: {
            type: String,
            required: true
        },
        age:{
            type: Number,
            required: true
        }
    })
    mongoose.model('VerifiedUser', VerifiedUserSchema)
}
