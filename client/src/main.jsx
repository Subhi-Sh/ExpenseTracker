import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter,Router,RouterProvider } from "react-router-dom";

// components.
import Landing from "./components/Landing";
import DashBoard from "./components/DashBoard"
import Login from "./components/Login";
import Register from "./components/Register";
import Expenses from "./components/Expenses"
import UserProfile from "./components/UserProfile"
import AddCategory from "./components/AddCategory";
import NotFound from "./components/NotFound";
import { GlobalProvider } from './contexts/GlobalContext';
import NavBar from "./components/NavBar";
// our router for navigating between pages.
const router = createBrowserRouter([
  {
  path:'/',
  element:<Landing/>,
  errorElement:<NotFound/>
  },
  {
    path:'/DashBoard',
    element:<DashBoard/>
  },
  {
    path:'/Expenses',
    element:<Expenses/>
  },
  {
    path:'/AddCategory',
    element:<AddCategory/>
  },
  {
    path:'/Login',
    element:<Login/>
  },
  {
    path:'/Register',
    element:<Register/>
  },
  {
    path:'/UserProfile',
    element:<UserProfile/>
  },

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <GlobalProvider>
        <RouterProvider router={router}/>
      </GlobalProvider>
  </React.StrictMode>
);
