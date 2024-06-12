`use strict`

const EventEntry = require("../../models").EventEntry;
const uploadImage = require("../uploadImage");
const {generateRandomImageName} = require("../utilityFunctions/stringUtilityFunctions");

module.exports = async ({_id, data, imgFile}) =>{

    var Key = ""
    if(imgFile && Object.keys(imgFile).length > 0){
        const {Body, ContentType} = imgFile;
        Key = generateRandomImageName();
        await uploadImage({Key, ContentType, Body});
    }

    data["contentImgUrl"] = Key;
    const updated = await EventEntry.findByIdAndUpdate({_id}, data);

    console.log(updated);

    return {
        statusCode: 200,
        status: 'OK',
        message: 'entry edited successfully'
    }
}