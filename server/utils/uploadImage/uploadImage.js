`use strict`
const AWS_CREDS = require("../../config").AWS_CREDS
const {S3Client, PutObjectCommand} = require("@aws-sdk/client-s3")
// uploads image to the s3 bucket
const s3 = new S3Client({
    // s3 credentials
    credentials:{
        accessKeyId: AWS_CREDS.ACCESS_KEY,
        secretAccessKey: AWS_CREDS.SECRET_ACCESS_KEY
    },
    region: AWS_CREDS.region
})

module.exports = async ({Key, Body, ContentType}) =>{
    // generate the query object
    const params = {
        Bucket: AWS_CREDS.bucket,
        Key,
        Body,
        ContentType
    }
    // creates a new s3 command
    const command = new PutObjectCommand(params)
    // upload the image
    await s3.send(command)
    // return a statuscode and message
    return {
        statusCode: 200, 
        status: "OK",
        message: "Image uploaded successfully"
    }
}