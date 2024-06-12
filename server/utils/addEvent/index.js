`use strict`

const addEvent = require("./addEvent");

module.exports = async (query) =>{
    const asyncResponse = await addEvent(query);
    return {asyncResponse}
}