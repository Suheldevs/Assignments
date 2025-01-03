import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../Redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const dispatch = useDispatch();
  const { user, error, loading } = useSelector((state) => state.user);
  if (user?.username) {
    navigate(`/dashboard/${user?.username}`);
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginStart());
      const response = await axios.post(
        `${backendUrl}/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      if (response.status === 201 || 200) {
        dispatch(loginSuccess(response.data.rest));
      }
    } catch (error) {
      dispatch(loginFailure(error.response?.data?.message));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
     <div> <span className="text-lg font-semibold text-slate-800">For Admin log-In</span> - Email: admin1@gmail.com , Password: admin1</div><br/>
     <div> <span className="text-lg font-semibold text-slate-800">For User log-In</span> - Email: user1@gmail.com , Password: user1</div>
        <h2 className="mb-6 mt-1 text-2xl font-bold text-center text-gray-800">
          Login
        </h2>
        {error && (
          <div className="p-4 mb-4 text-red-700 bg-red-100 border border-red-400 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {loading ? "In Process..." : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
