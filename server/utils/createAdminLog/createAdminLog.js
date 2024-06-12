`use strict`

const adminLog = require("../../models").AdminLog;
// create a new admin log document
module.exports = async ({collectionName, documentId, method}) =>{
    // creates the new admin log document
    await adminLog.create({
        collectionName,
        documentId,
        method
    })
    // return statuscode and message
    return {
        statusCode: 200,
        status: 'OK',
        message: 'admin log created successfully'
    }
}