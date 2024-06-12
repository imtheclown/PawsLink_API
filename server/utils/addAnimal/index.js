`use strict`

const addAnimal = require("./addAnimal");

module.exports = async (query) =>{
    const asyncResponse = await(addAnimal(query));
    return {
        asyncResponse
    }
}