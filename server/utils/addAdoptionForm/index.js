`use strict`

const addAdoptionForm = require("./AddAdoptionForm");

module.exports = async (query) =>{
    const asyncResponse = await addAdoptionForm(query);
    return {
        asyncResponse
    }
}