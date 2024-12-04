// Import dependencies
const { getUserById } = require('../controllers/userController'); // Adjust the path
const User = require('../models/User'); // Import the User model
const mongoose = require('mongoose');

// Mocking the User model
jest.mock('../src/models/User');

describe('getUserById Controller', () => {
  // Reset mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return user data when given a valid ID and user exists', async () => {
    const mockReq = { params: { id: new mongoose.Types.ObjectId().toString() } };
    const mockUser = { name: 'John Doe' };

    User.findById.mockResolvedValue(mockUser); // Mocking database return

    const result = await getUserById(mockReq);
    expect(User.findById).toHaveBeenCalledWith(mockReq.params.id);
    expect(result).toEqual({ name: 'John Doe' });
  });

  test('should throw error for invalid ObjectId format', async () => {
    const mockReq = { params: { id: 'invalidId' } };

    await expect(getUserById(mockReq)).rejects.toEqual({
      statusCode: 400,
      message: expect.any(String), // Validate error message format
    });

    expect(User.findById).not.toHaveBeenCalled();
  });

  test('should throw error when user is not found', async () => {
    const mockReq = { params: { id: new mongoose.Types.ObjectId().toString() } };

    User.findById.mockResolvedValue(null); // Simulate user not found

    await expect(getUserById(mockReq)).rejects.toEqual({
      statusCode: 404,
      message: expect.any(String), // Validate error message format
    });

    expect(User.findById).toHaveBeenCalledWith(mockReq.params.id);
  });
});
