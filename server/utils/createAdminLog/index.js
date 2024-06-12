const createAdminLog = require("./createAdminLog");

module.exports = async (query) =>{
    const asyncResponse = await createAdminLog(query);
    return {
        asyncResponse
    }
}