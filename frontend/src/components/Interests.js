import React, { useState, useEffect } from "react";
import api from "../api/api";
import { makeMediaUrl } from "../utils/media";

const Interests = () => {
  const [interests, setInterests] = useState([]);
  const [hoveredInterest, setHoveredInterest] = useState(null);

  useEffect(() => {
    api.get("interest/")
      .then((response) => setInterests(response.data))
      .catch((error) => console.error("Error fetching interests:", error));
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col justify-start items-center pt-32 p-10"
      style={{
        background: "linear-gradient(to bottom, #1a202c, #2e3a50)", // Matching gradient background
      }}
    >
      {/* Section Title */}
      <h1
        className="text-5xl font-audiowide text-[#32a8ff] mb-12"
        style={{ textShadow: "0px 4px 6px rgba(50, 168, 255, 0.4)" }}
      >
        Interests
      </h1>

      {/* Main Content */}
      <div className="relative flex w-full max-w-7xl gap-8">
        {/* Left Side: Larger Box */}
        <div className="flex-1">
          {hoveredInterest ? (
            <div
              className="bg-gray-800 text-white rounded-lg shadow-xl p-6 transition-all duration-300 cursor-pointer"
              onClick={() => {
                if (hoveredInterest.url) {
                  window.open(hoveredInterest.url, "_blank");
                }
              }}
            >
              {/* Image */}
              <div className="flex justify-center mb-6">
                <img
                  src={makeMediaUrl(hoveredInterest.image)}
                  alt={hoveredInterest.topic}
                  className="w-2/3 h-64 object-contain rounded-lg"
                />
              </div>

              {/* Topic */}
              <h2
                className="text-3xl font-audiowide text-[#32a8ff] text-center mb-4"
                style={{ textShadow: "0px 4px 6px rgba(50, 168, 255, 0.4)" }}
              >
                {hoveredInterest.topic}
              </h2>

              {/* Description */}
              <p className="font-azeret_mono text-gray-300 text-center leading-relaxed mb-4">
                {hoveredInterest.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap justify-center gap-2">
                {hoveredInterest.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm font-audiowide"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            // Placeholder when no interest is hovered
            <div className="flex justify-center items-center h-full text-gray-500 text-lg">
              Hover over an interest to see details!
            </div>
          )}
        </div>

        {/* Right Side: Vertical List of Interests */}
        <div className="flex flex-col gap-4 w-1/4 ml-auto">
          {interests.map((interest) => (
            <div
              key={interest.id}
              className="bg-gray-800 text-white rounded-lg shadow-lg p-4 cursor-pointer transition-transform hover:scale-105"
              onMouseEnter={() => setHoveredInterest(interest)}
            >
              <img
                src={makeMediaUrl(interest.image)}
                alt={interest.topic}
                className="w-full h-32 object-cover rounded-t-lg"
              />
              <h3 className="text-lg font-audiowide mt-2 text-center">{interest.topic}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Interests;
