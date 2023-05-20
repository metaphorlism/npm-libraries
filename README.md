---
title: "Bcrypt"
disqus: JBeanny
---

By: Yim Sotharoth

docs: https://hackmd.io/@JBeanny/SJfTdaBB3

# Using npm bcrypt package

## Table of Contents

[TOC]

## Installation

:::info
_firstly create a node project_

```bash=
$ npm init --y
```

_I named folder as `bcrypt` ( or anything you want ) so I cd in my folder_

> In `bcrypt` folder install a few libraries with the following command

```bash=
$ npm install bcrypt express
```

:::

## Create a simple server with express

> In `index.js` created a simple server like this:

```javascript!
const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("HELLO FROM METAPHORLISM");
});

app.listen(8080, () => {
  console.log(`Server is running on port : 8080`);
});

```

:::success
With this above code we have a GET request on PORT: 8080
:::

---

## Create utility functions

_Created a folder called `utils`_

### Function to encrypt password

> In `utils` I created a file called `PasswordEncoder.js` with the following code:

```javascript!
const bcrypt = require("bcrypt");

const passwordEncoder = async (plainTextPassword) => {
  try {
    return await bcrypt.hash(plainTextPassword, 10);
  } catch (err) {
    throw err;
  }
};

module.exports = passwordEncoder;
```

---

### Function to compare password

> In `utils` I created a file called `PasswordValidator.js` with the following code:

```javascript!
const bcrypt = require("bcrypt");

const comparePassword = async (plainTextPassword, hashedPassword) => {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

module.exports = comparePassword;
```

---

### Function to generate random ID

> In `utils` I created a file called `PasswordValidator.js` with the following code:

```javascript!
const generateRandomId = (length) => {
  let result = "";
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

module.exports = generateRandomId;
```

---

### Function to generate access token

> In `utils` I created a file called `PasswordValidator.js` with the following code:

```javascript!
const generateAccessToken = (length) => {
  let result = "";
  const characters =
    "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

module.exports = generateAccessToken;
```

:::warning
Note that this function is only used for this testing purpose only. It is not secure to generate the token for your production this way.

But you can use JWT to generate the secured access token

Link: https://www.npmjs.com/package/jsonwebtoken
:::

---

## Temporary data store

> Create a folder called `data` and create a file name `users.json` to store the data

_Demo data structure for `users.json` file will be like this_

```javascript!
[
  {
    "username": "Tharoth",
    "email": "metaphorlism@gmail.com",
    "password": "$2b$10$iVHPveTJzd88fr5qm2KKo.PJqQo3OZDinZ1Ztak4eY8v3FuGMIByi",
    "id": "2iry0owncxjb"
  }
]
```

---

## Create model for the register / login

> Create a folder called `models`

_Create a file called `auth.model.js` inside `models` folder with the following code:_

```javascript!
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
```

:::info
Use node file system (fs) library to read/write data from the `users.json` file
:::

## Create controller for the register / login

> Create a folder called `controllers`

_Create a file called `auth.controllers.js` inside `controllers` folder with the following code:_

```javascript!
const AuthModel = require("../models/auth.model");
const passwordEncoder = require("../utils/PasswordEncoder");
const comparePassword = require("../utils/PasswordValidator");
const generateRandomId = require("../utils/RandomIdGenerator");
const generateAccessToken = require("../utils/TokenGenerator");

class Auth {
  async register(req, res) {
    try {
      //encrypt the user input password before storing to the json file
      req.body.password = await passwordEncoder(req.body.password);
      req.body.id = generateRandomId(12);

      AuthModel.register(req.body);

      res.status(201).json({
        status: "Success",
        message: "User created successfully !",
      });
    } catch (error) {
      res.status(500).json({
        status: "Fail",
        message: error.message,
      });
    }
  }

  async login(req, res) {
    try {
      //find if user exists
      const user = AuthModel.findUserByEmail(req.body.email);

      // if user exists
      if (user) {
        // compare the input password and the stored password
        if (await comparePassword(req.body.password, user.password)) {
          // generate access token with the length of 100
          const token = generateAccessToken(100);
          return res.status(200).json({
            status: "Success",
            message: "Login Successfully !",
            token: token,
          });
        }
        // if compare failed
        return res.status(403).json({
          status: "Fail",
          message: "Incorrect Login Credentials !",
        });
      }

      // if user is not found
      res.status(400).json({
        status: "Fail",
        message: `No user with email: ${req.body.email}`,
      });
    } catch (error) {
      res.status(500).json({
        status: "Fail",
        message: error.message,
      });
    }
  }
}

module.exports = new Auth();
```

## Create routes for the register / login

> Create a folder called `routes`

_Create a file called `auth.routes.js` inside `routes` folder with the following code:_

```javascript!
const express = require("express");
const router = express.Router();

//controller
const Auth = require("../controllers/auth.controller");

router.post("/register", Auth.register);
router.post("/login", Auth.login);

module.exports = router;
```

## Modify the `index.js`

```javascript!
const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("HELLO FROM METAPHORLISM");
});

//routes
const AUTH = require("./src/routes/auth.routes");

app.use("/auth", AUTH);

app.listen(8080, () => {
  console.log(`Server is running on port : 8080`);
});

```

## Demo

> Register

_Postman_

![](https://hackmd.io/_uploads/BkmjyCrHn.png)

_After sending request we can see the data is inserted into `users.json`_

![](https://hackmd.io/_uploads/BkfkgRBrn.png)

> Login

![](https://hackmd.io/_uploads/B17GxRHSn.png)

> Project Repository : https://github.com/metaphorlism/npm-libraries/tree/npm-bcrypt

### Contact Us

- :mailbox: yimsotharoth999@gmail.com
- [GitHub](https://github.com/metaphorlism)
- [Facebook Page](https://www.facebook.com/Metaphorlism)
- [Instagram: Metaphorlism](https://www.instagram.com/metaphorlism/)
