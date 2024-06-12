`use strict`
const getEvents = require("./getEvent");
module.exports = async (query) => {
    const asyncResponse = await getEvents(query);

    return {
        asyncResponse
    }
}