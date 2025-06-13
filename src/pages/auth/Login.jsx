import React, { useState, useEffect } from "react";
import backgroundImage from "../../assets/office_background.jpg";
import { Icon } from "@iconify/react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginRecruiter } from "../../store/recruiterAuthThunk";
import { toast } from "react-toastify";
import logo from "../../assets/logo.png"

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, loading } = useSelector((state) => state.recruiterAuth);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginRecruiter(form)).unwrap();
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message || "Login failed");
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/recruiter/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex items-center justify-center px-4 min-h-screen bg-[#00000087]">
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8 text-center">
          <img src={logo} alt="Reco Logo" className="w-28 sm:w-16 sm:h-8 lg:w-32 lg:h-16 mx-auto py-2" />
          <h2 className="text-xl sm:text-x1/2 font-bold text-teal-800 mb-1">RECRUITER LOGIN</h2>
          <p className="text-sm text-gray-600 mb-6">
            Please enter your email and password
          </p>

          <form onSubmit={handleSubmit} className="text-left">
            <div className="mb-4">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  <Icon icon="mdi:email-outline" className="text-xl" />
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  className="pl-10 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                  <Icon icon="mdi:lock-outline" className="text-xl" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  className="pl-10 pr-10 w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <span
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <Icon
                    icon={
                      showPassword ? "mdi:eye-off-outline" : "mdi:eye-outline"
                    }
                    className="text-xl"
                  />
                </span>
              </div>
            </div>

            <div className="flex justify-end mb-6 text-sm">
              <Link
                to="/recruiter/forgot-password"
                className="text-gray-600 hover:text-blue-600"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}