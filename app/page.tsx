import Image from 'next/image'
import { authOptions } from './api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import SessionButton from './SessionButton';

export default async function Home() {
  const userSession = await getServerSession(authOptions);
  console.log("+++++++++++++++++++++++++++")
  console.log(userSession)
  console.log("+++++++++++++++++++++++++++")

  return (
    <main>
      <p>Hello</p>
      <SessionButton/>
    </main>
  )
}
