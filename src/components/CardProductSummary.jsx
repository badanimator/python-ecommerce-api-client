import { Info } from "react-feather";
import { useCart } from "../context/CartContext";


const CardProductSummary = ({next, enableProcess})=>{
  const {cartData} = useCart();

  return (
    <div className="rounded-xl bg-white shadow-lg py-6 px-5">
      <h1 className="text-black font-bold text-md">SUMMARY</h1>
      <div className="px-4 py-3 text-xs font-medium flex place-items-center text-gray-400 border border-gray-200 rounded-md my-4">
        <Info size={15} className="w-5 h-5 mr-3" />
        DO YOU HAVE PROMO CODE?
      </div>

      <div className="text-sm pt-1 font-semibold pb-2 border-b border-black flex justify-between place-items-center">
        <p className="">SUBTOTAL</p>
        { "GH" + cartData?.data?.cart_subtotal}
      </div>

      <div className="my-3 border-b border-black pb-2">
        {cartData?.data?.items.map((item, key) => (
        <div
            key={key}
            className="flex justify-between place-items-center text-sm mb-1"
        >
            <p className="pr-3 line-clamp-1">{item.product.name}</p>
            {item.product.currency + "" + item.product.price}
        </div>
        ))}
        <div className="flex justify-between place-items-center text-sm mb-1">
        <p>TAX</p>
        <p>FREE</p>
        </div>
      </div>

      <div className="flex justify-between place-items-center font-semibold">
          <p>TOTAL</p>
          {cartData?.data?.cart_subtotal}
      </div>

      {enableProcess && (
        <button
          title={!cartData?.data?.items.length?"No item added to cart":"Click to process to checkout"}
          disabled={!cartData?.data?.items.length}
          onClick={next} 
          className={`${!cartData?.data?.items.length?"disabled:cursor-not-allowed bg-gray-500":""} py-2 px-3 text-white w-full mt-6 rounded-lg bg-black `}
        >
          <span>Proceed to checkout</span>
        </button>
      )}
    </div>
  )
}

export default CardProductSummary;