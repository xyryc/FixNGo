"use server";

import bcrypt from "bcrypt";
import dbConnect, { collectionNames } from "@/lib/dbConnect";

export const loginUser = async (payload) => {
  const { email, password } = payload;

  const userCollection = dbConnect(collectionNames.usersCollection);
  const user = await userCollection.findOne({ email });

  //   validation
  if (!user) return null;
  const isPasswordOk = await bcrypt.compare(password, user.password);
  console.log(isPasswordOk);
  if (!isPasswordOk) return null;

  return user;
};
