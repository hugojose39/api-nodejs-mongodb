const expresss = require('express')
const AuthController = require('../src/controller/AuthController')
const AdminController = require('../src/controller/AdminController')
const ProjectController = require('../src/controller/ProjectController')
const autheticateMiddleware = require('../src/middlewares/authenticate');

const app = expresss()

app.use(expresss.json());

app.use('/auth', AuthController);
app.use('/admin', autheticateMiddleware, [AdminController, ProjectController]);

app.listen(3000, () => {
    console.log('Server is running!');
});

module.exports = app