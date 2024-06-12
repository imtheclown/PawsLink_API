`use strict`
const mongoose = require("mongoose");
const getUser = require("../../utils/getUser");
// retrieves user document using id
module.exports = (req, res, next) =>{
    // request query field is empty
    // return an error statuscode and message
    if(!(req.query && Object.keys(req.query).length > 0)){
        req.responseData = {
            statusCode: 400,
            body: {error: "please provide user id"}
        };
        return next();
    }
    // preventst the termination of the program due to non-async operations
    try{
        const query = req.query;
        // checks if required data is given
        if(query && query._id){
            const data = {
                _id: new mongoose.Types.ObjectId(query._id)
            }
            // attempt to get user document from the database
            getUser(data)
            .then(result =>{
                // successful
                // return a success statuscode and message
                // return the user document in JSON format
                if(result && result.asyncResponse && result.asyncResponse.statusCode === 200){
                    const asyncResponse = result.asyncResponse;
                    req.responseData ={
                        statusCode: asyncResponse.statusCode,
                        body:{
                            data: asyncResponse.data
                        }
                    }
                    return next();
                }
                // the async operation did not returned a sucess statuscode
                // throw error
                throw new Error("cannot find the user");
            })
            // catches error due to async operations
            // returns an error statuscode and message
            .catch(err =>{
                req.responseData = {
                    statusCode: err.statusCode || 404,
                    body: {error: err.message || err}
                }
                return next();
            })
        }
        // missing required data
        else{
            throw new Error("provide user id")
        }
    // catches error during non-async operations
    // returns an error statuscode and message
    }catch(err){
        req.responseData = {
            statusCode: err.statusCode || 404,
            body: {error: err.message || err}
        }
        return next();
    }
}