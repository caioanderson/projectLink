const express = require('express');
const db = require('./models/index');
const response = require('./middlewares/response');

const authController = require('./controllers/auth');
const app = express();

app.use(response);

//Receber dados em forma JSON
app.use(express.json());

//Pegar Body da requisição e entender
app.use(express.urlencoded({ extended: false }));


app.use('/auth', authController);

app.get('/', (req, res) => {
    res.json("Api rodando");
});

db.sequelize.sync().then( () => {
    app.listen(3001, () => {console.log("Ouvindo porta 3001")});
});


