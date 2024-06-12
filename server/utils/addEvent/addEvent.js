`use strict`

const EventEntry = require("../../models").EventEntry;
const {generateRandomImageName} = require("../utilityFunctions/stringUtilityFunctions");
const uploadImage = require("../uploadImage");
// used to create a new event document
module.exports = async ({query, imageFile}) => {
    var Key = "";
    // upload image
    if(imageFile && Object.keys(imageFile).length > 0){
        const {Body, ContentType} = imageFile;
        Key = generateRandomImageName();
        data ={
            Body,
            ContentType,
            Key
        }
        await uploadImage(data);
    }
    // create a new event document
    await EventEntry.create({
        ...query,
        contentImgUrl: Key
    });
    // return the status code and message
    return {
        statusCode: 201,
        status: "OK",
        message: "event successfully created"
    }
}