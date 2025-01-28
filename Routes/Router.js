const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const bidRouter = require('./bidRouter');
const loginRouter=require('./loginRoute');
const pdfGeneratorRouter=require('./pdfRouter')
const ownerRouter=require('./ownerRouter')

router.use('/user', userRouter);   
router.use('/bid', bidRouter);  
router.use('/Owner',ownerRouter);

router.use('/login',loginRouter)
router.use('/pdfGenerator',pdfGeneratorRouter)

module.exports = router;
