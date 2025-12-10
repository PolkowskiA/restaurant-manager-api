import { decodeTokenPayload } from "../../../../middlewares/decodeTokenPayload";
import User from "../../../../models/User";
import { mapUser } from "../../mapUser";
import type { QueryResolvers } from "./../../../../schema/types.generated";
export const getCurrentUser: NonNullable<
  QueryResolvers["getCurrentUser"]
> = async (_parent, _arg, _ctx) => {
  /* Implement Query.getCurrentUser resolver logic here */
  const tokenPayload = decodeTokenPayload(_ctx.req, "accessToken");

  if (!tokenPayload) {
    return null;
  }

  const user = await User.findOne({ _id: tokenPayload["userId"] });

  return mapUser(user);
};
