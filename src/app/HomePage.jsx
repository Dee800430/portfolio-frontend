"use client";

import { useEffect, useState } from "react";
import {
  Briefcase,
  Code2,
  ExternalLink,
  FileText,
  Mail,
  Phone,
  Send,
} from "lucide-react";

import { FaGithub, FaLinkedin } from "react-icons/fa";

import { createContact, getContacts } from "@/services/contactservice";
import { getprojects } from "@/services/projectservice";
import { getPublicProfile } from "@/services/profileservice";

const emptyContactForm = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

export default function HomePage() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [contactForm, setContactForm] = useState(emptyContactForm);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadHome = async () => {
      try {
        const [profileResponse, projectsResponse, contactsResponse] =
          await Promise.all([
            getPublicProfile(),
            getprojects(),
            getContacts(),
          ]);

        setProfile(profileResponse.data || null);
        setProjects(projectsResponse.data || []);
        setContacts(contactsResponse.data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadHome();
  }, []);

  const skills = Array.isArray(profile?.skills)
    ? profile.skills
    : [];

  const handleContactChange = (e) => {
    const { name, value } = e.target;

    setContactForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();

    try {
      setSending(true);
      setMessage("");
      setErrorMessage("");

      await createContact(contactForm);

      setMessage("Message sent successfully.");
      setContactForm(emptyContactForm);
    } catch (error) {
      console.log(error);
      setErrorMessage("Unable to send message right now.");
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="bg-black text-white">
      {/* HERO SECTION */}
      <section
        id="home"
        className="min-h-screen px-6 pb-16 pt-28 lg:px-18"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_420px]">
          {/* LEFT SIDE */}
          <div>
            <h1 className="mt-0 text-5xl  leading-tight md:text-6xl">
              {profile?.fullName || "Deepanshu Rana"}
            </h1>
            {/* EMAIL + PHONE */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300">
              {contacts[0]?.email && (
                <a
                  href={`mailto:${contacts[0].email}`}
                  className="flex items-center gap-2 transition hover:text-cyan-400"
                >
                  <Mail
                    size={16}
                    className="text-cyan-400"
                  />
                  {contacts[0].email}
                </a>
              )}

              {contacts[0]?.phone  && (
                <a
                  href={`tel:${contacts[0].phone}`}
                  className="flex items-center gap-2 transition hover:text-cyan-400"
                >
                  <Phone
                    size={16}
                    className="text-cyan-400"
                  />
                  {contacts[0].phone}
                </a>
              )}
            </div>

        

            {/* NAME */}
            

            {/* ABOUT */}
            <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-300">
              {loading
                ? "Loading portfolio..."
                : profile?.about ||
                  "I build full-stack web applications with clean backend APIs, modern frontend interfaces, and practical deployment-ready architecture."}
            </p>

            {/* BUTTONS */}
            <div className="mt-8 flex flex-wrap gap-3">
              {profile?.resumeUrl && (
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 bg-cyan-500 px-5 py-3 font-bold text-black transition hover:bg-cyan-400"
                >
                  <FileText size={18} />
                  Resume
                </a>
              )}

              {profile?.githubUrl && (
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 border border-gray-700 px-5 py-3 font-semibold text-gray-200 transition hover:border-cyan-400 hover:text-cyan-400"
                >
                  <FaGithub size={18} />
                  GitHub
                </a>
              )}

              {profile?.linkedinUrl && (
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 border border-gray-700 px-5 py-3 font-semibold text-gray-200 transition hover:border-cyan-400 hover:text-cyan-400"
                >
                  <FaLinkedin size={18} />
                  LinkedIn
                </a>
              )}
            </div>
          </div>

          {/* RIGHT SIDE IMAGE */}
          <div className="flex justify-center lg:justify-end">
            <div
              className="flex aspect-square w-full max-w-[420px] items-center justify-center border border-gray-800 bg-[#111] bg-cover bg-center text-7xl font-bold text-cyan-400"
              style={
                profile?.profileImage
                  ? {
                      backgroundImage: `url(${profile.profileImage})`,
                    }
                  : undefined
              }
            >
              {!profile?.profileImage && "DR"}
            </div>
          </div>
        </div>
        
        <div className="mx-auto max-w-7xl">
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-cyan-400">
            <Code2 size={18} />
            Technical Skills
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {skills.length ? (
              skills.map((skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="border border-gray-800 bg-[#111] px-4 py-2 text-sm text-gray-200"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-gray-400">
                Skills will appear here after profile setup.
              </p>
            )}
          </div>
        </div>
        
        <div className="mx-auto max-w-7xl">
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-cyan-400">
            <Briefcase size={18} />
            Experience
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            Work & Practice
          </h2>

          <p className="mt-6 max-w-4xl border-l-2 border-cyan-400 pl-5 text-base leading-8 text-gray-300">
            {profile?.experience ||
              "Experience details will appear here after profile setup."}
          </p>
        </div>
      </section>

     

      
      {/* PROJECTS */}
<section
  id="projects"
  className="border-t border-gray-900 px-6 py-20 lg:px-20"
>
  <div className="mx-auto max-w-7xl">
    <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
      Portfolio
    </p>

    <h2 className="mt-3 text-4xl font-bold">
      Projects
    </h2>

    <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {projects.length ? (
        projects.map((project) => (
          <article
            key={project.id}
            className="overflow-hidden border border-gray-800 bg-[#111] transition hover:-translate-y-2 hover:border-cyan-400"
          >
            {/* IMAGE */}
            <div
              className="h-56 bg-black bg-cover bg-center"
              style={
                project.imageUrl
                  ? {
                      backgroundImage: `url(${project.imageUrl})`,
                    }
                  : undefined
              }
            />

            {/* CONTENT */}
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-orange-400">
                {project.category || "Project"}
              </p>

              <h3 className="mt-3 text-xl font-bold">
                {project.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-400">
                {project.description}
              </p>

              {/* TECH STACK */}
              <div className="mt-4 flex flex-wrap gap-2">
                {project.techStack
                  ?.split(",")
                  .filter(Boolean)
                  .map((tech, index) => (
                    <span
                      key={`${tech.trim()}-${index}`}
                      className="rounded border border-gray-700 px-2 py-1 text-xs text-gray-300"
                    >
                      {tech.trim()}
                    </span>
                  ))}
              </div>

              {/* BUTTONS */}
              <div className="mt-5 flex gap-4">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300"
                  >
                    <FaGithub size={16} />
                    Code
                  </a>
                )}

                {project.liveDemoUrl && (
                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm font-semibold text-orange-400 hover:text-orange-300"
                  >
                    <ExternalLink size={16} />
                    Live
                  </a>
                )}
              </div>
            </div>
          </article>
        ))
      ) : (
        <p className="text-gray-400">
          Projects will appear here after they are added.
        </p>
      )}
    </div>
  </div>
</section>
    </main>
  );
}