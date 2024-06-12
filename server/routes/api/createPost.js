`use strict`
const createPost = require("../../controllers/createPost")
module.exports = (router, upload) =>{
    router.post("/createPost", upload.single("image"), createPost.createPostController);
}