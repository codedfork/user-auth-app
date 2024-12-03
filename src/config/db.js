const mongoose = require('mongoose');
const dotenv = require('dotenv');
const messages = require('../lang/messages')
const logger = require('../utils/logger')
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`${messages.success.mongoDbConnected}`);
    } catch (error) {
        console.error(`${messages.errors.dbConnectionFailed}`, error);
        logger.info(`${messages.errors.dbConnectionFailed}`, error);
        process.exit(1);
    }
};

module.exports = connectDB;
