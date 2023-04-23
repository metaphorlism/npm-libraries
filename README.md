---
title: "Joi Validator"
disqus: JBeanny
---

By: Yim Sotharoth

docs: https://hackmd.io/@JBeanny/rkTZd7z7h

# Using joi validator

## Table of Contents

[TOC]

## Installation

:::info
_firstly create a node project_

```bash=
$ npm init --y
```

_I named my folder as joi so I cd in my folder_

> In joi folder I installed joi library with the following command

```bash=
$ npm install joi
```

> I also installed a few more libraries such as: mongoose,dotenv,and express

**Note that I used MongoDB as database**
:::

## Folder structure

> This is the folder structure for this testing project

![](https://i.imgur.com/kbY77pH.png)

## Config

> In `config` folder I created a `index.js` file to grab the environment variables with the following code:

```javascript!
require("dotenv").config({ path: ".env.local" });

module.exports = {
  DATABASE_URL: process.env.DATABASE,
  PORT: process.env.PORT || 8080,
};
```

:::info
You can create a .env file and store those sensitive data. In my case I named my env file as `.env.local`
:::

## Create Global Error Handler

> In `utils` I created a `GlobalErrorHandler.js` with the following code:

```javascript!
const GlobalErrorHandler = (error, req, res, next) => {
  res.status(error.status || 500).json({
    success: false,
    status: "Failed !",
    message: error.message,
  });
};

module.exports = GlobalErrorHandler;
```

:::info
By using GlobalErrorHandler we can reduce our try-catch blocks
:::

## Connect to database and config the server

> In `app.js`

```javascript!
const express = require("express");
const app = express();

app.use(express.json());

//global error handler
const GlobalErrorHandler = require("./src/utils/GlobalErrorHandler");

app.get("/", (req, res) => {
  res.send("Hello from Metaphorlism");
});

app.use(GlobalErrorHandler);

module.exports = app;
```

> In `index.js`

```javascript!
const app = require("./app");
const mongoose = require("mongoose");
const { PORT, DATABASE_URL } = require("./src/config");

// connect to database
mongoose.set("strictQuery", false);
mongoose
  .connect(DATABASE_URL)
  .then(() => console.log("Connected to database . . ."))
  .catch((err) => console.log(err));

// start the server
app.listen(PORT, () => {
  console.log(`SERVER IS RUNNING ON PORT: ${PORT}`);
});
```

## Model

> In `models` folder I created a `students.model.js` file with the following code:

```javascript!
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  grade: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Others"],
  },
  details: {
    type: String,
  },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
```

## Controller

> In `controllers` I created a `students.controller.js` file with the following code:

```javascript!
const StudentModel = require("../models/students.model");

class Student {
  async createStudent(req, res) {
    const student = await StudentModel.create(req.body);

    res.status(201).json({
      status: "Success",
      message: "Created Successfully",
      student,
    });
  }
}

module.exports = new Student();
```

## Error Messages

> In `utils` I created a `ErrorMessages.js` file with the following code:

```javascript!
// response status code
const status = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

// not found error
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.status = status.NOT_FOUND;
  }
}

// bad request error
class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.status = status.BAD_REQUEST;
  }
}

// unauthorized request error
class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.status = status.UNAUTHORIZED;
  }
}

module.exports = { BadRequestError, NotFoundError, UnauthorizedError };
```

:::info
The purpose of creating this error classes is just for handling the error messages
:::

## Middleware

> In `middlewares` I created a `bodyValidator.js` file with the following code:

```javascript!
const {
  BadRequestError,
  NotFoundError,
  ServerError,
} = require("../utils/ErrorMessages");

const bodyValidator = (schema) => {
  const Validator = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(new BadRequestError(error.details[0].message));
    }
    next();
  };
  return Validator;
};
module.exports = bodyValidator;
```

:::info
Here is where we are going to implement the joi library
:::

## Validator

> In `validators` I created a `studentSchema.js` file with the following code:

```javascript!
const Joi = require("joi");

const studentSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": "Student name is required" }),
  age: Joi.number()
    .required()
    .messages({ "any.required": "Student age is required" }),
  grade: Joi.number()
    .required()
    .messages({ "any.required": "Student grade is required" }),
  gender: Joi.string().valid("Male", "Female", "Others").required().messages({
    "any.required": "Gender is required",
    "any.only": "Invalid gender type",
  }),
  details: Joi.string().empty(""),
});

module.exports = studentSchema;
```

## Route

> In `routes` I created a `students.routes.js` file with the following code:

```javascript!
const express = require("express");
const router = express.Router();

//controller
const StudentController = require("../controllers/students.controller");

//validator
const bodyValidator = require("../middlewares/bodyValidator");
const studentSchema = require("../validators/studentSchema");

router
  .route("/")
  .post(bodyValidator(studentSchema), StudentController.createStudent);

module.exports = router;
```

## Call student route into app.js

> Let's modify `app.js` a little

```javascript!
const express = require("express");
const app = express();

app.use(express.json());

//global error handler
const GlobalErrorHandler = require("./src/utils/GlobalErrorHandler");

//routes
const STUDENT_ROUTES = require("./src/routes/students.routes");

app.get("/", (req, res) => {
  res.send("Hello from Metaphorlism");
});

app.use("/students", STUDENT_ROUTES);

app.use(GlobalErrorHandler);

module.exports = app;
```

## Testing

> Input with the correct format

![](https://i.imgur.com/nLWfH6y.png)

> Input with the incorrect format

![](https://i.imgur.com/pRSPHbF.png)

> Project Repository : https://github.com/metaphorlism/npm-libraries/tree/npm-joi

### Contact Us

- :mailbox: yimsotharoth999@gmail.com
- [GitHub](https://github.com/metaphorlism)
- [Facebook Page](https://www.facebook.com/Metaphorlism)
- [Instagram: Metaphorlism](https://www.instagram.com/metaphorlism/)
