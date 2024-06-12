`use strict`

const findUserByEmail = require("../../controllers/findUserByEmal")

module.exports = (router) =>{
    router.get("/findUser", findUserByEmail.findUserByEmailController)
}