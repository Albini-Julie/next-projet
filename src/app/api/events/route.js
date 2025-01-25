import { NextResponse } from 'next/server'
 
 let events = [
    { id: 1, title: 'Concert de jazz', date: "2024-04-05", localisation: 'Paris', nbPlacesMax: 10 },
    { id: 2, title: 'Festival de rock', date: "2024-05-20", localisation: 'Lyon', nbPlacesMax: 8 },
    { id: 3, title: 'Soirée Electro', date: "2024-06-10", localisation: 'Marseille', nbPlacesMax: 9 }
  ];

export async function GET() {
  return NextResponse.json(events);
}


export async function POST(request){
  const newEvent = await request.json()
  events.push(newEvent)
  return Response.json(newEvent, {status:201})
}

