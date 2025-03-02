import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalHistory } from "./components/GlobalHistory";

import ProductList from "./pages/mainsite/ProductList";
import Cart from "./pages/mainsite/Cart"
import Checkout from "./pages/mainsite/Checkout"
import ProductDetails from "./pages/mainsite/ProductDetails"
import Orders from "./pages/mainsite/Orders"
import Wishlist from "./pages/mainsite/Wishlist"
import Login from "./pages/mainsite/Login";
import Register from "./pages/mainsite/Register";
import NotFound from "./pages/errors/404";
import { ProtectedRoute } from "./routes/ProtectedRoutes";

function App() {
  return (
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
  );
}

export default App;