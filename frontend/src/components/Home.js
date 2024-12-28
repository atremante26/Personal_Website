import React from "react";

const Home = () => {
    return (
        <div style={styles.container}>
            {/* Main Heading */}
            <h1 style={styles.heading}>Andrew Tremante</h1>

            {/* Subtitle */}
            <p style={styles.subheading}>
                Software Engineer, Data Scientist, and Data Engineer
            </p>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh", // Full viewport height
        textAlign: "center",
        backgroundColor: "#1e1e1e", // Placeholder for a dark background
        color: "#fff",
        position: "relative",
        padding: "20px",
    },
    heading: {
        fontSize: "64px",
        fontWeight: "bold",
        margin: "0",
    },
    subheading: {
        fontSize: "24px",
        marginTop: "10px",
    },
};

export default Home;
