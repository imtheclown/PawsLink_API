`use strict`

const getComment = require("../../utils/getComment");
// retrieves comment document
module.exports = (req, res, next) =>{
    // request query field is empty
    // return an error statuscode and message
    if(!(req.query && Object.keys(req.query).length > 0)){
        req.responseData = {
            statusCode: 400,
            body: {error: "cannot get comments without forum entry id"}
        }
        return next();
    }
    // prevents termination of program due to non-async operations
    try{
        const params = req.query;
        const data = {}
        // checks if required data are given
        if(params && params.forumEntryId){
            // generate query
            data["forumEntryId"] = params.forumEntryId;
            // attempt to get comment documents from database
            getComment(data)
            .then(result =>{
                // successful
                // return successful statuscode and message
                // reutrn a list of comment documents in JSON format
                if(result && result.asyncResponse && result.asyncResponse.statusCode === 200){
                    const asyncResponse = result.asyncResponse;
                    req.responseData = {
                        statusCode: asyncResponse.statusCode,
                        body:{
                            data: asyncResponse.data
                        }
                    }
                    return next();
                }
                // async operation did not result in a successful statuscode
                // throw an error
                throw new Error("failed to get comments given the forum entry id");
            })
            // catches errors due to non-async operations
            // returns an error statuscode and message
            .catch(err=>{
                req.responseData ={
                    statusCode: err.statusCode || 404,
                    body: {
                        error: err.message || err
                    }
                }
                return next();
            })
        // missing required data
        // throw an error
        }else{
            throw new Error("missing key: forumEntryId");
        }
    // catches error due to non-async operations
    // returns an error statuscode and message
    }catch(err){
        req.responseData ={
            statusCode: err.statusCode || 404,
            body: {
                error: err.message || err
            }
        }
    }
}