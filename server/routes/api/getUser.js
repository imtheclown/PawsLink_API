`use strict`
const getUser = require("../../controllers/getUser");

module.exports = router =>{
    router.get('/getUser', getUser.getUserController);
}