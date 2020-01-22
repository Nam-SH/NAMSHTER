

module.exports = {
  "development": {
    "username": "root",
    "password": process.env.DB_PASSWROD,
    "database": "vuenodebird_ch6",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": process.env.DB_PASSWROD,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": process.env.DB_PASSWROD,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}