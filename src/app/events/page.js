export default async function Events() {
  const res = await fetch('http://localhost:3000/api/events', {cache: 'no-store'});
  const events = await res.json();
  const createEvents = () => {
    let popup = getElementById("id");
    popup
  }
  return(
    <div className="p-8">
      <h1>Evenement 1</h1>
      <div className='grid gap-4'>
        {events.map((event) => (
          <div key={event.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{event.title}</h2>
            <p className="text-red-600">Date: {event.date}</p>
            <p className="text-gray-600">Lieu: {event.localisation}</p>  
          </div>
        ))}
      </div>
      <button onClick={createEvents} className="border border-black rounded-full mt-12 py-2 px-3 hover:text-white hover:bg-black">Create Events</button>
      <div id="popup">
        <label>Event's name</label>
        <input type="text" placeholder="name"/>
      </div>
    </div>
  );
}