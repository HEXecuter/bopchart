import Image from 'next/image'
import { authOptions } from './api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import SessionButton from './components/SessionButton';
import { getAccessToken, getCurrentUserPlaylist } from './lib/spotify';
import Title from './components/Title';
import OptionCard from './components/OptionCard';
import {BiMedal} from 'react-icons/bi';

export default async function Home() {
  const userSession = await getServerSession(authOptions);
  
  if (userSession) {
    return (
      <main>
        <div className='lg:w-1/2 flex-col mx-auto'>
          <Title text='Chartify' />
          <p className='text-center text-xl'>
            {`Welcome ${userSession.user?.name}, select an option below to get started!`}
          </p>
          <div className='flex-wrap justify-around flex gap-4'>
            <OptionCard icon={BiMedal} name="How Basic is my Music Taste?" />
            <OptionCard icon={BiMedal} name="Genres" />
            <OptionCard icon={BiMedal} name="How Basic is my Music Taste?" />
          </div>
          <SessionButton session={userSession} />
        </div>
      </main>
    )
  } else {
    return (
      <main>
        <div className='w-1/2 flex-col mx-auto'>
          <Title text='Chartify' />
          <p className='text-center text-xl '>
            Log in with your Spotify account to get started!
          </p>
          <SessionButton session={userSession} />
        </div>
      </main>
    )
  }
}
