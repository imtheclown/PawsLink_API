`use strict`

const findUserByEmail = require("../../utils/findUserByEmail");
// retrieves instance of registered user using email
module.exports = (req, res, next) => {
    // attempt to retrieve email
    findUserByEmail(req.query)
    .then(result => {
        if(result.asyncResponse){
            const asyncResponse = result.asyncResponse
            // successful
            // return a success statuscode and message
            // return the document/s in object form
            if(asyncResponse.statusCode === 200){
                req.responseData = {
                    statusCode: asyncResponse.statusCode,
                    body: {
                        statusCode: asyncResponse.statusCode,
                        data : asyncResponse.data,
                        message: asyncResponse.message
                    }
                }
                return next()
            }
        }
        // no instance found given the email
        // returns an error message and statuscode
        req.responseData = {
            statusCode: 400,
            body: {error: "missing result"}
        }
        return next();
    // catches errors due to async operations
    // returns an error statuscode and message
    }).catch(err => {
        req.responseData = {
            statusCode: err.statusCode || 404,
            body: {error: err.message || err}
        }
        return next();
    })
}