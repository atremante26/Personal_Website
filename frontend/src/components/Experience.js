import React, { useState, useEffect } from "react";
import api from "../api/api";

const Experience = () => {
    const [experiences, setExperiences] = useState([]);

    useEffect(() => {
        api.get("experience/") 
            .then((response) => setExperiences(response.data))
            .catch((error) => console.error("Error fetching experiences:", error));
    }, []);

    return (
        <div>
            <h1>Experience</h1>
            <ul>
                {experiences.map((experience) => (
                    <li key={experience.id}>
                        <h3>{experience.title} at {experience.company}</h3>
                        <p>{experience.description}</p>
                        <ul>
                            {experience.skills.map((skill) => (
                                <li key={skill.id}>{skill.name}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Experience;
