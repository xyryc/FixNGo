import { MongoClient, ServerApiVersion } from "mongodb";

export const collectionNames = {
  servicesCollection: "services",
  usersCollection: "users",
  bookingsCollection: "bookings",
};

const client = new MongoClient(process.env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export default async function dbConnect(collectionName) {
  try {
    // Make sure the client is connected before accessing the database
    if (!client.isConnected()) {
      await client.connect();
    }

    return client.db(process.env.DB_NAME).collection(collectionName);
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw new Error("Failed to connect to the database");
  }
}
