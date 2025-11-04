// src/pages/Login.js
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref, get, child } from "firebase/database";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../firebaseConfig";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if profile exists
      const dbRef = ref(db);
      const snapshot = await get(child(dbRef, "users/" + user.uid));

      if (snapshot.exists()) {
        navigate("/profile"); // Profile exists → go to Profile page
      } else {
        navigate("/profile-setup"); // First login → go to Profile Setup
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md w-80 space-y-4">
        <h2 className="text-2xl font-bold text-center">Login</h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="w-full bg-yellow-500 text-white py-2 rounded">
          Login
        </button>

        {/* Sign up link */}
        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
        <Link to="/register" className="text-yellow-500 hover:underline">
  Sign up
</Link>

        </p>
      </form>
    </div>
  );
}
