const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET } = require('../configurations/config');

const authMiddleware = (roles) => {
    return async (req, res, next) => {
        const token = req.cookies.authToken || req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        try {
            const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
            if (!roles.includes(decoded.role)) {
                return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
            }

            req.user = decoded; 
            next();
        } catch (error) {
            res.status(403).json({ message: 'Invalid token' });
        }
    };
};

module.exports = authMiddleware;
