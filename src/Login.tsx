import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { useAuth } from "./AuthContext";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect if user is already logged in
  React.useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      console.log("Login successful");
      navigate("/dashboard");
    } catch (error) {
      setError("Failed to log in. Please check your email and password.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-green-400 font-['Courier_Prime'] flex flex-col">
      <header className="bg-black bg-opacity-80 py-4">
        <div className="container mx-auto px-4">
          <Link
            to="/"
            className="text-green-500 hover:text-green-300 transition-colors inline-flex items-center"
          >
            <ChevronLeft className="mr-2" />
            Back to Home
          </Link>
        </div>
      </header>
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="bg-gray-900 p-8 rounded-lg border border-green-600 shadow-lg shadow-green-500/50 w-full max-w-md">
          <h1
            className="text-3xl font-bold mb-6 text-center glitch"
            data-text="Login to H4CK3R_CTF"
          >
            Login to H4CK3R_CTF
          </h1>
          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-green-600 hover:bg-green-500 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Login
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Login;
