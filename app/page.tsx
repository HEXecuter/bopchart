import { authOptions } from './api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import SessionButton from './components/SessionButton';
import Title from './components/Title';
import OptionCard from './components/OptionCard';
import { BiMedal, BiCategoryAlt, BiListOl, BiMusic } from 'react-icons/bi';
import { TbMoodAnnoyed2 } from 'react-icons/tb'
import { IoMdSpeedometer } from 'react-icons/io'


export default async function Home() {
  const userSession = await getServerSession(authOptions);
  const welcomeText = userSession ? 'Select an option to learn more about your spotify usage!' : 'Log in to learn more about your spotify usage!';
  return (
    <main className='flex flex-col items-center justify-center min-h-[90vh]'>
      <div className='flex-col flex lg:flex-row justify-center gap-8 bg-gray-900 p-4 lg:p-8 rounded-xl m-6'>
        <div className='flex flex-col gap-6 items-center justify-center'>
          <Title text='Welcome to BopChart' />
          <p className='text-lg text-center'>{welcomeText}</p>
          <SessionButton session={userSession} />
        </div>
        <div className={
          `flex-wrap flex w-fit max-w-[690px] justify-center items-center gap-4 lg:gap-8 h-fit
          ${userSession ? '' : 'pointer-events-none'}`
        }>
          <OptionCard href='/genres' implemented icon={BiCategoryAlt} name="What genres do I listen to?" />
          <OptionCard href='/basicness' icon={BiMedal} name="How basic is my music taste?" />
          <OptionCard href='/top' icon={BiListOl} name="What are my top items?" />
          <OptionCard href='/dance' icon={BiMusic} name="Danceability of my playlist" />
          <OptionCard href='/tempo' icon={IoMdSpeedometer} name="Analyze the tempo of my playlist" />
          <OptionCard href='/mood' icon={TbMoodAnnoyed2} name="Analyze the mood of my playlist" />
        </div>
      </div>
    </main>
  )
}
