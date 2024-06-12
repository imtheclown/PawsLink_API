`use strict`

const {Types} = require("mongoose");

const deleteForumEntry = require("../../utils/deleteForumEntry");
// deletes the forum entry document
module.exports = (req,res,next) =>{
    // request query field is empty
    // return an error statuscode and message
    if(!(req.query && Object.keys(req.query).length > 0)){
        req.responseData = {
            statusCode: 400,
            body:{
                message: 'please provide id of item to delete'
            }
        }
    }
    // prevents termination of the program due to non-async operations
    try{
        const query = req.query;
        const data = {}

        data["_id"] = new Types.ObjectId(query._id);
        // attempty to delete the forum entry
        deleteForumEntry(data)
        .then(result =>{
            if(result.asyncResponse){
                console.log(result.asyncResponse)
                const asyncResponse = result.asyncResponse;
                // successful
                // return a successful statuscode and message
                if(asyncResponse.statusCode === 200){
                    req.responseData = {
                        statusCode: asyncResponse.statusCode,
                        body:{
                            message: asyncResponse.message
                        }
                    }
                    return next();
                }
            }
            // async operation resulted in an error
            // throw an error
            throw new Error("failed to delete the forum entry");
        })
        // catches async errors
        // returns an error statuscode and message
        .catch(err =>{
            console.log(err)
            req.responseData = {
                statusCode: err.statusCode || 404,
                body: {error: err.message || err}
            }
            return next();
        })
    }
    // catches non-async error
    // returns an error statuscode and message
    catch(err){
        console.log(err)
        req.responseData = {
            statusCode: err.statusCode || 404,
            body: {error: err.message || err}
        }
        return next();
    }
}