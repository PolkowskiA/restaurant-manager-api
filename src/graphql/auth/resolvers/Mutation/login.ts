import bcrypt from "bcrypt";
import { GraphQLError } from "graphql/error";
import jwt from "jsonwebtoken";
import config from "../../../../app.env";
import User from "../../../../models/User";
import { mapUser } from "../../../user/mapUser";
import type { MutationResolvers } from "./../../../../schema/types.generated";

export const login: NonNullable<MutationResolvers["login"]> = async (
  _parent,
  _arg,
  _ctx
) => {
  /* Implement Mutation.login resolver logic here */
  const { email, password } = _arg.input;
  if (!email || !password) {
    throw new GraphQLError("Email and password are required");
  }

  // 2. Find user
  const user = await User.findOne({ email });
  if (!user) {
    throw new GraphQLError("Invalid credentials");
  }

  // 3. Compare password
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new GraphQLError("Invalid credentials");
  }

  // 4. Generate tokens
  const accessToken = jwt.sign(
    { userId: user._id },
    config.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "15m",
    }
  );

  const refreshToken = jwt.sign(
    { userId: user._id },
    config.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );

  // 5. Set cookies
  _ctx.res.cookie("access_token", accessToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000, // 15 minutes
  });

  _ctx.res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  // 6. Return GraphQL response
  return {
    success: true,
    message: "Logged in successfully",
    user: mapUser(user),
  };
};
