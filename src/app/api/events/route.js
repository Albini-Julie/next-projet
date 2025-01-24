export async function GET() {
  const events = [
    { id: 1, title: 'Concert de jazz', date: "2024-04-05", localisation: 'Paris' },
    { id: 2, title: 'Festival de rock', date: "2024-05-20", localisation: 'Lyon' },
    { id: 3, title: 'Soirée Electro', date: "2024-06-10", localisation: 'Marseille' }
  ];

  return Response.json(events);
}