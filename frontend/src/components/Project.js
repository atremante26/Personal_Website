import React, { useState, useEffect } from "react";
import api from "../api/api";
import { makeMediaUrl } from "../utils/media";

const Project = () => {
    const [projects, setProjects] = useState([]);
    const [selectedTag, setSelectedTag] = useState("All");
    const [tags, setTags] = useState([]);

    useEffect(() => {
        api.get("project/")
            .then((response) => {
                setProjects(response.data);
                const allTags = new Set(
                    response.data.flatMap((project) =>
                        project.tags.map((tag) => tag.name)
                    )
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
                background: "linear-gradient(to bottom, #2d3748, #1a202c)",
                paddingTop: "150px",
            }}
        >
            {/* Section Title */}
            <h1
                className="text-5xl font-audiowide text-[#32a8ff] mb-10"
                style={{ textShadow: "0px 4px 6px rgba(50, 168, 255, 0.4)" }}
            >
                Projects
            </h1>

            {/* Tag Filter */}
            <div className="flex gap-4 mb-8 mt-24">
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
            <div className="w-full max-w-6xl flex flex-wrap justify-center gap-12 mt-2">
                {filteredProjects.map((project) => (
                    <div
                        key={project.id}
                        className="relative group bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer"
                        style={{ width: "calc(33.333% - 2rem)", minWidth: "280px" }}
                        onClick={() => {
                            if (project.github_url) {
                                window.open(project.github_url, "_blank");
                            }
                        }}
                    >
                        {/* Default: image */}
                        <div className="w-full h-64 relative overflow-hidden">
                            <img
                                src={makeMediaUrl(project.image)}
                                alt={project.name}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:opacity-0"
                            />
                            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-75 text-[#32a8ff] text-center py-2">
                                <span className="font-audiowide text-lg">{project.name}</span>
                            </div>
                        </div>

                        {/* Hover: lead + bullets + skills */}
                        <div className="absolute inset-0 flex flex-col justify-start bg-gray-900 text-white p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-y-auto">
                            <h2 className="text-lg font-audiowide mb-3 text-[#32a8ff] text-center">
                                {project.name}
                            </h2>

                            {/* Lead */}
                            {project.lead && (
                                <p className="font-azeret_mono text-sm text-gray-300 leading-relaxed mb-3">
                                    {project.lead}
                                </p>
                            )}

                            {/* Bullets */}
                            {project.bullets_list && project.bullets_list.length > 0 && (
                                <ul className="flex flex-col gap-2 mb-4">
                                    {project.bullets_list.map((bullet, i) => (
                                        <li
                                            key={i}
                                            className="font-azeret_mono text-xs text-gray-400 leading-relaxed flex gap-2"
                                        >
                                            <span className="text-[#32a8ff] mt-0.5 shrink-0">▸</span>
                                            <span>{bullet}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {/* Skills */}
                            <div className="flex flex-wrap justify-center gap-2 mt-auto">
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