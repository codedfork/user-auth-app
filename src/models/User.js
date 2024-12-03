const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { encrypt, decrypt } = require("../utils/encryptionService");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  encryptedData: String,      // Encrypted user data (e.g., sensitive data like credit card info)
  dataIv: String,             // IV for encrypting the user data
  encryptedUserKey: String,   // Encrypted user-specific key (using master key)
  keyIv: String               // IV for encrypting the user-specific key
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  if (this.isModified('encryptedData')) {
    const encryptedPayload = encrypt(this.encryptedData);  // Encrypt the data before saving
    this.encryptedData = encryptedPayload.encryptedData;
    this.dataIv = encryptedPayload.dataIv;
    this.encryptedUserKey = encryptedPayload.encryptedUserKey;
    this.keyIv = encryptedPayload.keyIv;
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
