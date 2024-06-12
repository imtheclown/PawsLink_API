`use strict`

const sendEmailController = require("../../controllers/sendEmail")

module.exports = (router) =>{
    router.post("/sendEmail", sendEmailController.sendEmail)
}