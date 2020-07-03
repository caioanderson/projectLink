const express = require('express');
const bcrypt = require('bcrypt');

const { Account } = require('../models')
const { accountSignUp, accountSignIn } = require('../validators/account');
const { getMessages } = require('../helpers/validator');
const { generateJwt, verifyJwt, verifyRefreshJwt, generateRefreshJwt, getTokenFromHeaders } = require('../helpers/jwt');

const router = express.Router();

const saltRounds = 10;

router.post('/sign-in', accountSignIn, async (req, res) => {

   const { email, password } = req.body;

   const account = await Account.findOne({ where : { email } });
   
    //validar senha
    const match = account ? bcrypt.compareSync(password, account.password) : null;
    if(!match) return res.jsonBadRequest(null, getMessages('account.signin.invalid')); 

    //Criando token
    const token = generateJwt({ id : account.id });
    const refreshToken = generateRefreshJwt({ id: account.id, version: account.jwtVersion });

    
    res.jsonOK(account, getMessages('account.signin.success'), { token, refreshToken });
});

router.post('/sign-up', accountSignUp, async (req, res) => {
    //Pegando dados da requisição
    const { email, password } = req.body;

    //Verificação de email duplicado
   const account = await Account.findOne({ where : { email } });

   if(account) return res.jsonBadRequest(null, etMessages('account.signup.email_exists'));

   //Se não existe o email
    const hash = bcrypt.hashSync(password, saltRounds);
    //Cria a conta
    const newAccount = await Account.create({email: email, password: hash});
    
    //Criando token
    const token = generateJwt({ id : newAccount.id });
    const refreshToken = generateRefreshJwt({ id: newAccount.id, version: newAccount.jwtVersion });
    
    //Dados de resposta
    return res.jsonOK(newAccount, getMessages('account.signup.success'), { token, refreshToken });
});

router.post('/refresh', async (req, res) => {
    //Pegando token dos headers
    const token = getTokenFromHeaders(req.headers);
    
    // Verificação do token
    if (!token) {
        return res.jsonUnauthorization(null, 'Invalid Token ');
    }

    try {
        //Decodificação do token
        const decoded = verifyRefreshJwt(token);
        //Buscar a conta que vem do ID do TOken
        const account = await Account.findByPk(decoded.id);
        //Verificar se a conta existe
        if(!account) return res.jsonUnauthorization(null, 'Invalid Token ');
        //Verificar a versão do token
        if(decoded.version !== account.jwtVersion){
            res.jsonUnauthorization(null, 'Invalid Token ');
        }
        //Retorna um novo token
        const meta = {
            token: generateJwt({ id: account.id }),
        };

        return res.jsonOK(null, null, meta);


    } catch (error) {
        res.jsonUnauthorization(null, 'Invalid Token ');
    }

})

module.exports = router;