const dotenv = require('dotenv')

dotenv.config()

module.exports = 
{
  "development": {
    "username": "root",
    "password": process.env.DB_PASSWORD,
    "database": "vuenodebird_ch6_D",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": process.env.DB_PASSWORD,
    "database": "vuenodebird_ch6_T",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": process.env.DB_PASSWORD,
    "database": "vuenodebird_ch6_P",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
