const Joi = require('joi');

const validateUserSchema = Joi.object({
  _id: Joi.string().required(),
  name: Joi.string().required().min(3).max(50),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
  role: Joi.string().valid('Owner', 'Bidder').required(),
  isDeleted: Joi.boolean().optional().default(false),
  createdBy: Joi.string().optional().default('Admin'),
  updatedBy: Joi.string().optional().default('Admin'),
});

const validateLoginSchema=Joi.object({
  username:Joi.string().required(),
  password:Joi.string().required()
})

const validateUpdateUserSchema = Joi.object({
  id: Joi.string().required(),
  param: Joi.object({
    name: Joi.string().alphanum().min(3).max(30).optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().min(6).max(30).optional(),
  }).required(),
});
const validateBidSchema = Joi.object({
  _id: Joi.string().required(),  
  userId: Joi.string().required(),  
  bidName: Joi.string().required(),  
  description: Joi.string().required(),  
  cost: Joi.number().required().positive().min(0),  
  days: Joi.number().required().positive().min(1), 
  status: Joi.string().valid('pending', 'approved', 'closed').default('pending'),  
  createdBy: Joi.string().optional().default('Admin'), 
  updatedBy: Joi.string().optional().default('Admin'),  
  isDeleted: Joi.boolean().optional().default(false),
});

const validateIdSchema = Joi.object({
  id: Joi.string().required(),
});


const validatePlaceBidSchema=Joi.object({
  BidId: Joi.string().required(),
  userId:Joi.string().required(),
  cost:Joi.number().required().positive(),
  days:Joi.number().required().positive()
})

const validateConfirmBidSchema=Joi.object({
  bidId: Joi.string().required(),
  userId:Joi.string().required()
})

module.exports = {
  validateUserSchema,
  validateBidSchema,
  validateUpdateUserSchema,
  validateLoginSchema,
  validateConfirmBidSchema,
  validatePlaceBidSchema,
  validateIdSchema
};
