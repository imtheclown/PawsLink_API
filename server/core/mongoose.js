const mongoose = require('mongoose')
const cfg = require("../config");

module.exports = async () =>{
    if(mongoose.connection.readyState !== 1){
        console.info('Connecting to MongoDB');
        
        mongoose.connect(cfg.dbUri);
        const dbConnection = mongoose.connection;

        dbConnection.on('error', ()=>{
            console.error("Could not connect to MongoDB!")
            console.error("Will not run server...");
            process.exit(0);
        })
        dbConnection.on('disconnected', function() {
            console.error('Disconnected from MongoDB!');
            console.error('Need to restart server.');
            process.exit(0);
    
        });
        dbConnection.on('connected', function() {
            console.info();
            console.info('Connected to MongoDB successfully!');
            console.info();

            return dbConnection;
        })
    }else {
        console.info('Mongo already connected.');
    }
}