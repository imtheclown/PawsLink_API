`use strict`

const getEvent = require("../../controllers/getEvent")

module.exports = (router) =>{
    router.get("/getEvent", getEvent.getEventController);
}