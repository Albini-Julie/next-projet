"use client"

import {useEffect, useState} from 'react'
import Link from 'next/link'

export default function Reservations() {
  const [reservations, setReservations] = useState([])

  useEffect(() => {
    async function fetchReservations() {
        const res = await fetch('http://localhost:3000/api/reservations', {cache: 'no-store'});
        const data = await res.json()
        setReservations(data)
    }
    fetchReservations()
  }, [])


  return(
    <div className="p-8">
      <h1>Réservation 1</h1>
      <div className='flex flex-col gpa-4'>
        {reservations.map((reservation) => (
          <div key={reservation.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold"> Numéro de l'événement: {reservation.idEvent}</h2>
            <h2 className="text-red-600">Nom de la personne ayant effectué la réservation: {reservation.nom}</h2>
            <p className="text-red-600">Prénom de la personne ayant effectué la réservation: {reservation.prenom}</p>
            <p className="text-red-600">Nombre de places réservées: {reservation.nbPlaces}</p>        
          </div>
        ))}
      </div>
    </div>
  );
}