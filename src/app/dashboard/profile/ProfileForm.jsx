"use client";

import { useState } from "react";
import {
  FileText,
  Image as ImageIcon,
  Link as LinkIcon,
  Mail,
  Phone,
  Save,
  Search,
  UserRound,
} from "lucide-react";

import { getProfile, saveProfile } from "@/services/profileservice";

const initialProfile = {
  fullName: "",
  email: "",
  mobile: "",
  about: "",
  skills: "",
  experience: "",
  githubUrl: "",
  linkedinUrl: "",
  resumeUrl: "",
  profileImage: "",
};

export default function ProfileForm() {
  const [profile, setProfile] = useState(initialProfile);
  const [files, setFiles] = useState({
    profileImage: null,
    resume: null,
  });
  const [loading, setLoading] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;

    setFiles((current) => ({
      ...current,
      [name]: selectedFiles[0] || null,
    }));
  };

  const buildPayload = () => ({
    fullName: profile.fullName,
    email: profile.email,
    mobile: profile.mobile,
    about: profile.about,
    experience: profile.experience,
    githubUrl: profile.githubUrl,
    linkedinUrl: profile.linkedinUrl,
    skills: profile.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean),
  });

  const handleLoadProfile = async () => {
    try {
      setLoadingProfile(true);
      setMessage("");
      setErrorMessage("");

      const response = await getProfile();
      const data = response.data || {};

      setProfile({
        fullName: data.fullName || "",
        email: data.email || "",
        mobile: data.mobile || "",
        about: data.about || "",
        skills: Array.isArray(data.skills) ? data.skills.join(", ") : "",
        experience: data.experience || "",
        resumeUrl: data.resumeUrl || "",
        githubUrl: data.githubUrl || "",
        linkedinUrl: data.linkedinUrl || "",
        profileImage: data.profileImage || "",
      });
      setMessage("Profile loaded successfully.");
    } catch (error) {
      console.log(error);
      setErrorMessage(
        error.response?.data?.message ||
          error.message ||
          "Unable to load profile.",
      );
    } finally {
      setLoadingProfile(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");
      setErrorMessage("");

      await saveProfile(buildPayload(), files);
      setMessage("Profile saved successfully.");
    } catch (error) {
      console.log(error);
      setErrorMessage(
        error.response?.data?.message ||
          error.message ||
          "Profile save failed.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black px-6 pb-16 pt-28 text-white">
      <section className="mx-auto max-w-5xl">
        <div className="mb-10 border-b border-gray-800 pb-8">
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-cyan-400">
            <UserRound size={18} />
            Profile Manager
          </p>
          <h1 className="mt-4 text-4xl font-bold md:text-5xl">Edit Profile</h1>
          <p className="mt-4 max-w-2xl text-gray-400">
            Save all public profile content from one place: about, skills,
            experience, resume, links, and image.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="border border-gray-800 bg-[#111] p-6 md:p-8"
        >
          {message && (
            <p className="mb-5 border border-cyan-500/40 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-300">
              {message}
            </p>
          )}

          {errorMessage && (
            <p className="mb-5 border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {errorMessage}
            </p>
          )}

          <div className="flex flex-col gap-4 border border-gray-800 bg-black/40 p-4 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-gray-400">
              This profile will be saved for the currently logged-in user.
            </p>
            <button
              type="button"
              onClick={handleLoadProfile}
              disabled={loadingProfile}
              className="mt-7 flex h-fit items-center justify-center gap-2 bg-cyan-500 px-5 py-3 font-semibold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Search size={18} />
              {loadingProfile ? "Loading..." : "Load"}
            </button>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-gray-300">
                Full Name
              </span>
              <input
                type="text"
                name="fullName"
                value={profile.fullName}
                onChange={handleChange}
                placeholder="Deepanshu Rana"
                className="w-full border border-gray-700 bg-black px-4 py-3 text-sm outline-none focus:border-cyan-400"
                required
              />
            </label>

            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
                <Mail size={16} />
                Public Email
              </span>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full border border-gray-700 bg-black px-4 py-3 text-sm outline-none focus:border-cyan-400"
              />
            </label>

            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
                <Phone size={16} />
                Public Mobile
              </span>
              <input
                type="tel"
                name="mobile"
                value={profile.mobile}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full border border-gray-700 bg-black px-4 py-3 text-sm outline-none focus:border-cyan-400"
              />
            </label>

            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
                <LinkIcon size={16} />
                GitHub URL
              </span>
              <input
                type="url"
                name="githubUrl"
                value={profile.githubUrl}
                onChange={handleChange}
                placeholder="https://github.com/username"
                className="w-full border border-gray-700 bg-black px-4 py-3 text-sm outline-none focus:border-cyan-400"
              />
            </label>

            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
                <LinkIcon size={16} />
                LinkedIn URL
              </span>
              <input
                type="url"
                name="linkedinUrl"
                value={profile.linkedinUrl}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/username"
                className="w-full border border-gray-700 bg-black px-4 py-3 text-sm outline-none focus:border-cyan-400"
              />
            </label>
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
                <ImageIcon size={16} />
                Profile Image
              </span>
              <input
                type="file"
                name="profileImage"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full border border-gray-700 bg-black px-4 py-3 text-sm outline-none file:mr-4 file:border-0 file:bg-cyan-500 file:px-4 file:py-2 file:font-semibold file:text-black focus:border-cyan-400"
              />
              {profile.profileImage && (
                <a
                  href={profile.profileImage}
                  target="_blank"
                  className="mt-2 block text-sm text-cyan-400 transition hover:text-cyan-300"
                >
                  View current image
                </a>
              )}
            </label>

            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
                <FileText size={16} />
                Resume
              </span>
              <input
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="w-full border border-gray-700 bg-black px-4 py-3 text-sm outline-none file:mr-4 file:border-0 file:bg-cyan-500 file:px-4 file:py-2 file:font-semibold file:text-black focus:border-cyan-400"
              />
              {profile.resumeUrl && (
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  className="mt-2 block text-sm text-cyan-400 transition hover:text-cyan-300"
                >
                  View current resume
                </a>
              )}
            </label>
          </div>

          <label className="mt-5 block">
            <span className="mb-2 block text-sm font-medium text-gray-300">
              About
            </span>
            <textarea
              name="about"
              value={profile.about}
              onChange={handleChange}
              rows="5"
              placeholder="Write profile summary..."
              className="w-full resize-y border border-gray-700 bg-black px-4 py-3 text-sm outline-none focus:border-cyan-400"
              required
            />
          </label>

          <label className="mt-5 block">
            <span className="mb-2 block text-sm font-medium text-gray-300">
              Skills
            </span>
            <input
              type="text"
              name="skills"
              value={profile.skills}
              onChange={handleChange}
              placeholder="Java, Spring Boot, React, Next.js"
              className="w-full border border-gray-700 bg-black px-4 py-3 text-sm outline-none focus:border-cyan-400"
            />
          </label>

          <label className="mt-5 block">
            <span className="mb-2 block text-sm font-medium text-gray-300">
              Experience
            </span>
            <textarea
              name="experience"
              value={profile.experience}
              onChange={handleChange}
              rows="6"
              placeholder="Write experience details..."
              className="w-full resize-y border border-gray-700 bg-black px-4 py-3 text-sm outline-none focus:border-cyan-400"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="mt-7 flex w-full items-center justify-center gap-2 bg-orange-500 px-5 py-4 font-bold text-black transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Save size={18} />
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </section>
    </main>
  );
}
