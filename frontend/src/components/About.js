import React, { useEffect, useState } from "react"; // Import React and hooks
import api from "../api/api"; // Import Axios instance

const About = () => {
    const [about, setAbout] = useState([]); // State to store data from the backend

    useEffect(() => {
        // Fetch "About" data from the backend
        api.get("about/")
            .then((response) => {
                setAbout(response.data); // Update the about state with fetched data
            })
            .catch((error) => {
                console.error("Error fetching About data:", error); // Error handling
            });
    }, []); // Run only on component mount

    return (
        <div
            className="min-h-screen flex items-center justify-center text-center p-10"
            style={{
                background: `linear-gradient(to bottom, #2d3748, #1a202c)`, // Updated gradient for smooth blending
            }}
        >
            <div>
                {/* Main Heading */}
                <h1 className="text-4xl font-audiowide text-white mb-5 text-center">
                    Hi, I'm Andrew. <span className="font-audiowide text-blue-400">Nice to meet you!</span>
                </h1>

                {/* About Description */}
                {about.length > 0 ? (
                    about.map((item, index) => (
                        <p
                            key={index}
                            className="font-azeret_mono text-xl text-white leading-relaxed text-center max-w-6xl"
                        >
                            {item.bio}
                        </p>
                    ))
                ) : (
                    <p className="font-azeret_mono text-xl text-white leading-relaxed text-center max-w-6xl">
                        Loading about information...
                    </p>
                )}
            </div>
        </div>
    );
};

export default About;
