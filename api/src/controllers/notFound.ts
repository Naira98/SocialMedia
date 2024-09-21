import { NextFunction, Request, Response } from "express";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({ message: "Page not found" });
};
