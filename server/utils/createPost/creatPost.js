
`use strict`
const ForumEntry = require("../../models").ForumEntry;
const crypto = require("crypto")
const uploadSingleImage = require("../uploadImage")
const {format} = require("date-fns")
const {generateRandomImageName} = require("../utilityFunctions/stringUtilityFunctions")
// creates a new forum entry document
module.exports = async ({
    withPhoto,
    Body,
    ContentType,
    username,
    email,
    title,
    content
}) => {
    // upload photo
    var Key = "";
    if(withPhoto){
        Key = generateRandomImageName();
        const data = {
            Key,
            Body,
            ContentType
        };
        await uploadSingleImage(data);
    };
    // create the post
    const currentDate = new Date();
    const formattedDate = format(currentDate, 'yyyy-MM-dd HH:mm:ss');
    await ForumEntry.create({
        username,
        content,
        email,
        title,
        entryImageURL: Key,
        datePosted: formattedDate
    })
    // return status code and message
    return {
        statusCode: 201,
        status: 'OK'
    }
}