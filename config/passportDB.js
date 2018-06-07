module.exports = {
  "optionsDev": {
    "host": "localhost",
    "port": 3306,
    "user": "root",
    "password": "hello123",
    "database": "bulletin_board"
  },
  "optionsProd": {
    "host": process.env.DB_HOST.trim(),
    "port": parseInt(process.env.DB_PORT.trim()) || 3306,
    "user": process.env.DB_USER.trim(),
    "password": process.env.DB_PASS.trim(),
    "database": process.env.DB_DATABASE.trim(),
  }
}