`use strict`
const getImageUrl = require('../../utils/getImageUrl')
// used to get images from the s3 bucket
module.exports = (req, res, next) =>{
    // request query field is empty
    // return an error statuscode and message
    if(!(req.query && Object.keys(req.query).length > 0)){
        req.responseData = {
            statusCode: 400,
            body: {error: "no query parameters"}
        };
        return next();
    }
    // attempt to get image url
    getImageUrl(req.query)
    .then(response =>{
        if(response && response.asyncResponse){
            const asyncResponse = response.asyncResponse;
            // successful
            // returns a successful statuscode and message
            // returns the retrieved url
            if(asyncResponse.statusCode === 200 && asyncResponse.url){
                req.responseData = {
                    statusCode: asyncResponse.statusCode,
                    body: {
                        statusCode: asyncResponse.statusCode,
                        data : asyncResponse.url,
                        message: asyncResponse.message
                    }
                };
                return next();
            }
        }
        // async operation did not returned a success statuscode
        throw new Error("Invalid response")
    })
    // catches error due to async operation
    // returns error statuscode and message
    .catch( err=>{
        req.responseData = {
            statusCode: err.statusCode || 404,
            body: {error: err.message || err}
        }
        return next();
    })
} 