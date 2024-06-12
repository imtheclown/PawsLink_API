`use strict`

const addAdoptionForm = require("../../utils/addAdoptionForm");
const {Types} = require("mongoose");
const {generateListFromNewLine} = require("../../utils/utilityFunctions/listBasedUtilityFunctions")
// used to check if the require parameters/ data are given
// error handling
// type conversions
module.exports = (req, res, next) =>{
    //empty request body
    if(!(req.body && Object.keys(req.body).length > 0)){
        if(!(req.body && Object.keys(req.body))){
            req.responseData = {
                statusCode: 400,
                body: {error: "post method has no body"}
                };
            return next();
        }
    }
    try{
        const imageFile ={
        }
        // check if there is an image in the request
        if(req.file && req.file.buffer){
            imageFile["Body"] = req.file.buffer;
            imageFile["ContentType"] = req.file.mimetype;
        }
        // check keys
        const body = req.body;
        console.log(body);
        const{
            email,
            fname,
            lname,
            age,
            isStudent,
            contactNumber,
            faceBookLink,
            completeHomeAddress,
            completeCurrentAddress,
            noOfPets,
            yearsOfBeingPetOwner,
            ageOfOldestLivingPet,
            adoptedPetFutureAddress,
            neuterOrSpayAwareness,
            neuterOrSpayWillingness,
            regularVetClinic,
            inDoorOrOutdoor,
            leashOrCaged,
            basicNecessities,
            enrichmentActivity,
            hearAboutUs,
            animalId,
            userEmail
        } = body;
        // generate an object with preprocessed values
        const query = {
            fname,
            lname,
            age : parseInt(age),
            isStudent,
            contactNumber,
            email,
            faceBookLink,
            completeHomeAddress,
            completeCurrentAddress,
            noOfPets: parseInt(noOfPets),
            yearsOfBeingPetOwner: parseInt(yearsOfBeingPetOwner),
            ageOfOldestLivingPet: parseInt(ageOfOldestLivingPet),
            adoptedPetFutureAddress,
            neuterOrSpayAwareness,
            neuterOrSpayWillingness,
            regularVetClinic,
            inDoorOrOutdoor,
            leashOrCaged,
            basicNecessities: generateListFromNewLine(basicNecessities),
            enrichmentActivity,
            hearAboutUs,
            userEmail,
            animalId: new Types.ObjectId(animalId)
        }
        // attempt to create a new adoption request document
        addAdoptionForm({query, imageFile})
        .then(result =>{
            // successful write operation
            if(result && result.asyncResponse){
                const asynResponse = result.asyncResponse;
                // check the statuscode
                if(asynResponse.statusCode === 201){
                    // return succesful request
                    req.responseData ={
                        statusCode: 201,
                        body:{
                            statusCode: asynResponse.statusCode,
                            message: asynResponse.message
                        }
                    }
                    return next();
                }
            }
            // something went wrong in the utils
            // return error
            throw new Error("failed to send adoption form");
        // catches async errors
        }).catch(err =>{
            // returns failed statuscode
            console.log(err );
            req.responseData = {
                statusCode: 404,
                body: {error: 'failed to create post'}
            }
            return next();
        });

    // catches non-async errors
    }catch(err){
        // returns failed statuscode
        console.log(err );
        req.responseData = {
            statusCode: 404,
            body: {error: 'failed to create post'}
        }
        return next();
    }

}