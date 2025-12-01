const ErrorMsg = ({ message }) => (
  <div className="bg-red-500/20 backdrop-blur-sm border-2 border-red-300 text-white p-4 rounded-2xl text-center my-4 shadow-lg">
    <p className="font-semibold">⚠️ {message}</p>
  </div>
);

export default ErrorMsg;