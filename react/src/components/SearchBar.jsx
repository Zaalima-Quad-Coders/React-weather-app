import { useState, useContext } from "react";
import { Search, MapPin } from "lucide-react";
import { WeatherContext } from "../context/WeatherContext";

const SearchBar = () => {
  const [city, setCity] = useState("");
  const { getWeatherByCity, getWeatherByLocation } = useContext(WeatherContext);

  const handleSubmit = () => {
    if (city.trim() !== "") {
      getWeatherByCity(city);
      setCity("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="flex gap-3 mb-8">
      <div className="flex gap-2 w-full">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search for a city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full px-5 py-3 pl-12 rounded-2xl border-2 border-white/30 bg-white/20 backdrop-blur-md text-white placeholder-white/70 focus:outline-none focus:border-white/60 transition-all shadow-lg"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/70" />
        </div>
        <button 
          onClick={handleSubmit}
          className="bg-white/30 backdrop-blur-md hover:bg-white/40 text-white px-6 py-3 rounded-2xl font-semibold transition-all shadow-lg border-2 border-white/30 hover:border-white/50"
        >
          Search
        </button>
      </div>

      <button
        onClick={getWeatherByLocation}
        className="bg-white/30 backdrop-blur-md hover:bg-white/40 text-white p-3 rounded-2xl transition-all shadow-lg border-2 border-white/30 hover:border-white/50"
        title="Use current location"
      >
        <MapPin className="w-6 h-6" />
      </button>
    </div>
  );
};

export default SearchBar;