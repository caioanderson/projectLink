const express = require('express');
const bcrypt = require('bcrypt');

const { Account } = require('../models')

const router = express.Router();

const saltRounds = 10;

router.get('/sign-in', (req, res) => {
    res.json("Sign-in.");
});

router.get('/sign-up', async (req, res) => {

    const email = 'caioanderson022@gmail.com';
    const senha = '123456';

    const hash = bcrypt.hashSync(senha, saltRounds);
    
    const result = await Account.create({email: email, password: hash});
    
    
    res.json(result);
});

module.exports = router;