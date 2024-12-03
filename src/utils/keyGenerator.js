const crypto = require("crypto");
const length = 32;
const key = crypto.randomBytes(length);

console.log(key.toString('hex'));
