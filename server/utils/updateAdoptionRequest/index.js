`use stric`

const updateAdoptionRequest = require("./updateAdoptionRequest");

module.exports = async (query) =>{
    const asyncResponse = await updateAdoptionRequest(query);
    return {
        asyncResponse
    }
}