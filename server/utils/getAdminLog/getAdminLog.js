
`use strict`

const adminLog = require("../../models").AdminLog;

// should only get the collection and from what date
module.exports = async ({collectionName, startDate, _id}) =>{
    const query = {};

    // if(startDate){
    //     query["dateCreated"] = {$gt: startDate};
    // }
    if(collectionName){
        query["collectionName"] = collectionName;
    }
    if(_id){
        query["_id"] = { $gt: _id}
    }
    const updates = await adminLog.find(query).sort({_id:1});
    return {
        statusCode: 200,
        status: "OK",
        data: updates
    }
}