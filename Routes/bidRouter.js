const express = require('express');
const router = express.Router();
const validateToken=require('../JWT/verfiyToken')
const controller = require('../Controller/bidController')
const validate=require('../Middleware/Validation/Validate')

router.post('/placeBid', validateToken.verifyToken, validateToken.authorizeRole('Bidder'),validate.validatePlaceBid, controller.placeBid);

router.get('/getAllBid', validateToken.verifyToken,validateToken.authorizeRole('Bidder'), controller.getAllBid);

module.exports = router;
