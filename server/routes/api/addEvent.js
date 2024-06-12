`use strict`
const addEvent = require("../../controllers/addEvent");
module.exports = (router, upload) =>{
    router.post("/addEvent", upload.single("image"), addEvent.addEventController);
}