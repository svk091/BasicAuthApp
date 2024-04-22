import bcrypt from "bcryptjs";

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const res = await bcrypt.hash(password, salt);
  return res;
};

export const comparePassword = async ({
  password,
  hash,
}: {
  password: string;
  hash: string;
}) => {
  const res = bcrypt.compare(password, hash);
  return res;
};
