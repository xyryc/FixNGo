import { NextResponse } from "next/server";
import dbConnect, { collectionNames } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export const GET = async (req, { params }) => {
  const { id } = await params;
  const serviceCollection = dbConnect(collectionNames.servicesCollection);
  const data = await serviceCollection.findOne({ _id: new ObjectId(id) });

  return NextResponse.json(data);
};


