import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";
import { ProductProvider } from "./context/ProductContext";
import { UserProvider } from "./context/UserContext";
import { WishlistProvider } from "./context/WishlistContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ProductProvider>
          <WishlistProvider>
            <CartProvider>
              <OrderProvider>
                <App />
              </OrderProvider>
            </CartProvider>
          </WishlistProvider>
        </ProductProvider>
      </UserProvider>
    </QueryClientProvider>
  </StrictMode>,
)
