import { useState } from "react";
import CartItems from "../../components/CartItems";
import PaymentForm from "../../components/PaymentForm";
import OrderConfirmation from "../../components/OrderConfirmation";
import MainLayout from "../../layout/MainLayout";
import Nav from "../../components/Nav";
import CardProductSummary from "../../components/CardProductSummary";
import Stepper from "../../components/Stepper";

const Cart = () => {

  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);
  
  return (
    <MainLayout>
      <Nav />
      <div className="max-w-6xl mx-auto pt-14 md:px-0">
        <div className="max-w-6xl mx-auto px-5">
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-x-4">
            <div className="md:col-span-2 md:mr-5">
              <Stepper step={activeStep} />
              <div className="">
                {/* <div className="shadow-lg rounded-xl bg-black text-white px-5 py-3">
                  <h1 className="font-semibold text-lg md:text-xl mb-1">
                    GET FREE SHIPPING WITH MEMBER+ ON EVERY ORDER
                  </h1>
                  <p className="text-xs mb-1 text-gray-100">
                    Non member receive free-shipping for purchases Rp 1,500,000
                    or more
                  </p>
                </div> */}

                <div className="rounded-xl bg-white px-5 pt-5 mt-5 shadow-lg overflow-hidden">
                  {(activeStep==0) && (<CartItems />)}
                  {(activeStep==1) && (<PaymentForm next={handleNext} prev={handlePrev} />)}
                  {(activeStep==2) && (<OrderConfirmation isSuccess={false} />)}
                </div>
              </div>
            </div>

            <div className="mt-5 md:mt-28 col-span-1">
              <CardProductSummary next={handleNext} enableProcess={activeStep === 0}/>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
};

export default Cart;
