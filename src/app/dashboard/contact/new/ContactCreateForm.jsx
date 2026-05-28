"use client";

import { useState } from "react";
import { Mail, PlusCircle } from "lucide-react";

import { createContact } from "@/services/contactservice";

const emptyContactForm = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function ContactCreateForm() {
  const [formData, setFormData] = useState(emptyContactForm);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");
      setErrorMessage("");
      await createContact(formData);
      setMessage("Contact added successfully.");
      setFormData(emptyContactForm);
    } catch (error) {
      console.log(error);
      setErrorMessage(
        error.response?.data?.message ||
          error.message ||
          "Contact save failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black px-6 pb-16 pt-28 text-white">
      <section className="mx-auto max-w-4xl">
        <div className="mb-8 border-b border-gray-800 pb-6">
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-cyan-400">
            <Mail size={18} />
            Contacts
          </p>
          <h1 className="mt-3 text-4xl font-bold">Add New Contact</h1>
          <p className="mt-3 text-sm text-gray-400">
            Create a contact message from the private dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="border border-gray-800 bg-[#111] p-6">
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

          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full border border-gray-700 bg-black px-4 py-3 text-sm outline-none focus:border-cyan-400"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border border-gray-700 bg-black px-4 py-3 text-sm outline-none focus:border-cyan-400"
              required
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full border border-gray-700 bg-black px-4 py-3 text-sm outline-none focus:border-cyan-400"
            />
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-full border border-gray-700 bg-black px-4 py-3 text-sm outline-none focus:border-cyan-400"
              required
            />
          </div>

          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            placeholder="Message"
            className="mt-4 w-full resize-y border border-gray-700 bg-black px-4 py-3 text-sm outline-none focus:border-cyan-400"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-5 flex w-full items-center justify-center gap-2 bg-cyan-500 px-5 py-3 font-bold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <PlusCircle size={18} />
            {loading ? "Adding..." : "Add Contact"}
          </button>
        </form>
      </section>
    </main>
  );
}
