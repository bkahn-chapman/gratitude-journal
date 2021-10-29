import Head from 'next/head'
import Greeting from '../components/Greeting'
import History from '../components/History'
import Input from '../components/Input'
import GratitudeApp from '../components/GratitudeApp'
import { useState } from 'react'
import { Auth } from '@supabase/ui'
import { supabase } from "../utils/supabaseClient.js"

export default function Home() {
  // gets the logged in user from Auth.UserContextProvider
  // if no user is logged in, user will be null
  // if a user is logged in, user will be an object with user info
  const { user } = Auth.useUser()

  return (
    <div className="bg-blue-900 min-h-screen min-w-screen">
      <Head>
        <title>Gratitude Journal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="red container mx-auto max-w-prose px-4 pt-12">
        {
          // display app if user is logged in, otherwise show login module
          user ? (
            <GratitudeApp user={user}/>
          ) : (
            <div className="bg-white">
              <Auth supabaseClient={supabase} socialLayout="horizontal" socialButtonSize="xlarge"/>
            </div> 
          )       
        }
      </main>
    </div>
  )
}
