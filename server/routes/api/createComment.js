`use strict`

const createComment = require("../../controllers/createComment");

module.exports = (router, upload) =>{
    router.post("/createComment", upload.single("image"), createComment.createCommentController);
}