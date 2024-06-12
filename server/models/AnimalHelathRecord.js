`use strict`
module.exports = (mongoose, Schema) => {
    const AnimalHealthRecordSchema = new Schema({
        animalId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Animal',
            required: true
        },
        medication: {
            type: mongoose.Schema.Types.Mixed,
            required: false,
            default: {
                medicationName: "",
                medicationBrand: "",
                brand: ""
            }
        },
        veterinarian:{
            type: String,
            required: false,
        },
        clinic:{
            type: String,
            required: false
        },
        dateGiven:{
            type: Date,
            required: false
        }
    });
    return mongoose.model("AnimalHealthRecord", AnimalHealthRecordSchema);
}