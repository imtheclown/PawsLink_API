`use strict`

const animalModel = require("../../models").Animal;
const {Types} = require("mongoose");
const {generateRandomImageName} = require("../utilityFunctions/stringUtilityFunctions")
const uploadImage = require("../uploadImage")
const createAdminLog = require("../createAdminLog")
// used to create updates on the animal documents
// for single animal only
module.exports = async ({id, updatedData, imageFile}) =>{
    // upload the updated image if necessary
    var Key = updatedData["imgUrl"]
    if(imageFile && Object.keys(imageFile) > 0){
        if(Key.length === 0){
            Key = generateRandomImageName();
        }
        const {Body, ContentType} = imageFile;
        await uploadImage({
            Body,
            Key,
            ContentType
        });
    }
    updatedData["imgUrl"] = Key;
    // update the animal document
    const res = await animalModel.updateOne(
        {_id: id},
        updatedData,
        {w: 'majority'}
    )
    // check if update is successful
    if(res.acknowledged){
        // creates an admin log
        await createAdminLog({
            documentId: id,
            collectionName: 'animals',
            method: 'update'
        })
        // returns a succesful statuscode
        return {
            statusCode: 200,
            message: "OK"
        }
    }
    // update failed
    // returns a failed statuscode and message
    return {
        statusCode: 400,
        message: 'failed to update animal'
    }

}