import { Sun } from "lucide-react";

const Loader = () => (
  <div className="flex justify-center items-center my-12">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      <Sun className="w-8 h-8 text-yellow-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
    </div>
  </div>
);

export default Loader;