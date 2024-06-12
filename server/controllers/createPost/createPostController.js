`use strict`

const createPost = require("../../utils/createPost");
const mongoose = require('mongoose')
// used to create post in the forum page
// checks if required data are given
// error handling
// type conversions
module.exports = (req, res, next) =>{
    // request body is empty
    // return a failed statuscode
    if(!(req.body && Object.keys(req.body))){
        req.responseData = {
            statusCode: 400,
            body: {error: "post method has no body"}
            };
        return next();
    }
    //get the image from the buffer
    let queryData = {}
    // get the image from the request body
    if(req.file){
        queryData["Body"] = req.file.buffer;
        queryData["ContentType"] = req.file.mimetype;
        queryData["withPhoto"] = true
    }
    const body =  req.body;
    // check if required data are given
    if(body.username && body.email && body.title && body.content){
        queryData["username"] = body.username;
        queryData["email"] = body.email
        queryData["title"] = body.title;
        queryData["content"] = body.content 
    }
    try{
        // attempt to create a post
        createPost(queryData)
        .then(result =>{
            if(result.asyncResponse){
                const asyncResponse = result.asyncResponse;
                // successful creation of new post document
                // return a successful statuscode and message
                if(asyncResponse.statusCode === 201){
                    req.responseData = {
                        statusCode: asyncResponse.statusCode,
                        body: {
                            message: 'post created successfully'
                        }
                    }
                    return next();
                }
    
            }
        // error occured in asynchronous operation
        // return a failed statuscode and message
        }).catch(err => {
            console.log(err);
            req.responseData = {
                statusCode: 400,
                body: {error: 'failed to create post'}
            }
            return next();
        })
    // error in non-async operation
    // return a failed statuscode and message
    }catch{
        req.responseData = {
            statusCode: 404,
            body: {error: 'failed to create post'}
        }
        return next();
    }

}