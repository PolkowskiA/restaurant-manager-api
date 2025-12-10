import { UserDoc } from "../../models/User";
import { User } from "../../schema/types.generated";

export const mapUser = ({ email, name, _id }: UserDoc | undefined): User => {
  return { email, name, id: _id.toString() };
};
