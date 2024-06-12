'use strict'

const getAnimals = require("./getAnimals")

module.exports = async(query) =>{
    const asyncResponse = await getAnimals(query)
    return {asyncResponse}
}