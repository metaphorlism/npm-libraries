---
title: "Nodemailer"
disqus: JBeanny
---

By: Yim Sotharoth

docs: https://hackmd.io/@JBeanny/SJPnNjNEn

# Using npm nodemailer package

## Table of Contents

[TOC]

## Installation

:::info
_firstly create a node project_

```bash=
$ npm init --y
```

_I named folder as `nodemailer` ( or anything you want ) so I cd in my folder_

> In nodemailer folder install a few libraries with the following command

```bash=
$ npm install nodemailer express dotenv
```

:::

## Create a simple server with express

> In index.js created a simple server like this:

```javascript!
const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello From Metaphorlism");
});

app.listen(8080, () => {
  console.log(`Server is listening on port: 8080`);
});

```

:::success
With this above code we have a GET request on PORT: 8080
:::

## Create function to send email

_Before getting into creating our function we need to setup our creds on sendinblue_

> Navigate to sendinblue and create your smtp

Link: https://www.sendinblue.com

_Created a file called .env to store our sensitive creds_

> In .env file:

```javascript!
SMTP_PASSWORD='YOUR-SMTP-PASSWORD'
```

_Created a folder called `utils`_

> In `utils` I created a file called email.js with the following code:

```javascript!
const { createTransport } = require("nodemailer");
require("dotenv").config({});

// Create a transporter object
let transporter = createTransport({
  host: "smtp-relay.sendinblue.com",
  port: 587,
  auth: {
    user: "metaphorlism@gmail.com",
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendEmail = (res, receiver, subject, text) => {
  // Create a mailOptions object
  let mailOptions = {
    from: "metaphorlism@gmail.com",
    to: receiver,
    subject: subject,
    text: text,
  };

  // Send the email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return res.status(500).json({
        status: "Fail",
        message: error.message,
      });
    } else {
      res.status(200).json({
        status: "Success",
        message: info.response,
      });
    }
  });
};

module.exports = sendEmail;

```

## Create a POST request and trigger `sendEmail` function

> In `index.js` create a new request:

```javascript!
app.post("/", (req, res) => {
  const { receiver, subject, text } = req.body;
  sendEmail(res, receiver, subject, text);
});
```

## Completed code for `index.js`

> In 'helpers' I created a file called uuidValidateV4.js with the following code:

```javascript!
const express = require("express");
const app = express();
const sendEmail = require("./utils/email");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello From Metaphorlism");
});

app.post("/", (req, res) => {
  const { receiver, subject, text } = req.body;
  sendEmail(res, receiver, subject, text);
});

app.listen(8080, () => {
  console.log(`Server is listening on port: 8080`);
});

```

## Demo

![](https://hackmd.io/_uploads/r1bnDjNVh.png)

![](https://hackmd.io/_uploads/Hkp5viEV2.png)

> Project Repository : https://github.com/metaphorlism/npm-libraries/tree/npm-nodemailer

### Contact Us

- :mailbox: yimsotharoth999@gmail.com
- [GitHub](https://github.com/metaphorlism)
- [Facebook Page](https://www.facebook.com/Metaphorlism)
- [Instagram: Metaphorlism](https://www.instagram.com/metaphorlism/)
