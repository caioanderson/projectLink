const express = require('express');
const bcrypt = require('bcrypt');

const { Account } = require('../models')
const { accountSignUp } = require('../validators/account');
const { getMessages } = require('../helpers/validator');

const router = express.Router();

const saltRounds = 10;

router.get('/sign-in', (req, res) => {
    res.jsonOK(null);
});

router.get('/sign-up', accountSignUp, async (req, res) => {
    //Pegando dados da requisição
    const { email, password } = req.body;


    //Verificação de email duplicado
   const account = await Account.findOne({ where : { email } });

   if(account) return res.jsonBadRequest(null, etMessages('account.signup.email_exists'));

   //Se não existe o email
    const hash = bcrypt.hashSync(password, saltRounds);
    
    const newAccount = await Account.create({email: email, password: hash});
    
    
    return res.jsonOK(newAccount, getMessages('account.signup.success'));
});

module.exports = router;