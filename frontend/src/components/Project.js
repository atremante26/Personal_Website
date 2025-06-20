import React, { useState, useEffect } from "react";
import api from "../api/api";

const Project = () => {
  const [projects, setProjects] = useState([]);
  const [selectedTag, setSelectedTag] = useState("All");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    api.get("project/")
      .then((response) => {
        setProjects(response.data);
        const allTags = new Set(
          response.data.flatMap((project) => project.tags.map((tag) => tag.name))
        );
        setTags(["All", ...Array.from(allTags)]);
      })
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  const filteredProjects =
    selectedTag === "All"
      ? projects
      : projects.filter((project) =>
          project.tags.some((tag) => tag.name === selectedTag)
        );

  return (
    <div
      className="min-h-screen flex flex-col items-center p-10"
      style={{
        background: "linear-gradient(to bottom, #2e3a50, #1a202c)",
        paddingTop: "150px", // Padding for the top section
      }}
    >
      {/* Section Title */}
      <h1
        className="text-5xl font-audiowide text-[#32a8ff] mb-10"
        style={{ textShadow: "0px 4px 6px rgba(50, 168, 255, 0.4)" }}
      >
        Projects
      </h1>

      {/* Tag Filter Section */}
      <div
        className="flex gap-4 mb-8"
        style={{
          marginTop: "100px", // Add a small margin above the filters
        }}
      >
        {tags.map((tag) => (
          <button
            key={tag}
            className={`font-audiowide px-4 py-2 rounded-full ${
              selectedTag === tag
                ? "bg-[#32a8ff] text-gray-900"
                : "bg-gray-700 text-gray-300"
            } transition-colors duration-300`}
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12"
        style={{
          marginTop: "10px", // Reduce space between filters and project grid
        }}
      >
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="relative group bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer"
            onClick={() => {
              if (project.github_url) {
                window.open(project.github_url, "_blank");
              }
            }}
          >
            {/* Default View: Project Image */}
            <div className="w-full h-64 relative overflow-hidden">
              <img
                src={makeMediaUrl(project.image)}
                alt={project.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:opacity-0"
              />
              {/* Project Name on the Image */}
              <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-75 text-[#32a8ff] text-center py-2">
                <span className="font-audiowide text-lg">{project.name}</span>
              </div>
            </div>

            {/* Hover View: Project Details */}
            <div
              className="absolute inset-0 flex flex-col justify-center items-center bg-gray-900 text-white p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <h2 className="text-xl font-audiowide mb-4 text-[#32a8ff] text-center">
                {project.name}
              </h2>
              <p className="font-azeret_mono text-sm text-gray-300 text-center leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Skills Section */}
              <div className="flex flex-wrap justify-center gap-2">
                {project.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-xs font-audiowide"
                  >
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;
