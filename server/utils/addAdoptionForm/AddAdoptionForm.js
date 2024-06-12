`use strict`
// used to create a new adoption form document
const AdoptionForm = require("../../models").AdoptionForm;
const {generateRandomName} = require("../../utils/utilityFunctions/stringUtilityFunctions");
const uploadImage = require("../uploadImage");

module.exports = async({imageFile, query}) => {
    var Key = ""
    // uploads image
    if(imageFile && Object.keys(imageFile).length > 0){
        Key = generateRandomName()
        const data = {
            ...imageFile,
            Key
        }
        await uploadImage(data);
    }
    // adds key(image name in the s3 bucket) as url in the collection
    query["idPhotoUrl"] = Key
    // creates a new collection
    const newAdoptionForm = await AdoptionForm.create(query);
    console.log(newAdoptionForm);
    // returns statuscode and message
    return {
        statusCode: 201,
        message: 'adoption form created successfully'
    }

}