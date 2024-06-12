`use strict`

const findUserByEmail = require("./findUserByEmail");

module.exports = async (email) => {
    const asyncResponse = await findUserByEmail(email);
    return { asyncResponse}
}