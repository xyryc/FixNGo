import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { id } = await params;
  const query = { _id: new ObjectId(id) };

  const bookingsCollection = dbConnect(collectionNames.bookingsCollection);
  const singleBooking = await bookingsCollection.findOne(query);

  return NextResponse.json(singleBooking);
};

export const PATCH = async (req, { params }) => {
  const { id } = await params;
  const query = { _id: new ObjectId(id) };
  const bookingsCollection = dbConnect(collectionNames.bookingsCollection);

  const body = await req.json();
  const filter = {
    $set: { ...body },
  };
  const option = { upsert: true };
  const updateResponse = await bookingsCollection.updateOne(
    query,
    filter,
    option
  );

  revalidatePath("/my-bookings");

  return NextResponse.json(updateResponse);
};
