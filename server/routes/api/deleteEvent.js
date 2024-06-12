`use strict`

const deleteEvent = require("../../controllers/deleteEvent");

module.exports = (router) =>{
    router.delete("/deleteEvent", deleteEvent.deleteEventController);
}