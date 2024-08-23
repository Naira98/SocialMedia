import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const addPostValidation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body } = req;

  const addPostSchmea = Joi.object().keys({
    description: Joi.string().required(),
    picturePath: Joi.allow(),
  });

  const result = addPostSchmea.validate(body);

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

export const addCommentValidation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { body } = req;
  
    const commentSchema = Joi.object().keys({
      comment: Joi.string().min(1).max(100).required(),
    });
  
    const result = commentSchema.validate(body);
  
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
