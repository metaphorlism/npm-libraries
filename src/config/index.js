require("dotenv").config({ path: ".env.local" });

module.exports = {
  DATABASE_URL: process.env.DATABASE,
  PORT: process.env.PORT || 8080,
};
