'use strict'
const signUpController = require("../../controllers/signUp")
module.exports = router =>{
    router.post('/signup', signUpController.signUp)
}