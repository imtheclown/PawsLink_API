`use strict`

const nodeMailer = require("nodemailer");
const {emailCreds} = require("../../config");

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth:{
        user: emailCreds.username,
        pass: emailCreds.password
    }
})
module.exports = async ({emailAdd, confirmationNumber}) =>{
    // this is for confirmation number only
    const sendOptions = {
        from: {
            name: "Pawslink",
            address: emailCreds.username
        },
        to: emailAdd,
        subject: "Confirm Email",
        text: "Enter the following code in the Pawslink App",
        html: `<b>${confirmationNumber}</b>`
    }
    await transporter.sendMail(sendOptions)
    return {
        statusCode: 200,
        message: 'Email Sent Successfuly',
        status: 'OK'
    }
}