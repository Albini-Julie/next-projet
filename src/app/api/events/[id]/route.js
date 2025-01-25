import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;

  const res = await fetch("http://localhost:3000/api/events");
  if (!res.ok) {
    return NextResponse.json({ error: "Impossible de récupérer les événements" }, { status: 500 });
  }

  const events = await res.json();
  const event = events.find(e => e.id === parseInt(id));

  if (!event) {
    return NextResponse.json({ error: "Événement non trouvé" }, { status: 404 });
  }

  return NextResponse.json(event);
}