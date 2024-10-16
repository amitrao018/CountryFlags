import React, { useState, useEffect } from 'react';

const CountryFlags = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://xcountries-backend.azurewebsites.net/all');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data); // <-- Add this line to check if data is being fetched
        setCountries(data);
        setLoading(false);
      } catch (error) {
        console.error(`Error fetching data: ${error}`);
        setError(error);
        setLoading(false);
      }
    };
  
    fetchCountries();
  }, []);
  

  if (loading) return <p>Loading countries...</p>;
  if (error) return <p>Error fetching countries: {error.message}</p>;

  return (
    <div style={styles.grid}>
      {countries.map((country) => (
        <div key={country.name} style={styles.card}>
          <img src={country.flag} alt={`Flag of ${country.name}`} style={styles.flag} />
          <p>{country.name}</p>
        </div>
      ))}
    </div>
  );
};

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '20px',
    padding: '20px',
  },
  card: {
    textAlign: 'center',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '8px',
  },
  flag: {
    width: '100px',
    height: '60px',
    objectFit: 'contain',
  },
};

export default CountryFlags;
