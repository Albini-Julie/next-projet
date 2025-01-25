"use client"

import {useEffect, useState} from 'react'
import Link from 'next/link'

export default function Events() {
  const [events, setEvents] = useState([])
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    async function fetchEvents() {
        const res = await fetch('http://localhost:3000/api/events', {cache: 'no-store'});
        const data = await res.json()
        setEvents(data)
    }
    fetchEvents()
  }, [])

const tooglePopup = () => {
  setShowPopup(!showPopup)
}

const  addEvent = async (event) => {
  event.preventDefault()
  const newEvent = {
    id: events.length + 1,
    title: event.target.title.value,
    date: event.target.date.value,
    localisation: event.target.localisation.value,
    nbPlacesMax: event.target.nbPlacesMax.value
  }
  try {
    const response = await fetch('http://localhost:3000/api/events', {
      method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(newEvent)
    })
    if (response.ok){
      const saveEvent = await response.json()
      setEvents([...events, saveEvent])
      tooglePopup()
      alert("Evenement créé !")
    }
    else{
      console.error
      alert("Evenement pas créé !")
    }
  } catch (error) {console.error}
  setEvents([...events, newEvent])
  tooglePopup()
}

  return(
    <div className="p-8">
      <h1>Evenement 1</h1>
      <div className='flex flex-col gpa-4'>
        {events.map((event) => (
          <div key={event.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{event.title}</h2>
            <p className="text-red-600">Date: {event.date}</p>
            <p className="text-gray-600">Lieu: {event.localisation}</p>        
            <Link href={`/events/${event.id}`} ><button className='bg-red-600 text-white py-2 px-3 mt-4 rounded-full'>See more</button></Link>
          </div>
        ))}
      </div>
      {showPopup && (
        <div className='bg-red-300 p-3'>
          <form onSubmit={addEvent}>
            <label>Nom de l'événement</label>
            <input className='border' type="text" name="title" required/>
            <label>Date de l'événement</label>
            <input className='border' type="date" name="date" required/>
            <label>Localisation de l'événement</label>
            <input className='border' type="text" name="localisation" required/>
            <label>Nombre max places de l'événement</label>
            <input className='border' type="number" name="nbPlacesMax" required/>
            <button type="submit">Ajouter l'événement</button>
          </form>
        </div>
      )}
    </div>
  );
}