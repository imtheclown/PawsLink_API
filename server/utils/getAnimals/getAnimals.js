'use strict'

const AnimalModel = require("../../models").Animal

module.exports = async (query) =>{
    const animalList = await AnimalModel.find(query);
    return {
        statusCode: 200,
        status: "OK",
        data: animalList
    }
}