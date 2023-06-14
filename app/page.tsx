import Image from 'next/image'
import { authOptions } from './api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import SessionButton from './components/SessionButton';
import { getAccessToken, getCurrentUserPlaylist } from './lib/spotify';
import Title from './components/Title';
import OptionCard from './components/OptionCard';
import { BiMedal, BiCategoryAlt, BiListOl } from 'react-icons/bi';
import { TbMoodAnnoyed2 } from 'react-icons/tb'
import { useEffect } from 'react';
import axios from 'axios';
import TestAPI from './components/TestAPI';

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
            <OptionCard icon={BiCategoryAlt} name="What Genres do I Listen to?" />
            <OptionCard icon={BiListOl} name="What are my top items?" />
            <OptionCard icon={TbMoodAnnoyed2} name="Analyze the mood of my playlist" />
          </div>
          <SessionButton session={userSession} />
          <TestAPI />
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
