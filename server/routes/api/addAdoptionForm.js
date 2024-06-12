`use strict`

const addAdoptionForm = require("../../controllers/addAdoptionForm")

// animal image should be the key name on the form data object of axios
// key : animalImage
module.exports = (router, upload) =>{
    router.post('/addAdoptionForm', upload.single("image"), addAdoptionForm.addAdoptionFormController);
} 