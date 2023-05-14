const fs = require("fs");

const filePath = `${__dirname}/../../data/users.json`;

const users = JSON.parse(fs.readFileSync(filePath, "utf-8"));

class Auth {
  register(user) {
    users.push(user);
    fs.writeFileSync(filePath, JSON.stringify(users), "utf-8", (err) => {
      if (err) return err.message;
    });
  }

  findUserByEmail(email) {
    return users.find((usr) => usr.email === email);
  }
}

module.exports = new Auth();
