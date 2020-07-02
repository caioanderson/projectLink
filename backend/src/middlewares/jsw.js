const { verifyJwt } = require('../helpers/jwt')

const checkJwt = (req, res, next) => {

    let token = req.headers['authorization'];
    token = token ? token.slice(7, token.length) : null;
    
    // Verificação do token
    if (!token) {
        return res.jsonUnauthorization(null, 'Invalid Token');
    }

    try {
        const decoded = verifyJwt(token);
        req.accountId = decoded.id;
        next();

    } catch (error) {
        return res.jsonUnauthorization(null, 'Invalid Token');

    }

   
}

module.exports = checkJwt;