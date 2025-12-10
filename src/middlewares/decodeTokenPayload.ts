import type { Request } from "express";
import jwt from "jsonwebtoken";
export const decodeTokenPayload = (
  req: Request,
  tokenType: "accessToken" | "refreshToken"
) => {
  const token =
    req.cookies[tokenType === "accessToken" ? "access_token" : "refresh_token"];

  if (!token) {
    return null;
  }

  const tokenPayload = jwt.decode(token);

  return tokenPayload;
};
