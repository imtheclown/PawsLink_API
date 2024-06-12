`use strict`

const uploadImage = require("../../utils/uploadImage")
// used to upload image to s3 bucket
module.exports = (req, res, next) =>{
    // file field of request is empty
    // return an  errror status and message
    if(!req || !req.file || !Object.keys(req.file).length){
        req.responseData = {
            statusCode: 400,
            body: {error: "no image found"}
        }
        return next();
    }
    // attempt to upload image
    uploadImage({
        // generate a key that is unique in the frontend
        Key: req.body.key,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
    })
    .then(response => {
        if(response && response.asyncResponse){
            const asyncResponse = response.asyncResponse
            // successful
            // return success statuscode and message
            if(asyncResponse.statusCode == 200){
                req.responseData = {
                    statusCode :asyncResponse.statusCode,
                    body:{
                        message: asyncResponse.message
                    }
                }
            }
        }
        return next()
    })
    // catches async errors
    // returns an error statuscode and message
    .catch(err =>{
        req.responseData = {
            statusCode: err.statusCode || 404,
            body: {error: err.message || err}
        }
        return next();
    })
}