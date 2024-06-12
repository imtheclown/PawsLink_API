`use strict`

const sendEmail = require("../../utils/sendEmail");
// uses thir party software (nodemailer) to send emails
// sends basic email
// modify based on use
module.exports = (req, res, next) =>{
    // request body field is empty
    // return an error status code and messsage
    if(!req.body || !Object.keys(req.body).length ){
        req.responseData = {
            statusCode: 400,
            body: {error: "no parameters found"}
        }
        return next();
    }
    // attempt to send email
    sendEmail({emailAdd:req.body.emailAdd,confirmationNumber : req.body.confirmationNumber })
    .then(response => {
        if(response && response.asyncResponse){
            const asyncResponse = response.asyncResponse
            // successful
            // return a success statuscode and message
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
    // catches error due to async operations
    // returns an error statuscode and message
    .catch(err =>{
        req.responseData = {
            statusCode: err.statusCode || 404,
            body: {error: err.message || err}
        }
        return next();
    })

}