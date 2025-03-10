import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="w-full min-h-screen bg-gray-100 flex justify-center place-items-center">
      <div className="flex flex-col justify-center place-items-center">
        <h1 className="text-6xl text-cusblack font-bold">404</h1>
        <h1 className="text-xl text-gray-400 font-bold">PAGE NOT FOUND</h1>
      </div>
    </div>
  );
}
export default NotFound;
