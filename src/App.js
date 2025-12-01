
import React, { useState } from "react";
import "./App.css";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const API_KEY = "2bf447fc08fa1eee5af162e828fc920c";

// Temperature → Color
const getTempColor = (temp) => {
  if (temp < 0) return "#00BFFF";
  if (temp < 10) return "#1E90FF";
  if (temp < 20) return "#00FA9A";
  if (temp < 30) return "#FFD700";
  if (temp < 40) return "#FF8C00";
  return "#FF4500";
};

const getTempClass = (temp) => {
  if (temp < 10) return "cold";
  if (temp < 20) return "mild";
  if (temp < 30) return "warm";
  return "hot";
};

const getFlagURL = (code) => `https://flagsapi.com/${code}/flat/64.png`;

// Emoji mapping for weather
const weatherEmoji = (main) => {
  switch (main.toLowerCase()) {
    case "clear": return "☀️";
    case "clouds": return "☁️";
    case "rain": return "🌧️";
    case "thunderstorm": return "🌩️";
    case "snow": return "❄️";
    case "mist":
    case "fog": return "🌫️";
    default: return "";
  }
};

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [alert, setAlert] = useState("");
  const [bestTime, setBestTime] = useState("");
  const [dailySummary, setDailySummary] = useState("");

  const startVoiceSearch = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Voice search not supported!");

    const recog = new SpeechRecognition();
    recog.lang = "en-IN";
    recog.onresult = (e) => setCity(e.results[0][0].transcript);
    recog.start();
  };

  const calculateBestTime = (forecastData) => {
    const goodHours = forecastData.filter(
      (f) =>
        f.main.temp >= 20 &&
        f.main.temp <= 28 &&
        !f.weather[0].main.toLowerCase().includes("rain")
    );
    if (goodHours.length > 0) {
      const start = new Date(goodHours[0].dt * 1000).getHours();
      const end = new Date(goodHours[goodHours.length - 1].dt * 1000).getHours();
      setBestTime(`${start}:00 - ${end}:00`);
    } else {
      setBestTime("No suitable time today");
    }
  };

  const checkAlert = (currentWeather) => {
    const temp = currentWeather.main.temp;
    const weatherMain = currentWeather.weather[0].main.toLowerCase();
    if (temp >= 40 || temp <= 0 || weatherMain.includes("storm") || weatherMain.includes("rain")) {
      setAlert(`⚠️ Alert: ${currentWeather.weather[0].description} today!`);
    } else {
      setAlert("");
    }
  };

  const calculateDailySummary = (forecastData) => {
    if (!forecastData.length) return;
    let hottest = forecastData[0];
    let coldest = forecastData[0];
    forecastData.forEach((f) => {
      if (f.main.temp > hottest.main.temp) hottest = f;
      if (f.main.temp < coldest.main.temp) coldest = f;
    });
    setDailySummary(
      `🔥 Hottest: ${hottest.dt_txt.split(" ")[0]} (${hottest.main.temp}°C) | ❄️ Coldest: ${coldest.dt_txt.split(" ")[0]} (${coldest.main.temp}°C)`
    );
  };

  const getWeather = async () => {
    if (!city) return;
    try {
      setError(""); setWeather(null); setForecast([]); setAlert(""); setBestTime(""); setDailySummary("");

      const res1 = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      if (res1.status === 404) return setError("❌ City not found");
      const data1 = await res1.json();
      setWeather(data1); checkAlert(data1);

      const res2 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`);
      const data2 = await res2.json();

      const midDays = data2.list.filter((i) => i.dt_txt.includes("12:00:00"));
      setForecast(midDays);
      setWeeklyData(midDays.map((d) => ({ date: d.dt_txt.split(" ")[0], temp: d.main.temp })));

      calculateBestTime(data2.list);
      calculateDailySummary(midDays);
    } catch {
      setError("⚠ Something went wrong. Try again.");
    }
  };

  return (
    <div className={darkMode ? "wrapper dark" : "wrapper"}>
      <div className="top">
        <h1 className="title">Weather Dashboard</h1>
        <button className="mode-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "🌙 Dark" : "☀ Light"}
        </button>
      </div>

      {alert && <div className="alert">{alert}</div>}

      <div className="search-box">
        <input
          type="text"
          placeholder="Search city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="search-btn" onClick={getWeather}>Search</button>
        <button className="mic-btn" onClick={startVoiceSearch}>🎤</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="current-card">
          <div className="card-header">
            <h2>{weather.name}, {weather.sys.country}</h2>
            <img className="flag" src={getFlagURL(weather.sys.country)} alt="flag" />
          </div>

          <div className="temp-bar">
            <div
              className="temp-fill"
              style={{ width: `${weather.main.temp + 20}%`, background: getTempColor(weather.main.temp) }}
            ></div>
          </div>

          <h3 style={{ color: getTempColor(weather.main.temp) }}>{weather.main.temp}°C</h3>
          <p><b>Humidity:</b> {weather.main.humidity}%</p>
          <p><b>Wind:</b> {weather.wind.speed} m/s</p>
          <p><b>Sunrise:</b> {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p>
          <p><b>Sunset:</b> {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>

          <img
            className="weather-icon"
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="weather icon"
          />
        </div>
      )}

      {bestTime && <div className="best-time">🌤️ Best Time Today: {bestTime}</div>}

      {dailySummary && <div className="daily-summary">{dailySummary}</div>}

      {forecast.length > 0 && (
        <>
          <h2 className="forecast-title">5-Day Forecast</h2>

          {/* Icon Legend with Fog */}
          <div className="icon-legend">
            <div><img src="https://openweathermap.org/img/wn/01d.png" alt="Sunny" /> Sunny ☀️</div>
            <div><img src="https://openweathermap.org/img/wn/02d.png" alt="Cloudy" /> Cloudy ☁️</div>
            <div><img src="https://openweathermap.org/img/wn/09d.png" alt="Rain" /> Rain 🌧️</div>
            <div><img src="https://openweathermap.org/img/wn/11d.png" alt="Storm" /> Storm 🌩️</div>
            <div><img src="https://openweathermap.org/img/wn/13d.png" alt="Snow" /> Snow ❄️</div>
            <div><img src="https://openweathermap.org/img/wn/50d.png" alt="Fog" /> Fog 🌫️</div>
          </div>

          <div className="forecast-container">
            {forecast.map((day, i) => (
              <div
                className={`forecast-card ${day.main.temp >= 40 || day.main.temp <= 0 ? "alert-card" : ""}`}
                key={i}
                title={`${day.weather[0].description} at ${day.main.temp}°C`}
              >
                <h4>{day.dt_txt.split(" ")[0]}</h4>
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                  className="forecast-icon"
                  alt=""
                />
                <p className={`forecast-temp ${getTempClass(day.main.temp)}`}>
                  {day.main.temp}°C
                </p>
                <p className="desc">{day.weather[0].description} {weatherEmoji(day.weather[0].main)}</p>
              </div>
            ))}
          </div>

          <h2 className="chart-title">Temperature Trend</h2>
          <div className="chart-box">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={weeklyData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => `${value}°C`} labelFormatter={(label) => `Date: ${label}`} />
                <Line type="monotone" dataKey="temp" stroke="#ff6600" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
