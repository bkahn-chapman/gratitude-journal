// components/GratitudeApp.js

import Greeting from './Greeting'
import History from './History'
import Input from './Input'
import { useEffect, useState } from 'react'
import { supabase } from "../utils/supabaseClient.js"

export default function GratitudeApp({ user }) {
    const [gratitudes, setGratitudes] = useState([])
    const [hasSubmittedToday, setSubmittedToday] = useState(false)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        // run the fetchGratitudes() function
        // after the initial render of the app
        // so we have access to the logged in user
        fetchGratitudes()
    }, [])

    const fetchGratitudes = async () => {
        // get the gratitudes data from supabase
        // set the value of gratitudes state to that data

        let { data: gratitudes, error } = await supabase
            .from('gratitudes')
            .select('entry, date_insert_ts')


        if (!error) {
            /* TODO: See if time since last submission > 24 hours
             * if not, set submittedToday to true
            */
            let currentTime = new Date().getTime()
            let mostRecentRecord = new Date(gratitudes.slice(-1)[0].date_insert_ts).getTime()
            let hoursSinceLastSubmission = (mostRecentRecord - currentTime) / 36000000
            let didSubmitToday = hoursSinceLastSubmission < 24
            setSubmittedToday(didSubmitToday)
            setGratitudes(gratitudes)
            setLoading(false)
        } else {
            console.log(error)
            setLoading(false)
            setError(error)
        }
    }

    const addGratitude =  async (entry) => {
        const { data, error } = await supabase
            .from('gratitudes')
            .insert([
                { id: user.id, entry: entry },
            ])
            setLoading(true)
        if (error) {
            console.log(error)
            setError(error)
        }
        else {
            setGratitudes([...gratitudes, {'entry': entry, 'date_insert_ts': null }])
            setLoading(false)
            setSubmittedToday(true)
        }
    }

    /* Application is still fetching data */
    if (loading) {
        return <p>Loading...</p>
    }

    /* Something went wrong while fetching data */
    if (error) {
        return <p>{error}</p>
    }

    /* Everything went as expected, show full app */
    return (
        <div className="bg-blue-900 min-w-screen">
            <main className="red container mx-auto px-4 pt-12">
                <Greeting
                    color="text-green-400"
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
