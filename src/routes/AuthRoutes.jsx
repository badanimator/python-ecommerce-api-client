import { Login, Register } from "../pages";

const authRoutes = {
    path: '/auth',
    // element: <Shop />,
    children: [
        {path: 'login', element:  <Login />},
        {path: 'signup', element: <Register /> },
    ]
}

export default authRoutes;