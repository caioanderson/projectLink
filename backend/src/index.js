const express = require('express');
const cors = require('cors');
const db = require('./models/index');
const response = require('./middlewares/response');
const checkJwt = require('./middlewares/jwt');


const authController = require('./controllers/auth');
const linkController = require('./controllers/link');
const app = express();

app.use(cors);
app.use(response);
app.use(checkJwt);

//Receber dados em forma JSON
app.use(express.json());

//Pegar Body da requisição e entender
app.use(express.urlencoded({ extended: false }));


app.use('/auth', authController);
app.use('/link', linkController);

app.get('/', (req, res) => {
    res.json("Api rodando");
});

db.sequelize.sync().then( () => {
    app.listen(3001, () => {console.log("Ouvindo porta 3001")});
});


