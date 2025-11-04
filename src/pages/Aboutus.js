import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import Lineanimation from "../animations/aboutLines.json";
import { useNavigate } from "react-router-dom";

export default function AboutUs() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* ✅ Page Header */}
      <header className="text-center pt-20 pb-12">
  <h1 className="text-9xl font-bold font-modum text-yellow-500">
    ABOUT US
  </h1>
</header>


      {/* ✅ Main Content Section */}
      <div className="flex flex-col md:flex-row items-center flex-1 px-6 mb-12 md:px-16">
        
        {/* Left side: Animation */}
        <div className="flex-1 flex justify-center items-center mb-10 md:mb-0">
          <Player
            autoplay
            loop
            src={Lineanimation}
            style={{ height: "600px", width: "450px" }}
          />
        </div>

        {/* Right side: Text Content */}
        <div className="flex-1 space-y-6 text-white md:pl-10 mt-12">
          <h2 className="text-4xl md:text-5xl font-bold font-modum">
            LET’S GET HEALED & BUILD FUTURE TOGETHER
          </h2>

          <div>
            <h3 className="text-3xl font-semibold font-modum text-white">
              Our Vision:
            </h3>
            <p>
              To create spiritually conscious, ethically grounded, and intellectually awakened individuals who could transform society.
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-semibold font-modum text-white">
              Idea Behind Al Noor EdTech
            </h3>
            <p>
              AlNoor EdTech was born from a vision to make this journey of discovery easier and more accessible for you. We bridge the gap between the revered knowledge of Islamic tradition and the realities of your modern world.
              By drawing from the collective wisdom and strengths of communities, we transform timeless guidance into clear, actionable, and beautifully designed resources.
            </p>
          </div>

          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Clarity in Chaos:</strong> Find clear answers to life’s complex questions.</li>
            <li><strong>Purpose in Action:</strong> Turn spiritual knowledge into practical steps for a more fulfilling life.</li>
            <li><strong>A Legacy of Light:</strong> Build a strong foundation of faith and values for yourself and the next generation.</li>
          </ul>

          <p>
            We don't just provide courses; we provide light. Join us and begin your journey to a more balanced, purposeful, and illuminated life.
          </p>

          {/* ✅ Join Us Button */}
          <button
            onClick={() => navigate("/")}
            className="bg-yellow-500 text-black px-6  py-3 rounded-lg font-semibold hover:bg-yellow-600 transition"
          >
            Join Us
          </button>
        </div>
      </div>
    </div>
  );
}
