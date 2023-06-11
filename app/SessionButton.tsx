'use client'

import { Session } from "next-auth";
import { signIn, signOut } from 'next-auth/react'

interface SessionButtonProps {
    session?: Session
}

const SessionButton: React.FC<SessionButtonProps> = ({ session }) => {
    if (session) {
        return (
            <button onClick={()=> signOut()}>Sign out</button>
        )
    } else {
        return (
            <button onClick={()=> signIn('spotify')}>Sign in</button>
        )
    }

};

export default SessionButton;
