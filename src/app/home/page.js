import Link from 'next/link';


const Home = () => {
  return (
    <div>
      <h1>BIenvenue à l'appliation de gestion d'événements</h1>
      <nav>
        <Link href="/events">Evenements</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </div>
  );
};

export default Home;
