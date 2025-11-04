// src/components/NavigationBar.js
import { CircleUser, ShoppingCart, Search, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig";
import { useCart } from "../pages/CartContext"; // ✅ FIX: import useCart
import logo from "../pics/AlNoor_Edtech_logo.png";

export default function NavigationBar() {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { cartItems, removeFromCart } = useCart(); // ✅ FIX: use properly

  const handleProfileClick = () => {
    if (auth.currentUser) navigate("/profile");
    else navigate("/login");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setShowSearch(false);
      setQuery("");
    }
  };

  return (
    <>
      <header className="flex items-center justify-between px-6 py-4 shadow-md bg-white relative">
        {/* Logo */}
        <div className="flex items-center space-x-1">
          <img src={logo} alt="Logo" className="h-10 w-10 object-contain" />
          <span className="text-xl font-modum tracking-widest [word-spacing:-0.3em]">
            AL NOOR EDTECH
          </span>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex space-x-14">
          <Link to="/" className="hover:text-yellow-500 font-modum tracking-widest">
            HOME
          </Link>
          <Link to="/about" className="hover:text-yellow-500 font-modum tracking-widest">
            ABOUT
          </Link>

          {/* Dropdown */}
          <div className="relative flex items-center">
            <button
              onClick={() => setOpenDropdown(!openDropdown)}
              className="hover:text-yellow-500 font-modum tracking-widest"
            >
              RESOURCES
            </button>
            {openDropdown && (
              <div className="absolute left-0 top-full w-52 bg-white shadow-lg rounded-lg py-2 z-50">
                <a href="/books" className="block px-4 py-2 text-sm hover:bg-brand">Books</a>
                <a href="/resources/courses" className="block px-4 py-2 text-sm hover:bg-brand">Courses</a>
                <a href="/resources/sessions" className="block px-4 py-2 text-sm hover:bg-brand">Sessions</a>
                <a href="/resources/motherhood-app" className="block px-4 py-2 text-sm hover:bg-yellow-100">Motherhood App</a>
              </div>
            )}
          </div>

          <Link to="/career" className="hover:text-yellow-500 font-modum tracking-widest">
            CAREER
          </Link>
          <Link to="/blog" className="hover:text-yellow-500 font-modum tracking-widest">
            BLOG
          </Link>
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <Search
            className="cursor-pointer hover:text-yellow-500"
            onClick={() => setShowSearch(!showSearch)}
          />
          <CircleUser
            className="cursor-pointer hover:text-yellow-500"
            onClick={handleProfileClick}
          />
         <div className="relative">
  <ShoppingCart
    className="cursor-pointer hover:text-yellow-500"
    onClick={() => setIsCartOpen(true)}
  />
  {cartItems.length > 0 && (
    <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
      {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
    </span>
  )}
</div>

        </div>

        {/* Search Overlay */}
        {showSearch && (
          <div className="absolute inset-0 bg-white flex items-center justify-center">
            <form
              onSubmit={handleSearchSubmit}
              className="flex items-center w-3/4 md:w-1/2 border-2 border-yellow-500 rounded-full px-4 py-2"
            >
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search here..."
                className="flex-grow outline-none text-gray-700"
                autoFocus
              />
              <button type="submit" className="ml-2 text-yellow-500 font-semibold">
                Search
              </button>
              <X
                className="ml-3 cursor-pointer text-gray-500 hover:text-red-500"
                onClick={() => setShowSearch(false)}
              />
            </form>
          </div>
        )}
      </header>

      {/* 🛒 Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-white w-80 sm:w-96 h-full shadow-lg flex flex-col p-5 relative animate-slideIn">
            <button
              onClick={() => setIsCartOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>

            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-center mt-20">
                Your cart is empty 🛍️
              </p>
            ) : (
              <div className="flex flex-col space-y-4 overflow-y-auto flex-grow">
              {cartItems.map((item, idx) => (
  <div
    key={item.id || idx}
    className="flex items-center justify-between border-b pb-2"
  >
    <img
      src={item.image}
      alt={item.title}
      className="w-12 h-12 object-cover rounded"
    />
    <div className="flex-1 ml-3">
      <p className="font-medium text-gray-800">{item.title}</p>
      <p className="text-sm text-gray-500">
        {item.quantity} × ${item.price.toFixed(2)}
      </p>
    </div>
    <button
      onClick={() => removeFromCart(item.id)}
      className="text-red-500 hover:text-red-700"
    >
      <X size={16} />
    </button>
  </div>
                ))}
              </div>
            )}

            {/* Footer */}
            <div className="mt-auto border-t pt-4">
             <p className="flex justify-between text-lg font-semibold">
  <span>Subtotal:</span>
  <span>
    $
    {cartItems
      .reduce((sum, i) => sum + i.price * i.quantity, 0)
      .toFixed(2)}
  </span>
</p>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate("/checkout", { state: { cartItems } });
                }}
                className="mt-4 w-full bg-yellow-400 text-black rounded-xl hover:bg-black hover:text-yellow-500 transition-all duration-300 py-2 font-semibold"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
