// Import the functions to be tested
const { encrypt, decrypt } = require('../utils/encryptionService');
require('dotenv').config();

describe('Encryption Service', () => {

    // Sample text to test encryption and decryption
    const sampleText = 'Sensitive data for testing';

    // Test case for the encrypt function
    test('encrypt function should return valid encrypted data structure', () => {
        const encryptedResult = encrypt(sampleText);

        // Check if the returned object contains all required fields
        expect(encryptedResult).toHaveProperty('encryptedData');
        expect(encryptedResult).toHaveProperty('dataIv');
        expect(encryptedResult).toHaveProperty('encryptedUserKey');
        expect(encryptedResult).toHaveProperty('keyIv');

        // Ensure that the fields are not empty
        expect(encryptedResult.encryptedData).not.toBe('');
        expect(encryptedResult.dataIv).not.toBe('');
        expect(encryptedResult.encryptedUserKey).not.toBe('');
        expect(encryptedResult.keyIv).not.toBe('');
    });

    // Test case for the decrypt function
    test('decrypt function should return the original text', () => {
        const encryptedResult = encrypt(sampleText);

        // Decrypt the data and compare it with the original text
        const decryptedData = decrypt(
            encryptedResult.encryptedData,
            encryptedResult.encryptedUserKey,
            encryptedResult.dataIv,
            encryptedResult.keyIv
        );

        expect(decryptedData).toBe(sampleText);
    });

    // Test case for handling incorrect decryption inputs
    test('decrypt function should throw an error for incorrect inputs', () => {
        const encryptedResult = encrypt(sampleText);

        // Modify encrypted data to simulate corruption
        const corruptedData = encryptedResult.encryptedData.slice(0, -1) + '0';

        expect(() => {
            decrypt(
                corruptedData,
                encryptedResult.encryptedUserKey,
                encryptedResult.dataIv,
                encryptedResult.keyIv
            );
        }).toThrow();
    });
});
