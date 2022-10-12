const { DataSource } = require("typeorm");
const users = require("../entities/user");
const corperations = require("../entities/corperations");
const applications = require("../entities/applications");
const posts = require("../entities/posts");

const AppDataSource = new DataSource({
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [users, corperations, applications, posts],
  synchronize: true,
  logging: false,
  TIME_ZONE: process.env.TIME_ZONE
});

module.exports = { AppDataSource };