const express = require('express');
const db = require('./models/index');

const authController = require('./controllers/auth');
const app = express();

app.use('/auth', authController);

app.get('/', (req, res) => {
    res.json("Api rodando");
});

db.sequelize.sync().then( () => {
    app.listen(3001, () => {console.log("Ouvindo porta 3001")});
});


