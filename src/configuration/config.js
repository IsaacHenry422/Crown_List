const path = require('node:path'); // Import the path module
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

//console.log('Inside config.js, MONGODB_URI from process.env:', process.env.MONGODB_URI);

module.exports = {
    PORT: process.env.PORT || 4000,
    MONGODB_URI: process.env.MONGODB_URI,
    SESSION_SECRET: process.env.SESSION_SECRET,
    PAYSTACK_SECRET_KEY: process.env.PAYSTACK_SECRET_KEY || 'yourActualPaystackSecretKey',
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || 'yourActualCloudinaryCloudName',
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || 'yourActualCloudinaryApiKey',
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || 'yourActualCloudinaryApiSecret',
    EMAIL_USER: process.env.EMAIL_USER || 'yourActualEmailUser',
    EMAIL_PASS: process.env.EMAIL_PASS || 'yourActualEmailPassword',
    MAILGUN_API_KEY: process.env.MAILGUN_API_KEY || 'yourActualMailgunApiKey',
    MAILGUN_DOMAIN: process.env.MAILGUN_DOMAIN || 'yourMailgunDomain.com',
    FRONTEND_URL: process.env.FRONTEND_URL || 'https://crownlist-staging.vercel.app/',
    NODE_ENV: process.env.NODE_ENV || 'production',
    SESSION_SECRET: process.env.SESSION_SECRET
};