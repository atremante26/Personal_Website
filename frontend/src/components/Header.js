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
        <header style={styles.header}>
            {/* Left: Initials */}
            <div style={styles.left}>
                <h1 style={styles.initials}>AT</h1>
            </div>

            {/* Center: Navigation Buttons */}
            <nav style={styles.nav}>
                <button style={styles.navButton} onClick={() => handleScroll("home")}>Home</button>
                <button style={styles.navButton} onClick={() => handleScroll("about")}>About</button>
                <button style={styles.navButton} onClick={() => handleScroll("experience")}>Experience</button>
                <button style={styles.navButton} onClick={() => handleScroll("projects")}>Projects</button>
                <button style={styles.navButton} onClick={() => handleScroll("interests")}>Interests</button>
            </nav>

            {/* Right: Contact Icons */}
            <div style={styles.icons}>
                <a href="mailto:andrewtremante@gmail.com" style={styles.icon}>
                    <FontAwesomeIcon icon={faEnvelope} size="2x" />
                </a>
                <a
                    href="https://www.linkedin.com/in/andrew-tremante-71253a238/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.icon}
                >
                    <FontAwesomeIcon icon={faLinkedin} size="2x" />
                </a>
                <a
                    href="https://github.com/atremante"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.icon}
                >
                    <FontAwesomeIcon icon={faGithub} size="2x" />
                </a>
                <a href="/path-to-your-resume.pdf" download style={styles.icon}>
                    <FontAwesomeIcon icon={faFileDownload} size="2x" />
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
