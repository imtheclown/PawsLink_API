`use strict`

const deleteAdoptionRequest = require("../../utils/deleteAdoptionRequest");
const {Types} = require("mongoose");
// deletes the adoption form document given the id
// used in rejection of adoption request
module.exports = (req, res, next) =>{
    //request query field is empty
    // return an error and a message
    if(!(req.query && Object.keys(req.query).length > 0)){
        req.responseData = {
            statusCode: 404,
            body:{
                error: "query parameter is empty"
            }
        }
        return next();
    }
    // prevents termination of program due to non-async errors
    try{
        const params = req.query;
        // check if id is provided
        if(params._id){
            const query = {
                _id: new Types.ObjectId(params._id)
            }
            // attempt to delete the adoption request from the db
            deleteAdoptionRequest({query})
            .then(result =>{
                if(result && result.asyncResponse){
                    const asyncResponse = result.asyncResponse;
                    // success
                    // return a successful statuscode and message
                    if(asyncResponse.statusCode === 200){
                        req.responseData = {
                            statusCode: asyncResponse.statusCode,
                            message: asyncResponse.message
                        }
                        return next();
                    }
                }
                //the operation did not result in a successful statuscode
                // throw an error
                throw new Error("failed to delete adoption form");
            })
            // error occured during the async operation
            // return a failed statuscode
            .catch(err =>{
                console.log(err);
                req.responseData = {
                    statusCode: err.statusCode || 404,
                    body: {error: err.message || err}
                }
                return next();
            })
        // adoption request id is missing
        // return a failed statuscode and message
        }else{
            req.responseData = {
                statusCode: 400,
                body: {error: "failed to provide id"}
            }
            return next();
        }
    // error occured during the non-async operation
    // return an error statuscode and message
    }catch(err){
        req.responseData = {
            statusCode: err.statusCode || 404,
            body: {error: err.message || err}
        }
        return next();
    }
}