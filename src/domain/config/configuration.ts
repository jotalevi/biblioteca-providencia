export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  enable_api_error_messages: process.env.ENABLE_API_ERROR_MESSAGES,
  postgres: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
      ca: process.env.DB_SSL_CA,
    },
    synchronize: process.env.SYNCHRONIZE,
  },
  emails: {
    key: process.env.SEND_GRID_KEY,
    from: process.env.EMAIL_FROM_ADDRESS,
  },
  aws: {
    bucket: process.env.AWS_S3_BUCKET_NAME,
    accessKey: process.env.AWS_S3_ACCESS_KEY_ID,
    secretKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    region: process.env.AWS_S3_REGION,
  },
})

console.log('configuration', {
  port: parseInt(process.env.PORT, 10) || 3000,
  enable_api_error_messages: process.env.ENABLE_API_ERROR_MESSAGES,
  postgres: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: {
      ca: process.env.DB_SSL_CA,
    },
    synchronize: process.env.SYNCHRONIZE,
  },
  emails: {
    key: process.env.SEND_GRID_KEY,
    from: process.env.EMAIL_FROM_ADDRESS,
  },
  aws: {
    bucket: process.env.AWS_S3_BUCKET_NAME,
    accessKey: process.env.AWS_S3_ACCESS_KEY_ID,
    secretKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    region: process.env.AWS_S3_REGION,
  },
})
