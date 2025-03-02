import { useState } from "react";     
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

import { useOrders } from "../context/OrderContext";
import { useCart } from "../context/CartContext";
import { useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import axios from "axios";

const PAYSTACK_BEARER_TOKEN = import.meta.env.PROD? import.meta.env.PAYSTACK_BEARER_TOKEN : "sk_test_407b643fc6e233020da2f7ff0629576274de6fc9"

const logos = {
  mtn:"mtn_logo.png", 
  telecel:"telecel_logo.png", 
  airteltigo:"airteltigo_logo.jpeg"
}

function PaymentForm({ next, prev }) {
  const { setIsSuccess, setFailed } = useOrders();
  const { cartData } = useCart();
  const { checkout } = useOrders();
  const [isPaying, setIsPaying] = useState(false);
  const [statusData, setStatusData] = useState({});

  const {register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = async (data) => {
    setIsPaying(true);
    const { phone_number, payment_channel, email, address, city, region } = data
    checkout(phone_number, payment_channel, email, address, city, region).then(
      (data)=>{
        const responseData = data.data.data;
        setStatusData(responseData);
        cartData.refetch();
      }
    ).catch((errors)=> {
      const response = errors? errors.response.data.data.message: "Payment failed";
      handCancelPayment();
      toast.error(response);
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
          setFailed(true)
          next()
        }else if(status=="success"){
          handCancelPayment();
          setIsSuccess(true);
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
      <Dialog open={isPaying} onClose={() => setIsOpen(false)} className="relative z-50 ">
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-white backdrop-blur-sm bg-opacity-5 ">
          <DialogPanel className="max-w-lg space-y-4 border bg-white p-5 rounded-lg">
            <DialogTitle className="text-black font-bold text-md">PAYING</DialogTitle>
            <div className="flex flex-col justify-center items-center gap-5">
              <p className="text-lg">{statusData.display_text? statusData.display_text:"Please complete the payment by inputing your PIN"}</p>
              <ClipLoader className="w-4 h-4" />
            </div>
            <button className="bg-black rounded-lg w-full text-white py-2 mt-3" onClick={handCancelPayment}>Cancel</button>
          </DialogPanel>
        </div>
      </Dialog>
      
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-black font-bold text-md">PAYMENT INFORMATION</h1>
          <ul className="flex items-center gap-2">
            <li className="bg-blend-darken">
              <img src={logos.mtn} width={25} alt="MTN" />
            </li>
            <li className="bg-blend-darken">
              <img src={logos.telecel} width={40} alt="AIRTELTIGO" />
            </li>
            <li className="bg-blend-darken">
              <img src={logos.airteltigo} width={35} alt="TELECEL" />
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
