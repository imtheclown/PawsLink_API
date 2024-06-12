'use strict'

const RegisteredUserModel = require('../../models').RegisteredUserModel
module.exports = async ({email}) =>{
    // return a promise
    const similarEmail = await RegisteredUserModel.find(
        {
            email
        }
    ).exec();
    return similarEmail;
}