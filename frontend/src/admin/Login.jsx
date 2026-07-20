import { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

export default function LoginPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await API.post("/auth/login", form);

      localStorage.setItem("token", data.token);

      alert(data.message);

      navigate("/admin");

    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-white px-4">

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .5 }}
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8"
      >

        <div className="text-center mb-8">

          <h1 className="text-3xl font-bold text-blue-700">
            Admin Login
          </h1>

          <p className="text-gray-500 mt-2">
            Welcome Back 👋
          </p>

        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name */}

          <div>

            <label className="text-gray-600 mb-2 block">
              Username
            </label>

            <div className="relative">

              <FaUser className="absolute left-4 top-4 text-gray-400" />

              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Enter Username"
                className="w-full pl-11 pr-4 py-3 border rounded-xl outline-none focus:border-blue-600"
              />

            </div>

          </div>

          {/* Password */}

          <div>

            <label className="text-gray-600 mb-2 block">
              Password
            </label>

            <div className="relative">

              <FaLock className="absolute left-4 top-4 text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="Enter Password"
                className="w-full pl-11 pr-12 py-3 border rounded-xl outline-none focus:border-blue-600"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>

            </div>

          </div>

          <button
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
          >
            {loading ? "Logging In..." : "Login"}
          </button>

        </form>

      </motion.div>

    </div>
  );
}