import NextAuth, { AuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

export const authOptions: AuthOptions = {
    providers: [
        SpotifyProvider({
            authorization: 'https://accounts.spotify.com/authorize?scope=user-read-email,playlist-read-private,playlist-read-collaborative,user-top-read,user-library-read',
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
        async session({ session, user, token }) {
            console.log('%%%', session, user, token)
            session.user = token;
            return session;
        }
    },
    debug: process.env.NODE_ENV === 'development',
    secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }