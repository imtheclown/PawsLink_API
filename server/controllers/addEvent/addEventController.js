`use strict`

const addEvent = require("../../utils/addEvent");
// used for creating an event document
// checks if required data are sent
// error checking
// type conversions
module.exports = (req, res, next) => {
    // request body is empty
    if(!req.body && !Object.keys(req.body) > 0){
        req.responseData = {
            statusCode: 400,
            body: {error: "post method has no body"}
            };
        return next();
    }
    // try catch to prevent non-async termination of server
    try{
        // get the image file if there is image in the request body
        const imageFile = {}
        if(req.file && req.file.buffer){
            imageFile["Body"] = req.file.buffer,
            imageFile["ContentType"] = req.file.mimetype;
        }
        // generate the query based on the data provided in the request body
        // checks if required data is given
        const body = req.body;
        if(body.content && body.title && body.location && body.date){
            const query = {
                content : body.content,
                title: body.title,
                location: body.location,
                date: new Date(body.date)
            }
            // attempt to create a new event document
            addEvent({query,imageFile})
            .then(result =>{
                if(result && result.asyncResponse){
                    const asyncResponse = result.asyncResponse;
                    if(asyncResponse.statusCode === 201){
                        // successful, send a successful statuscode
                        req.responseData = {
                            statusCode: asyncResponse.statusCode,
                            body:{
                                message: asyncResponse.message
                            }
                        };
                        return next();
                    }
                }
                // something went wrong during the process
                // throw an error
                throw new Error('failed to add event');
            }).catch(
                // async operation resulted in failure
                // return a failed statuscode
                err =>{
                    console.log(err)
                    req.responseData = {
                        statusCode: err.statusCode || 404,
                        body: {error: err.message || err}
                    }
                    return next();
                }
            )
        }
    }
    catch(err){
        
    }
} 