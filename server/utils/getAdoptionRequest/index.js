`use strict`

const getAdoptionForm = require("./getAdoptionRequest")

module.exports = async(query)=>{
    const asyncResponse = await getAdoptionForm(query)

    return{
        asyncResponse
    }
}