import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../app.env";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies?.access_token;
  const refreshToken = req.cookies?.refresh_token;

  if (!refreshToken && !accessToken && req.baseUrl.includes("dashboard")) {
    throw new Error("");
    return next();
  }

  try {
    const refreshPayload = jwt.verify(
      refreshToken,
      config.REFRESH_TOKEN_SECRET
    );

    const newAccessToken = jwt.sign(
      { userId: refreshPayload["userId"] },
      config.ACCESS_TOKEN_SECRET,
      { expiresIn: 15 * 60 * 1000 }
    );

    res.cookie("access_token", newAccessToken, {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    return next();
  } catch (error) {
    return next();
  }
};
