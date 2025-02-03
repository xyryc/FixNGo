import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { loginUser } from "@/app/actions/auth/loginUser";
import dbConnect, { collectionNames } from "./dbConnect";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "dave@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // console.log(credentials);
        const user = await loginUser(credentials);
        // console.log(user);

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // console.log({ user, account, profile, email, credentials })
      if (account) {
        // destructure necessary infos after login
        const { providerAccountId, provider } = account;
        const { email: user_email, image, name } = user;

        // get the user by providerId, not email, coz some provider dont provide email eg. github
        const userCollection = dbConnect(collectionNames.usersCollection);
        const isExist = await userCollection.findOne({ providerAccountId });

        // post/update data in db if the user doesn't exist in db
        if (!isExist) {
          const payload = {
            email: user_email,
            image,
            name,
            providerAccountId,
            provider,
          };

          await userCollection.insertOne(payload);
        }
      }

      return true;
    },
  },
};
