import { 
    ProductList, 
    Cart, 
    Checkout, 
    ProductDetails, 
    Orders, 
    Wishlist,
} from "../pages";
import { ProtectedRoute,  } from "./ProtectedRoutes";

const mainRoutes = {
    path: '/',
    // element: <Layout types={[]} categories={[]}/>,
    children: [
        {path: '', element: <ProductList />},
        {path: '/cart', element: <Cart />},
        {path: '/products/:slug/', element: <ProductDetails />},
        {path: '/wishlist', element: <Wishlist />},
        {path: '/checkout', element: <Checkout />},
        {path: '/orders', element: <ProtectedRoute children={<Orders />} />},
    ]
}

export default mainRoutes;