import { authOptions } from './api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import SessionButton from './components/SessionButton';
import Title from './components/Title';
import OptionCard from './components/OptionCard';
import { BiMedal, BiCategoryAlt, BiListOl } from 'react-icons/bi';
import { TbMoodAnnoyed2 } from 'react-icons/tb'
import TestAPI from './components/TestAPI';


export default async function Home() {
  const userSession = await getServerSession(authOptions);

  if (userSession) {
    return (
      <main className='h-full flex flex-col items-center justify-center'>
        <div className='flex-col flex lg:flex-row justify-center gap-8'>
          <div className='flex flex-col gap-6 items-center justify-center'>
            <Title text='Welcome to Chartify' />
            <p className='text-lg'>Select an option to the right to learn more about your Spotify usage!</p>
            <SessionButton session={userSession} />
          </div>
          <div className='grid grid-cols-1 lg:grid-cols-3 grid-flow-row gap-6'>
            <OptionCard icon={BiMedal} name="How Basic is my Music Taste?" />
            <OptionCard icon={BiCategoryAlt} name="What Genres do I Listen to?" />
            <OptionCard icon={BiListOl} name="What are my top items?" />
            <OptionCard icon={TbMoodAnnoyed2} name="Analyze the mood of my playlist" />
            <OptionCard icon={TbMoodAnnoyed2} name="Analyze the mood of my playlist" />
            <OptionCard icon={TbMoodAnnoyed2} name="Analyze the mood of my playlist" />
          </div>
        </div>
      </main>
    )
  } else {
    return (
      <main>
        <div className='w-1/2 flex-col mx-auto'>
          <Title text='Welcome to Chartify' />
          <p className='text-center text-xl '>
            Log in with your Spotify account to get started!
          </p>
          <SessionButton session={userSession} />
        </div>
      </main>
    )
  }
}
