`use strict`

const editEvent = require("./editEvent");

module.exports = async (query) =>{
    const asynResponse = await editEvent(query);

    return {
        asynResponse
    }
}