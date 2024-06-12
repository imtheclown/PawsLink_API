`use strict`

const updateEvent = require("../../utils/editEvent")
const {Types} = require("mongoose");
// edits existing event document
module.exports = (req, res, next) =>{
    // request body field is empty
    // returns an error statuscode and message
    if(!(req.body && Object.keys(req.body).length > 0)){
        req.responseData = {
            statusCode: 400,
            body:{
                error: 'cant update events with missing data'
            }
        }
    }
    // prevents termination of program due to non-async errors
    try{
        const imgFile = {};
        // retrieves the image in the request buffer if it is given
        if(req.file && req.file.buffer){
            imgFile['Body'] = req.file.buffer;
            imgFile["ContentType"] = req.file.mimetype;
        }
        const body = req.body;
        const {
            content,
            title,
            location,
            date,
        } = body;
        // generate query for text based data
        data = {
            content,
            title,
            location,
            date
        }
        // attempt to edit the event
        updateEvent({_id: new Types.ObjectId(body._id), data, imgFile})
        .then(result =>{
            if(result.asynResponse){
                const asynResponse = result.asynResponse;
                // succesfful
                // return a successful statuscode and message
                if(asynResponse.statusCode === 200){
                    req.responseData = {
                        statusCode: asynResponse.statusCode,
                        body:{
                            message: asynResponse.message
                        }
                    }
                    return next();
                }
            }
            // async operation returned an error
            // throw an error
            throw new Error("failed to update event");
        // catches error in async operations
        // returns an error statuscode and message
        }).catch(err =>{
            console.log(err);
            req.responseData = {
                statusCode: err.statusCode || 404,
                body: {error: err.message || err}
            }
            return next();
        })
    // catches error in non-async operations
    // returns an error statuscode and message
    }catch(err){
        console.log(err);
        req.responseData = {
            statusCode: err.statusCode || 404,
            body: {error: err.message || err}
        }
        return next();
    }
}