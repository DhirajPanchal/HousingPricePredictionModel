"use client";

import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { useRouter } from "next/navigation";

export default function HomeView() {
  const { userName, setUserContext } = useAppContext();
  const router = useRouter();
  const [form, setForm] = useState({
    userName: "jerry@hsbc.com",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignIn = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:8004/api/context", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to sign in");
      const data = await res.json();
      setUserContext(data.userName, data.modules);
      router.push("/user-context");
    } catch (err: any) {
      setError("Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  if (userName) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-semibold text-gray-600">
            Global Services Platform
          </h2>
          <button
            onClick={() => router.push("/user-context")}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-none transition"
          >
            Go to Your Applications Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-[80vh] bg-white">
      {/* Left Side - Sign In */}
      <div className="flex-1 flex justify-center items-center p-8">
        <div className="w-full max-w-md bg-white p-8 space-y-6 border border-gray-300 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            IAM User Sign In
          </h2>
          {error && <p className="text-center text-red-500">{error}</p>}
          <div className="space-y-4">
            {/* New BOLD Labels */}
            <div className="space-y-1">
              <label
                htmlFor="userName"
                className="block text-gray-700 font-bold text-sm"
              >
                Username
              </label>
              <input
                id="userName"
                type="text"
                name="userName"
                placeholder="Enter your username"
                value={form.userName}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold text-sm"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>

            <button
              onClick={handleSignIn}
              disabled={loading}
              className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-none transition font-bold"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
            <p className="text-gray-500">
              *** Just enter Username tom@hsbc.com or jerry@hsbc.com and click
              Sign In
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Title and Notes */}
      <div className="flex-1 flex flex-col justify-center items-center p-8">
        <h1 className="text-4xl font-extrabold mb-4 text-red-600">
          Global Services Platform
        </h1>
        <button className="mt-6 px-6 py-2 border border-gray-300 bg-white text-gray-800 hover:bg-gray-100 rounded-none transition">
          Learn More »
        </button>
      </div>
    </div>
  );
}
