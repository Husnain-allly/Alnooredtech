import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import BooksPage from "./pages/Bookpage";
import ProductPage from "./pages/Productpage";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import AboutUs from "./pages/Aboutus";
import Login from "./pages/Login";
import ProfileSetup from "./pages/Profilesetup";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import SearchResults from "./pages/SearchResults";
import CheckoutPage from "./pages/CheckoutPage";
import { CurrencyProvider } from "./pages/CurrencyContext";
import { CartProvider } from "./pages/CartContext";
import CareerForm from "./pages/Career";
import Blogs from "./pages/Blog";

function App() {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      {/* ✅ Wrap everything inside CartProvider */}
      <CartProvider>
         <CurrencyProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books" element={<BooksPage />} />
            <Route path="/books/:id" element={<ProductPage />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile-setup" element={<ProfileSetup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/career" element={<CareerForm />} />
             <Route path="/blog" element={<Blogs />} />
          </Routes>
          <Footer />
        </Router>
        </CurrencyProvider>
      </CartProvider>
    </>
  );
}

export default App;
