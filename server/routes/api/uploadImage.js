`use strict`

const uploadImage = require("../../controllers/uploadImage")

module.exports = (router, upload) =>{
    router.post("/uploadSingleImage", upload.single("image"), uploadImage.uploadImageController)
}