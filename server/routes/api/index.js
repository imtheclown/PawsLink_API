'use strict'
// this is where we add routes
const router = require("express").Router();
// this is middleware for images 
const multer = require("multer")
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })


// get methods
require("./getAnimals")(router);
require("./findUserByEmail")(router);
require("./getImageUrl")(router);
require("./getAdminLog")(router);
require("./getEvent")(router);
require("./getAdoptionRequest")(router);
require("./getMessages")(router);
require("./getUser")(router);
require("./getForumEntry")(router);
require("./getComment")(router);

// post methods
require("./signUp")(router);
require("./sendEmail")(router);
require("./addEvent")(router, upload);
require("./addAdoptionForm")(router, upload);
require("./createMessage")(router, upload);
require("./createComment")(router, upload);

// delete methods
require("./deleteAdoptionRequest")(router);
require("./deleteEvent")(router);
require("./deleteForumPost")(router);
require("./deleteComment")(router);

// update method
require("./updateAnimal")(router, upload);
require("./updateAdoptionRequest")(router, upload);
require("./editEvent")(router, upload);

// // with images
require("./uploadImage")(router, upload);
require("./addAnimal")(router, upload);
require("./createPost")(router, upload);

module.exports = router;
