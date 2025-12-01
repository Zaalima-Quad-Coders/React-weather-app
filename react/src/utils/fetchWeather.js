export const fetchWeatherByCoords = async (lat, lon) => {
  const API = import.meta.env.VITE_WEATHER_API_KEY;
  const BASE = import.meta.env.VITE_WEATHER_BASE_URL;

  const url = `${BASE}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Location weather not found");

  return res.json();
};

export const fetchWeatherByCity = async (city) => {
  const API = import.meta.env.VITE_WEATHER_API_KEY;
  const BASE = import.meta.env.VITE_WEATHER_BASE_URL;

  const url = `${BASE}/weather?q=${city}&units=metric&appid=${API}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("City not found");

  return res.json();
};