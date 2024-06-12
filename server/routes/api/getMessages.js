`use strict`

const getMessage = require("../../controllers/getMessage");

module.exports = router =>{
    router.get('/getMessage', getMessage.getMessageController);
}