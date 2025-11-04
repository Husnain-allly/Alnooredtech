import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../pages/CartContext";
import { useCurrency } from "../pages/CurrencyContext"; // ✅ use context
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const cartItems = location.state?.cartItems || [];
  const { currency } = useCurrency(); // ✅ use context

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    paymentMethod: "cod",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    if (!formData.name || !formData.phone || !formData.address) {
      toast.error("Please fill all required fields!");
      return;
    }
    toast.success("Order placed successfully!");
    clearCart();
    navigate("/");
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-8">
      {/* Shipping Form */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Shipping Details</h2>
        <form className="space-y-4">
          <input type="text" name="name" placeholder="Full Name" onChange={handleChange} className="w-full border p-2 rounded" required />
          <input type="email" name="email" placeholder="Email Address" onChange={handleChange} className="w-full border p-2 rounded" />
          <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} className="w-full border p-2 rounded" required />
          <input type="text" name="address" placeholder="Street Address" onChange={handleChange} className="w-full border p-2 rounded" required />
          <input type="text" name="city" placeholder="City" onChange={handleChange} className="w-full border p-2 rounded" />
          <input type="text" name="postalCode" placeholder="Postal Code" onChange={handleChange} className="w-full border p-2 rounded" />

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Payment Method</h3>
            <label className="flex items-center mb-2">
              <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === "cod"} onChange={handleChange} />
              <span className="ml-2">Cash on Delivery</span>
            </label>
            <label className="flex items-center mb-2">
              <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === "card"} onChange={handleChange} />
              <span className="ml-2">Credit / Debit Card</span>
            </label>
          </div>

          <button type="button" onClick={handlePlaceOrder} className="mt-4 w-full bg-yellow-400 text-black font-semibold py-3 rounded-xl hover:bg-black hover:text-yellow-400 transition-all">
            Place Order
          </button>
        </form>
      </div>

      {/* Cart Summary */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between mb-3">
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">
                    {item.quantity} × {currency.symbol}
                    {(item.price).toFixed(2)}
                  </p>
                </div>
                <p className="font-semibold">
                  {currency.symbol}
                  {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
            <hr className="my-4" />
            <p className="flex justify-between text-lg font-semibold">
              <span>Total:</span>
              <span>{currency.symbol}{total.toFixed(2)}</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
