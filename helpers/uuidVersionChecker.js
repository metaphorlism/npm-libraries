const { version: uuidVersion } = require("uuid");
const { validate: uuidValidate } = require("uuid");

const uuidVersionChecker = (uuid) => {
  return uuidValidate(uuid) ? uuidVersion(uuid) : "Not a uuid";
};

module.exports = uuidVersionChecker;
