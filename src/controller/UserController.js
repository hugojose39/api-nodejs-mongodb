const express = require('express');

const UserModel = require('../models/User');

const router = express.Router();

router.get('/users', async (req, res) => {
    const users = await UserModel.find();

    return res.json({
        users: users,
    });
});

router.get('/users/:id', async (req, res) => {
    const user = await UserModel.findById(req.params.id);

    if (req.params.id !== req.userLogged.id) {
        return res.status(403).json({
            error: true,
            message: 'Unauthorized',
        });
    }

    if (!user) {
        return res.status(404).json({
            error: true,
            message: 'User not found'
        });
    }

    return res.json({
        error: false,
        user: user,
    });
});

router.put('/users/:id', async (req, res) => {
    const { email } = req.body;

    const user = await UserModel.findById(req.params.id);

    if (req.params.id !== req.userLogged.id) {
        return res.status(403).json({
            error: true,
            message: 'Unauthorized',
        });
    }

    if (!user) {
        return res.status(404).json({
            error: true,
            message: 'User not found'
        });
    }

    if (user.email !== email && await UserModel.findOne({ email })) {
        return res.status(422).json({
            error: true,
            message: 'Email already exists'
        });
    }

    Object.assign(user, req.body);

    const updatedUser = await user.save();

    updatedUser.password = undefined;

    return res.json({
        error: false,
        message: 'User updated with success!',
        user: updatedUser,
    });
});

router.delete('/users/:id', async (req, res) => {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id);

    if (req.params.id !== req.userLogged.id) {
        return res.status(403).json({
            error: true,
            message: 'Unauthorized',
        });
    }

    if (!deletedUser) {
        return res.status(404).json({
            error: true,
            message: 'User not found'
        });
    }

    return res.json({
        error: false,
        message: 'User deleted with success!',
        user: deletedUser,
    });
});

module.exports = router;
