`use strict`

module.exports = (mongoose, Schema) => {
    const FemaleAnimalSchema = new Schema({
        animalId_FK: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Animal'
        },
        children: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Animal'
        },
        numberPregnancies:{
            type: Number,
            default: 0,
            required: true
        },
    })
}