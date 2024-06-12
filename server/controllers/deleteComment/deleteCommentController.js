`use strict`

const deleteComment = require("../../utils/deleteComment");
const {Types} = require("mongoose");
// deletes comments
module.exports = (req, res, next) =>{
    // query field of request is empty
    // return an error statuscode and message
    if(!(req.query && Object.keys(req.query).length > 0)){
        req.responseData = {
            statusCode: 400,
            body: {
                error: "please provide forum entry id to delete comments"
            }
        }
    }
    // prevents the termination of the program due to non-async errors
    try{
        const params = req.query;
        const condition = {};
        // checks if required data are provided
        if(params.forumEntryId){
            condition["forumEntryId"] = new Types.ObjectId(params.forumEntryId);
            // attempt to delete the comment given the condition
            deleteComment(condition)
            .then(result =>{
                // operation is successful
                // return a successful statuscode and message
                if(result && result.asyncResponse && result.asyncResponse.statusCode === 200){
                    const asyncResponse = result.asyncResponse;
                    req.responseData = {
                        statusCode: asyncResponse.statusCode,
                        body:{
                            message: asyncResponse.message
                        }
                    }
                    return next();
                }
                // async operation returns a non-successful statuscode
                // throw an error
                throw new Error("failed to delete comments given the forum entry id");
            })
            // error occured during the async operation
            // return an error statuscode and message
            .catch(err =>{
                req.responseData = {
                    statusCode: err.statusCode || 404,
                    body:{
                        error: err.message || err
                    }
                }
                return next();
            })
        // missing a required data
        }else {
            throw new Error("missing forumEntryId");
        }
    // catches non-async errors
    // returns an error statuscode and messsage
    }catch(err){
        req.responseData ={
            statusCode: err.statusCode || 404,
            body:{
                error: err.message || err
            }
        }
        return next();
    }
}