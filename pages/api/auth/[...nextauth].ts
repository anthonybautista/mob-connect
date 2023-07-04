import NextAuth from "next-auth";
import type { NextAuthOptions } from 'next-auth'
import DiscordProvider from "next-auth/providers/discord";
export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    secret: process.env.AUTH_SECRET,

    providers: [
        DiscordProvider({
            clientId: process.env.CLIENT_ID as string,
            clientSecret: process.env.CLIENT_SECRET as string,
        }),
    ],

    // When the user signs in, get their token
    callbacks: {
        async jwt({ token, account }) {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
                token.userId = account.providerAccountId;
            }
            return token;
        },

        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            session.userId = token.userId;
            return session;
        },
    },
};

export default NextAuth(authOptions);