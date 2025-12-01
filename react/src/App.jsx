import { useContext } from "react";
import { Sun, Cloud } from "lucide-react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Loader from "./components/Loader";
import ErrorMsg from "./components/ErrorMsg";
import { WeatherContext } from "./context/WeatherContext";
import { getBackgroundGradient } from "./utils/weatherHelpers";

const App = () => {
  const { weather, loading, error } = useContext(WeatherContext);
  const bgGradient = weather 
    ? getBackgroundGradient(weather.weather[0].main)
    : "from-blue-500 via-purple-500 to-pink-500";

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bgGradient} transition-all duration-1000`}>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgzMCkiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEiIGZpbGw9IndoaXRlIiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybikiLz48L3N2Zz4=')] opacity-30"></div>
      
      <div className="relative max-w-2xl mx-auto p-6 pt-12">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white drop-shadow-2xl mb-2 flex items-center justify-center gap-3">
            <Sun className="w-12 h-12" />
            Weather Now
          </h1>
          <p className="text-black text-lg">Discover weather conditions worldwide</p>
        </div>

        <SearchBar />

        {loading && <Loader />}
        {error && <ErrorMsg message={error} />}
        {!loading && weather && <WeatherCard data={weather} />}

        {!loading && !weather && !error && (
          <div className="text-center text-white/90 bg-white/10 backdrop-blur-lg p-8 rounded-3xl border-2 border-white/20">
            <Cloud className="w-20 h-20 mx-auto mb-4 opacity-50" />
            <p className="text-xl">Search for a city or use your location to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;