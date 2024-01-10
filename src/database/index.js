require('dotenv').config();

const mongoose = require('mongoose')

const user = process.env.USER;
const password = process.env.PASSWORD;
const name = process.env.NAME;

mongoose.connect(`mongodb+srv://${user}:${password}@apimongonodejs.nvbav6s.mongodb.net/${name}?retryWrites=true&w=majority`)
.then(() => console.log('Conexão com mongodb estável'))
.catch((error) => {
    console.log('Falha ao autenticar com mongodb');
    console.log(error);
    return;
})

mongoose.Promise = global.Promise;

module.exports = mongoose;