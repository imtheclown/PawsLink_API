'use strict'

const getAnimals = require("../../controllers/getAnimals").getAnimals
module.exports = router =>{
    router.get('/getanimals', getAnimals);
}