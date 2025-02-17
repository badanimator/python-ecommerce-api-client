import { ShoppingBag } from "react-feather";

function OrderCard({ order }) {
  return (
    <div className="py-2 px-4 rounded-lg shadow-lg mb-2">
      <div className="flex place-items-center text-xs text-black py-1">
        <ShoppingBag className="w-5 h-5 text-cusblack" />
        <p className="mx-2 font-semibold">Shop</p>
        {order.created_at}
        <div className="py-0.5 px-2 bg-black text-white mx-3 flex text-[8px] place-items-center rounded-lg">
          {order.status}
        </div>
      </div>

      <div className="flex flex-col my-1">
        <div className="md:flex mt-2">
          <div className="md:w-3/4 border-b md:border-b-0 md:border-r border-gray-300">
            {order.details.map((item, idx) => (
              <div key={idx} className="flex mb-2">
                <img
                  className="w-16 h-16 rounded-lg object-cover"
                  src={item.product.thumbnail}
                  alt=""
                />
                <div className="mx-3 text-xs text-black">
                  <p className="text-sm font-semibold">{item.product.description}</p>
                  <div className="flex">
                    <p className="text-black mr-1">{item.quantity} x </p>
                    <p className="text-gray-400 text-xs">
                        {"GH" + item.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="md:w-1/4 mt-2 md:mt-0 text-xs text-black flex md:flex-col justify-center place-items-center">
            <p className="text-gray-400 md:mb-1">Total Amount :</p>
            <p className="text-gray-400 text-xs">
                {/* {value} */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
