import Login from "./auth/Login";
// import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
// import MainLayout from "./MainLayout";
import Signup from "./auth/Signup";
import ForgotPassword from "./auth/ForgetPassword";
import ResetPassword from "./auth/ResetPassword";
import VerifyEmail from "./auth/VerifyEmail";
import MainLayout from "./layout/MainLayout";
import HeroSection from "./components/HeroSection";
import Profile from "./components/Profile";
import SearchPage from "./components/SearchPage";
import RestaurantDetail from "./components/RestaurantDetail";
import Cart from "./components/Cart";
import Restaurant from "./admin/Restaurant";
import AddMenu from "./admin/AddMenu";
import Orders from "./admin/Orders";
import Success from "./components/Success";
import { useUserStore } from "./store/useUserStore";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (!isAuthenticated) {
    <Navigate to="/login" replace />;
  }
  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }
  return children;
};
const AuthenicatedUser = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();
  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />;
  }
  return children;
};
const AdminRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useUserStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!user?.admin) {
    return <Navigate to="/login" replace />;
  }
};
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <MainLayout />
      </ProtectedRoutes>
    ),
    children: [
      { path: "/", element: <HeroSection /> },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/search/:text",
        element: <SearchPage />,
      },
      {
        path: "/restaurant/:id",
        element: <RestaurantDetail />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/status",
        element: <Success />,
      },

      //admin services start from here
      {
        path: "/admin/restaurant",
        element: (
          <AdminRoutes>
            <Restaurant />
          </AdminRoutes>
        ),
      },
      {
        path: "/admin/menu",
        element: (
          <AdminRoutes>
            <AddMenu />
          </AdminRoutes>
        ),
      },
      {
        path: "/admin/orders",
        element: (
          <AdminRoutes>
            <Orders />
          </AdminRoutes>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <AuthenicatedUser>
        <Login />
      </AuthenicatedUser>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthenicatedUser>
        <Signup />
      </AuthenicatedUser>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <AuthenicatedUser>
        {" "}
        <ForgotPassword />
      </AuthenicatedUser>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <AuthenicatedUser>
        <ResetPassword />
      </AuthenicatedUser>
    ),
  },
  {
    path: "/verify-email",
    element: (
      <AuthenicatedUser>
        <VerifyEmail />
      </AuthenicatedUser>
    ),
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={appRouter}></RouterProvider>
    </>
  );
}

export default App;
