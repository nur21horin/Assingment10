import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Layouts & Pages
import RootLayout from "./layout/RootLayout.jsx";
import Home from "./Components/Home/Home.jsx";
import Register from "./Components/Register/Register.jsx";
import AddFood from "./Page/AddFood.jsx";
import Login from "./Components/Login/Login.jsx";
import Errorpage from "./Page/Errorpage.jsx";
import FoodDetails from "./Components/FoodDetails/FoodDetails.jsx";
import MyRequests from "./Components/MyrequestItem/MyRequestItem.jsx";
import AvailableFoods from "./Components/AvailableFoods/AvailableFoods.jsx";
import ManageMyFoods from "./Components/Managefood/Managefood.jsx";

// Context & Auth
import AuthProvider from "./context/AuthProvider.jsx";
import PrivateRoute from "./Components/Privateroute/PrivateRoute.jsx";
import AuthLoader from "./context/AuthLoader.jsx";
import ThemeProvider from "./context/ThemeContext.jsx";

// Dashboard Components
import DashboardLayout from "./Components/Dashboard/DashboardLayout.jsx";
import DashboardHome from "./Components/Dashboard/HomeDashBoard.jsx";
import DashboardMyFoods from "./Components/Dashboard/DashBoardMyFoods.jsx";
import DashboardProfile from "./Components/Dashboard/DashboardProfile.jsx";
import DashboardOverview from "./Components/Dashboard/DashboardOverview.jsx";
import DashboardEditFoodModal from "./Components/Dashboard/DashboardEditFoodModal.jsx";
import DashboardFoodTable from "./Components/Dashboard/DashboardFoodTable.jsx";
import About from "./Page/About.jsx";
import Contact from "./Page/Contact.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Errorpage />,
    children: [
      { index: true, element: <Home /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "addfoods", element: <AddFood /> },
      { path: "food/:id", element: <FoodDetails /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },

      {
        path: "availablefoods",
        element: <AvailableFoods />,
      },
      {
        path: "foodRequests",
        element: (
          <PrivateRoute>
            <MyRequests />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-foods",
        element: (
          <PrivateRoute>
            <ManageMyFoods />
          </PrivateRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        ),
        children: [
          // Child routes: no leading slash makes them relative to /dashboard
          { path: "food-table", element: <DashboardFoodTable /> },
          { path: "home", element: <DashboardHome /> },
          { path: "my-foods", element: <DashboardMyFoods /> },
          { path: "profile", element: <DashboardProfile /> },
          { path: "overview", element: <DashboardOverview /> },
          { path: "edit-food", element: <DashboardEditFoodModal /> },
          { path: "add-foods", element: <AddFood /> },
        ],
      },
    ],
  },
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
