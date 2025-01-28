const dotenv=require('dotenv')
dotenv.config({path:'../.env'})
const jwt = require('jsonwebtoken');

const generateToken = (user) => {

  const payload = {
    _id: user.id,
    username: user.username,
    role: user.role,
  };

  console.log("The data from generate token is ",payload);

  const secretKey = process.env.SECREAT_KEY; 

  const options = {
    expiresIn: '1h', 
  };

  const token = jwt.sign(payload, secretKey, options);
  return token;
};

module.exports = {
  generateToken,
};