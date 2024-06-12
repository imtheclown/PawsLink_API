'use strict'

const SignUp = require("../../utils/signUp")
// used to signup the user
module.exports = (req, res, next) => {
    // request body field is empty
    // returnss an error statuscode and message
    if(!req.body){
        req.responseData = {
            statusCode: 400,
            body: {
                error: 'No request query found'
            }
        };
        return next();
    }else{
        // attempt to create a new user account in the database
        SignUp(req.body)
        .then(response =>{
            if(response && response.asyncResponse){
                var asyncResponse = response.asyncResponse
                if(asyncResponse.statusCode === 201){
                    // successsful
                    // returns statusCode 200 and a message
                    req.responseData = {
                        statusCode: asyncResponse.statusCode,
                        body:{
                            message: asyncResponse.message
                        }
                    }
                }else{
                    // the async function did not returned a success statuscode
                    // return an error statuscode and message 
                    req.responseData = {
                        statusCode: 400,
                        body: {
                            error: asyncResponse.message
                        }
                    }
                }
                
            }
            return next();
            // catches errors due to async operations
        }).catch( err =>{
            console.log(err)
            req.responseData = {
                statusCode: err.statusCode || 404,
                body: {error: err.message || err}
            }
            return next();
        })
    }

}