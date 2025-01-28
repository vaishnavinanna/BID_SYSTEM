const jwt = require('jsonwebtoken');
const dotenv=require('dotenv')
dotenv.config({path:'../.env'})
const verifyToken = (req, res, next) => {
  
  const authHeader = req.headers.authorization;

  console.log(authHeader);

  // console.log("the auth Header is ",authHeader);

  // console.log("The token secreate key is ",process.env.SECREAT_KEY);

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    
    jwt.verify(token, process.env.SECREAT_KEY, (err, payload) => {
      if (err) {
        return res.status(403).json({
          success: false,
          message: 'Invalid token',
        });
      } else {
        console.log("The data from the payload is ",payload);
        req.user = payload;
        next();
      }
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Token is not provided',
    });
  }
};

const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user.role === role) {
      console.log("The role from the req is ",req.user.role,"and the role from the router is ",role);
      next(); 
    } else {
      res.status(403).json({
        success: false,
        message: 'Unauthorized access',
      });
    }
  };
};

module.exports={verifyToken,authorizeRole}