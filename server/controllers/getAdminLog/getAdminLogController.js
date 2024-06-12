`use strict`
const {Types} = require("mongoose");
const getAdminLog = require("../../utils/getAdminLog");
// retrieves instances of admin log
module.exports = (req, res, next) => {
    // request query field is empty
    // return an error statuscode and message
    if(!(req.query && Object.keys(req.query))){
        req.responseData = {
            statusCode: 400,
            body: {
                error: 'No request query found'
            }
        };
        return next();
    }
    // generates query
    const query = {}
    // retrieves admin log document based on the collectionName field
    if(req.query && req.query.collectionName){
        query["collectionName"] = req.query.collectionName;
    }
    // retrieves admin log document based on the startDate field
    if(req.query && req.query.startDate){
        query['startDate'] = new Date(req.query.startDate);
    }
    // get documents with greater id than the query
    // the ids are hex strings
    if(req.query && req.query._id){
        query["_id"] = new Types.ObjectId(req.query._id);
    }
    // attempt to get the admin log document/s given the specified query parameters
    getAdminLog(query)
    .then(result =>{
        if(result && result.asyncResponse){
            const asyncResponse = result.asyncResponse;
            // successful
            // returns an error statuscode and message
            // returns list of admin log document in JSON form
            if(asyncResponse.statusCode === 200){
                req.responseData ={
                    statusCode: asyncResponse.statusCode,
                    body: asyncResponse.data
                }
                return next();
            }
        // there is an error in the async operation
        // throw an error
        }else{
            throw new Error("failed to get update logs")
        }
    })
    // catches errors due to async operations
    // returns an error statuscode and message
    .catch((err) =>{
        console.log(err);
        req.responseData = {
            statusCode: err.statusCode || 404,
            body: {error: err.message || err}
        }
        return next();
    })
}