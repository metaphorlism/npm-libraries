const bcrypt = require("bcrypt");

const passwordEncoder = async (plainTextPassword) => {
  try {
    return await bcrypt.hash(plainTextPassword, 10);
  } catch (err) {
    throw err;
  }
};

module.exports = passwordEncoder;
