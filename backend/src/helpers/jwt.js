const dotenv = require('dotenv');
dotenv.config();

const jwt = require('jsonwebtoken');

const tokenPrivateKey = process.env.JWT_TOKEN_PRIVATE_KEY;
const refreshTokenPrivateKey = process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY;

const options = {
    expiresIn : '30 minutes',
};
const refreshOptions = {
    expiresIn : '30 days',
};

//Gera o token
const generateJwt = (payload) => {
    return jwt.sign(payload, tokenPrivateKey, options);
};

const generateRefreshJwt = (payload) => {
    return jwt.sign(payload, refreshTokenPrivateKey, refreshOptions);
};

//Verifica o token
const verifyJwt = (token) => {
    return jwt.verify(token, tokenPrivateKey);
}

const verifyRefreshJwt = (token) => {
    return jwt.verify(token, refreshTokenPrivateKey);
}

module.exports = { generateJwt, verifyJwt, generateRefreshJwt, verifyRefreshJwt };