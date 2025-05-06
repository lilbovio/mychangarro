import { useEffect, useState } from 'react';
import { getBusinesses } from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BusinessCard from '../components/BusinessCard';

function Home() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [category, setCategory] = useState('comida');
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    loadBusinesses();
  }, [category]);

  const loadBusinesses = async () => {
    const res = await getBusinesses(category);
    setBusinesses(res.data);
  };

  return (
    <div>
      <Header />
      <div className="user-info">
        <img src={user.image_url} alt="User" />
        <h2>{user.name}</h2>
        <p>{user.description}</p>
      </div>
      <div className="category-selector">
        <button onClick={() => setCategory('comida')}>Comida</button>
        <button onClick={() => setCategory('servicios')}>Servicios</button>
      </div>
      <div className="business-list">
        {businesses.map((b) => (
          <BusinessCard key={b.id} business={b} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
