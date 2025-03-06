import { useState } from "react";     
import { useForm } from "react-hook-form";
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

import { useOrders } from "../context/OrderContext";
import { useCart } from "../context/CartContext";
import { useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import axios from "axios";

const PAYSTACK_BEARER_TOKEN = import.meta.env.VITE_PAYSTACK_BEARER_TOKEN || "sk_live_3bdc110e868870361db9d20d82c1807c4234fa9e"

const logos = {
  mtn:"mtn_logo.png", 
  telecel:"telecel_logo.png", 
  airteltigo:"airteltigo_logo.jpeg"
}

function PaymentForm({ next, prev }) {
  const { checkout } = useOrders();
  const { cartData } = useCart();
  const { setIsSuccess, setFailed, setMsg } = useOrders();
  
  const [pinCode, setPinCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpErr, setOtpErr] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [isSendingPinCode, setIsSendingPinCode] = useState(false);
  const [statusData, setStatusData] = useState({});

  const {register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = async (data) => {
    setIsPaying(true);
    const { phone_number, payment_channel, email, address_line1, address_line2, city, region } = data
    checkout(phone_number, payment_channel, email, address_line1, address_line2, city, region ).then((data)=>{
        const responseData = data?.data?.data;
        (responseData.status==="send_otp") && setOtpSent(true);
        setStatusData(responseData);
        cartData.refetch();
      }
    ).catch((errors)=> {
      setMsg(errors.response.data? errors.response.data.data.message: "Payment failed")
      handCancelPayment();
      setFailed(true)
      next()
    })
  };

  const handCancelPayment = ()=>{
    setStatusData({});
    setIsPaying(false);
  }

  const handleSendPinCode = () => {
    setIsSendingPinCode(true)
    const {reference} = statusData;
    axios.post("https://api.paystack.co/charge/submit_otp", 
      {
        otp: pinCode, 
        reference
      }, 
      {
        headers:{
          Authorization:"Bearer " + PAYSTACK_BEARER_TOKEN
        }
      }
    ).then(res => {
      setStatusData(res.data.data);
      setOtpSent(false);
    }).catch((errors)=>{
      setOtpErr(true);
    }).finally(()=>setIsSendingPinCode(false))
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
      ).then((res)=> {
        const { status, message } = res.data.data || {status:"failed", message: "something went wrong"};
        if (status==="failed") {
          handCancelPayment();
          setMsg(
            message==="LOW_BALANCE_OR_PAYEE_LIMIT_REACHED_OR_NOT_ALLOWED"?
            "Please your balance is insufficient to complete this transaction": message 
          )
          setFailed(true)
          next()
        }else if(status=="success"){
          handCancelPayment();
          setIsSuccess(true);
          setMsg(res.data.message);
          next();
        }
        response = res;
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
            <div className="flex flex-col justify-center items-center gap-5 min-w-52 md:min-w-96">
              <div className="text-lg">
                {otpSent? (
                  <div className="flex flex-col gap-y-5">
                    <p className="font-semibold w-full">{statusData.display_text}</p>
                    <input
                      onChange={(e)=> setPinCode(e.target.value)}
                      onFocus={(e)=> {
                        setOtpErr(false); 
                        setPinCode("");
                        e.target.value = "";
                      }}
                      type="text"
                      placeholder="Pin Code*"
                      className={`${otpErr && "outline outline-red-600"} my-2 border rounded-sm border-gray-300 w-full px-4 py-3 text-sm `}
                    />
                  </div>
                ):statusData.display_text? <p className="font-semibold">{statusData.display_text}</p>:(
                <ClipLoader className="w-4 h-4" />
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button className={`${otpSent? "col-span-1":"col-span-2"}  bg-black rounded-sm text-white py-2 mt-3`} onClick={handCancelPayment}>Cancel</button>
              <button className={`${otpSent? "col-span-1":"hidden"} bg-white text-black border border-gray-700 rounded-sm py-2 mt-3`} onClick={handleSendPinCode}>
                {isSendingPinCode? <ClipLoader size={18} />: "Send Code"}
              </button>
            </div>
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
              <option value="Vodafone">TELECEL</option>
              <option value="AirtelTigo">AIRTELTIGO</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <input
              {...register("phone_number", { required: true })}
              type="text"
              name="phone_number"
              placeholder="Phone Number*"
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
              placeholder="Email*"
              className="my-2 border rounded-sm border-gray-300 w-full px-4 py-3 text-sm"
            />
            {errors?.email && (
              <p className="mt-1 italic text-red-500">
                {errors?.email?.type === "required" && "Email required"}
              </p>
            )}
          </div>
          <div className="md:col-span-1">
            <input
              type="text"
              name="address_line1"
              {...register("address_line1", { required: true })}
              placeholder="Address Line1*"
              className="my-2 border rounded-sm border-gray-300 w-full px-4 py-3 text-sm"
            />
            {errors?.address_line1 && (
              <p className="mt-1 italic text-red-500">
                {errors?.address_line1?.type === "required" && "Address required"}
              </p>
            )}
          </div>
          <div className="md:col-span-1">
            <input
              type="text"
              name="address_line1"
              {...register("address_line2")}
              placeholder="Address Line2"
              className="my-2 border rounded-sm border-gray-300 w-full px-4 py-3 text-sm"
            />
          </div>
          <div className="md:col-span-1">
            <input
              {...register("city", { required: true })}
              type="text"
              name="city"
              placeholder="City*"
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
              placeholder="Region*"
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
        
        <div className="flex justify-between mb-4 gap-4">
          <button
            type="button"
            className="bg-white border border-gray-700 rounded-sm w-full text-black py-2 mt-3"
            onClick={() => prev()} 
          >
            Back
          </button>
          <button
            type="submit"
            className="bg-black rounded-sm w-full text-white py-2 mt-3"
          >
            Place Order
          </button>
        </div>
      </form>
    </>
  );
}

export default PaymentForm;
