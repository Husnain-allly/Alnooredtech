// src/pages/SearchResults.js
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();

  const query = new URLSearchParams(location.search).get("q")?.toLowerCase();

  const data = [
    { title: "Books", path: "/books" },
    { title: "Courses", path: "/resources/courses" },
    { title: "Motherhood App", path: "/resources/motherhood-app" },
    { title: "Sessions", path: "/resources/sessions" },
  ];

  useEffect(() => {
    if (!query) {
      navigate("/");
      return;
    }

    const match = data.find((item) =>
      item.title.toLowerCase().includes(query)
    );

    if (match) {
      navigate(match.path);
    } else {
      toast.error("No results found. Redirecting to Home...");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [query, navigate]);

  return (
    <div className="p-6 text-center text-gray-600">
      <p>Searching...</p>
    </div>
  );
}
