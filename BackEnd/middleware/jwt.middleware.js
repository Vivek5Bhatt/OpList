const jwt = require('jsonwebtoken');
const User = require('../models/user.model')

const generateToken = (id) => {
    try {
        return jwt.sign({ id: id }, process.env.JWT_SECRET, { expiresIn: '1d', algorithm: 'HS256' })
    } catch (err) {
        Logger.error(err)
        throw err;
    }
}

const verifyToken = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET)
        const userData = await User.findOne({ where: { id: verifiedToken.id } })
        if (userData && userData.is_active) {
            req.user = verifiedToken
            req.userId = verifiedToken.id
            req.userProfile = userData
            next()
        }
    } catch (err) {
        const resp = {
            success: true,
            message: 'Something went wrong',
            // error: err
        }
        res.status(500).json(resp)
    }
}

module.exports = {
    generateToken,
    verifyToken
}