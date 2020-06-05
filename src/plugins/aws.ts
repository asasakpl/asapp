import AWS from 'aws-sdk'
const fs = require('fs')

const BUCKET = 'm35m2'
const REGION = 'eu-central-1'

// remove those keys for production
const ACCESS_KEY = localStorage.getItem('aws_key')
const SECRET_KEY = localStorage.getItem('aws_secret')

AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_KEY,
  region: REGION
})

const s3 = new AWS.S3()

export { s3 }
