const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

const UserModel = require('../models/User');

const router = express.Router();

const generateToken = (user = {}) => {
    const token = jwt.sign({
        id: user.id,
        name: user.name,
    }, authConfig.secret, {
        expiresIn: 86400
    });

    return token;
}

router.post('/register', async (req, res) => {

    const { email } = req.body;

    if (await UserModel.findOne({ email })) {
        return res.status(422).json({
            error: true,
            message: 'User already exists'
        });
    }

    const user = await UserModel.create(req.body);

    user.password = undefined;

    return res.json({
        error: false,
        message: 'Registered with success!',
        user: user,
        token: generateToken(user),
    });
});

router.post('/autheticate', async (req, res) => {

    const { email, password } = req.body;

    const user = await UserModel.findOne({ email }).select('+password');

    if (!user) {
        return res.status(404).json({
            error: true,
            message: 'User not found'
        });
    }

    if (!await bcryptjs.compare(password, user.password)) {
        return res.status(401).send({
            error: true,
            message: 'Invalid password'
        });
    }

    user.password = undefined;

    return res.json({
        user: user,
        token: generateToken(user),
    });
});

module.exports = router;