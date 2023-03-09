const crypto = require("crypto");

const encryptCandidate = (data) => crypto
  .createHash("sha3-512")
  .update(data)
  .digest("hex");

module.exports = { encryptCandidate };
