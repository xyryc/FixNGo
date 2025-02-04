import { NextResponse } from "next/server";
import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const GET = async (req, { params }) => {
  const { id } = await params;
  const serviceCollection = dbConnect(collectionNames.servicesCollection);
  const data = await serviceCollection.findOne({ _id: new ObjectId(id) });

  return NextResponse.json(data);
};

export const DELETE = async (req, { params }) => {
  const { id } = await params;
  const bookingsCollection = dbConnect(collectionNames.bookingsCollection);
  const query = { _id: new ObjectId(id) };

  // validation
  const session = await getServerSession();
  const currentBooking = await bookingsCollection.findOne(query);

  const isOwnerOK = session?.user?.email == currentBooking.email;

  if (isOwnerOK) {
    // delete user specific booking
    const deleteResponse = await bookingsCollection.deleteOne(query);
    revalidatePath("/my-bookings");
    return NextResponse.json(deleteResponse);
  } else {
    return NextResponse.json(
      { success: false, message: "Forbidden Action" },
      { status: 401 }
    );
  }
};
