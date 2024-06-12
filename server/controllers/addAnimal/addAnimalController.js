`use strict`
const addAnimal = require("../../utils/addAnimal")
// for adding a new animal document
// checks if required data are sent
// error checking
// type conversions
module.exports = (req, res, next) => {
    // request body is empty
    // returns a failed statuscode
    if(!(req.body && Object.keys(req.body))){
        if(!(req.query && Object.keys(req.query).length > 0)){
            req.responseData = {
                statusCode: 400,
                body: {error: "post method has no body"}
            };
        return next();
        }
    }
    // generate a query object
    let queryData = {}
    if(req.file){
        queryData["Body"] = req.file.buffer;
        queryData["ContentType"] = req.file.mimetype;
        queryData["withPhoto"] = true
    }
    const body = req.body;
    // specify the required data
    queryData["location"] = body.location;
    queryData["mainName"] = body.mainName;
    queryData["sex"] = body.sex;
    queryData["status"] = body.status;
    queryData["species"] = body.species;
    queryData["age"] = body.age;
    queryData["coatColor"] = body.coatColor;
    queryData["disabilities"] = body.disabilities;
    queryData["notes"] = body.notes;
    queryData["traitsAndPersonality"] = body.traitsAndPersonality;
    queryData["sterilizationDate"] = body.sterilizationDate;
    // attempty to create a new animal document
    addAnimal(queryData)
    .then(result =>{
        if(result.asyncResponse){
            const asyncResponse = result.asyncResponse;
            if(asyncResponse.statusCode === 201){
                // successful, return a success statuscode
                req.responseData = {
                    statusCode: asyncResponse.statusCode,
                    body: {
                        statusCode: asyncResponse.statusCode,
                        message: asyncResponse.message
                    }
                }
                return next();
            }
            // something went wrong in the creation of the document
            // return a failed statuscode
            throw new Error("creation of animal instance failed");
        }
    // encounters an error during async operation
    // returns a failed statuscode
    }).catch(err =>{
        console.log(err);
        req.responseData = {
            statusCode: 400,
            body: {error: 'failed to create post'}
        }
        return next();
    });
}