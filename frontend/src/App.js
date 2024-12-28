import React from "react";
import Home from "./components/Home";
import Header from "./components/Header";
import About from "./components/About";
import Experience from "./components/Experience";
import Project from "./components/Project";
import Interests from "./components/Interests";

function App() {
    return (
        <div>
            <Header />
            <div id="home">
                <Home />
            </div>
            <div id="about">
                <About />
            </div>
            <div id="experience">
                <Experience />
            </div>
            <div id="projects">
                <Project />
            </div>
            <div id="interests">
                <Interests />
            </div>
        </div>
    );
}

export default App;
