import { MongoClient, ServerApiVersion } from "mongodb";

export const collectionNames = {
  servicesCollection: "services",
  usersCollection: "users",
  bookingsCollection: "bookings",
};

export default function dbConnect(collectionName) {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }
  if (!process.env.DB_NAME) {
    throw new Error("DB_NAME is not defined in environment variables");
  }

  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  return client.db(process.env.DB_NAME).collection(collectionName);
}