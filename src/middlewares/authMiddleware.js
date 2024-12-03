const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const messages = require('../lang/messages')
dotenv.config();

module.exports = (req, res, next) => {
    const token = req.headers.authorization?req.headers.authorization.split(' ')[1]:null;
    if (!token) {
        return res.status(401).json({ statusCode: 401, error: messages.errors.unauthorized });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({  statusCode: 401, error: messages.errors.invalidToken});
    }
};
