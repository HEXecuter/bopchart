'use client'

import { Session } from "next-auth";
import { signIn, signOut } from 'next-auth/react'
import { BsSpotify } from 'react-icons/bs'
import { BiLogOut } from 'react-icons/bi'

interface SessionButtonProps {
    session: Session | null
}

const SessionButton: React.FC<SessionButtonProps> = ({ session }) => {
    if (session) {
        return (
            <button onClick={() => signOut()}
                className="rounded-xl bg-red-500 flex justify-center py-4 gap-6 w-full"
            >
                <BiLogOut size={32} className="text-white"/>
                <span className="lg:text-xl text-white">{`Log out from ${session.user?.name}`}</span>
            </button>
        )
    } else {
        return (
            <button onClick={() => signIn('spotify')}
                className="rounded-xl bg-green-500 flex justify-center py-4 gap-6 w-full"
            >
                <BsSpotify size={32} className="text-white"/>
                <span className="lg:text-xl text-white">Log in with Spotify</span>
            </button>
        )
    }

};

export default SessionButton;
