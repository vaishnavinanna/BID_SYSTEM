const express = require('express');
const router = express.Router()
const validateToken=require('../JWT/verfiyToken')
const controller = require('../Controller/userController')
const validate=require('../Middleware/Validation/Validate');

router.post('/CreateUser',validate.validateUser,controller.creteUser);
router.get('/getAllUser',validateToken.verifyToken,controller.getAllUser);

router.delete('/deleteUser',validateToken.verifyToken,validateToken.authorizeRole('Owner'),validate.validateId, controller.deleteUser);
router.put('/updateUser', validate.validateUpdateUser, controller.updateUser);


module.exports = router;
