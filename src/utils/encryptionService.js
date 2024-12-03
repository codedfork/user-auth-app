const crypto = require('crypto');
require('dotenv').config();

// Master key (from environment variable)
const MASTER_KEY = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');  
const IV_LENGTH = 16;  // IV length for AES is 16 bytes

// Function to encrypt the data
const encrypt = (text) => {
 
  const userKey = crypto.randomBytes(32);  // 32 bytes for AES-256
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv('aes-256-cbc', userKey, iv);
  const encryptedData = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);

  const keyIv = crypto.randomBytes(IV_LENGTH);
  const keyCipher = crypto.createCipheriv('aes-256-cbc', MASTER_KEY, keyIv);
  const encryptedUserKey = Buffer.concat([keyCipher.update(userKey), keyCipher.final()]);

  // Return encrypted data, IV, encrypted user key, and key IV
  return {
    encryptedData: encryptedData.toString('hex'),
    dataIv: iv.toString('hex'),
    encryptedUserKey: encryptedUserKey.toString('hex'),
    keyIv: keyIv.toString('hex')
  };
};

// Function to decrypt the data
const decrypt = (encryptedData, encryptedUserKey, dataIv, keyIv) => {
  // Step 1: Decrypt the user-specific key using the master key
  const keyDecipher = crypto.createDecipheriv('aes-256-cbc', MASTER_KEY, Buffer.from(keyIv, 'hex'));
  const userKey = Buffer.concat([
    keyDecipher.update(Buffer.from(encryptedUserKey, 'hex')),
    keyDecipher.final()
  ]);

  // Step 2: Decrypt the data using the decrypted user-specific key and data IV
  const decipher = crypto.createDecipheriv('aes-256-cbc', userKey, Buffer.from(dataIv, 'hex'));
  const decryptedData = Buffer.concat([
    decipher.update(Buffer.from(encryptedData, 'hex')),
    decipher.final()
  ]);

  return decryptedData.toString('utf8');
};

// Export the functions for use in your application
module.exports = { encrypt, decrypt };
