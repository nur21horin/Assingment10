import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./layout/RootLayout.jsx";
import Home from "./Components/Home/Home.jsx";
import Register from "./Components/Register/Register.jsx";
import AddFood from "./Page/AddFood.jsx";
import Login from "./Components/Login/Login.jsx";
import Errorpage from "./Page/Errorpage.jsx";
import FoodDetails from "./Components/FoodDetails/FoodDetails.jsx";
import MyRequests from "./Components/MyrequestItem/MyRequestItem.jsx";

import AvailableFoods from "./Components/AvailableFoods/AvailableFoods.jsx";

import AuthProvider from "./context/AuthProvider.jsx";
import PrivateRoute from "./Components/Privateroute/PrivateRoute.jsx";
import AuthLoader from "./context/AuthLoader.jsx";
import ManageMyFoods from "./Components/Managefood/Managefood.jsx";
import ThemeProvider, { ThemeContext } from "./context/ThemeContext.jsx";
import DashboardLayout from "./Components/Dashboard/DashboardLayout.jsx";
import DashboardHome from "./Components/Dashboard/HomeDashBoard.jsx";
import DashboardMyFoods from "./Components/Dashboard/DashBoardMyFoods.jsx";
import DashboardProfile from "./Components/Dashboard/DashboardProfile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <Errorpage />,
    children: [
      { index: true, Component: Home },
      { path: "register", Component: Register },
      { path: "addfoods", Component: AddFood },
      {
        path: "availablefoods",
        Component: () => (
          <PrivateRoute>
            <AvailableFoods />
          </PrivateRoute>
        ),
      },
      { path: "login", Component: Login },
      { path: "food/:id", Component: FoodDetails },
      {
        path: "/foodRequests",
        Component: () => (
          <PrivateRoute>
            <MyRequests />
          </PrivateRoute>
        ),
      },
      {
        path: "/manage-foods",
        element: (
          <PrivateRoute>
            <ManageMyFoods />
          </PrivateRoute>
        ),
      },
    ],
  },{
    path:"/dashboard",
    element:(
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children:[
      {index:true,element:<DashboardHome></DashboardHome>},
      {path:"dashboard-my-foods",element:<DashboardMyFoods></DashboardMyFoods>},
      {path:"add-food",element:<AddFood></AddFood>},
      {path:"profile",element:<DashboardProfile></DashboardProfile> }
    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <AuthLoader>
          <RouterProvider router={router} />
        </AuthLoader>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
