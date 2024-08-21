import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export const loginValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body } = req;

  const loginSchema = Joi.object().keys({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    password: Joi.string().min(4).max(10).required(),
  });

  const result = loginSchema.validate(body);

  const { value, error } = result;
  const valid = error == null;

  if (!valid) {
    res.status(422).json({
      message: error.details[0].message,
      data: body,
    });
  } else {
    next();
  }
};

export const registerValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body } = req;
  console.log(req.body);

  const registerSchema = Joi.object().keys({
    firstName: Joi.string().alphanum().min(3).max(30).required(),
    lastName: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    password: Joi.string().min(4).max(10).required(),
    location: Joi.string().alphanum().min(3).max(30).required(),
    occupation: Joi.string().alphanum().min(3).max(30).required(),
    picturePath: Joi.required(),
  });

  const result = registerSchema.validate(body);

  const { value, error } = result;
  const valid = error == null;

  if (!valid) {
    res.status(422).json({
      message: error.details[0].message,
      data: body,
    });
  } else {
    next();
  }
};
