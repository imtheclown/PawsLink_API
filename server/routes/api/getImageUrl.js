`use strict`

const getImageUrl = require("../../controllers/getImageUrl")

module.exports = (router) =>{
    router.get("/getImageUrl", getImageUrl.getImageUrlController);
}