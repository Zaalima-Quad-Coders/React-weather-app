import { Droplets, Wind, Eye, Gauge } from "lucide-react";
import { getWeatherIcon } from "../utils/weatherHelpers";

const WeatherCard = ({ data }) => {
  const condition = data.weather[0].main;
  
  return (
    <div className="bg-white/20 backdrop-blur-lg shadow-2xl p-8 rounded-3xl text-white border-2 border-white/30">
      <div className="text-center mb-6">
        <h2 className="text-4xl font-bold mb-2 drop-shadow-lg">{data.name}</h2>
        <p className="text-xl capitalize text-white/90">{data.weather[0].description}</p>
      </div>

      <div className="flex justify-center my-8">
        {getWeatherIcon(condition)}
      </div>

      <h1 className="text-7xl font-bold text-center mb-8 drop-shadow-lg">
        {Math.round(data.main.temp)}°C
      </h1>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl flex items-center gap-3 border border-white/30">
          <Droplets className="w-8 h-8 text-blue-200" />
          <div>
            <p className="text-sm text-black">Humidity</p>
            <p className="text-xl font-bold">{data.main.humidity}%</p>
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl flex items-center gap-3 border border-white/30">
          <Wind className="w-8 h-8 text-blue-200" />
          <div>
            <p className="text-sm text-black">Wind Speed</p>
            <p className="text-xl font-bold">{data.wind.speed} m/s</p>
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl flex items-center gap-3 border border-white/30">
          <Gauge className="w-8 h-8 text-blue-200" />
          <div>
            <p className="text-sm text-black">Pressure</p>
            <p className="text-xl font-bold">{data.main.pressure} hPa</p>
          </div>
        </div>

        <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl flex items-center gap-3 border border-white/30">
          <Eye className="w-8 h-8 text-blue-200" />
          <div>
            <p className="text-sm text-black">Visibility</p>
            <p className="text-xl font-bold">{(data.visibility / 1000).toFixed(1)} km</p>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white/20 backdrop-blur-sm p-4 rounded-2xl text-center border border-white/30">
        <p className="text-black">Feels like</p>
        <p className="text-3xl font-bold">{Math.round(data.main.feels_like)}°C</p>
      </div>
    </div>
  );
};

export default WeatherCard;