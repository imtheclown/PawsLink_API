`use state`

const getAdoptionRequest = require("../../utils/getAdoptionRequest")
// retrieves adoption request document/s from the database
module.exports = (req, res, next)=>{
    // request query field is empty
    // returns an error statuscode and message
    if(!(req.query && Object.keys(req.query).length > 0)){
        req.responseData ={
            statusCode: 400,
            body:{
                error: 'no request found'
            }
        }
    }
    // prevents termination of program due to non-async operations
    try{
        // generate query
        const query = req.query
        const useQuery={}
        // get adoption request with status code = "pending"
        // non-approved statuscode
        if(query.pending){
            useQuery["status"] = "pending"
        }
        // attempt to get the adoption request
        getAdoptionRequest(useQuery)
        .then(result =>{
            if(result && result.asyncResponse){
                const asyncResponse = result.asyncResponse;
                // successful
                // returns a success statuscode and message
                // returns list of adoption request document in JSON format
                if(asyncResponse.statusCode === 200){
                    req.responseData = {
                        statusCode: asyncResponse.statusCode,
                        body:{
                            data: asyncResponse.data
                        }
                    }
                    return next()
                }
            }
            // async operation did not returned a successful statuscode
            throw new Error("failed to get adoption requests");
        // catches error due to async operations
        // returns an error statuscode and message
        }).catch(err =>{
            req.responseData = {
                statusCode: err.statusCode || 404,
                body: {error: err.message || err}
            }
            return next();
        })
    // catches errors due to non-async operations
    // returns an error statuscode and message
    }catch(err){
        req.responseData = {
            statusCode: err.statusCode || 404,
            body: {error: err.message || err}
        }
        return next();
    }
}