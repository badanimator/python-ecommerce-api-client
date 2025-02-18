import { useUser } from "../context/UserContext";


function CardProfile({ username, orders }) {
  const { userData } = useUser();

  return (
    <div className="rounded-2xl p-5 bg-white shadow-lg">
      <div className="flex flex-col place-items-center pb-3 border-b border-gray-300">
        <div className="w-14 h-14 rounded-full bg-cusblack mb-2"></div>
        <div className="text-center">
          <p className="mb-1">{username}</p>
          <p className="text-xs text-gray-400 mb-1">Verified Account</p>
          {/* <p className="text-xs text-gray-400">{session.email}</p> */}
        </div>
      </div>
      <div className="py-3 flex flex-col place-items-center">
        <div className="flex place-items-center mb-2 font-semibold">
          <svg
            className="w-4 h-4 text-cusblack mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
            />
          </svg>
          <p className="text-xs text-black">Member+</p>
        </div>
        <div className="text-center text-xs mb-2">
          <p className="text-black mb-1">Payment succeeded :</p>
          <p className="text-gray-400">{orders} times</p>
        </div>
        <div className="text-center text-xs">
          <p className="text-black mb-1">Money Spent :</p>
          <p className="text-gray-400 text-xs">{orders}</p>
        </div>
      </div>
    </div>
  );
}

export default CardProfile;