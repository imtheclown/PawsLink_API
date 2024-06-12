`use strict`
const {Types} =  require("mongoose");
// used to create a new comment document
// checks if required data is sent
// error handling
// type conversion
const createComment = require("../../utils/createComment");
module.exports = (req, res, next) =>{
    // request body is empty
    // return an error
    if(!(req.body && Object.keys(req.body).length > 0)){
        req.responseData = {
            statusCode: 400,
            body: {
                error: "cannot create comment without body"
            }
        }
        return next();
    }
    // prevents non-async termination of program due to error
    try{
        const body = req.body;
        // checks if required data are given
        if(body.content && body.forumEntryId && body.userId){
            // generate a query object
            const query = {
                content : body.content,
                userId: new Types.ObjectId(body.userId),
                forumEntryId : new Types.ObjectId(body.forumEntryId)
            }
            // attempt create a new comment document
            createComment(query)
            .then(result =>{
                if(result && result.asyncResponse && result.asyncResponse.statusCode === 201){
                    // successful operation
                    // return a success statuscode
                    const asyncResponse = result.asyncResponse;
                    req.responseData = {
                        statusCode: asyncResponse.statusCode,
                        body:{
                            message: asyncResponse.message
                        }
                    }
                    return next();
                }
                // error encountered while creating a new comment documnet
                // return an error statuscode
                throw new Error("failed to create comment");
            })
            // async operation resulted in error
            // return a failed statuscode
            .catch(err => {
                req.responseData = {
                    statusCode: err.statusCode || 404,
                    body: {
                        error: err.message || err
                    }
                }
                return next()
            })

        }
        // missing some required data
        // throw an error
        else{
            throw new Error("missing parameters to create comment");
        }
    // catches non async errors
    // returns a failed statuscode
    }catch(err){
        req.responseData = {
            statusCode: err.statusCode || 404,
            body: {
                error: err.message || err
            }
        }
        return next();
    }
}