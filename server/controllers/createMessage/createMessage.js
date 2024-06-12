`use strict`

const createMessage = require("../../utils/createMessage");
const {Types} = require("mongoose");
// creates a new message document
// checks required data
// error handling
// type conversion
module.exports = (req, res, next) =>{
    // reques body is empty
    // return a failed statuscode
    if((!req.body && Object.keys(req.body).length > 0)){
        req.responseData = {
            statusCode: 400,
            body:{
                error: 'cannot create message with empty body'
            }
        }
        return next();
    }
    // prevents termination of program due to non-async operations
    try{
        // checks if required data are given
        const body = req.body;
        if(body.recieverEmail && body.senderEmail && body.content){
            const {recieverEmail, senderEmail, content} = body;
            // generates a query object
            const data = {
                recieverEmail : recieverEmail,
                senderEmail: senderEmail,
                content
            }
            // attempt to create a new message document
            createMessage(data)
            .then(result =>{
                if(result && result.asyncReponse){
                    const asyncResponse = result.asyncReponse;
                    // successful
                    // return a successful statuscode
                    if(asyncResponse.statusCode == 201){
                        req.responseData = {
                            statusCode: asyncResponse.statusCode,
                            body:{
                                message: asyncResponse.message
                            }
                        }
                        return next();
                    }
                }
                // an error occured during the operation
                // raised an error
                throw new Error("failed to send message");
            })
            // catches async operation error
            .catch(err =>{
                req.responseData ={
                    statusCode: err.statusCode|| 404,
                    body: {
                        error: err.message || err
                    }
                }
            })
        }else{
            // missing required data
            throw new Error("failed to send message");
        }
    // catches non async error
    // ratures a failed status code
    }catch(err){
        req.responseData = {
            statusCode: err.statusCode || 404,
            body: {error: err.message || err}
        }
        return next();
    }
}