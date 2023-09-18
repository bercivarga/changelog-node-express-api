import { NextFunction, Request, Response } from "express";

export default function (req: Request, res: Response, next: NextFunction) {
  // Only for demonstration purposes
  // @ts-ignore
  res.super_secret = "ssh! don't tell anyone!"
  next()
}