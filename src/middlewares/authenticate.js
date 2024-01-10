const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({
            error: true,
            message: 'Token not provided'
        });
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
        return res.status(401).send({
            error: true,
            message: 'Invalid token type'
        });
    }

    const [scheme, token] = parts;

    if(scheme.indexOf('Bearer') !== 0) {
        return res.status(401).send({
            error: true,
            message: 'Token malformatted'
        });
    }

    return jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(403).send({
                error: true,
                message: 'Unauthorized'
            });
        }

        req.userLogged = decoded;

        return next();
    });
}