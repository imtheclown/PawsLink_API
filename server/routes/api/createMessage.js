`use strict`
const createMessage = require("../../controllers/createMessage");
module.exports = (router, upload) =>{
    router.post("/createMessage", upload.single("image"), createMessage.createMessageController);
}