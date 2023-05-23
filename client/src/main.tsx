import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import "./index.css";
import AddProduct from "./pages/AddProduct";
import Admin from "./pages/Admin";
import Checkout from "./pages/Checkout";
import Edit from "./pages/Edit";
import Home from "./pages/Home";
import Login from "./pages/Login";
import MyOrders from "./pages/MyOrders";
import OrderConfirmation from "./pages/OrderConfirmation";
import OrderSettings from "./pages/OrderSettings";
import ProductPage from "./pages/Product";
import SignUp from "./pages/Signup";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index element={<Home filterCategory={null} />} />
      <Route path='login' element={<Login />} />
      <Route path='signup' element={<SignUp />} />
      <Route path='product/:id' element={<ProductPage />} />
      <Route path='checkout' element={<Checkout />} />
      <Route path='confirmation' element={<OrderConfirmation />} />

      <Route path='admin'>
        <Route index element={<Admin />} />
        <Route path='orders' element={<MyOrders />} />
        <Route path='users' element={<UserSettings />} />
        <Route path='orders/settings' element={<OrderSettings />} />
        <Route path='product/new' element={<AddProduct />} />
        <Route path='product/:id' element={<Edit />} />
      </Route>
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
