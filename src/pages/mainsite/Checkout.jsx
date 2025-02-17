import { useState } from "react";     
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Page from "../../layout/Page";
import { useUser } from "../../context/UserContext";
import checkoutService from "../../api/services/checkout.service";

const Checkout = () => {
  const { userData } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    checkoutService.payment(
      data.phone_number, data.payment_method
    ).then(
      ()=>toast.success("Payment success")
    ).catch((errors)=> toast.error("Payment unsuccessful")).finally(
      ()=> setIsLoading(false)
    );
  };

  return (
    <Page>
      <div className="max-w-6xl mx-auto pt-20 px-5">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-x-4">
          {isLoading && (
            <div className="w-full h-screen flex justify-center place-items-center absolute top-0 right-0 bg-white backdrop-blur-sm bg-opacity-20">
              <img
                src="https://i.ibb.co/8jP3GyP/Dual-Ball-1-1s-200px.gif"
                className="w-20"
                alt=""
              />
            </div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="md:col-span-2 md:mr-5 mb-5"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-xl bg-white px-5 pt-5 mt-5 shadow-lg overflow-hidden h-full"
            >
            <h1 className="text-center text-xl font-bold text-black leading-6 my-5">
              SHIPPING INFORMATION
            </h1>
              <div >
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
              
              <h1 className="text-center text-xl font-bold text-black leading-6 my-5 mt-12">
                PAYMENT INFORMATION
              </h1>
              <div className="flex-col">
                <input
                  {...register("phone_number", { required: true })}
                  type="text"
                  name="phone_number"
                  placeholder="Phone number"
                  className="my-2 border rounded-sm border-gray-300 w-full px-4 py-3 text-sm"
                />
                {errors?.phone_number && (
                  <p className="mt-1 italic text-red-500">
                    {errors?.phone_number?.type === "required" && "Phone number required"}
                  </p>
                )}
                <div className="flex justify-between mt-5">
                  <div className="flex items-center gap-2">
                    <input
                      {...register("payment_method", { required: true })}
                      defaultChecked
                      id="mtn"
                      type="radio"
                      name="payment_method"
                      value={"MTN"}
                      className="my-2 border rounded-sm border-gray-300 px-4 py-3 text-sm"
                    />
                    <label htmlFor="mtn">MTN MOMO</label>
                  </div>
                  <img 
                    width={40} 
                    height={40} 
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fyt3.ggpht.com%2Fa%2FAATXAJwVJYu-ZeC_08lpH05PZXWmfnugDP-znS5E7A%3Ds900-c-k-c0xffffffff-no-rj-mo&f=1&nofb=1&ipt=ec9a34cfd622c795277d98fa583b376aae9f365b5354912551662135ef9ef05c&ipo=images" 
                    alt="" 
                  />
                </div>
                <div className="flex justify-between mt-5">
                  <div className="flex items-center gap-2">
                    <input
                      {...register("payment_method", { required: true })}
                      id="telecel"
                      type="radio"
                      name="payment_method"
                      value={"TELECEL"}
                      className="my-2 border rounded-sm border-gray-300 px-4 py-3 text-sm"
                    />
                    <label htmlFor="telecel">TELECEL CASH</label> 
                  </div>
                  <img 
                    width={40} 
                    height={40} 
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ft792ae.c2.acecdn.net%2Fwp-content%2Fuploads%2F2016%2F11%2F1200px-Telecel_Zimbabwe_Logo-1-1024x673.jpg&f=1&nofb=1&ipt=77ee61e38831ea1a96a141759d608b26a2596eb2c2c3e8de4fdc190e72ad90ba&ipo=images"
                    alt="" 
                  />
                </div>
                <div className="flex justify-between mt-5">
                  <div className="flex items-center gap-2">
                    <input
                      {...register("payment_method", { required: true })}
                      id="airteltigo"
                      type="radio"
                      name="payment_method"
                      value={"AIRTELTIGO"}
                      className="my-2 border rounded-sm border-gray-300 px-4 py-3 text-sm"
                    />
                    <label htmlFor="airteltigo">AIRTELTIGO</label>
                  </div>
                  <img 
                    width={40} 
                    height={40} 
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.techfocus24.com%2Fwp-content%2Fuploads%2F2023%2F06%2Fd586fa41-972d-4baf-9c23-8fa09208f342.jpeg&f=1&nofb=1&ipt=49480da33b8b4a40b1264b2970875322fc4e97823c8101c2f6e2ea6ecae90804&ipo=images"
                    alt="" 
                  />
                </div>
              </div>


              <button
                type="submit"
                className="bg-black rounded-sm w-full text-white py-2 mt-3"
              >
                Pay
              </button>
            </form>
          </motion.div>

          <div className="rounded-xl bg-white px-5 pt-5 mt-5 shadow-lg overflow-hidden">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, unde?
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Checkout;
