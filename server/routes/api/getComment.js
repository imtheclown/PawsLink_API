`use strict`

const getComment = require("../../controllers/getComment");

module.exports = (router) =>{
    router.get("/getComment", getComment.getCommentController);
}