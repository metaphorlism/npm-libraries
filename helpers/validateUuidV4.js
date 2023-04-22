const { version: uuidVersion } = require("uuid");
const { validate: uuidValidate } = require("uuid");

const uuidValidateV4 = (uuid) => {
  return uuidValidate(uuid) && uuidVersion(uuid) === 4;
};

module.exports = uuidValidateV4;
