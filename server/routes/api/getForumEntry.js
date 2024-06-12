`use strict`

const getForumeEntry = require("../../controllers/getForumEntry");
module.exports = (router) =>{
    router.get("/getForumEntry", getForumeEntry.getForumEntryController);
}