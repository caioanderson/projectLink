const express = require('express');
const authController = require('./controllers/auth');
const app = express();

app.use('/auth', authController);

app.get('/', (req, res) => {
    res.json("Api rodando");
})

app.listen(3001, () => {console.log("Ouvindo porta 3001")});