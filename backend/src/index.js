const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.json("Api rodando");
})

app.listen(3001, () => {console.log("Ouvindo porta 3001")});