import React, { useState } from 'react';
import axios from 'axios';


function App() {
  const [city, setCity] = useState('');
  const [weather, setClima] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };
  const appStyle = {
    fontFamily: "'Roboto', sans-serif",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#fff',
    color: '#6a0dad', // purple
  };
  const weatherBoxStyle = {
  marginTop: '40px',
  backgroundColor: 'white',
  padding: '30px',
  borderRadius: '20px',
  boxShadow: '0 8px 20px rgba(138, 43, 226, 0.3)',
  textAlign: 'center',
  width: '300px',
  color: '#4B0082',
  fontFamily: 'Segoe UI, sans-serif',
};

  const cityStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#6a0dad',
  };

  const tempStyle = {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#8a2be2',
    margin: '10px 0',
  };

  const descStyle = {
    fontSize: '18px',
    fontStyle: 'italic',
    color: '#4B0082',
    marginBottom: '10px',
  };

  const iconStyle = {
    width: '100px',
    height: '100px',
  };


  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      setLoading(true);
      setError(null);

      try {
        const apiKey = 'b9513ce976a4293bdcb33698f87b8998';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;

        const resposta = await axios.get(url);
        setClima(resposta.data);
        console.log(resposta.data);
      } catch (erro) {
        console.error("Erro ao buscar clima:", erro);
        setError("City not found or something went wrong.");
        setClima(null);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div style={appStyle}>
    <h1 style={{
      fontSize: '48px',
      marginBottom: '30px',
      color: '#6a0dad',
      textShadow: '0 0 5px #dab6ff',
    }}>
      WeatherX
    </h1>
    <input
      type="text"
      placeholder="Search city..."
      value={city}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      style={{
        padding: '12px 20px',
        fontSize: '16px',
        borderRadius: '20px',
        border: '2px solid #6a0dad',
        backgroundColor: '#f9f6ff',
        color: '#6a0dad',
        outline: 'none',
        width: '300px',
        textAlign: 'center',
        transition: '0.3s',
        marginBottom: '8rem'
      }}
      onFocus={(e) => (e.target.style.borderColor = '#8a2be2')}
      onBlur={(e) => (e.target.style.borderColor = '#6a0dad')}
    />
    {loading && <p style={{ color: '#6a0dad', marginTop: '20px' }}>Loading...</p>}
    {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>} 

    {weather && weather.main && (
      <div style={weatherBoxStyle}>
        <h2 style={cityStyle}>{weather.name}, {weather.sys.country}</h2>
        <p style={tempStyle}>{Math.round(weather.main.temp)}°C</p>
        <p style={descStyle}>{weather.weather[0].description}</p>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="Weather icon"
          style={iconStyle}
        />
      </div>
    )}
    </div>
  );
}

export default App;
