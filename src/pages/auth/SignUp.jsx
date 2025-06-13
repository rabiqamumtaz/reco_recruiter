import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import backgroundImage from "../../assets/office_background.jpg";
import recoLogo from "../../assets/logo.png";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerRecruiter } from "../../store/recruiterAuthThunk";
import { toast } from "react-toastify";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      company: form.company,
      position: form.position,
      password: form.password,
    };

    try {
      const resultAction = await dispatch(registerRecruiter(payload));
      if (registerRecruiter.fulfilled.match(resultAction)) {
        toast.success("Registration successful! You can now login.");
        navigate("/");
      } else {
        toast.error(resultAction.payload?.message || "Registration failed");
      }
    } catch (err) {
      console.error("Registration error", err);
      toast.error("Something went wrong during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{ 
        backgroundImage: `url(${backgroundImage})`,   
        backgroundSize: "cover",
        backgroundPosition: "center", 
      }}
    >
      <div className="min-h-screen w-full bg-cover bg-center flex items-center justify-center px-4 py-8 bg-[#00000087]">
        <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Panel */}
          <div className="flex-1 flex items-center justify-center px-4 md:px-10">
            <div className="max-w-md text-center md:text-left">
              <img src={recoLogo} alt="Reco Logo" className="w-25 mb-6 mx-auto md:mx-0" />
              <h2 className="text-2xl font-bold text-black mb-2">Join Our Recruiter Network</h2>
              <p className="text-sm text-black-700 mb-4">
                Create your recruiter profile and access top talent for your company.
              </p>
              <ul className="space-y-2 text-sm text-black-800">
                <li className="flex items-center justify-center md:justify-start">
                  <span className="text-black-800 mr-2">✔</span> Access to qualified candidates
                </li>
                <li className="flex items-center justify-center md:justify-start">
                  <span className="text-black-800 mr-2">✔</span> Streamlined hiring process
                </li>
                <li className="flex items-center justify-center md:justify-start">
                  <span className="text-black-800 mr-2">✔</span> Advanced candidate matching
                </li>
              </ul>
            </div>
          </div>

          {/* Right Panel (Form) */}
          <div className="flex-1 max-w-md w-full bg-white p-8 rounded-xl shadow-lg max-h-[90vh] overflow-y-auto custom-scrollbar">
            <form onSubmit={handleSubmit} className="space-y-5">
              <h2 className="text-xl font-bold text-blue-600 text-center">Create Recruiter Account</h2>

              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="email@example.com"
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+92 7383 38383939"
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              {/* Company */}
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input
                  id="company"
                  name="company"
                  placeholder="Your Company Name"
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              {/* Position */}
              <div>
                <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                <input
                  id="position"
                  name="position"
                  placeholder="Your Position"
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full bg-green-600 text-white py-2 rounded transition ${
                  loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
                }`}
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>

              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/recruiter/login" className="text-blue-600 hover:underline">Sign in</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}