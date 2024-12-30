import React, { useEffect, useRef } from "react";
import * as THREE from "three"; // Import Three.js

const Home = () => {
    const mountRef = useRef(null); // Ref to attach Three.js renderer to a Domain Object Model (DOM) element

    useEffect(() => {
        // Set up the Three.js scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color("#2d3748"); // Set background color

        // Set up the camera
        const camera = new THREE.PerspectiveCamera(
            75, // Field of view
            window.innerWidth / window.innerHeight, // Aspect ratio
            0.1, // Near clipping plane
            1000 // Far clipping plane
        );
        camera.position.z = 10; // Move camera back slightly

        // Set up the WebGL renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true }); // Anti-aliasing for smoother edges
        renderer.setSize(window.innerWidth, window.innerHeight); // Match renderer size to viewport
        mountRef.current.appendChild(renderer.domElement); // Attach renderer to the DOM

        // Create spheres (neurons)
        const nodeCount = 50; // Number of spheres
        const nodeGeometry = new THREE.SphereGeometry(0.15, 32, 32); // Sphere geometry 
        const nodeMaterial = new THREE.MeshStandardMaterial({
            color: "#32a8ff", // Base color
            emissive: "#1e90ff", // Glow color
            emissiveIntensity: 0.5, // Glow intensity
            roughness: 0.4, // Surface roughness
            metalness: 0.6, // Reflective quality
        });

        const nodes = new THREE.Group(); // Group to hold all neurons
        const nodePositions = []; // Array to store neuron positions
        for (let i = 0; i < nodeCount; i++) {
            const nodeMesh = new THREE.Mesh(nodeGeometry, nodeMaterial); // Create a sphere
            nodeMesh.position.set(
                (Math.random() - 0.5) * 8, // Random X position within a range
                (Math.random() - 0.5) * 8, // Random Y position within a range
                (Math.random() - 0.5) * 8  // Random Z position within a range
            );
            nodePositions.push(nodeMesh.position); // Save position for edges
            nodes.add(nodeMesh); // Add node to the group
        }
        scene.add(nodes); // Add all nodes to the scene

        // Add lighting to the scene
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7); // Soft overall lighting
        const pointLight = new THREE.PointLight(0xffffff, 1); // Bright, focused light
        pointLight.position.set(10, 10, 10); // Position the point light
        scene.add(ambientLight, pointLight); // Add both lights to the scene

        // Create edges (lines connecting neurons)
        const edgeMaterial = new THREE.LineBasicMaterial({ color: "#32a8ff" }); // Line material with color
        const edges = new THREE.Group(); // Group to hold all edges

        for (let i = 0; i < nodePositions.length; i++) {
            for (let j = i + 1; j < nodePositions.length; j++) {
                if (Math.random() > 0.87) { // Randomly connect some nodes
                    const lineGeometry = new THREE.BufferGeometry().setFromPoints([
                        nodePositions[i], // Start point
                        nodePositions[j], // End point
                    ]);
                    const line = new THREE.Line(lineGeometry, edgeMaterial); // Create a line
                    edges.add(line); // Add line to the group
                }
            }
        }
        scene.add(edges); // Add all edges to the scene

        // Animation loop to update the scene
        const animate = () => {
            requestAnimationFrame(animate); // Request the next animation frame

            nodes.rotation.x += 0.001; // Rotate nodes group on X-axis
            nodes.rotation.y += 0.001; // Rotate nodes group on Y-axis

            edges.rotation.x += 0.001; // Rotate edges group on X-axis
            edges.rotation.y += 0.001; // Rotate edges group on Y-axis

            renderer.render(scene, camera); // Render the updated scene
        };
        animate(); // Start the animation loop

        // Cleanup function to remove the renderer when component unmounts
        return () => {
            if (renderer.domElement && renderer.domElement.parentNode) {
                renderer.domElement.parentNode.removeChild(renderer.domElement);
            }
        };
    }, []); 

    return (
        <div
            ref={mountRef} // Attach the Three.js renderer to this div
            className="relative flex items-center justify-center h-screen"
            style={{
                background: `linear-gradient(to bottom, #2d3748, rgba(26, 32, 44, 0))`, // Blend Home's background with About
            }}
        >
            {/* Name and Subtitle */}
            <div className="absolute text-center">
                <h1 className="font-azeret_mono text-8xl font-medium text-white">
                    Andrew Tremante
                </h1>
                <p className="font-azeret_mono text-3xl font-medium text-white mt-4">
                    Software Engineer // Data Scientist // Data Engineer
                </p>
            </div>

            {/* Scroll Down for More */}
            <div className="absolute bottom-10 text-center">
                <p className="font-azeret_mono text-xl text-blue-400 animate-fade-up">
                    Scroll down for more...
                </p>
            </div>

            {/* Tailwind Custom Keyframe Animation */}
            <style>
                {`
                @keyframes fade-up {
                    0%, 100% {
                        opacity: 0; // Fully transparent at start and end
                        transform: translateY(-10px); // Slightly above original position
                    }
                    50% {
                        opacity: 1; // Fully visible at the midpoint
                        transform: translateY(0px); // Original position
                    }
                }

                .animate-fade-up {
                    animation: fade-up 2s infinite; // Run fade-up animation continuously
                }
                `}
            </style>
        </div>
    );
};

export default Home;
