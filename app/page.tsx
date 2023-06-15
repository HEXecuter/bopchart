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
  const welcomeText = userSession ? 'Select an option to learn more about your spotify usage!' : 'Log in to learn more about your spotify usage!';
  return (
    <main className='flex flex-col items-center justify-center min-h-[90vh]'>
      <div className='flex-col flex md:flex-row justify-center gap-8 '>
        <div className='flex flex-col gap-6 items-center justify-center'>
          <Title text='Welcome to Chartify' />
          <p className='text-lg text-center'>{welcomeText}</p>
          <SessionButton session={userSession} />
        </div>
        <div className={
          `grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-flow-row justify-items-center gap-6 h-fit
          ${userSession ? '' : 'pointer-events-none'}`
        }>
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
}
