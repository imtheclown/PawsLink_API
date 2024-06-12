`use strict`

const AdoptionForm = require("../../models").AdoptionForm;

const createMessage = require("../createMessage");

const {generateAdoptionApprovedMesage} = require("./adoptionFormMessage");


module.exports = async ({_id, userEmail, data}) =>{
    console.log(_id, data)
    const res = await AdoptionForm.updateOne({_id: _id}, data, {w: 'majority'});
    if(res.acknowledged){
        // check if update data has status = 'approved'
        if(data && data.status && data.status === 'approved'){
            const newMessage = await createMessage({
                content: generateAdoptionApprovedMesage(),
                recieverEmail: userEmail,
                senderId: "pawslink.upv@gmail.com"
            })
    
            console.log(newMessage);
            return {
                statusCode: 200,
                status: "OK",
                message: "request has been approved"
            }
        }
        return {
            statusCode: 200,
            status: "OK",
            message: "adoption request has been updated"
        }
    }
    return {
        statusCode: 400,
        message: "failed to approve the form"
    }
}