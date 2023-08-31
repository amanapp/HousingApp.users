import express, { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ExceptionMessage, HttpStatusCode } from "../constant/status.constant";

const access_secret = process.env.ACESSES_kEY;
const referace_secret = process.env.REFERECE_TOKEN_KEY;

export const acessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(HttpStatusCode.UNAUTHORIZED)
      .json({ message: ExceptionMessage.AUTH_INVALID_TOKEN });
  }

  const decodedToken: any = <JwtPayload>jwt.verify(token, access_secret);
  req.body.email = decodedToken;
  next();
};

export const referaceToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(HttpStatusCode.UNAUTHORIZED)
      .json({ message: ExceptionMessage.AUTH_INVALID_TOKEN });
  }

  const decodedToken: any = <JwtPayload>jwt.verify(token, referace_secret);
  req.body = decodedToken;

  next();
};
