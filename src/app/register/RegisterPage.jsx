"use client";

import { useState } from "react";
import { UserPlus, Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { register } from "@/services/api";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "USER",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      await register(formData);

      setSuccessMessage("Account created successfully!");
      setFormData({
        username: "",
        password: "",
        role: "USER",
      });
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          error.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black px-6 pb-16 pt-28 text-white">
      <section className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_440px]">

        {/* LEFT SIDE */}
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Create Account
          </p>

          <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
            Join the
            <span className="text-orange-500"> Dashboard</span>
          </h1>

          <p className="mt-5 text-base leading-7 text-gray-400">
            Create an account to manage your profile, projects, skills, and portfolio content.
          </p>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="border border-gray-800 bg-[#111] p-8 shadow-xl shadow-cyan-500/5">

          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Register</h2>
              <p className="mt-1 text-sm text-gray-400">
                Create your admin/user account
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-500 text-black">
              <UserPlus size={22} />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {errorMessage && (
              <p className="border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {errorMessage}
              </p>
            )}

            {successMessage && (
              <p className="border border-green-500/40 bg-green-500/10 px-4 py-3 text-sm text-green-300">
                {successMessage}
              </p>
            )}

            {/* USERNAME */}
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-gray-300">
                Username
              </span>

              <span className="flex items-center gap-3 border border-gray-700 bg-black px-4 py-3 focus-within:border-cyan-400">
                <Mail size={18} className="text-gray-500" />

                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter username"
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
                  required
                />
              </span>
            </label>

            {/* PASSWORD */}
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-gray-300">
                Password
              </span>

              <span className="flex items-center gap-3 border border-gray-700 bg-black px-4 py-3 focus-within:border-cyan-400">
                <Lock size={18} className="text-gray-500" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="text-gray-500 hover:text-cyan-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </span>
            </label>

            {/* ROLE */}
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-gray-300">
                Role
              </span>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full border border-gray-700 bg-black px-4 py-3 text-sm text-white outline-none focus:border-cyan-400"
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </label>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 bg-orange-500 px-5 py-3 font-bold text-black transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <UserPlus size={18} />
              {loading ? "Creating account..." : "Register"}
            </button>

            {/* LINK */}
            <p className="text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link href="/login" className="text-cyan-400 hover:text-cyan-300">
                Login
              </Link>
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}