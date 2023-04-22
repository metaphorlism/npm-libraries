---
title: "UUIDV4"
disqus: JBeanny
---

By: Yim Sotharoth

docs: https://hackmd.io/@JBeanny/rJUL26xQ2

# Using npm uuid package

## Table of Contents

[TOC]

## Installation

:::info
_firstly create a node project_

```bash=
$ npm init --y
```

_I named my folder as uuid so I cd in my folder_

> In uuid folder I install uuid library with the following command

```bash=
$ npm install uuid
```

:::

## Generate uuidv4

> In index.js I generated a uuidv4 like this:

```javascript!
const { v4: uuidv4 } = require("uuid");

// uuidv4
const uuidV4 = uuidv4();

console.log("uuidv4:", uuidV4); // example: 86d24ae5-ac1d-4753-94a0-a6d2b5a43246
```

:::success
This is the result I got from the console.log

> uuidv4: 86d24ae5-ac1d-4753-94a0-a6d2b5a43246
> :::

## Create function to validate uuid

_I created a folder called 'helpers'_

> In 'helpers' I created a file called uuidValidator.js with the following code:

```javascript!
const { validate: uuidValidate } = require("uuid");

const uuidValidator = (uuid) => {
  return uuidValidate(uuid);
};

module.exports = uuidValidator;
```

:::info
This function will return boolean
:::

## Create function to check the uuid's version

> In 'helpers' I created a file called uuidVersionChecker.js with the following code:

```javascript!
const { version: uuidVersion } = require("uuid");
const { validate: uuidValidate } = require("uuid");

const uuidVersionChecker = (uuid) => {
  return uuidValidate(uuid) ? uuidVersion(uuid) : "Not a uuid";
};

module.exports = uuidVersionChecker;
```

:::info
This function will return the version of the uuid if the input is a uuid and will return 'Not a uuid' if it's not a uuid
:::

## Create function to validate uuidv4

> In 'helpers' I created a file called uuidValidateV4.js with the following code:

```javascript!
const { version: uuidVersion } = require("uuid");
const { validate: uuidValidate } = require("uuid");

const uuidValidateV4 = (uuid) => {
  return uuidValidate(uuid) && uuidVersion(uuid) === 4;
};

module.exports = uuidValidateV4;
```

:::info
This function will return boolean
:::

## Final code

> I tested out all the functions in index.js

```javascript!
const { v4: uuidv4 } = require("uuid");
const uuidValidator = require("./helpers/uuidValidator");
const uuidVersionChecker = require("./helpers/uuidVersionChecker");
const uuidValidateV4 = require("./helpers/validateUuidV4");

// uuidv4
const uuidV4 = uuidv4();
const simpleTxt = "Hello from Metaphorlism";

console.log("uuidv4:", uuidV4); // example: 86d24ae5-ac1d-4753-94a0-a6d2b5a43246

// validate uuid
console.log(`'${uuidV4}' ${uuidValidator(uuidV4) ? "is" : "is not"} a uuid`);

// check uuid version
console.log(`'${uuidV4}' is version: `, uuidVersionChecker(uuidV4));
console.log(`'${simpleTxt}: `, uuidVersionChecker(simpleTxt));

// validate if it is a uuidv4
console.log(
  `'${simpleTxt}' ${uuidValidateV4(simpleTxt) ? "is" : "is not"} a uuidv4`
);
console.log(`'${uuidV4}' ${uuidValidateV4(uuidV4) ? "is" : "is not"} a uuidv4`);

```

> Project Repository : https://github.com/metaphorlism/npm-libraries/tree/npm-uuid

### Contact Us

- :mailbox: yimsotharoth999@gmail.com
- [GitHub](https://github.com/metaphorlism)
- [Facebook Page](https://www.facebook.com/Metaphorlism)
- [Instagram: Metaphorlism](https://www.instagram.com/metaphorlism/)
