import React from "react";
import { Phone, Mail, MapPin, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* LEFT SIDE: CONTACT INFO + DONATION */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-brand">
            Al Noor EdTech (Pvt.) Limited
          </h2>

          <div className="space-y-4 text-gray-300 mb-10">
            <div className="flex items-start space-x-3">
              <Phone className="w-5 h-5 text-brand mt-1" />
              <p>0334-8643829</p>
            </div>

            <div className="flex items-start space-x-3">
              <Mail className="w-5 h-5 text-brand mt-1" />
              <p>alnoor.edtech@gmail.com</p>
            </div>

            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-brand mt-1" />
              <p>
                Muhalla Masot, Dak Khana Aliabad, Murtazabad, <br />
                Tehsil Aliabad Hunza, Zilah Hunza.
              </p>
            </div>
          </div>

          {/* DONATION SECTION UNDER CONTACT INFO */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-brand flex items-center gap-2">
              <Heart className="text-brand w-5 h-5" /> Support Our Mission
            </h2>

            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              Your donation helps us provide quality education, build learning
              tools, and empower students across Pakistan. Every contribution
              makes a difference!
            </p>

            <button
              onClick={() =>
                window.open("https://your-donation-link.com", "_blank")
              }
              className="flex items-center justify-center gap-2 bg-yellow-400 text-gray-900 font-semibold px-6 py-2 rounded-md hover:bg-yellow-300 transition-all duration-200 w-full sm:w-auto"
            >
              <Heart className="w-4 h-4" /> Donate Now
            </button>
          </div>
        </div>

        {/* RIGHT SIDE: CONTACT FORM */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-brand">
            Get in Touch
          </h2>

          <form className="space-y-5">
            <input
              type="text"
              placeholder="Name"
              className="w-full bg-gray-800 border border-gray-700 text-white text-sm p-3 rounded-md outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-gray-800 border border-gray-700 text-white text-sm p-3 rounded-md outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
              type="text"
              placeholder="Phone"
              className="w-full bg-gray-800 border border-gray-700 text-white text-sm p-3 rounded-md outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <textarea
              placeholder="Message"
              rows="4"
              className="w-full bg-gray-800 border border-gray-700 text-white text-sm p-3 rounded-md outline-none focus:ring-2 focus:ring-yellow-400"
            ></textarea>

            <button
              type="submit"
              className="bg-brand text-gray-900 font-semibold px-6 py-2 rounded-md hover:bg-yellow-300 transition-all duration-200"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* BOTTOM LINE */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Al Noor EdTech (Pvt.) Limited — All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
