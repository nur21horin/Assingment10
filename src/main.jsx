import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from "./layout/RootLayout.jsx";
import Home from "./Components/Home/Home.jsx";
import Register from "./Components/Register/Register.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import AddFood from "./Page/AddFood.jsx";


import Login from "./Components/Login/Login.jsx";
import Errorpage from "./Page/Errorpage.jsx";
import FoodDetails from "./Components/FoodDetails/FoodDetails.jsx";
import MyRequests from "./Components/MyrequestItem/MyRequestItem.jsx";
import PrivateRoute from "./Components/Privateroute/PrivateRoute.jsx";
import ManageMyFoods from "./Components/Managefood/Managefood.jsx";
import AvailableFoods from "./Components/AvailableFoods/AvailableFoods.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <Errorpage />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "addfoods",
        Component: AddFood,
      },
      {
        path: "availablefoods",
        Component:()=>(
           <PrivateRoute>
          <AvailableFoods></AvailableFoods>
           </PrivateRoute>),
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "food/:id",
        Component: FoodDetails,
      },
      {
        path: "/foodRequests",
        element: (
          <PrivateRoute><MyRequests></MyRequests></PrivateRoute>
        )
      },{
        path:"/manage-foods",
        element:(
          <PrivateRoute><ManageMyFoods/></PrivateRoute>
        )
      }
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>
);
