`use strict`
const findEmail = require("./findEmail")
const RegisteredUserModel = require("../../models").RegisteredUserModel
module.exports = async ({email, userName, password}) => {
    const existingEmail = await findEmail({email: email})
    console.log(existingEmail)
    // email is already in use 
    if(existingEmail.length > 0){
        return {
            message: "user already exists",
            statusCode: 200,
            status: 'FAILED'
        }
    }else{
        await RegisteredUserModel.create({
            email: email,
            userName: userName,
            profilePictureURL: "",
            appPassword: password,
            realmPassword: password
        })
        return {
            message: "user created successfully",
            statusCode: 201,
            status: 'OK'
        }
    }
}