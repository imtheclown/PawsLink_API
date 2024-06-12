const registeredUser = require("../../models").RegisteredUserModel

module.exports = async (email) => {
    const user = await registeredUser.find(email)
    return {
        statusCode: 200,
        status: 'OK',
        data: user
    }
}