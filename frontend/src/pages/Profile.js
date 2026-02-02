import React, { useEffect, useState } from "react";
import { ref, get } from "firebase/database";
import { auth, db } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userChecked, setUserChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        console.log("🚫 No user logged in → redirecting to /login");
        navigate("/login");
        return;
      }

      try {
        const snapshot = await get(ref(db, `users/${user.uid}`));
        console.log("✅ Firebase snapshot:", snapshot.val());

        if (snapshot.exists()) {
          setProfile(snapshot.val());
        } else {
          console.log("⚠️ No profile found in DB");
          setProfile(null);
        }
      } catch (error) {
        console.error("❌ Error fetching profile:", error.message);
      } finally {
        setLoading(false);
        setUserChecked(true);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (userChecked && !loading && !profile) {
      console.log("➡️ Redirecting to /register");
      navigate("/register");
    }
  }, [userChecked, loading, profile, navigate]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-500 text-lg font-medium">Loading profile...</p>
      </div>
    );

  if (!profile) return null;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-50 to-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md transform transition-all hover:shadow-2xl">
        <div className="text-center mb-6">
          <div className="mx-auto w-20 h-20 bg-yellow-500 text-white rounded-full flex items-center justify-center text-3xl font-bold shadow-md">
            {profile.firstName?.charAt(0).toUpperCase() || "U"}
          </div>
          <h2 className="mt-4 text-2xl font-semibold text-gray-800">
            {profile.firstName} {profile.lastName}
          </h2>
          <p className="text-gray-500 text-sm">{profile.email}</p>
        </div>

        <div className="space-y-3 text-gray-700">
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">📞 Phone:</span>
            <span>{profile.phone || "N/A"}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">🌍 Country:</span>
            <span>{profile.country || "N/A"}</span>
          </div>
        </div>

        <button
          onClick={() => {
            auth.signOut();
            navigate("/login");
          }}
          className="mt-6 w-full bg-yellow-500 hover:bg-black hover:text-yellow-400 text-black font-semibold py-2 rounded-xl transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
