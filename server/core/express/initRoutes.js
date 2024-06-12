'use strict'
const path = require("path")
// initialize routes in the routes folder
module.exports = app =>{
    try{
        const router = require(path.join(
            '../',
            '../',
            '../',
            'server',
            'routes',
            'api'
        ));
        app.use('/api', router);
    }catch (e) {
        console.error('Unable to load api.js in the routes folder.');
        console.error(e.message || e);
        console.info({});
    }
}