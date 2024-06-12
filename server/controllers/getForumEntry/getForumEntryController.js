`use strict`

const getForumeEntry = require("../../utils/getForumEntry");
// get forum entry from the database
// aka get post
module.exports = (req, res, next) => {
    // request query field is empty
    // return an error statuscode and message
    if(!(req.query && Object.keys(req.query).length > 0)){
        req.responseData = {
            statusCode: 400,
            body: {
                error: 'please provide query'
            }
        }
    }
    // prevents termination of program due to errors in non-async operations
    try{
        // reserve for future usage
        // currently retrieves all of the posts
        // may use pagination
        const params = req.query;
        const query = {};
        // attempt to retrieve posts/forum entry from the database
        getForumeEntry(query)
        .then(result =>{
            // successful
            // return a success statuscode and message
            // returns list of forum entry /post document in JSON format
            if(result && result.asyncResponse && result.asyncResponse.statusCode === 200){
                const asyncResponse = result.asyncResponse;
                req.responseData = {
                    statusCode: asyncResponse.statusCode,
                    body: {
                        data: asyncResponse.data
                    }
                }
                return next();
            }
        })
        // catches error in async operations
        // returns an error statuscode and message
        .catch(err => {
            req.responseData = {
                statusCode: err.statusCode || 404,
                body: {
                    error: err.message || err
                }
            }
            return next();
        })
    }catch(err){
        req.responseData ={
            statusCode: err.statusCode || 404,
            body: {
                error: err.message || err
            }
        }
    }
}