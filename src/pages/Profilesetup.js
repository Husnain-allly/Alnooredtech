// src/pages/ProfileSetup.js
import React, { useState } from "react";
import { ref, set } from "firebase/database";
import { auth, db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function ProfileSetup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const navigate = useNavigate();

  const handleSave = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    if (!user) {
      alert("You must be logged in to set up your profile.");
      navigate("/login");
      return;
    }

    try {
      await set(ref(db, "users/" + user.uid), {
        firstName,
        lastName,
        phone,
        country,
        email: user.email,
      });
      navigate("/profile");
    } catch (err) {
      console.error("Profile setup failed:", err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSave} className="bg-white p-6 rounded-lg shadow-md w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center">Complete Your Profile</h2>

        <input type="text" placeholder="First Name" className="w-full p-2 border rounded" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        <input type="text" placeholder="Last Name" className="w-full p-2 border rounded" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        <input type="text" placeholder="Phone" className="w-full p-2 border rounded" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        <input type="text" placeholder="Country" className="w-full p-2 border rounded" value={country} onChange={(e) => setCountry(e.target.value)} required />

        <button type="submit" className="w-full bg-yellow-500 text-white py-2 rounded">Save Profile</button>
      </form>
    </div>
  );
}
