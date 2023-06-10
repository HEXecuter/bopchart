import NextAuth, { AuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

export const authOptions: AuthOptions = {
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID as string,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string
        })
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.refresh_token;
            }
            return token
        },
        async session({ session, user }) {
            session.user = user;
            return session;
        }
    },
    debug: process.env.NODE_ENV === 'development',

}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }