import { createBrowserRouter } from "react-router-dom";
import DataEntry from "../Pages/DataEntry";
import MainLayout from "../Layout/MainLayout";
import DynamicSearch from "../Pages/Home/DynamicSearch";
import Home from "../Layout/Home";
import Dashboard from "../Pages/Dashboard";
import AllCard from "../Pages/AllCard";

const router = createBrowserRouter([
    {
        path:'/',
        element:<MainLayout></MainLayout>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/add-card',
                element:<DynamicSearch></DynamicSearch>
            },
            {
                path:'/dashboard',
                element:<Dashboard></Dashboard>,
            
            },
            {
                path:'/all-card',
                element:<AllCard></AllCard>
            }
        ]
    }
])
export default router