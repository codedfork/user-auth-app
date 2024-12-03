const mongoose = require("mongoose");
const User = require("../models/User");
const messages = require("../lang/messages");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {decrypt} = require('../utils/encryptionService');

// Controller to get a user by ID
exports.getUserById = async (req) => {
    const { id } = req.params;
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw { statusCode: 400, message: messages.errors.invalidUserIdFormat }; // Custom error object
    }

    // Fetch user from the database
    const user = await User.findById(id);
    if (!user) {
        throw { statusCode: 404, message: messages.errors.userNotFound }; // Custom error for non-existent user
    }
    return { name: user.name }; // Data returned to the handler for response formatting
};

exports.registerUser = async (req, res) => {
    let { name, email, password ,sensitiveData} = req.body;
    try {
      const user = new User({ name, email, password, encryptedData: JSON.stringify(sensitiveData) });
      await user.save();
    } catch (error) {
        throw { statusCode: 404, message: messages.errors.registrationFailed, error:error };
    }
  }

  //Login user and generate token

  exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
    {
      throw { statusCode: 401, message: messages.errors.invalidCredentials };
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
    return { token : token }
  }

  
  //Get encrypted data
   exports.getSensetiveData = async (req, res) => {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user)
    {
      throw { statusCode: 404, message: messages.errors.userNotFound };
    }
     // Return the token and encrypted data (you may need to decrypt this part)
     const decryptedData = await decryptSensitiveData(user); // Assume you have a decryption function
     return JSON.parse(decryptedData);
  }

  // To get decrypted data
  const decryptSensitiveData = async (user) => {
    const decryptedData = await decrypt(user.encryptedData, user.encryptedUserKey, user.dataIv, user.keyIv);
    return decryptedData;
  };