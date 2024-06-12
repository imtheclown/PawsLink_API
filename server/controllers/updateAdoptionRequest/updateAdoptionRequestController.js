`use stric`

const updateAdoptionRequest = require("../../utils/updateAdoptionRequest");
const {approvalStatus} = require("../../utils/utilityFunctions/fixedValues");
const {Types} = require("mongoose");
// used to confirm the adoption request
// generally can be used to update the adoption request
module.exports = (req, res, next) =>{
    // request body field is empty
    // return an error statuscode and message
    if(!(req.body && Object.keys(req.body).length > 0)){
        req.responseData = {
            statusCode: 400,
            body:{
                error: "there is no body found"
            }
        }
    }
    try{
        // approve=true
        const body = req.body;
        // checks if required data are given
        if(body._id){
            // generate query
            const data = {};
            if(body.approve){
                data["status"] = approvalStatus.APPROVED
            };
            // attempt to update the adoption request
            updateAdoptionRequest({_id : new Types.ObjectId(body._id) , data})
            .then(result =>{
                if(result.asyncResponse){
                    const asyncResponse = result.asyncResponse;
                    // successful
                    // return success statuscode and message
                    if(asyncResponse.statusCode === 200){
                        req.responseData = {
                            statusCode: asyncResponse.statusCode,
                            messsage: asyncResponse.message
                        }
                        return next();
                    }
                }
                // async operation did not returned a successful statuscode
                // throw an error
                throw new Error("failed to approve the adoption request")
            })
            // catches error due to async operations
            // returns an error statuscode and message
            .catch (err =>{
                console.log(err)
                req.responseData = {
                    statusCode: err.statusCode || 404,
                    body: {error: err.message || err}
                }
                return next();
            });
        // missing required data
        // return an error statuscode and message
        }else{
            req.responseData = {
                statusCode: 404,
                body: {
                    error: "no id provided"
                }
            }
            return next();
        }
    }
    // catches error due to non-async operations
    // returns error statuscode and message
    catch(err){
        err =>{
            console.log(err)
            req.responseData = {
                statusCode: err.statusCode || 404,
                body: {error: err.message || err}
            }
            return next();
        }
    }
}