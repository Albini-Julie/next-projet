"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Reservation() {
  const { id } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState(null);
  const [reservations, setReservations] = useState([]);

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

  const makeReservation = async (reservation) => {
    reservation.preventDefault();
    
    // Calcule le nombre total de places réservées pour cet événement
    let compteur = 0;
    for (const testReservation of reservations) {
      if (testReservation.idEvent === id) {
        console.log(testReservation.idEvent)
        compteur += parseInt(testReservation.nbPlaces, 10); 
      }
    }

    // Vérifie si le nombre de places réservées dépasse la capacité maximale
    const newReservationNbPlaces = parseInt(reservation.target.nbPlaces.value, 10);
    if (compteur + newReservationNbPlaces <= event.nbPlacesMax) {
      // Crée une nouvelle réservation
      const newReservation = {
        id: reservations.length + 1,
        idEvent: id,
        nom: reservation.target.nom.value,
        prenom: reservation.target.prenom.value,
        nbPlaces: newReservationNbPlaces,
      };

      try {
        // Envoie la réservation à l'API
        const response = await fetch('http://localhost:3000/api/reservations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newReservation),
        });

        if (response.ok) {
          const saveReservation = await response.json();
          setReservations([...reservations, saveReservation]);
          alert('Réservation faite !');
        } else {
          console.error('Erreur lors de la réservation');
          alert('Réservation pas faite !');
        }
      } catch (error) {
        console.error(error);
        alert('Erreur lors de la réservation');
      }
    } else {
      console.error('Nombre de places réservé dépassé');
      alert('Réservation pas faite ! Nombre de places maximum atteint.');
    }
  };

  return (
    <div className="p-8">
      <h1 className="font-bold text-3xl mb-4">Rappel de l'événement sélectionné</h1>
      <h2 className="text-2xl font-medium">{event.title}</h2>
      <p className="text-red-600">Date: {event.date}</p>
      <p className="text-gray-600">Lieu: {event.localisation}</p>
      <div className="mt-4">
        <h2 className="text-2xl font-medium">Formulaire de réservation</h2>
        <form onSubmit={makeReservation}>
          <label>Nom</label>
          <input className="border rounded-full ml-2" type="text" name="nom" />
          <label className="ml-2">Prénom</label>
          <input className="border rounded-full ml-2" type="text" name="prenom" />
          <label className="ml-2">Email</label>
          <input className="border rounded-full ml-2" type="text" name="email" />
          <label className="ml-2">Nb places</label>
          <input className="border rounded-full ml-2" type="text" name="nbPlaces" />
          <button className="bg-blue-600 text-white py-2 px-3 mt-4 rounded-full" type="submit">
            Valider la réservation
          </button>
        </form>
      </div>
    </div>
  );
}