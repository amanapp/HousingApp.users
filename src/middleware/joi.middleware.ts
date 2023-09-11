import Joi from "joi";
import { Request, Response, NextFunction } from "express";

const signUpSchema = Joi.object({
  name: Joi.string().min(3).max(15).required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  phone_no: Joi.number(),
  wishlist_id: Joi.string(),
  visit_count: Joi.string(),
  subscription_id: Joi.string(),
  subscription_start: Joi.string(),
  subscription_end: Joi.string(),
  verification_key: Joi.string(),
});
const propertyPostSchema = Joi.object({
  location: Joi.string(),
  price: Joi.number().required(),
  type: Joi.string().required(),
  size: Joi.string().required(),
  status: Joi.string().required(),
  posted_by: Joi.string(),

});
const subcriptionSchema = Joi.object({
   amount:Joi.string(),
   name:Joi.string(),
   offers:Joi.string()
  });
const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const signUpJoiMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = signUpSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export const loginJoiMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

export const propertyPostJoiMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = propertyPostSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
export const subscriptionJoiMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { error } = subcriptionSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };