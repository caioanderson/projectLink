const messages = require('../config/messages.json');


const getMessages = (key) => {
    return messages[key] || null;
};

module.exports = {getMessages};