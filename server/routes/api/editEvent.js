`use strict`

const editEvent = require("../../controllers/editEvent");

module.exports = (router,upload) =>{
    router.put("/editEvent", upload.single("image"), editEvent.editEventController)
}