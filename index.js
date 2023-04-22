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
