"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff, Lock, LogIn, Mail } from "lucide-react";
import { login } from "@/services/api";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      await login(
        {
          username: formData.username,
          password: formData.password,
        },
        formData.remember
      );
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      setErrorMessage(
          error.response?.data?.message ||
          error.message ||
          "Login failed. Please check your username and password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black px-6 pb-16 pt-28 text-white">
      <section className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_440px]">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Dashboard Access
          </p>
          <h1 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
            Welcome back,
            <span className="text-orange-500"> Deepanshu</span>
          </h1>
          <p className="mt-5 text-base leading-7 text-gray-400">
            Sign in to manage portfolio projects, update featured work, and keep the site content fresh.
          </p>
        </div>

        <div className="border border-gray-800 bg-[#111] p-8 shadow-xl shadow-cyan-500/5">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Login</h2>
              <p className="mt-1 text-sm text-gray-400">Use your admin account</p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-500 text-black">
              <LogIn size={22} />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMessage && (
              <p className="border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {errorMessage}
              </p>
            )}

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
                  placeholder="admin"
                  className="w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
                  required
                />
              </span>
            </label>

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
                  onClick={() => setShowPassword((current) => !current)}
                  className="text-gray-500 transition hover:text-cyan-400"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </span>
            </label>

            <div className="flex items-center justify-between gap-4 text-sm">
              <label className="flex items-center gap-2 text-gray-300">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  className="h-4 w-4 accent-cyan-500"
                />
                Remember me
              </label>
              <Link href="/" className="text-cyan-400 transition hover:text-cyan-300">
                Back home
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 bg-orange-500 px-5 py-3 font-bold text-black transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <LogIn size={18} />
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
