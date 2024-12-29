import React, { useState, useEffect } from "react";
import api from "../api/api";

const Interests = () => {
    const [interests, setInterests] = useState([]); // State for interests

    useEffect(() => {
        api.get("interest/") // Fetch interests from the backend
            .then((response) => setInterests(response.data)) // Update state
            .catch((error) => console.error("Error fetching interests:", error)); // Log errors
    }, []); // Run once on mount

    return (
        <div>
            <h1>Interests</h1>
            <ul>
                {interests.map((interest) => (
                    <li key={interest.id}>
                        <h3>{interest.topic}</h3>
                        <p>{interest.description}</p>
                        {interest.image && (
                            <img src={interest.image} alt={interest.topic} style={{ width: "200px" }} />
                        )}
                        <p>
                            <strong>Tags:</strong> {interest.tags.map((tag) => tag.name).join(", ")}
                        </p>
                        {interest.url && (
                            <p>
                                <a href={interest.url} target="_blank" rel="noopener noreferrer">
                                    Learn More
                                </a>
                            </p>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Interests;
