
`use strict`

const AdoptionForms = require("../../models").AdoptionForm

module.exports = async (query) =>{
    const data = await AdoptionForms.find(query)

    return{
        statusCode: 200,
        data
    }
}
