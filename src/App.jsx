import React, { useState } from "react";

function App() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState({});

  const getWeather = async () => {
    if (!location) return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=98c209d816c27ee9721aca804e5fc82e&units=metric`
      );
      const data = await response.json();

      if (data.cod !== 200) {
        alert("Location not found!");
        return;
      }

      setWeather({
        name: data.name,
        temp: data.main.temp,
        des: data.weather[0].description,
        feelslike: data.main.feels_like,
        humidity: data.main.humidity,
        wind: data.wind.speed,
      });
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  return (
    <>
      <div className="app">
        <div className="input">
          <input
            type="text"
            placeholder="Enter Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button onClick={getWeather}>Search</button>
        </div>

        {weather.name && (
          <div className="container">
            <div className="top">
              <div className="location">
                <p>{weather.name}</p>
              </div>
              <div className="temperature">
                <h1>{weather.temp}°C</h1>
              </div>
              <div className="description">
                <p>{weather.des}</p>
              </div>
            </div>

            {/* Bottom moved here (no more middle) */}
            <div className="bottom">
              <div className="feels">
                <p className="bold">{weather.feelslike}°C</p>
                <p>Feels Like</p>
              </div>
              <div className="humidity">
                <p className="bold">{weather.humidity}%</p>
                <p>Humidity</p>
              </div>
              <div className="wind">
                <p className="bold">{weather.wind} m/s</p>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
