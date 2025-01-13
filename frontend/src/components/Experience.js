import React, { useState, useEffect } from "react";
import api from "../api/api";

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  useEffect(() => {
    api.get("experience/")
      .then((response) => {
        const sortedExperiences = response.data.sort((a, b) => {
          return new Date(a.start_date) - new Date(b.start_date);
        });
        setExperiences(sortedExperiences);
      })
      .catch((error) => console.error("Error fetching experiences:", error));
  }, []);

  const formatDateRange = (startDate, endDate) => {
    const start = new Date(startDate).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    }).replace(",", "");

    const end = endDate
      ? new Date(endDate).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        }).replace(",", "")
      : "Present";

    return `${start} - ${end}`;
  };

  // Calculate the largest hover box height
  const maxHoverHeight = "400px";

  return (
    <div
      className="w-full text-white py-32"
      style={{
        background: `linear-gradient(to bottom, #1a202c, #2e3a50)`,
      }}
    >
      {/* Section Title */}
      <h1
        className="text-5xl text-[#32a8ff] font-audiowide text-center mb-32"
        style={{
          textShadow: "0px 4px 6px rgba(50, 168, 255, 0.5)",
        }}
      >
        Experience
      </h1>

      {/* Timeline */}
      <div className="relative max-w-7xl mx-auto h-[600px] flex items-center">
        <div
          className="absolute left-0 w-full h-0.5"
          style={{
            background: "linear-gradient(90deg, #32a8ff, #1a202c)",
            animation: "glow 3s infinite alternate",
          }}
        />
        <div className="relative w-full flex justify-between items-center px-16">
          {experiences.map((experience, index) => (
            <div key={experience.id} className="relative group">
              {/* Timeline Icons */}
              <div className="flex flex-col items-center">
                <div className="absolute -top-64">
                  <div className="w-56 h-56 rounded-full border-2 border-blue-400 bg-gray-800 overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
                    <img
                      src={experience.image}
                      alt={experience.title}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                </div>
                {/* Title Box */}
                <div className="absolute -translate-y-1/2">
                  <div className="bg-gray-700 px-4 py-2 rounded">
                    <span className="font-audiowide text-lg text-white whitespace-nowrap">
                      {experience.title}
                    </span>
                  </div>
                </div>
                {/* Date */}
                <div className="font-audiowide absolute top-8 left-1/2 -translate-x-1/2 text-base text-[#32a8ff] text-center whitespace-nowrap">
                  {formatDateRange(experience.start_date, experience.end_date)}
                </div>
              </div>
              {/* Hover Cards */}
              <div
                className={`absolute -top-[300px] opacity-0 invisible 
                            group-hover:opacity-100 group-hover:visible transition-all duration-300
                            ${index === 0 ? "translate-x-[-25%]" : 
                               index === experiences.length - 1 ? "translate-x-[-75%]" : 
                               "left-1/2 -translate-x-1/2"}`}
              >
                <div
                  className="w-[500px] p-8 rounded-lg shadow-xl relative flex flex-col items-center justify-center"
                  style={{
                    backgroundColor: "#111827",
                    minHeight: maxHoverHeight,
                  }}
                >
                  {/* Background Image Watermark */}
                  <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <img
                      src={experience.image}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </div>
                  {/* Foreground Content */}
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <h2
                      className="text-3xl font-audiowide mb-6 text-[#32a8ff]"
                      style={{
                        textShadow: "0px 4px 6px rgba(50, 168, 255, 0.5)",
                      }}
                    >
                      {experience.title}
                    </h2>
                    <p className="font-azeret_mono text-gray-300 mb-8 text-sm leading-relaxed">
                      {experience.description}
                    </p>
                    {/* Skills Section */}
                    <div className="flex flex-wrap gap-6 justify-center">
                      {experience.skills.map((skill, skillIndex) => (
                        <div
                          key={skillIndex}
                          className="relative"
                          onMouseEnter={() =>
                            setHoveredSkill(`${experience.id}-${skillIndex}`)
                          }
                          onMouseLeave={() => setHoveredSkill(null)}
                        >
                          <img
                            src={skill.icon}
                            alt={skill.name}
                            className="w-8 h-8 transition-transform hover:scale-110"
                          />
                          {hoveredSkill ===
                            `${experience.id}-${skillIndex}` && (
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 px-3 py-1 rounded text-sm whitespace-nowrap">
                              {skill.name}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
