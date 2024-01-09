const expresss = require('express')
const AuthController = require('../src/controller/AuthController')
const AdminController = require('../src/controller/AdminController')
const autheticateMiddleware = require('../src/middlewares/authenticate');

const app = expresss()

app.use(expresss.json());

app.use('/auth', AuthController);
app.use('/admin', autheticateMiddleware, AdminController);

app.listen(3000, () => {
    console.log('Server is running!');
});

module.exports = app