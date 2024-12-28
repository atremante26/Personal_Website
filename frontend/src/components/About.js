import React, { useEffect, useState } from "react"; // Import React and hooks
import api from "../api/api"; // Import Axios instance

const About = () => { // Define About component
    const [about, setAbout] = useState([]); // Initialize state 
                                            // about - variable that stores fetched data
                                            // setAbout - function that updates value of about

    useEffect(() => { // Hook that runs the following code after component renders for the first time
        api.get("about/") // Sends a GET request to the /api/about/ endpoint (fetches the "About" data from  Django backend)
        .then(response => { // Process fetched data from GET request
            setAbout(response.data); // Updates about variable with response data (updating triggers a re-rendering in UI)
        })
        .catch(error => { // Handle errors
            console.error("Error fetching About data:", error); 
        });
    }, []); // Ensure that useEffect only runs once

    return ( // Render the UI
        <div> 
            <h1>About Me</h1> {/* Main heading*/}
            {about.length > 0 ? ( // Checks if about has any data
                about.map((item, index) => ( // If yes, displays data using map
                    <p key={index}>{item.bio}</p> 
                ))
            ) : (
                <p>Loading about information...</p> // If no, displays a 'Loading' message until data is fetched
            )}
        </div> // Closes the wrapper element
    );
};

export default About; // Component is exported


