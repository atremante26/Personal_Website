import React, { useState, useEffect } from "react"; // Import React and hooks
import api from "../api/api"; // Import Axios instance

const Experience = () => { // Define Experience component
    const [experiences, setExperiences] = useState([]); // Initialize state
                                                        // experiences - variable that stores fetched data
                                                        // setExperiences - function that updates value of experiences

    useEffect(() => { // Hook that runs the following code after component renders for the first time
        api.get("experience/") // Sends a GET request to the /api/experience/ endpoint (fetches the "Experience" data from  Django backend)
            .then((response) => setExperiences(response.data)) // Updates experiences variable with response data (updating triggers a re-rendering in UI)
            .catch((error) => console.error("Error fetching experiences:", error)); // Handle errors
    }, []); // Ensure that useEffect only runs once

    return ( // Render the UI
        <div>
            <h1>Experience</h1> {/* Main heading*/}
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
