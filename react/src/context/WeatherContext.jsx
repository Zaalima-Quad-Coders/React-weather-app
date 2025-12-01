import { createContext, useState } from "react";
import { fetchWeatherByCoords, fetchWeatherByCity } from "../utils/fetchWeather";

export const WeatherContext = createContext();

const WeatherProvider = ({ children }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeatherByCity = async (city) => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchWeatherByCity(city);
      setWeather(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherByLocation = () => {
    setLoading(true);
    setError("");

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const data = await fetchWeatherByCoords(latitude, longitude);
          setWeather(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Location access denied");
        setLoading(false);
      }
    );
  };

  return (
    <WeatherContext.Provider
      value={{ weather, loading, error, getWeatherByCity, getWeatherByLocation }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;