// login.test.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../src/models/User'); 
const { login } = require('../src/controllers/userController'); 
const messages = require('../src/lang/messages'); 

// Mocking external dependencies
jest.mock('bcrypt');
jest.mock('jsonwebtoken');
jest.mock('../src/models/User'); // Mocking the User model

describe('Login function', () => {

  it('should return a token if the credentials are valid', async () => {
    const req = {
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    };
    const res = {};

    // Mock the User.findOne method to return a user object
    const user = {
      _id: 'user123',
      email: 'test@example.com',
      password: 'hashedPassword123',  // Assume this is the hashed password in the DB
    };

    User.findOne.mockResolvedValue(user); // Mock that user is found in the DB

    // Mock bcrypt.compare to return true (passwords match)
    bcrypt.compare.mockResolvedValue(true);

    // Mock jwt.sign to return a token
    const mockToken = 'mockJwtToken';
    jwt.sign.mockReturnValue(mockToken);

    // Call the login function
    const result = await login(req, res);

    // Assertions
    expect(result).toEqual({ token: mockToken });
    expect(User.findOne).toHaveBeenCalledWith({ email: req.body.email });
    expect(bcrypt.compare).toHaveBeenCalledWith(req.body.password, user.password);
    expect(jwt.sign).toHaveBeenCalledWith(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  });

  it('should throw an error if the credentials are invalid', async () => {
    const req = {
      body: {
        email: 'invalid@example.com',
        password: 'wrongPassword',
      },
    };
    const res = {};

    // Mock the User.findOne method to return null (no user found)
    User.findOne.mockResolvedValue(null);

    try {
      await login(req, res);
    } catch (error) {
      // Assertions
      expect(error).toEqual({
        statusCode: 401,
        message: messages.errors.invalidCredentials,
      });
    }
  });

  it('should throw an error if password comparison fails', async () => {
    const req = {
      body: {
        email: 'test@example.com',
        password: 'password123',
      },
    };
    const res = {};

    // Mock the User.findOne method to return a user object
    const user = {
      _id: 'user123',
      email: 'test@example.com',
      password: 'hashedPassword123',
    };

    User.findOne.mockResolvedValue(user); // Mock user found in DB

    // Mock bcrypt.compare to return false (passwords do not match)
    bcrypt.compare.mockResolvedValue(false);

    try {
      await login(req, res);
    } catch (error) {
      // Assertions
      expect(error).toEqual({
        statusCode: 401,
        message: messages.errors.invalidCredentials,
      });
    }
  });
});
