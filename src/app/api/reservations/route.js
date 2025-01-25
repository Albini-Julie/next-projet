import { NextResponse } from 'next/server'
 
 let reservations = [

  ];

  export async function GET() {
    return NextResponse.json(reservations);
  }

export async function POST(request){
  const newReservation = await request.json()
  reservations.push(newReservation)
  return Response.json(newReservation, {status:201})
}

