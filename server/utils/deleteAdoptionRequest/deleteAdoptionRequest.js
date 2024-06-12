`use strict`

const AdoptionForm = require("../../models").AdoptionForm;

const {generateAdoptionDeclineMessage} = require("../updateAdoptionRequest/adoptionFormMessage");
const sendMessage = require("../createMessage")
// deletes the adoption request document
// notifies user of the decision through admin to user message
module.exports = async({query, userEmail}) =>{
    // delete by id
    const deletedApprovalForm = await AdoptionForm.findByIdAndDelete(query);
    // check if there is a deleted form
    if(Object.keys(deletedApprovalForm).length > 0){
        const data = {
            recieverEmail: userEmail,
            content: generateAdoptionDeclineMessage(),
            senderEmail: "pawslink.upv@gmail.com"
        }
        // send a message to the user
        await sendMessage(data);
    }
    // returns a statuscode and a message
    return {
        statusCode: 200,
        status: "OK",
        message: "deleted the adoption form"
    }
} 