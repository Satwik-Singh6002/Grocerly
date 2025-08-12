import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Header from "./components/Header";

// Pages
import Home from "./pages/Home";
import DalAndPulses from "./pages/DalAndPulses";
import AttaAndFlour from "./pages/AttaAndFlour";
import Snacks from "./pages/Snacks";
import OilAndGhee from "./pages/OilAndGhee";
import Beverages from "./pages/Beverages";
import Dairy from "./pages/Dairy";
import Spices from "./pages/Spices";
import Rice from "./pages/Rice";
import Fruits from "./pages/Fruits";
import Vegetables from "./pages/Vegetables";
import Bakery from "./pages/Bakery";
import FrozenFoods from "./pages/FrozenFoods";
import SignIn from "./pages/SignIn";
import Signup from "./pages/Signup";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import PlaceOrder from "./pages/PlaceOrder";
import ShopByCategory from "./pages/ShopByCategory";
import SearchResults from "./pages/SearchResults"; // ✅ Added search page

// Context
import { CartProvider } from "./context/CartContext";
import { ProductsProvider } from "./context/ProductsContext"; // ✅ Added Products Context

function AppWrapper() {
  const location = useLocation();
  const hideHeaderRoutes = ["/login", "/signup"];
  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dal-pulses" element={<DalAndPulses />} />
        <Route path="/atta-flour" element={<AttaAndFlour />} />
        <Route path="/snacks" element={<Snacks />} />
        <Route path="/oil-ghee" element={<OilAndGhee />} />
        <Route path="/beverages" element={<Beverages />} />
        <Route path="/dairy" element={<Dairy />} />
        <Route path="/spices" element={<Spices />} />
        <Route path="/rice" element={<Rice />} />
        <Route path="/fruits" element={<Fruits />} />
        <Route path="/vegetables" element={<Vegetables />} />
        <Route path="/bakery" element={<Bakery />} />
        <Route path="/frozen-foods" element={<FrozenFoods />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/shop-by-category" element={<ShopByCategory />} />
        <Route path="/search" element={<SearchResults />} /> {/* ✅ Search results route */}
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={1500} hideProgressBar={false} newestOnTop />
    </>
  );
}

export default function App() {
  return (
    <ProductsProvider> {/* ✅ Products context wraps whole app */}
      <CartProvider>
        <Router>
          <AppWrapper />
        </Router>
      </CartProvider>
    </ProductsProvider>
  );
}
