`use strict`

const updateAnimal = require("./updateAnimal");

module.exports = async (query) => {
    const asyncResponse = await updateAnimal(query);
    return {
        asyncResponse
    }
}