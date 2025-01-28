const express = require('express');
const router = express.Router();
const validateToken=require('../JWT/verfiyToken')
const controller = require('../Controller/ownerController')
const validate=require('../Middleware/Validation/Validate')

router.post('/CreateBid',validateToken.verifyToken,validateToken.authorizeRole('Owner'),validate.validateBid,controller.createBid);

router.get('/viewAllBid', validateToken.verifyToken,validateToken.authorizeRole('Owner'), controller.viewAllBid);

router.get('/viewBidById/:bidId',validateToken.verifyToken,validateToken.authorizeRole('Owner'),controller.viewBidById)

router.get('/getApproveBids',validateToken.verifyToken,validateToken.authorizeRole('Owner'),controller.getApproveBids)

router.post('/confirmBid', validateToken.verifyToken, validateToken.authorizeRole('Owner'),validate.validateConfirmBid, controller.confirmBid);

module.exports = router;
