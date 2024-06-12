`use strict`

const updateAnimal = require("../../utils/updateAnimal");

const {Types}  = require("mongoose")
// updates the animal document in the database
module.exports = (req, res, next) =>{
    // request body field is empty
    // return an error statuscode and message
    if(!(req.body && Object.keys(req.body).length > 0) && req.body.imgUrl){
        req.responseData = {
            statusCode: 400,
            body: {
                error: 'No body found or no imgUrl found'
            }
        };
        return next();
    }
    // prevents the termination of the program due to non-async errors
    try{
        // get the image from the request if it is given
        const imageFile = {}
        if(req.file && req.file.buffer){
            imageFile["Body"] = req.file.buffer;
            imageFile['ContentType'] = req.file.mimetype;
        }
        const body = req.body;
        // keep the original image url (key)
        let queryData = {imgUrl: body.imgUrl}
        // generate query object
        // determines what keys to update
        if(body.location){
            queryData["location"] = body.location;
        }
        if(body.mainName){
            queryData["mainName"] = body.mainName;
        }
        if(body.sex){
            queryData["sex"] = body.sex;
        }
        if(body.status){
            queryData["status"] = body.status;
        }
        if(body.species){
            queryData["species"] = body.species;
        } 
        if(body.age){
            queryData["age"] = body.age;
        }
        if(body.coatColor){
            queryData["coatColor"] = body.coatColor;
        }
        if(body.disabilities){
            queryData["disabilities"] = body.disabilities;
        }
        if(body.notes){
            queryData["notes"] = body.notes;
        }
        if(body.traitsAndPersonality){
            queryData["traitsAndPersonality"] = body.traitsAndPersonality;
        }
        if(body.sterilizationDate){
            queryData["sterilizationDate"] = body.sterilizationDate;
        }
        const id = new Types.ObjectId(body._id);
        // attempt to update animal
        updateAnimal({
            id,
            updatedData: queryData,
            imageFile
        }).then(result => {
            if(result.asyncResponse){
                const asyncResponse = result.asyncResponse;
                // successful
                // return a success statuscode and message
                if(asyncResponse.statusCode === 200){
                    req.responseData ={
                        statusCode: asyncResponse.statusCode,
                        body:{
                            message: asyncResponse.message,
                            statusCode: asyncResponse.statusCode
                        }
                    }
                    return next();
                }
            };
            // error occured during the async operation
            // throw error
            throw new Error("failed to update the animal");
        })
        // catches error due to async operation
        // return an erorr statuscode and message
        .catch(err =>{
            console.log(err);
            req.responseData = {
                statusCode: 400,
                body: {error: err}
            }
            return next();
        })
    // catch non async errors
    // return an error statuscode and message
    }catch(err){
        console.log(err)
        req.responseData = {
            statusCode: err.statusCode || 404,
            body: {error: err.message || err}
        }
        return next();
    }
}