
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import { adminAuth, adminDb } from "./firebase-admin";
import { FirestoreAdapter } from "@auth/firebase-adapter";

export const authOptions: NextAuthOptions = {
providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
        clientId: process.env.FACEBOOK_CLIENT_ID!,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
],
callbacks: {
    session: async({session, token}) => {
        if(session?.user) {
            if(token.sub) {
                session.user.id = token.sub;

                const firebaseToken = await adminAuth.createCustomToken(token.sub);
                session.firebaseToken = firebaseToken;

            }
        }
        return session;
    },
    jwt: async({user, token}) => {
        if(user) {
            token.sub = user.id;
        }
        return token
    }
},
session: {
    strategy: "jwt",
},
adapter: FirestoreAdapter(adminDb)
} satisfies NextAuthOptions