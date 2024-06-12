`use strict`
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// add models here
const models = {
    RegisteredUserModel: require("./RegisteredUser"),
    VerifiedUser : require("./VerifiedUser"),
    ForumEntry : require("./ForumEntry"),
    EventEntry: require("./EventEntry"),
    Animal: require("./Animal"),
    AdminLog: require('./AdminLog'),
    AdoptionForm: require("./AdoptionForm"),
    Message: require("./Message"),
    Comment: require("./Comment")
}

let exportModels = {}

for (const fileName in models){
    try{
        exportModels[filename] = mongoose.model(models[fileName])
    }catch (e){
        exportModels[fileName] = models[fileName](mongoose, Schema);
    }
}

module.exports = exportModels;