import { 
    ProductList, 
    Cart, 
    Checkout, 
    ProductDetails, 
    Orders
} from "../pages";
import { ProtectedRoute,  } from "./ProtectedRoutes";

const mainRoutes = {
    path: '/',
    // element: <Layout types={[]} categories={[]}/>,
    children: [
        {path: '', element: <ProductList />},
        {path: '/cart', element: <Cart />},
        {path: '/products/:slug/', element: <ProductDetails />},
        {path: '/checkout', element: <ProtectedRoute children={<Checkout />} />},
        {path: '/orders', element: <ProtectedRoute children={<Orders />} />},
    ]
}

export default mainRoutes;