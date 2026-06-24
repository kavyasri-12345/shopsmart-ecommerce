import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import AdminOrders from "./pages/AdminOrders";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import AdminAddProduct from "./pages/AdminAddProduct";
import AdminDashboard from "./pages/AdminDashboard";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Products from "./pages/Products";
import PrivateRoute from "./components/PrivateRoute";
import Checkout from "./pages/Checkout";
function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/home"
          element={<Home />}
        />

        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        {/* Protected Routes */}

        <Route element={<PrivateRoute />}>

          <Route
            path="/cart"
            element={<Cart />}
          />

          <Route
            path="/wishlist"
            element={<Wishlist />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/orders"
            element={<Orders />}
          />

          <Route
            path="/admin"
            element={<AdminDashboard />}
          />

          <Route
            path="/admin/add-product"
            element={<AddProduct />}
          />

          <Route
            path="/admin/edit/:id"
            element={<EditProduct />}
          />
          <Route
  path="/admin/orders"
  element={<AdminOrders />}
/>
<Route
  path="/admin/add-product"
  element={<AdminAddProduct />}
/>
<Route
  path="/admin/products"
  element={<Products />}
/>
<Route
  path="/checkout"
  element={<Checkout />}
/>
          
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;