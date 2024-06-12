`use strict`
const getAdoptionRequest = require("../../controllers/getAdoptionRequest")
module.exports = router =>{
    router.get('/getAdoptionRequest', getAdoptionRequest.getAdoptionRequestController);
}