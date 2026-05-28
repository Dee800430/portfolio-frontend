"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Check,
  FileText,
  FolderKanban,
  Mail,
  Pencil,
  PlusCircle,
  Trash2,
  X,
  UserRound,
} from "lucide-react";

import { getProfile } from "@/services/profileservice";
import { deleteProject, getprojects } from "@/services/projectservice";
import {
  deleteContact,
  getContacts,
  updateContact,
} from "@/services/contactservice";

const emptyContactForm = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};


export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [loadingContacts, setLoadingContacts] = useState(true);
  const [projectMessage, setProjectMessage] = useState("");
  const [projectError, setProjectError] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [contactError, setContactError] = useState("");
  const [editingContactId, setEditingContactId] = useState(null);
  const [contactForm, setContactForm] = useState(emptyContactForm);
  

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await getProfile();
        setProfile(response.data || null);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingProfile(false);
      }
    };

    loadProfile();
  }, []);

  const loadProjects = async () => {
    try {
      setLoadingProjects(true);
      setProjectError("");
      const response = await getprojects();
      setProjects(response.data || []);
    } catch (error) {
      console.log(error);
      setProjectError("Unable to load projects.");
    } finally {
      setLoadingProjects(false);
    }
  };

  useEffect(() => {
    const loadInitialProjects = async () => {
      try {
        setLoadingProjects(true);
        setProjectError("");
        const response = await getprojects();
        setProjects(response.data || []);
      } catch (error) {
        console.log(error);
        setProjectError("Unable to load projects.");
      } finally {
        setLoadingProjects(false);
      }
    };

    loadInitialProjects();
  }, []);

  const handleDeleteProject = async (projectId) => {
    const confirmed = window.confirm("Delete this project?");

    if (!confirmed) {
      return;
    }

    try {
      setProjectMessage("");
      setProjectError("");
      await deleteProject(projectId);
      setProjectMessage("Project deleted successfully.");
      await loadProjects();
    } catch (error) {
      console.log(error);
      setProjectError("Project delete failed.");
    }
  };

  const loadContacts = async () => {
    try {
      setLoadingContacts(true);
      setContactError("");
      const response = await getContacts();
      setContacts(response.data || []);
    } catch (error) {
      console.log(error);
      setContactError("Unable to load contacts.");
    } finally {
      setLoadingContacts(false);
    }
  };

  useEffect(() => {
    const loadInitialContacts = async () => {
      try {
        setLoadingContacts(true);
        setContactError("");
        const response = await getContacts();
        setContacts(response.data || []);
      } catch (error) {
        console.log(error);
        setContactError("Unable to load contacts.");
      } finally {
        setLoadingContacts(false);
      }
    };

    loadInitialContacts();
  }, []);

  const startEditingContact = (contact) => {
    setEditingContactId(contact.id);
    setContactForm({
      name: contact.name || "",
      email: contact.email || "",
      phone: contact.phone || "",
      subject: contact.subject || "",
      message: contact.message || "",
    });
    setContactMessage("");
    setContactError("");
  };

  const cancelEditingContact = () => {
    setEditingContactId(null);
    setContactForm(emptyContactForm);
  };

  const handleContactFormChange = (e) => {
    const { name, value } = e.target;

    setContactForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleUpdateContact = async (contactId) => {
    try {
      setContactMessage("");
      setContactError("");
      await updateContact(contactId, contactForm);
      setContactMessage("Contact updated successfully.");
      cancelEditingContact();
      await loadContacts();
    } catch (error) {
      console.log(error);
      setContactError("Contact update failed.");
    }
  };

  const handleDeleteContact = async (contactId) => {
    const confirmed = window.confirm("Delete this contact?");

    if (!confirmed) {
      return;
    }

    try {
      setContactMessage("");
      setContactError("");
      await deleteContact(contactId);
      setContactMessage("Contact deleted successfully.");
      await loadContacts();
    } catch (error) {
      console.log(error);
      setContactError("Contact delete failed.");
    }
  };

  
  return (
    <main className="min-h-screen bg-black px-6 pb-16 pt-28 text-white">
      <section className="mx-auto max-w-7xl">
        <div className="mt-10 grid gap-6 border border-gray-800 bg-[#111] p-6 lg:grid-cols-[1fr_280px]">
          <div>
            <h2 className="mt-3 text-3xl font-bold">
              {profile?.fullName || "Profile overview"}
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-gray-400">
              {loadingProfile
                ? "Loading profile..."
                : profile?.about || "No profile saved yet. Add your profile details to show them here."}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {profile?.skills?.length ? (
                profile.skills.map((skill, index) => (
                  <span
                    key={`${skill}-${index}`}
                    className="border border-gray-700 bg-black px-3 py-1 text-xs text-gray-300"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-sm text-gray-500">No skills added</span>
              )}
            </div>

            {profile?.experience && (
              <p className="mt-5 border-l-2 border-cyan-400 pl-4 text-sm leading-6 text-gray-300">
                {profile.experience}
              </p>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              {profile?.resumeUrl && (
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 bg-cyan-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-cyan-400"
                >
                  <FileText size={16} />
                  Resume
                </a>
              )}
              <Link
                href="/dashboard/profile"
                className="flex items-center gap-2 border border-gray-700 px-4 py-2 text-sm font-semibold text-gray-200 transition hover:border-orange-500 hover:text-orange-400"
              >
                <UserRound size={16} />
                Update Profile
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div
              className="flex aspect-square w-full max-w-[260px] items-center justify-center border border-gray-800 bg-black bg-cover bg-center text-5xl font-bold text-cyan-400"
              style={
                profile?.profileImage
                  ? { backgroundImage: `url(${profile.profileImage})` }
                  : undefined
              }
            >
              {!profile?.profileImage && "DR"}
            </div>
          </div>
        </div>

        <div className="mt-10 border border-gray-800 bg-[#111] p-6">
          <div className="flex flex-col gap-4 border-b border-gray-800 pb-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-cyan-400">
                <FolderKanban size={18} />
                Projects
              </p>
              <h2 className="mt-2 text-3xl font-bold">All Projects</h2>
            </div>

            <Link
              href="/add-project"
              className="flex w-fit items-center gap-2 bg-cyan-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-cyan-400"
            >
              <PlusCircle size={16} />
              Add Project
            </Link>
          </div>

          {projectMessage && (
            <p className="mt-5 border border-cyan-500/40 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-300">
              {projectMessage}
            </p>
          )}

          {projectError && (
            <p className="mt-5 border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {projectError}
            </p>
          )}

          {loadingProjects ? (
            <p className="mt-6 text-sm text-gray-400">Loading projects...</p>
          ) : projects.length ? (
            <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project) => (
                <article
                  key={project.id}
                  className="border border-gray-800 bg-black"
                >
                  <div
                    className="h-44 bg-[#111] bg-cover bg-center"
                    style={
                      project.imageUrl
                        ? { backgroundImage: `url(${project.imageUrl})` }
                        : undefined
                    }
                  />

                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-widest text-orange-400">
                      {project.category || "Project"}
                    </p>
                    <h3 className="mt-3 text-xl font-bold text-white">
                      {project.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-400">
                      {project.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.techStack?.split(",").filter(Boolean).map((tech, index) => (
                        <span
                          key={`${tech.trim()}-${index}`}
                          className="border border-gray-700 px-2 py-1 text-xs text-gray-300"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 flex gap-3">
                      <Link
                        href={`/add-project?projectId=${project.id}`}
                        className="flex flex-1 items-center justify-center gap-2 border border-cyan-500 px-3 py-2 text-sm font-semibold text-cyan-400 transition hover:bg-cyan-500 hover:text-black"
                      >
                        <Pencil size={16} />
                        Update
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDeleteProject(project.id)}
                        className="flex flex-1 items-center justify-center gap-2 border border-red-500 px-3 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <p className="mt-6 text-sm text-gray-400">No projects found.</p>
          )}
        </div>

        <div className="mt-10 border border-gray-800 bg-[#111] p-6">
          <div className="flex flex-col gap-4 border-b border-gray-800 pb-5 md:flex-row md:items-center md:justify-between">
            
          </div>

          {contactMessage && (
            <p className="mt-5 border border-cyan-500/40 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-300">
              {contactMessage}
            </p>
          )}

          {contactError && (
            <p className="mt-5 border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {contactError}
            </p>
          )}

          {loadingContacts ? (
            <p className="mt-6 text-sm text-gray-400">Loading contacts...</p>
          ) : contacts.length ? (
            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              {contacts.map((contact) => (
                <article key={contact.id} className="border border-gray-800 bg-black p-5">
                  {editingContactId === contact.id ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        name="name"
                        value={contactForm.name}
                        onChange={handleContactFormChange}
                        placeholder="Name"
                        className="w-full border border-gray-700 bg-[#111] px-4 py-3 text-sm outline-none focus:border-cyan-400"
                      />
                      <input
                        type="email"
                        name="email"
                        value={contactForm.email}
                        onChange={handleContactFormChange}
                        placeholder="Email"
                        className="w-full border border-gray-700 bg-[#111] px-4 py-3 text-sm outline-none focus:border-cyan-400"
                      />
                      <input
                        type="text"
                        name="phone"
                        value={contactForm.phone}
                        onChange={handleContactFormChange}
                        placeholder="Phone"
                        className="w-full border border-gray-700 bg-[#111] px-4 py-3 text-sm outline-none focus:border-cyan-400"
                      />
                      <input
                        type="text"
                        name="subject"
                        value={contactForm.subject}
                        onChange={handleContactFormChange}
                        placeholder="Subject"
                        className="w-full border border-gray-700 bg-[#111] px-4 py-3 text-sm outline-none focus:border-cyan-400"
                      />
                      <textarea
                        name="message"
                        value={contactForm.message}
                        onChange={handleContactFormChange}
                        rows="4"
                        placeholder="Message"
                        className="w-full resize-y border border-gray-700 bg-[#111] px-4 py-3 text-sm outline-none focus:border-cyan-400"
                      />

                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => handleUpdateContact(contact.id)}
                          className="flex flex-1 items-center justify-center gap-2 bg-cyan-500 px-3 py-2 text-sm font-semibold text-black transition hover:bg-cyan-400"
                        >
                          <Check size={16} />
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={cancelEditingContact}
                          className="flex flex-1 items-center justify-center gap-2 border border-gray-700 px-3 py-2 text-sm font-semibold text-gray-300 transition hover:border-orange-500 hover:text-orange-400"
                        >
                          <X size={16} />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-bold">{contact.name || "Unknown"}</h3>
                          <p className="mt-1 text-sm text-cyan-400">{contact.email}</p>
                          {contact.phone && (
                            <p className="mt-1 text-sm text-gray-400">{contact.phone}</p>
                          )}
                        </div>
                        <span className="border border-gray-700 px-3 py-1 text-xs text-gray-300">
                          {contact.subject || "Contact"}
                        </span>
                      </div>

                      <p className="mt-4 text-sm leading-6 text-gray-400">
                        {contact.message}
                      </p>

                      <div className="mt-5 flex gap-3">
                        <button
                          type="button"
                          onClick={() => startEditingContact(contact)}
                          className="flex flex-1 items-center justify-center gap-2 border border-cyan-500 px-3 py-2 text-sm font-semibold text-cyan-400 transition hover:bg-cyan-500 hover:text-black"
                        >
                          <Pencil size={16} />
                          Update
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteContact(contact.id)}
                          className="flex flex-1 items-center justify-center gap-2 border border-red-500 px-3 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-500 hover:text-white"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </article>
              ))}
            </div>
          ) : (
            <p className="mt-6 text-sm text-gray-400">No contacts found.</p>
          )}
        </div>

      </section>
    </main>
  );
}
