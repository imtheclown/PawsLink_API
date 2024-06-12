`use strict`

const deleteComment = require("../../controllers/deleteComment");

module.exports = (router) =>{
    router.delete('/deleteComment', deleteComment.deleteCommentController);
}