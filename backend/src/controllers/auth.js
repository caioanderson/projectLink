const express = require('express');
const bcrypt = require('bcrypt');

const { Account } = require('../models')

const router = express.Router();

const saltRounds = 10;

router.get('/sign-in', (req, res) => {
    res.json("Sign-in.");
});

router.get('/sign-up', async (req, res) => {
    //Pegando dados da requisição
    const { email, password } = req.body;

    // return res.jsonOK();

    //Verificação de email duplicado
   const account = await Account.findOne({ where : { email } });

   if(account) return res.jsonBadRequest(null, "Conta já existe");

   //Se não existe o email
    const hash = bcrypt.hashSync(password, saltRounds);
    
    const newAccount = await Account.create({email: email, password: hash});
    
    
    return res.jsonOK(newAccount, 'Conta criada');
});

module.exports = router;