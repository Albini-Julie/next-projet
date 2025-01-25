"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link'

export default function EventDetail() {
  const { id } = useParams(); 
  const router = useRouter();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (!id) return;

    async function fetchEvent() {
      try {
        const res = await fetch(`/api/events/${id}`);
        if (!res.ok) throw new Error('Événement non trouvé');
        const data = await res.json();
        setEvent(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchEvent();
  }, [id]);

  if (!event) return <p>Chargement...</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">{event.title}</h1>
      <p className="text-red-600">Date: {event.date}</p>
      <p className="text-gray-600">Lieu: {event.localisation}</p>
      <button onClick={() => router.back()} className="bg-gray-300 p-2 rounded">Retour</button>
      <Link href={`/reservations/${event.id}`} ><button className='bg-red-600 text-white py-2 px-3 mt-4 rounded-full'>Reservation</button></Link>
    </div>
  );
}