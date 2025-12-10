import bcrypt from "bcrypt";
import User from "../../../../models/User";
import type { MutationResolvers } from "./../../../../schema/types.generated";
export const register: NonNullable<MutationResolvers["register"]> = async (
  _parent,
  _arg,
  _ctx
) => {
  /* Implement Mutation.register resolver logic here */
  const { email, name, password } = _arg.input;
  const exist = await User.findOne({ email });
  if (exist) {
    return {
      success: false,
      message: "User already exist",
    };
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashed, name });
  await user.save();

  return {
    success: true,
    message: "User created",
  };
};
