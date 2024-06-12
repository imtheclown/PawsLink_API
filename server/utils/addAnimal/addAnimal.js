`use strict`
const Animal = require("../../models").Animal
const uploadSingleImage = require("../uploadImage")
const {format} = require("date-fns")
// custom functions used to preprocess data recieved from user
const {
    generateRandomImageName, 
    seperateByNewLine,
    seperateByComma
} = require("../utilityFunctions/stringUtilityFunctions")
const createAdminLog = require("../createAdminLog");

// creates a new animal document
module.exports = async (query) => {
    // important keys/properties
    const {
        location,
        mainName,
        sex,
        status,
        coatColor,
        notes,
        species,
        traitsAndPersonality,
        disabilities,
        age,
        sterilizationDate,
        withPhoto,
        Body,
        ContentType
    } = query
    var Key = ""
    // uploads image
    if(withPhoto){
        Key = generateRandomImageName();
        const data ={
            Key,
            Body, 
            ContentType
        }
        await uploadSingleImage(data);
    }
    // declaration of data object
    // used as query parameters for the creation of new animal document
    const data = {
        location,
        mainName,
        sex,
        status,
        imgUrl: Key,
        species,
        age: parseInt(age)
    }
    // preprocessing of data that are stored as arrays
    // preprocessing of data for coatColor key
    if(coatColor && coatColor.length){
        const newCoatColor = seperateByComma(coatColor);
        data["coatColor"] = newCoatColor;
    }
    // preprocssing of data for disabilities key
    if(disabilities && disabilities.length){
        const disabilityList = seperateByNewLine(disabilities);
        data["disabilities"] = disabilityList;
    }
    // preprocessing of data for notes key
    if(notes && notes.length){
        const noteList = seperateByNewLine(notes);
        data["notes"] = noteList;
    }
    // preprocessing of data for traitsAndPersonality key
    if(traitsAndPersonality && traitsAndPersonality.length){
        const traitsList = seperateByNewLine(traitsAndPersonality);
        data["traitsAndPersonality"] = traitsList;
    }
    // preprocessing of data for sterilizationDate key
    if(sterilizationDate && sterilizationDate.length){
        const newDate = new Date(sterilizationDate);
        const formattedDate = format(newDate, 'yyyy-MM-dd HH:mm:ss');
        data["sterilizationDate"] = formattedDate;
    }
    // create a new animal object
    const newAnimal = await Animal.create(data)

    // destructure the query result to get the newly created animal document's primary key
    const {_id} = newAnimal;
    // create a new admin log
    // used to keep track of the changes in the animal database
    const newAdminLog = await createAdminLog({
        collectionName: 'animals', 
        documentId: _id,
        method: 'add'
    });
    // return status code and message
    return {
        statusCode: 201,
        message: "animal succesfully created"
    }
}

