'use strict'

const updateAdoptionRequest = require("../../controllers/updateAdoptionRequest")
module.exports = (router, upload) =>{
    router.put('/updateAdoptionRequest',upload.single("image"), updateAdoptionRequest.updateAdoptionRequestController);
}