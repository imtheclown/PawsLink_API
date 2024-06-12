`use strict`

module.exports = (mongoose, Schema) => {
    const RegisteredUserSchema = new Schema({
        userName: {
            type: String,
            required: true
        },
        profilePictureURL:{
            type: String,
            required: false,
            default: ""
        },
        appPassword:{
            type: String,
            required: true
        },
        realmPassword:{
            type: String,
            required: true
        },
        email:{
            type: String,
            require: true,
            unique: true
        }

    })

    return mongoose.model('RegisteredUser', RegisteredUserSchema)
}
