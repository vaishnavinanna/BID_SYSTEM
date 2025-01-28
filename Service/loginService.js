const Login = require('../Model/Login');

async function getUserByUsername(username) {
    return await Login.findOne({ username });
}

module.exports = { getUserByUsername };
