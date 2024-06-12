`use strict`

const deleteEvent = require("../../utils/deleteEvent");
const {Types} = require("mongoose");
// deletes the event
module.exports = (req, res, next) =>{
    // query field of request is empty
    // return an error statuscode and message
    if(!(req.query && Object.keys(req.query).length > 0)){
        req.responseData = {
            statusCode: 400,
            body:{
                error: "please provide _id to delete"
            }
        }
    }
    // prevents termination of program due to errors in non-async operation
    try{
        var query = req.query;
        const _id = new Types.ObjectId(query._id);
        query = {_id}
        // attempty to delete the event given the event id
        deleteEvent(query)
        .then(result =>{
            if(result.asyncResponse){
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
            // async operation returned a non-successful statuscode
            throw new Error("failed to delete event");
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
    // catches errors caused by non-async operations
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