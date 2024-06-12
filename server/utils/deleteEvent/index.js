`use strict`

const deleteEvent = require("./deleteEvent");

module.exports = async (query) =>{
    const asyncResponse = await deleteEvent(query);
    return {
        asyncResponse
    }
}