`use strict`
// add the controller here
const addAnimal = require("../../controllers/addAnimal");

// animal image should be the key name on the form data object of axios
// key : animalImage
module.exports = (router, upload) =>{
    router.post('/addAnimal', upload.single("image"), addAnimal.addAnimalController)
} 