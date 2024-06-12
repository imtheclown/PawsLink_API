`use strict`
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const {AWS_CREDS} = require("../../config")

const s3 = new S3Client({
    credentials:{
        accessKeyId: AWS_CREDS.ACCESS_KEY,
        secretAccessKey: AWS_CREDS.SECRET_ACCESS_KEY
    },
    region: AWS_CREDS.region
})

module.exports = async ({objectKey}) =>{
    const getObjectParams = {
        Bucket: AWS_CREDS.bucket,
        Key: objectKey
    }
    const command = new GetObjectCommand(getObjectParams)
    const url = await getSignedUrl(s3, command, {expiresIn: 43200 } )

    return {
        statusCode: 200,
        status: "OK",
        url
    }
}