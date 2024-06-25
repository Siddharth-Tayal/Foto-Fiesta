const jwt = require('jsonwebtoken');
const UserModels = require('../models/User.models');
async function isAuthenticated(req, res, next) {
    try {
        const { socialToken } = req.cookies;
        if (!socialToken) return res.status(400).json({
            success: false,
            message: "Unauthenticated"
        })
        const decodedData = jwt.verify(socialToken, process.env.JWT_SECRET);
        req.user = await UserModels.findById(decodedData._id)
        next();
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    isAuthenticated
}