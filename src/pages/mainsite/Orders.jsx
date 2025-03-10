import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import orderService from "../../api/services/order.service";
import { useUser } from "../../context/UserContext";
import CardProfile from "../../components/CardProfile";
import OrderCard from "../../components/OrderCard";
import MainLayout from "../../layout/MainLayout";
import Nav from "../../components/Nav";
import fallback from "../../helpers/fallbackData";

const Orders = () => {
  
  const [page, setPage] = useState(1);
  const {isLoggedIn} = useUser();
  
  const orders = useQuery({
    enabled:isLoggedIn,
    queryKey:['get_orders'],
    queryFn: async ()=>{
      try{
        const res = await orderService.getAllOrders(page);
        return res.data;
      }catch(errors){
        return fallback;
      }finally{
        window.scrollTo({ behavior: "smooth", top: 0 }); // scrool to top
      }
    }
  })

  return (
    <MainLayout>
      <title>Orders - Pelotex</title>
      <Nav />
      <div className="max-w-6xl mx-auto pt-20 px-5 grid grid-cols-1 md:grid-cols-4">
        <div className="col-span-1 mb-7">
          <CardProfile session={32} orders={32} />
        </div>
        {orders.isSuccess && (
          <div className="col-span-3 md:ml-10 rounded-2xl px-8 py-6 bg-white shadow-lg">
            <h1 className="mb-4">Your Orders ({orders.data.meta.total})</h1>
            <div className="container">
              {orders.data.items.map((order, key) => (
                <OrderCard key={key} order={order} />
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Orders;
