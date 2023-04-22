const { validate: uuidValidate } = require("uuid");

const uuidValidator = (uuid) => {
  return uuidValidate(uuid);
};

module.exports = uuidValidator;
