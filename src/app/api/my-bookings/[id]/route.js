import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { id } = await params;
  const query = { _id: new ObjectId(id) };

  const bookingsCollection = dbConnect(collectionNames.bookingsCollection);
  const singleBooking = await bookingsCollection.findOne(query);

  return NextResponse.json(singleBooking);
};
