`use strict`

const getEvent = require("../../utils/getEvent");
const {Types} = require("mongoose")
// get event documents from the database
module.exports = (req, res, next) =>{
    // request query field is empty
    // return an error statuscode and message
    if(!(req.query && Object.keys(req.query).length>0)){
        req.responseData = {
            statusCode: 400,
            message:'query is empty'
        }
        return next();
    }
    // prevents the termination of the program due to errors in non-async operations
    try{
        const query = {};
        // generate query
        if(req.query && req.query._id){
            query["_id"] = new Types.ObjectId(req.query._id);
        }
        // assume two use case only
        // attempt to get events
        getEvent(query)
        .then(result =>{
            if(result && result.asyncResponse){
                const asyncResponse = result.asyncResponse;
                // successful
                // returns a sucessful statuscode and message
                // returns a list of event documents in JSON format
                if(asyncResponse.statusCode === 200){
                    req.responseData = {
                        statusCode: asyncResponse.statusCode,
                            body:{
                                data: asyncResponse.data
                            }
                    }
                    return next();
                }
            }
            // async operation did not returned a successful statuscode
            // throw an error
            throw new Error('failed to get events');
        })
        // catches error due to async operations
        // returns an error statuscode and message
        .catch(err =>{
            console.log(err)
            req.responseData = {
                statusCode: err.statusCode || 404,
                body: {error: err.message || err}
            }
            return next();
        })
    // catches error due to non-async operations
    // returns an error statuscode and message
    }catch(err){
        console.log(err)
        req.responseData = {
            statusCode: err.statusCode || 404,
            body: {error: err.message || err}
        }
        return next();
    }
}