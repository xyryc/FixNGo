import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const body = await req.json();

  const bookingsCollection = dbConnect(collectionNames.bookingsCollection);
  const result = await bookingsCollection.insertOne(body);

  return NextResponse.json(result);
};
