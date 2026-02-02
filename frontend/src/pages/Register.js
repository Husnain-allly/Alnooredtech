// src/pages/Register.js
import React, { useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import Lineanimation from "../animations/SignUp.json";
import { motion } from "framer-motion";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const countries = [
    "Pakistan", "India", "United States", "United Kingdom", "Canada",
    "Australia", "Germany", "France", "Saudi Arabia", "UAE"
  ];

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return setError("Please enter a valid email address!");
    }

    if (password.length < 8) {
      return setError("Password must be at least 8 characters long!");
    }

    if (password !== confirmPassword) {
      return setError("Passwords do not match!");
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save profile data in database
      await set(ref(db, "users/" + user.uid), {
        firstName,
        lastName,
        phone,
        country,
        email,
      });

      navigate("/profile"); // Directly go to profile
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("This email is already registered. Please log in instead.");
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen">
      {/* Left Side - Animation */}
      <motion.div
        className="flex-1 flex justify-center items-center p-6"
        initial={{ scale: 3.0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <Player autoplay loop src={Lineanimation} style={{ height: "600px", width: "450px" }} />
      </motion.div>

      {/* Right Side - Form */}
      <div className="flex-1 flex justify-center items-center p-2 w-full">
        <form onSubmit={handleRegister} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-4">
          <h2 className="text-2xl font-bold text-center">Create Account</h2>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <input type="text" placeholder="First Name" className="w-full p-2 border rounded" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          <input type="text" placeholder="Last Name" className="w-full p-2 border rounded" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          <input type="text" placeholder="Phone Number" className="w-full p-2 border rounded" value={phone} onChange={(e) => setPhone(e.target.value)} required />

          <select className="w-full p-2 border rounded" value={country} onChange={(e) => setCountry(e.target.value)} required>
            <option value="">Select Country</option>
            {countries.map((c, i) => <option key={i} value={c}>{c}</option>)}
          </select>

          <input type="email" placeholder="Email" className="w-full p-2 border rounded" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password (min 8 chars)" className="w-full p-2 border rounded" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <input type="password" placeholder="Re-enter Password" className="w-full p-2 border rounded" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

          <button type="submit" className="w-full bg-yellow-500 text-white py-2 rounded">Sign Up</button>
        </form>
      </div>
    </div>
  );
}
