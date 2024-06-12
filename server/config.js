const dbCredentials = {
    username: '',
    password: '',
}
// for mongoose
const dbUri = `` 
const port = 3030;

// for nodemailer
const emailCreds ={
    username: '',
    password: ''
}
// for aws s3 
const AWS_CREDS = {
    bucket: "",
    region: "",
    username: "",
    pass: "",
    console_sign_in_url :"",
    ACCESS_KEY : "",
    SECRET_ACCESS_KEY: ""
}

module.exports = {
    dbCredentials,
    dbUri,
    port,
    emailCreds,
    AWS_CREDS
}