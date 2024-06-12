
`use strict`

module.exports = (mongoose, Schema) => {
    const AdoptionFormSchema = new Schema({
        fname: {
            type: String,
            required: true
        },
        lname: {
            type: String,
            required: true
        },
        age: {
            type: Number,
            required: true
        },
        isStudent:{
            type: Boolean,
            default: false
        },
        contactNumber:{
            type: String,
            required: true
        },
        faceBookLink:{
            type: String,
            required: true
        },
        completeHomeAddress:{
            type: String,
            required: true
        },
        noOfPets:{
            type: Number,
            default: 0
        },
        yearsOfBeingPetOwner:{
            type: Number,
            default: 0
        },
        ageOfOldestLivingPet:{
            type: Number,
            default: 0
        },
        adoptedPetFutureAddress:{
            type: String,
            required: true,
        },
        neuterOrSpayAwareness:{
            type: String,
            required: true
        },
        neuterOrSpayWillingness:{
            type: Boolean,
            required: true
        },
        regularVetClinic:{
            type: String,
            default : ""
        },
        inDoorOrOutdoor:{
            type: String,
            default: 'indoor'
        },
        leashOrCaged:{
            type: String,
            default: 'leashed'
        },
        basicNecessities:{
            type: [String],
            default: []
        },
        enrichmentActivity:{
            type: String,
            required: true
        },
        hearAboutUs:{
            type: String,
            default: ""
        },
        idPhotoUrl:{
            type: String,
            default: ""
        },
        animalId:{
            type: Schema.Types.ObjectId,
            required: true
        },
        userEmail:{
            type: String,
            required: true
        },
        status:{
            type:String,
            default:'pending'
        }

    })

    return mongoose.model("AdoptionForms", AdoptionFormSchema);
}