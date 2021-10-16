import Head from 'next/head'
import Greeting from '../components/Greeting'
import History from '../components/History'
import Input from '../components/Input'
import { useState } from 'react'

export default function Home() {
  const [user, setUser] = useState({
      "name": "Ben",
      "email": "bkahn@chapman.edu"
    })

  const [gratitudes, setGratitudes] = useState(['hockey', 'computers'])
  const [hasSubmittedToday, setSubmittedToday] = useState(false)

  const addGratitude = (entry) => {
    let newGratitudes = [...gratitudes, entry]
    setGratitudes(newGratitudes)
    setSubmittedToday(true)
  }

  return (
    <div className="bg-gray-700 min-h-screen min-w-screen">
      <Head>
        <title>Hello</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="red container mx-auto max-w-prose px-4 pt-12">
        <Greeting
          color="text-pink-300"
          user={user}
          gratitudes={gratitudes}
          hasSubmittedToday={hasSubmittedToday}
        ></Greeting>
        <div className="spacer" />
        {
          !hasSubmittedToday && <Input handleSubmit={addGratitude} />
        }
        <div className="spacer" />
        {
          gratitudes.length > 0 && 
          <History gratitudes={gratitudes} />
        }
      </main>
      <style jsx>{`
        .spacer {
          height: 20px;
        }
      `}</style>
    </div>
  )
}
