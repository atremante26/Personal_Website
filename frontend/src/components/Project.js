import React, { useState, useEffect } from "react";
import api from "../api/api";

const Project = () => {
    const [projects, setProjects] = useState([]); // State to store project data

    useEffect(() => {
        api.get("project/") // Fetch project data from the backend
            .then((response) => setProjects(response.data)) // Update state with fetched data
            .catch((error) => console.error("Error fetching projects:", error)); // Log errors
    }, []); // Run only on mount

    return (
        <div>
            <h1>Projects</h1>
            <ul>
                {projects.map((project) => (
                    <li key={project.id}>
                        <h3>{project.name}</h3>
                        <p>{project.description}</p>
                        <p>
                            <strong>Tags:</strong> {project.tags}
                        </p>
                        <ul>
                            {project.skills.map((skill) => (
                                <li key={skill.id}>{skill.name}</li>
                            ))}
                        </ul>
                        {project.github_url && (
                            <p>
                                <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                                    GitHub
                                </a>
                            </p>
                        )}
                        {project.site_url && (
                            <p>
                                <a href={project.site_url} target="_blank" rel="noopener noreferrer">
                                    Live Site
                                </a>
                            </p>
                        )}
                        {project.image && <img src={project.image} alt={project.name} />}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Project;
