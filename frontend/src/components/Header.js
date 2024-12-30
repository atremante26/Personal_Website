// Importing React and FontAwesome icons for use in the header
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faFileDownload } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

const Header = () => {
    const handleScroll = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" }); // Smooth scrolling
        }
    };

    return (
        <header className="flex justify-between items-center px-6 py-4 bg-gray-800 text-white fixed w-full z-50"> {/* Header Container */}
            {/* Left Section: Name (Andrew Tremante) */}
            <div className="font-audiowide text-2xl font-bold tracking-wide text-blue-400"> AndrewTremante._ </div>

            {/* Center: Navigation Buttons */}
            <nav className="flex-grow flex justify-center items-center space-x-8">
                <button
                    className="font-audiowide hover:text-blue-400 transition-colors duration-300"
                    onClick={() => handleScroll("home")}
                >
                    // home 
                </button>
                <button
                    className="font-audiowide hover:text-blue-400 transition-colors duration-300"
                    onClick={() => handleScroll("about")}
                >
                    // about
                </button>
                <button
                    className="font-audiowide hover:text-blue-400 transition-colors duration-300"
                    onClick={() => handleScroll("experience")}
                >
                    // experience
                </button>
                <button
                    className="font-audiowide hover:text-blue-400 transition-colors duration-300"
                    onClick={() => handleScroll("projects")}
                >
                    // projects
                </button>
                <button
                    className="font-audiowide hover:text-blue-400 transition-colors duration-300"
                    onClick={() => handleScroll("interests")}
                >
                    // interests
                </button>
            </nav>


            {/* Right: Contact Icons */}
            <div className="flex items-center space-x-4">
                {/* LinkedIn Icon */}
                <a
                    href="https://www.linkedin.com/in/andrew-tremante-71253a238/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 transition"
                >
                    <FontAwesomeIcon icon={faLinkedin} size="lg" />
                </a>

                {/* GitHub Icon */}
                <a
                    href="https://github.com/atremante"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 transition"
                >
                    <FontAwesomeIcon icon={faGithub} size="lg" />
                </a>

                {/* Email Icon */}
                <a
                    href="mailto:andrewtremante@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 transition"
                >
                    <FontAwesomeIcon icon={faEnvelope} size="lg" />
                </a>
                {/* Resume Button */}
                <a
                    href={require("../assets/Resume.pdf")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-audiowide px-4 py-2 border-2 border-blue-400 text-blue-400 bg-white rounded-lg hover:bg-blue-400 hover:text-white transition"
                >
                    resume
                </a>

                {/* Transcript Button */}
                <a
                    href={require("../assets/Transcript.pdf")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-audiowide px-4 py-2 border-2 border-blue-400 text-blue-400 bg-white rounded-lg hover:bg-blue-400 hover:text-white transition"
                >
                    transcript
                </a>
            </div>
        </header>
    );
};

const styles = {
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#1e1e1e",
        color: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 1000,
    },
    left: {
        flex: 1,
    },
    initials: {
        fontSize: "24px",
        fontWeight: "bold",
        fontFamily: "Cursive, sans-serif", // Replace with your desired font later
    },
    nav: {
        display: "flex",
        gap: "15px",
        flex: 2,
        justifyContent: "center",
    },
    navButton: {
        background: "none",
        border: "none",
        color: "#fff",
        fontSize: "16px",
        cursor: "pointer",
    },
    icons: {
        display: "flex",
        gap: "15px",
        flex: 1,
        justifyContent: "flex-end",
    },
    icon: {
        color: "#fff",
        textDecoration: "none",
    },
};

export default Header;