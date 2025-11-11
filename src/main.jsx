import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from './layout/RootLayout.jsx';
import Home from './Components/Home/Home.jsx';
import Register from './Components/Register/Register.jsx';
import AuthProvider from './context/AuthProvider.jsx';
import AddFood from './Page/AddFood.jsx';
import AvailableFoods from './Page/AvailableFoods.jsx';
import Login from './Components/Login/Login.jsx';

const router=createBrowserRouter([
  {
    path:"/",
    Component:RootLayout,
    children:[
      {
        index:true,
        Component:Home,
      },{
        path:'register',
        Component:Register
      },{
        path:'addfoods',
        Component:AddFood
      },{
        path:'availablefoods',
        Component:AvailableFoods
      },
      {
        path:'login',
        Component:Login,
      }
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
    <RouterProvider router={router}></RouterProvider>
   </AuthProvider>
  </StrictMode>,
)
