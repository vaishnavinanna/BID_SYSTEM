const { 
    validateUserSchema, 
    validateBidSchema, 
    validateUpdateUserSchema,
    validateLoginSchema,
    validateConfirmBidSchema,
    validatePlaceBidSchema,
    validateIdSchema 
} = require('./Schema');
const logger = require('../Logger/Log');

const validateUser = (req, res, next) => {
    const { error } = validateUserSchema.validate(req.body, { abortEarly: false });
    if (error) {
        console.log(error.details.map(err => err.message))
        logger.error(`[validateUser.js] Validation failed - ${error.details.map(err => err.message)}`, {
            function: 'validateUser',
        });
        return res.status(400).json({
            message: 'Validation errors',
            errors: error.details.map(err => err.message),
        });
    }

    logger.info('[validateUser.js] User data is valid', { function: 'validateUser' });
    next();
};

const validateId = (req, res, next) => {
    const { error } = validateIdSchema.validate({ id: req.body.id });

    if (error) {        
        logger.error(`[validateId.js] Validation failed - ${error.details.map(err => err.message)}`, {
            function: 'validateId',
        });
        return res.status(400).json({
            message: 'Validation errors',
            errors: error.details.map(err => err.message),
        });
    }    

    logger.info('[validateId.js] User data is valid', { function: 'validateId' });
    next();
}

const validateUpdateUser=(req,res,next)=>{
    const { error } = validateUpdateUserSchema.validate(req.body, { abortEarly: false });
    if (error) {
        console.log(error.details.map(err => err.message))
        logger.error(`[validateUpdateUser.js] Validation failed - ${error.details.map(err => err.message)}`, {
            function: 'validateUpdateUser',
        });
        return res.status(400).json({
            message: 'Validation errors',
            errors: error.details.map(err => err.message),
        });
    }

    logger.info('[validateUpdateUser.js] User data is valid', { function: 'validateUpdateUser' });
    next();
}

const validateBid = (req, res, next) => {
    const { error } = validateBidSchema.validate(req.body, { abortEarly: false });

    if (error) {
        logger.error(`[validateBid.js] Validation failed - ${error.details.map(err => err.message)}`, {
            function: 'validateBid',
        });
        return res.status(400).json({
            message: 'Validation errors',
            errors: error.details.map(err => err.message),
        });
    }

    logger.info('[validateBid.js] Bid data is valid', { function: 'validateBid' });
    next();
};

const validatePlaceBid=(req,res,next)=>{
    const {error}=validatePlaceBidSchema.validate(req.body,{abortEarly:false});

    if(error){    
        logger.error(`[validatePlaceBid.js] validation failed- ${error.details.map(err=>err.message)}`,{
            function:'validatePlaceBid',
        });
        return res.status(400).json({
            message:'Validation Errors',
            errors:error.details.map(err=>err.message),     
        })
    }   
    logger.info('[validatePlaceBid.js] data is valid', { function: 'validatePlaceBid' });
    next();
}

const validateConfirmBid=(req,res,next)=>{
    const {error}=validateConfirmBidSchema.validate(req.body,{abortEarly:false});
    console.log("The data from validation is ",req.body);
    if(error){
        logger.error(`[validateConfirmBid.js] validation failed- ${error.details.map(err=>err.message)}`,{
            function:'validateConfirmBid',
        });
        return res.status(400).json({
            message:'Validation Errors',
            errors:error.details.map(err=>err.message),
        })
    }
    logger.info('[validateConfirmBid.js] data is valid', { function: 'validateConfirmBid' });
    next();
}

const validateLogin=(req,res,next)=>{
    const {error}=validateLoginSchema.validate(req.body,{abortEarly:false});

    if(error){
        logger.error(`[validateLogin.js] validation failed- ${error.details.map(err=>err.message)}`,{
            function:'validateLogin',
        });
        return res.status(400).json({
            message:'Validation Errors',
            errors:error.details.map(err=>err.message),
        })
    }

    logger.info('[validateLogin.js] data is valid', { function: 'validateLogin' });
    next();
}
 
module.exports = { 
    validateUser, 
    validateBid, 
    validateUpdateUser,
    validateLogin,
    validateConfirmBid,
    validatePlaceBid,
    validateId 
};
