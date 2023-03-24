require('dotenv').config();


const config = {
  env: process.env.NODE_ENV || 'dev',
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  apiKey: process.env.API_KEY,
  jwt_secret: process.env.JWT_SECRET,
  emailTransportHost: process.env.EMAIL_TRANSPORT_HOST,
  emailTransportPort: process.env.EMAIL_TRANSPORT_PORT,
  authEmail: process.env.AUTH_EMAIL,
  authPassword: process.env.AUTH_PASSWORD,
}

module.exports = { config };
