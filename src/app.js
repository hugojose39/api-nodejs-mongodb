const express = require('express');
const AuthController = require('../src/controller/AuthController');
const UserController = require('../src/controller/UserController');
const ProjectController = require('../src/controller/ProjectController');
const authenticateMiddleware = require('../src/middlewares/authenticate');

const app = express();

app.use(express.json());

app.use('/auth', AuthController);
app.use('/api', authenticateMiddleware, [UserController, ProjectController]);

const server = app.listen(3000, () => {
    console.log('Server is running!');
});

module.exports = {
    start: () => {
        return new Promise((resolve) => {
            resolve(server);
        });
    },
    close: () => {
        return new Promise((resolve) => {
            server.close(() => {
                console.log('Server closed!');
                resolve();
            });
        });
    },
};
