`use strict`

const EventEntry = require("../../models").EventEntry;
// deletes the specified event document
module.exports = async(query) =>{
    // deletes the event
    await EventEntry.findByIdAndDelete(query);
    // returns statuscode and message
    return {
        statusCode: 200,
        status: "OK",
        message: "event deleted successfully"
    }
}