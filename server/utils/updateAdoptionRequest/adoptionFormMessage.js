`use strict`

const generateAdoptionDeclineMessage = ({animalName}) => {
    return `We are sorry to tell you that your request to adopt ${animalName} has been declined`
}

const generateAdoptionApprovedMesage = ({animalName}) => {
    return `We are happy to tell you that your request to adoption ${animalName} has been approved.
    Please check your notifications and fill up the form to finish the process
    
    Thank you very much.`
}

module.exports = {
    generateAdoptionApprovedMesage,
    generateAdoptionDeclineMessage
}