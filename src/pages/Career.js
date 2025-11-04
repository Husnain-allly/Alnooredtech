import React, { useState } from "react";
import { Upload, Mail, Phone, User } from "lucide-react";

const CareerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    message: "",
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      setFormData({ ...formData, resume: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // For now, just log it — later connect to backend or API endpoint
    console.log("Form submitted:", formData);
    alert("Form submitted successfully! (Demo only)");
  };

  return (
    <section className="bg-gray-900 text-white py-16 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-yellow-400">Career Form</h2>
        <p className="text-gray-300 mb-10 leading-relaxed">
          For now, no job availability — but you can submit your resume for future
          opportunities or apply for volunteering on this platform. Please fill and
          submit the form below.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-gray-800 p-8 rounded-2xl shadow-lg space-y-6"
      >
        {/* Name */}
        <div className="flex items-center border border-gray-700 rounded-md p-3 bg-gray-900">
          <User className="text-yellow-400 mr-3" />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-transparent outline-none text-gray-200 placeholder-gray-400"
          />
        </div>

        {/* Email */}
        <div className="flex items-center border border-gray-700 rounded-md p-3 bg-gray-900">
          <Mail className="text-yellow-400 mr-3" />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-transparent outline-none text-gray-200 placeholder-gray-400"
          />
        </div>

        {/* Phone */}
        <div className="flex items-center border border-gray-700 rounded-md p-3 bg-gray-900">
          <Phone className="text-yellow-400 mr-3" />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full bg-transparent outline-none text-gray-200 placeholder-gray-400"
          />
        </div>

        {/* Position */}
        <div className="flex items-center border border-gray-700 rounded-md p-3 bg-gray-900">
          <input
            type="text"
            name="position"
            placeholder="Position / Interest Area"
            value={formData.position}
            onChange={handleChange}
            required
            className="w-full bg-transparent outline-none text-gray-200 placeholder-gray-400"
          />
        </div>

        {/* Resume Upload */}
        <div className="border border-gray-700 rounded-md p-4 bg-gray-900">
          <label className="flex items-center cursor-pointer space-x-3">
            <Upload className="text-yellow-400" />
            <span className="text-sm text-gray-300">
              {formData.resume ? formData.resume.name : "Upload Resume (PDF or DOC)"}
            </span>
            <input
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
              required
              className="hidden"
            />
          </label>
        </div>

        {/* Message */}
        <textarea
          name="message"
          rows="4"
          placeholder="Message (optional)"
          value={formData.message}
          onChange={handleChange}
          className="w-full border border-gray-700 bg-gray-900 rounded-md p-3 text-gray-200 placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400"
        ></textarea>

        {/* Submit */}
        <button
          type="submit"
          className="bg-yellow-400 text-gray-900 font-semibold px-8 py-3 rounded-md hover:bg-yellow-300 transition-all duration-200 w-full"
        >
          Submit
        </button>
      </form>
    </section>
  );
};

export default CareerForm;
