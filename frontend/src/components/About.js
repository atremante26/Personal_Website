import React, { useEffect, useState } from "react";
import api from "../api/api";

const About = () => {
    const [about, setAbout] = useState([]);

    useEffect(() => {
        api.get("about/")
            .then((response) => {
                setAbout(response.data);
            })
            .catch((error) => {
                console.error("Error fetching About data:", error);
            });
    }, []);

    return (
        <div
            className="min-h-screen flex items-center justify-center text-center p-10"
            style={{
                background: `linear-gradient(to bottom, #2d3748, #1a202c 85%)`, // Extend gradient slightly for blending
            }}
        >
            <div>
                <h1 className="text-4xl font-audiowide text-white mb-5 text-center">
                    Hi, I'm Andrew. <span className="font-audiowide text-blue-400">Nice to meet you!</span>
                </h1>
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
