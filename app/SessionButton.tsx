'use client'

import { Session } from "next-auth";
import { signIn, signOut } from 'next-auth/react'
import { BsSpotify } from 'react-icons/bs'

interface SessionButtonProps {
    session: Session | null
}

const SessionButton: React.FC<SessionButtonProps> = ({ session }) => {
    if (session) {
        return (
            <button onClick={()=> signOut()}
            className="rounded-xl bg-red-500 flex justify-center py-4 gap-6 w-full"
            >
                <BsSpotify size={32}/>
                <span className="text-xl">{`Log out from ${session.user?.name}`}</span>
            </button>
        )
    } else {
        return (
            <button onClick={()=> signIn('spotify')}
            className="rounded-xl bg-green-500 flex justify-center py-4 gap-6 w-full"
            >
                <BsSpotify size={32}/>
                <span className="text-xl">Log in with Spotify</span>
            </button>
        )
    }

};

export default SessionButton;
