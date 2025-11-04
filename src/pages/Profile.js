// src/pages/Profile.js
import React, { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { auth, db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) {
      // 🚨 Not logged in → redirect to login
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      const snapshot = await get(ref(db, "users/" + auth.currentUser.uid));
      if (snapshot.exists()) {
        setProfile(snapshot.val());
      } else {
        // 🚨 Logged in but no profile → redirect to login
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  if (!profile) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96 space-y-2">
        <h2 className="text-2xl font-bold text-center mb-4">My Profile</h2>
        <p><strong>First Name:</strong> {profile.firstName}</p>
        <p><strong>Last Name:</strong> {profile.lastName}</p>
        <p><strong>Phone:</strong> {profile.phone}</p>
        <p><strong>Email:</strong> {profile.email}</p>
        <p><strong>Country:</strong> {profile.country}</p>
      </div>
    </div>
  );
}
