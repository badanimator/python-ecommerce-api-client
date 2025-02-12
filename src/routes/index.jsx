import { useRoutes } from "react-router-dom";
import { NotFound } from "../pages";
import authRoutes from "./AuthRoutes";
import mainRoutes from "./MainRoutes"


const AppRoutes = ()=>{
    return useRoutes([
        mainRoutes,
        authRoutes,
        {path: '*', element: <NotFound />}
    ])
}

export default AppRoutes;