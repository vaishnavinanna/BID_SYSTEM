const express = require('express');
const router = express.Router();
const controller = require('../Controller/loginController');
const validate=require('../Middleware/Validation/Validate')

router.post('/',validate.validateLogin, controller.login);

module.exports = router;
