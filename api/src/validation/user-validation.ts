import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const updateAccountValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body } = req;

  const updateProfileSchema = Joi.object().keys({
    userId: Joi.string().min(1).max(25).required(),
    firstName: Joi.string().min(3).max(15).required(),
    lastName: Joi.string().min(3).max(15).required(),
  });

  const result = updateProfileSchema.validate(body);

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

export const linkValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body } = req;

  const addTwitterSchema = Joi.object().keys({
    userId: Joi.string().alphanum().min(1).max(25).required(),
    link: Joi.string().alphanum().min(3).max(50).required(),
  });

  const result = addTwitterSchema.validate(body);

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

