

const Stepper = ({ step })=>{
    return (
        <div className="flex justify-around mt-10 px-5">
          <div className="flex flex-col justify-center items-center">
            <button 
              type="button" 
              className={`${(step>=0)?" relative bg-black text-white":" bg-gray-400 text-white"} rounded-full w-8 h-8 cursor-default `}
            >
              1
            </button>
            <span className="text-xs my-2 text-gray-400">Shopping Cart</span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <button 
              type="button" 
              className={`${(step>=1)?" bg-black text-white":" bg-gray-400 text-white"} rounded-full w-8 h-8 cursor-default`}
            >
              2
            </button>
            <span className="text-xs my-2 text-gray-400">Fill Information</span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <button 
              type="button" 
              className={`${(step==2)?" bg-black text-white":" bg-gray-400 text-white"} rounded-full w-8 h-8 cursor-default`}
            >
              3
            </button>
            <span className="text-xs my-2 text-gray-400">Order Confirmation</span>
          </div>
        </div>
    )
}

export default Stepper;