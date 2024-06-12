`use strict`

const RegisteredUser = require("../../models").RegisteredUserModel;

module.exports = async (query) =>{
    // find by _id
    const user = await RegisteredUser.find(query);
    return{
        statusCode: 200,
        data: user,
    }
}