const { S3Client, PutObjectCommand, GetObjectCommand }  = require("@aws-sdk/client-s3")

const s3Client = new S3Client({
  region: "auto",
  endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID ,
    secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY ,
  },
})

 const uploadFile = async (bucketName, key, body) => {
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: body,
  })

  return s3Client.send(command)
}

 const getFile = async (bucketName, key) => {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  })

  return s3Client.send(command)
}

module.exports = {getFile,uploadFile}

