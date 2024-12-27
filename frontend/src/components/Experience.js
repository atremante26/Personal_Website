import React, { useState, useEffect } from "react"; // Import React hooks
import api from "../api/api"; // Import Axios instance for API requests
import "./Experience.css"; // Import CSS for styling 

const Experience = () => {
    const [experiences, setExperiences] = useState([]); // State to store experiences

    useEffect(() => {
        api.get("experience/") // Fetch experiences from the API
            .then((response) => {
                setExperiences(response.data); // Set the experiences in state
            })
            .catch((error) => {
                console.error("Error fetching experiences:", error);
            });
    }, []); // Run only on mount

    return (
        <div className="timeline">
            {experiences.map((experience) => (
                <div
                    className="timeline-item"
                    key={experience.id}
                    onMouseEnter={() => setHoveredId(experience.id)}
                    onMouseLeave={() => setHoveredId(null)}
                >
                    <div
                        className={`timeline-content ${
                            hoveredId === experience.id ? "enlarged" : ""
                        }`}
                    >
                        <img src={experience.image} alt={experience.title} />
                        <h3>{experience.title}</h3>
                        <p>{experience.company}</p>
                        {hoveredId === experience.id && (
                            <div className="details">
                                <p>{experience.description}</p>
                                <ul className="skills">
                                    {experience.skills.map((skill) => (
                                        <li key={skill.id}>{skill.name}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Experience;
