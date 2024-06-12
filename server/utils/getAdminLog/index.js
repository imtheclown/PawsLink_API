`use strict`

const getAdminLog = require("./getAdminLog");
module.exports = async (query) => {
    const asyncResponse = await getAdminLog(query)
    return {
        asyncResponse
    }
}