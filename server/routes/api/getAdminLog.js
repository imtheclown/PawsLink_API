`use strict`

const getAdminLog = require("../../controllers/getAdminLog")

module.exports = (router) =>{
    router.get("/getAdminLog", getAdminLog.getAdminLogController);
}