`use strict`

const deleteForumEntry = require("../../controllers/deleteForumEntry");

module.exports = (router) =>{
    router.delete("/deleteForumEntry", deleteForumEntry.deleteForumEntryController);
}