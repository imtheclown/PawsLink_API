`use strict`

const deleteAdoptionRequest = require("./deleteAdoptionRequest")

module.exports = async(query) => {
    const asyncResponse = await deleteAdoptionRequest(query);

    return {
        asyncResponse
    }
}








