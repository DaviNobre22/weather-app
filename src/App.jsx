import React, { useState } from 'react';
import axios from 'axios';

// Importe o seu vídeo local
import futuristicVideo from './12421542_3840_2160_30fps.mp4'; 

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleKeyDown = async (e) => {
    if (e.key === 'Enter') {
      setLoading(true);
      setError(null);
      setWeather(null);
      try {
        const apiKey = '######################';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`;
        const response = await axios.get(url);
        setWeather(response.data);
      } catch (erro) {
        console.error("Error fetching weather:", erro);
        setError("Location not found. Please check the spelling and try again.");
        setWeather(null);
      } finally {
        setLoading(false);
      }
    }
  };



  const videoStyle = {
    position: 'fixed', 
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: -1, 
    background: '#1a1a2e' 
  };

  const contentWrapperStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    width: '100%',
    fontFamily: "'ROBOTO', sans-serif",
    color: '#e0e0e0',
  };

  const mainBoxStyle = {
    position: 'relative',
    textAlign: 'center',
    padding: '50px',
    overflow: 'hidden',
    borderRadius: '15px',
    backdropFilter: 'blur(40px)',
    boxShadow: '0 0 10px rgb(255, 255, 255), 0 0 10px rgb(255, 255, 255)',
    border: '1px solid rgb(255, 255, 255)',
    width: 'clamp(350px, 80vw, 500px)',
  };

  const headerStyle = {
    fontSize: 'clamp(2.5rem, 10vw, 3.5rem)',
    fontWeight: '700',
    color: '#ffff',
    textShadow: '0 0 5px rgb(131, 131, 131), 0 0 10px rgb(141, 141, 141), 0 0 20px rgb(145, 145, 145)',
    marginBottom: '40px',
  };

  const inputStyle = {
    fontFamily: "'Roboto', sans-serif",
    padding: '15px 25px',
    fontSize: '20px',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.79)',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    color: '#e0e0e0',
    outline: 'none',
    width: '80%',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    marginBottom: '2rem',
  };
  
  const inputFocusStyle = {
     borderColor: 'rgb(243, 243, 243)',
     boxShadow: '0 0 10px rgba(230, 230, 230, 0.7)',
  };

  const weatherBoxStyle = { marginTop: '30px', padding: '20px', borderRadius: '10px', backgroundColor: 'rgba(0, 0, 0, 0.2)', border: '1px solid rgba(194, 194, 194, 0.3)', transition: 'all 0.5s ease-in-out' };
  const cityStyle = { fontSize: '2rem', fontWeight: 'bold', color: '#fff' };
  const tempStyle = { fontSize: '4.5rem', fontWeight: 'bold', color: '#ffff', textShadow: '0 0 8px rgba(221, 221, 221, 0.94)', margin: '10px 0' };
  const descStyle = { fontSize: '1.2rem', fontStyle: 'italic', color: '#e0e0e0', textTransform: 'capitalize' };
  const iconStyle = { width: '100px', height: '100px', filter: 'drop-shadow(0 0 10px rgb(181, 185, 185))' };
  const messageStyle = { color: '#ffff', marginTop: '20px', fontSize: '1.1rem' };
  const errorStyle = { color: '#ff4d4d', marginTop: '20px', fontSize: '1.1rem' };

  return (
    <> 
      {/* CAMADA DE FUNDO */}
      <video style={videoStyle} autoPlay loop muted playsInline>
        <source src={futuristicVideo} type="video/mp4" />
      </video>

      {/* CAMADA DE CONTEÚDO */}
      <div style={contentWrapperStyle}>
        <div className="box" style={mainBoxStyle}>
          <h1 style={headerStyle}>WeatherX</h1>
          <input
            type="text"
            placeholder="Enter city name..."
            value={city}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            style={inputStyle}
            onFocus={(e) => {
                Object.assign(e.target.style, inputFocusStyle);
            }}
            onBlur={(e) => {
                Object.assign(e.target.style, inputStyle);
            }}
          />

          {loading && <p style={messageStyle}>Scanning atmosphere...</p>}
          {error && <p style={errorStyle}>{error}</p>}

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
      </div>
    </>
  );
}

export default App;