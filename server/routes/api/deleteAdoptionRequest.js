`use strict`

const deleteAdoptionRequest = require("../../controllers/deleteAdoptionForm");

module.exports = (router) =>{
    router.delete("/deleteAdoptionRequest", deleteAdoptionRequest.deleteAdoptionRequestController);
}