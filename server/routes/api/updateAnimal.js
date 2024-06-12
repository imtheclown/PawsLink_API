const updateAnimal = require("../../controllers/updateAnimal");

module.exports = (router, upload) =>{
    router.put('/updateAnimal', upload.single('image'),  updateAnimal.updateAnimal);
}