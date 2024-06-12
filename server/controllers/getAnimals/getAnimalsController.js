'use strict'
const {Types} = require("mongoose")
const getAnimals = require("../../utils/getAnimals")
// retrieves animal document from the database
module.exports = (req, res, next) =>{
    // if there is no query, then return all animals
    var query = {}
    if(req.query || Object.keys(req.query) > 0){
        // search by id
        // seperate the id of multiple animals by comma 
        if(req.query._id){
            query["_id"] = new Types.ObjectId(req.query._id)
        };
        // get animal documents by species
        if(req.query.species){
            query["species"] = req.query.species;
        };
        // get animal document by status
        if(req.query.status){
            query["status"] = {$in: [req.query.status]}
        }
        // attempt to retrieve animal documents
        getAnimals(query)
        .then(response =>{
            if( response && response.asyncResponse){
                var asyncResponse = response.asyncResponse;
                // successful
                // returns a success statuscode and message
                // returns list of animal document in JSON format
                if(asyncResponse.status === "OK"){
                    req.responseData = {
                        statusCode: asyncResponse.statusCode,
                        body: asyncResponse.data
                    }
                }else{
                    // async operation did not returned a successful statuscode
                    // throw an error
                    throw new Error({
                        statusCode: 404,
                        message: "animal query failed"
                    })
                }
            }
            return next();
        })
        // catches errors due to async operations
        // returns an error statuscode and message
        .catch(err =>{
            req.responseData = {
                statusCode: err.statusCode || 404,
                body: {error: err.message || err}
            }
            return next();
        })
    }
}