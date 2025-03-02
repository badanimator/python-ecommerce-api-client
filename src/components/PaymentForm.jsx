import { useState } from "react";     
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useOrders } from "../context/OrderContext";
import { useCart } from "../context/CartContext";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const PAYSTACK_BEARER_TOKEN = import.meta.env.PROD? import.meta.env.PAYSTACK_BEARER_TOKEN : "sk_test_407b643fc6e233020da2f7ff0629576274de6fc9"

const logos = {
  mtn:"c:\Users\LATITUDE\AppData\Local\Temp\New-mtn-logo-768x768-4066736583.jpg", 
  telecel:"c:\Users\LATITUDE\AppData\Local\Temp\Telecel-Cash-Logo-750x375-3544233114.jpg", 
  airteltigo:"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.techfocus24.com%2Fwp-content%2Fuploads%2F2023%2F06%2Fd586fa41-972d-4baf-9c23-8fa09208f342.jpeg&f=1&nofb=1&ipt=d24e0befd72212555300d0a911fdf1e71956a3dd254138b6bd30ab5a957e1037&ipo=images"
}

function PaymentForm({ next, prev }) {
  const { cartData } = useCart();
  const { checkout } = useOrders();
  const [isPaying, setIsPaying] = useState(false);
  const [statusData, setStatusData] = useState({});

  const {register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = async (data) => {
    const { phone_number, payment_channel, email, address, city, region } = data
    checkout(phone_number, payment_channel, email, address, city, region).then(
      (data)=>{
        const responseData = data.data.data;
        setStatusData(responseData);
        setIsPaying(true);
        cartData.refetch();
      }
    ).catch((errors)=> {
      handCancelPayment()
      toast.error("Payment unsuccessful")
    })
  };

  const handCancelPayment = ()=>{
    setStatusData({});
    setIsPaying(false);
  }

  useQuery({
    enabled: (statusData.reference !== undefined),
    queryKey:["verify_payment"],
    queryFn: ()=>{
      let response = {};
      axios.get(
        "https://api.paystack.co/transaction/verify/" + statusData.reference, 
        {
          headers:{
            Authorization:"Bearer " + PAYSTACK_BEARER_TOKEN
          }
        }
      ).then((data)=> {
        const status = data.data.data.status;
        if (status=="failed") {
          handCancelPayment();
          next()
        }else if(status=="success"){
          handCancelPayment();
          next();
        }
        response = data;
      })
      return response;
    },
    refetchInterval:5000
  });

  return (
    <>
    {isPaying && (
      <div className="w-full h-screen flex justify-center place-items-center absolute top-0 right-0 bg-white backdrop-blur-sm bg-opacity-20">
        <div className="flex flex-col justify-center items-center w-full">
          <p className="bg-white text-black p-5 w-64 shadow-xl text-3xl rounded ">
            {statusData.display_text? statusData.display_text:"Please complete the payment by inputing your PIN"}
          </p>
          <img
            src="https://i.ibb.co/8jP3GyP/Dual-Ball-1-1s-200px.gif"
            className="w-20"
            alt=""
          />
          
        </div>
      </div>
    )}
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex justify-between">
          <h1 className="text-black font-bold text-md">PAYMENT INFORMATION</h1>
          <ul className="flex gap-2">
            <li className="bg-blend-darken">
              <img src={logos.mtn} alt="MTN" />
            </li>
            <li className="bg-blend-darken">
              <img src={logos.telecel} alt="AIRTELTIGO" />
            </li>
            <li className="bg-blend-darken">
              <img src={logos.telecel} alt="TELECEL" />
            </li>
          </ul>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <div className="md:col-span-2">
            <select name="payment_channel" {...register("payment_channel", { required: true })} className="my-2 border rounded-sm border-gray-300 bg-white w-full px-4 py-3 text-sm">
              <option value="MTN">MTN</option>
              <option value="TELECEL">TELECEL</option>
              <option value="AIRTELTIGO">AIRTELTIGO</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <input
              {...register("phone_number", { required: true })}
              type="text"
              name="phone_number"
              placeholder="Phone Number"
              className="my-2 border rounded-sm border-gray-300 w-full px-4 py-3 text-sm"
            />
            {errors?.region && (
              <p className="mt-1 italic text-red-500">
                {errors?.region?.type === "required" && "Phone Number required"}
              </p>
            )}
          </div>
        </div>

        <h1 className="text-black font-bold text-md pt-2">BILLING ADDRESS</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <div className="md:col-span-2">
            <input
              type="text"
              name="email"
              {...register("email", { required: true })}
              placeholder="Email"
              className="my-2 border rounded-sm border-gray-300 w-full px-4 py-3 text-sm"
            />
            {errors?.email && (
              <p className="mt-1 italic text-red-500">
                {errors?.email?.type === "required" && "Email required"}
              </p>
            )}
          </div>
          <div className="md:col-span-2">
            <input
              type="text"
              name="address"
              {...register("address", { required: true })}
              placeholder="Address"
              className="my-2 border rounded-sm border-gray-300 w-full px-4 py-3 text-sm"
            />
            {errors?.address && (
              <p className="mt-1 italic text-red-500">
                {errors?.address?.type === "required" && "Address required"}
              </p>
            )}

          </div>
          <div className="md:col-span-1">
            <input
              {...register("city", { required: true })}
              type="text"
              name="city"
              placeholder="City"
              className="my-2 border rounded-sm border-gray-300 w-full px-4 py-3 text-sm"
            />
            {errors?.city && (
              <p className="mt-1 italic text-red-500">
                {errors?.city?.type === "required" && "City required"}
              </p>
            )}
          </div>

          <div className="md:col-span-1">
            <input
              {...register("region", { required: true })}
              type="text"
              name="region"
              placeholder="Region"
              className="my-2 border rounded-sm border-gray-300 w-full px-4 py-3 text-sm"
            />
            {errors?.region && (
              <p className="mt-1 italic text-red-500">
                {errors?.region?.type === "required" && "Region required"}
              </p>
            )}
          </div>
        </div>
        <div >
          
        </div>
        
        <div className="flex justify-between mb-4">
          <button
            type="button"
            className="bg-white border border-gray-700 rounded-sm w-1/4 text-black py-2 mt-3"
            onClick={() => prev()} 
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-black rounded-sm w-1/4 text-white py-2 mt-3"
          >
            Place Order
          </button>
        </div>
      </form>
    </>
  );
}

export default PaymentForm;
