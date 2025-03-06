import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalHistory } from "./components/GlobalHistory";
import { lazy, Suspense } from "react";

import { ProtectedRoute } from "./routes/ProtectedRoutes";
const ProductList = lazy(() => import("./pages/mainsite/ProductList"));
const Cart = lazy(() => import("./pages/mainsite/Cart"))
const Checkout = lazy(() => import("./pages/mainsite/Checkout"))
const ProductDetails = lazy(() => import("./pages/mainsite/ProductDetails"))
const Orders = lazy(() => import("./pages/mainsite/Orders"))
const Wishlist = lazy(() => import("./pages/mainsite/Wishlist"))
const Login = lazy(() => import("./pages/mainsite/Login"));
const Register = lazy(() => import("./pages/mainsite/Register"));
const NotFound = lazy(() => import("./pages/errors/404"));
import SuspenseLoader from "./components/SuspenseLoader";

function App() {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <BrowserRouter>
        <Toaster position="top-right" />
        <GlobalHistory />

        <Routes>
          {/* MainRoutes */}
          <Route>
            <Route path="/" element={<ProductList />} />
            <Route path="/details/:slug" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/orders" element={<ProtectedRoute children={<Orders />} />} />
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;