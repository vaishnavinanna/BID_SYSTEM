const express = require('express');
const router = express.Router();
const validateToken=require('../JWT/verfiyToken')
const controller = require('../Controller/pdfController');

router.get('/', controller.pdfController);

module.exports = router;
