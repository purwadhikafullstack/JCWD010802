const path = require("path")
require("dotenv").config({path: path.resolve(__dirname, "../.env")})

module.exports = {
  development: {
    username: process.env.USERNAME_SQL,
    password: process.env.PASSWORD_SQL,
    database: process.env.DATABASE_NAME,
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: process.env.USERNAME_SQL,
    password: process.env.PASSWORD_SQL,
    database: process.env.DATABASE_NAME,
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "jcwd010802",
    password: "jcwd010802",
    database: "jcwd010802",
    host: "adminer2.purwadhikabootcamp.com",
    dialect: "mysql",
  },
}
