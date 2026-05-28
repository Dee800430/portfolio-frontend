"use client";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getprojects } from "@/services/projectservice";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getprojects();
        console.log(response.data);
        setProjects(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section
      id="projects"
      className="min-h-screen bg-black text-white py-24 px-6 lg:px-20"
    >
      {/* Heading */}
      <div className="text-center mb-16">
        <p className="text-orange-500 font-semibold tracking-widest uppercase">
          Portfolio
        </p>

        <h1 className="text-4xl md:text-5xl font-bold mt-3">
          Featured{" "}
          <span className="text-orange-500">
            Projects
          </span>
        </h1>

        <div className="w-28 h-1 bg-orange-500 mx-auto mt-5 rounded-full"></div>

        <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
          Here are some of my full-stack applications built using
          Java, Spring Boot, React, Next.js, JWT Authentication,
          MySQL, and modern web technologies.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group bg-[#111111] border border-gray-800 rounded-3xl overflow-hidden hover:border-orange-500 transition-all duration-500 shadow-lg hover:shadow-orange-500/10"
          >
            {/* Project Image */}
            <div className="overflow-hidden">
              <img
                src={project.imageUrl || "/placeholder.png"}
                alt={project.title || "Project Image"}
                className="w-full h-60 object-cover group-hover:scale-110 transition duration-700"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Category */}
              <span className="text-xs bg-orange-500/20 text-orange-400 px-4 py-1 rounded-full">
                {project.category}
              </span>

              {/* Title */}
              <h2 className="text-2xl font-bold mt-5 group-hover:text-orange-500 transition">
                {project.title}
              </h2>

              {/* Description */}
              <p className="text-gray-400 mt-4 leading-relaxed text-sm">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mt-5">
                {project.techStack?.split(",").map((tech, i) => (
                  <span
                    key={i}
                    className="bg-black border border-gray-700 text-gray-300 text-xs px-3 py-1 rounded-full hover:border-orange-500 transition"
                  >
                    {tech.trim()}
                  </span>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-4 mt-7">
                {/* GitHub */}
                <a
                  href={project.githubUrl}
                  target="_blank"
                  className="flex items-center gap-2 bg-[#1a1a1a] hover:bg-orange-500 text-white px-5 py-3 rounded-xl transition duration-300"
                >
                  <FaGithub size={18} />
                  Code
                </a>

                {/* Live Demo */}
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  className="flex items-center gap-2 border border-orange-500 hover:bg-orange-500 text-orange-400 hover:text-white px-5 py-3 rounded-xl transition duration-300"
                >
                  <ExternalLink size={18} />
                  Live
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
