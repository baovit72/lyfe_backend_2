const development = {
  database: "lyfe",
  username: "root",
  password: "lyfe_db_password!@#$",
  host: "localhost",
  dialect: "mysql",
};

const testing = {
  database: "databasename",
  username: "username",
  password: "password",
  host: "localhost",
  dialect: "sqlite" || "mysql" || "postgres",
};

const production = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST || "localhost",
  dialect: "sqlite" || "mysql" || "postgres",
};

module.exports = {
  development,
  testing,
  production,
};
