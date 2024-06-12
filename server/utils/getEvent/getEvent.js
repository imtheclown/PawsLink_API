const EventEntry = require("../../models/EventEntry");

`use strict`

const EventEntrySchema = require("../../models").EventEntry;

module.exports = async (query) =>{
    // {} for all
    // _id for single event
    const data = await EventEntrySchema.find(query);
    return {
        statusCode: 200,
        data
    }
}

