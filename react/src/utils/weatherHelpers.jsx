import { Sun, Cloud, CloudRain, CloudDrizzle, CloudSnow, CloudLightning } from "lucide-react";

export const getWeatherIcon = (condition) => {
  const iconMap = {
    Clear: Sun,
    Clouds: Cloud,
    Rain: CloudRain,
    Drizzle: CloudDrizzle,
    Snow: CloudSnow,
    Thunderstorm: CloudLightning,
  };
  const IconComponent = iconMap[condition] || Cloud;
  return <IconComponent className="w-24 h-24 text-white drop-shadow-lg" />;
};

export const getBackgroundGradient = (condition) => {
  const gradients = {
    Clear: "from-blue-500 via-sky-400 to-yellow-300",          // Bright sunny
    Clouds: "from-gray-500 via-gray-400 to-gray-200",          // Soft cloudy
    Rain: "from-slate-700 via-blue-600 to-blue-400",           // Dark rainy
    Drizzle: "from-sky-500 via-blue-300 to-blue-200",          // Light drizzle
    Snow: "from-blue-200 via-slate-100 to-white",              // Soft snowy
    Thunderstorm: "from-gray-900 via-purple-700 to-gray-800",  // Intense storm
  };

  return gradients[condition] || "from-purple-400 via-pink-300 to-orange-200";  
};