`use strict`

const getMessage = require("../../utils/getMessage");
const mongoose = require("mongoose")
// retrieves messages based on the sender and reciever email
module.exports = (req, res, next) =>{
    // request query field is empty
    // return an error statuscode and message
    if(!(req.query && Object.keys(req.query).length > 0) ){
        req.responseData ={
            statusCode: 400,
            body:{
                error: 'please provide reciever id'
            }
        }
        return next();
    }
    // prevents termination of the program due to non-async operation errors
    try{
        const query = req.query;
        // check if required data is given
        if(query.recieverId){
            // generate query
            const data ={
                recieverId:new mongoose.Types.ObjectId(query.recieverId)
            }
            // attempt to get messages
            getMessage(data)
            .then(result =>{
                console.log(result.asyncResponse)
                if(result.asyncResponse){
                    const asyncResponse = result.asyncResponse;
                    // successful
                    // returns a successful statuscode and message
                    // returns a list of message document in JSON format
                    if(asyncResponse.statusCode === 200){
                        req.responseData ={
                            statusCode: asyncResponse.statusCode,
                            body:{
                                data: asyncResponse.data,
                                message: asyncResponse.message
                            }
                        }
                        return next();

                    }
                }
                // async operation did not returned a success statuscode
                // throw an error
                throw new Error("cannot get messages");
            })
            // catches error due to async operation
            // returns an error statuscode and message
            .catch(err =>{
                req.responseData = {
                    statusCode: err.statusCode || 404,
                    body: {error: err.message || err}
                }
                return next();
            })
        }
        // required data are not given
        // throw an error
        else{
            throw new Error("cannot get messages");
        }
    // catches non-async operation error
    // returns an error statuscode and message
    }catch(err){
        req.responseData = {
            statusCode: err.statusCode || 404,
            body: {error: err.message || err}
        }
        return next();
    }
}