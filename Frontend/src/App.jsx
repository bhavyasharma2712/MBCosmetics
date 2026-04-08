import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/cart";
import Myaccount from "./pages/Myaccount";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Announcement from "./components/Announcement";
import Product from "./pages/Product";

const Layout = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/cart", element: <Cart /> },
      { path: "/myaccount", element: <Myaccount /> },
      { path: "/product/:productId", element: <Product /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />
}

export default App