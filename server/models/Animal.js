const {FertilityStatus, Sex,Status } = require("./CustomTypes")

module.exports = (mongoose, Schema) => {
    const AnimalSchema = new Schema({
        location: {
            type: String,
            required: true,
        },
        mainName: {
            type: String, 
            required: true
        },
        sex:{
            type: String,
            default: Sex.UNDETERMINED,
            required: true
        },
        status: {
            type: [String],
            default: Status.ON_CAMPUS,
            required: true
        },
        coatColor:{
            type: [String],
            default: [],
            required: true
        },
        imgUrl: {
            type: String,
            required: false
        },
        notes: {
            type: [String],
            default: []
        },
        species: {
            type: String,
            required: true
        },
        traitsAndPersonality:{
            type: [String],
            default: []
        },
        disabilities: {
            type: [String],
            required: true,
            default: []
        },
        age: {
            type: Number,
            required: true
        },
        sterilizationDate:{
            type: Date,
            default: null
        }
    },
)
    return mongoose.model("Animals", AnimalSchema)
}