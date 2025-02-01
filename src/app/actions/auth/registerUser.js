"use server";

import bcrypt from "bcrypt";
import dbConnect, { collectionNames } from "@/lib/dbConnect";

export const registerUser = async (payload) => {
  const usersCollection = dbConnect(collectionNames.usersCollection);

  // validation
  if (!payload.email || !payload.password) {
    return { success: false };
  }

  const user = await usersCollection.findOne({ email: payload.email });
  if (!user) {
    // encrypt password
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    payload.password = hashedPassword;

    const result = await usersCollection.insertOne(payload);
    return result;
  }

  return { success: false };
};
