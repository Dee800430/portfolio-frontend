"use client";

import { getProjectById, saveProject } from "@/services/projectservice";
import { useEffect, useState } from "react";

export default function AddProject() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: "",
    githubUrl: "",
    liveDemoUrl: "",
    category: "",
    featured: false,
  });

  const [image, setImage] = useState(null);
  const [projectId, setProjectId] = useState(null);

  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadProjectForUpdate = async () => {
      const params = new URLSearchParams(window.location.search);
      const projectIdParam = params.get("projectId");

      if (!projectIdParam) {
        return;
      }

      try {
        setLoading(true);
        const response = await getProjectById(projectIdParam);
        const project = response.data || {};

        setProjectId(project.id || projectIdParam);
        setFormData({
          title: project.title || "",
          description: project.description || "",
          techStack: project.techStack || "",
          githubUrl: project.githubUrl || "",
          liveDemoUrl: project.liveDemoUrl || "",
          category: project.category || "",
          featured: Boolean(project.featured),
        });
        setPreview(project.imageUrl || "");
      } catch (error) {
        console.log(error);
        alert("Unable to load project for update");
      } finally {
        setLoading(false);
      }
    };

    loadProjectForUpdate();
  }, []);

  // Handle Text Input
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle Image
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      // FOR UPDATE
      if (projectId) {
        data.append("id", projectId);
      }

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("techStack", formData.techStack);
      data.append("githubUrl", formData.githubUrl);
      data.append("liveDemoUrl", formData.liveDemoUrl);
      data.append("category", formData.category);
      data.append("featured", formData.featured);

      // IMAGE OPTIONAL
      if (image) {
        data.append("image", image);
      }

      await saveProject(data);

      alert(
        projectId
          ? "Project Updated Successfully"
          : "Project Added Successfully",
      );

      setFormData({
        title: "",
        description: "",
        techStack: "",
        githubUrl: "",
        liveDemoUrl: "",
        category: "",
        featured: false,
      });

      setImage(null);
      setPreview("");
      setProjectId(null);
    } catch (error) {
      console.log(error);

      alert("Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-black text-white py-20 px-6">
      <div className="max-w-3xl mx-auto bg-[#111] p-10 rounded-3xl border border-gray-800 shadow-xl">
        <h1 className="text-4xl font-bold text-center mb-10">
          {projectId ? "Update" : "Add"}
          <span className="text-orange-500"> Project</span>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full bg-black border border-gray-700 rounded-xl px-5 py-4 outline-none focus:border-orange-500"
            required
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Project Description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            className="w-full bg-black border border-gray-700 rounded-xl px-5 py-4 outline-none focus:border-orange-500"
            required
          />

          {/* Tech Stack */}
          <input
            type="text"
            name="techStack"
            placeholder="Java, Spring Boot, React"
            value={formData.techStack}
            onChange={handleChange}
            className="w-full bg-black border border-gray-700 rounded-xl px-5 py-4 outline-none focus:border-orange-500"
          />

          {/* Github URL */}
          <input
            type="text"
            name="githubUrl"
            placeholder="GitHub URL"
            value={formData.githubUrl}
            onChange={handleChange}
            className="w-full bg-black border border-gray-700 rounded-xl px-5 py-4 outline-none focus:border-orange-500"
          />

          {/* Live Demo URL */}
          <input
            type="text"
            name="liveDemoUrl"
            placeholder="Live Demo URL"
            value={formData.liveDemoUrl}
            onChange={handleChange}
            className="w-full bg-black border border-gray-700 rounded-xl px-5 py-4 outline-none focus:border-orange-500"
          />

          {/* Category */}
          <input
            type="text"
            name="category"
            placeholder="Full Stack"
            value={formData.category}
            onChange={handleChange}
            className="w-full bg-black border border-gray-700 rounded-xl px-5 py-4 outline-none focus:border-orange-500"
          />

          {/* Featured */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
            />

            <label>Featured Project</label>
          </div>

          {/* Image Upload */}
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-gray-700 rounded-xl p-4"
            />

            {/* Preview */}
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-5 w-full h-64 object-cover rounded-2xl border border-gray-700"
              />
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-400 text-black font-bold py-4 rounded-xl transition duration-300"
          >
            {loading
              ? "Uploading..."
              : projectId
                ? "Update Project"
                : "Add Project"}
          </button>
        </form>
      </div>
    </section>
  );
}
