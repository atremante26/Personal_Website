import React, { useState, useEffect } from 'react';
import api from "../api/api";

const Experience = () => {
  const [experiences, setExperiences] = useState([]);
  const [hoveredSkill, setHoveredSkill] = useState(null);

  useEffect(() => {
    api.get("experience/")
      .then((response) => setExperiences(response.data))
      .catch((error) => console.error("Error fetching experiences:", error));
  }, []);

  return (
    <div className="w-full bg-gray-800 text-white py-48">
      {/* Title */}
      <h1 className="text-5xl font-mono text-center mb-32 text-white">Experience</h1>
      
      <div className="relative max-w-7xl mx-auto min-h-[600px]">
        {/* Timeline line */}
        <div className="absolute top-[160px] left-0 w-full h-0.5 bg-blue-400" />
        
        {/* Experience items */}
        <div className="relative flex justify-between items-start px-16">
          {experiences.map((experience, index) => (
            <div key={experience.id} className="relative group">
              {/* Image, title, and date container */}
              <div className="flex flex-col items-center">
                {/* Image above the line with blue circle border */}
                <div className="mb-8">
                  <div className="w-32 h-32 rounded-full border-2 border-blue-400 bg-gray-800 overflow-hidden">
                    <img
                      src={experience.image}
                      alt={experience.title}
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                </div>
                
                {/* Title centered on the line */}
                <div className="relative -mb-[1px]">
                  <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-700/90 px-4 py-2 rounded z-10">
                    <span className="font-mono text-sm text-white whitespace-nowrap">
                      {experience.title}
                    </span>
                  </div>
                </div>
                
                {/* Date below the line */}
                <span className="font-mono text-[#32a8ff] text-sm mt-12">
                  {experience.startDate}
                </span>
              </div>

              {/* Hover card - centered on the timeline */}
              <div className="absolute left-1/2 -translate-x-1/2 top-[80px] opacity-0 invisible 
                            group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="w-[600px] bg-gray-800/95 p-8 rounded-lg shadow-xl">
                  {/* Background image watermark */}
                  <div className="absolute inset-0 opacity-5">
                    <img
                      src={experience.image}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <h2 className="text-3xl font-mono mb-6 text-white">
                      {experience.title}
                    </h2>
                    <p className="text-gray-300 mb-8 leading-relaxed">
                      {experience.description}
                    </p>
                    
                    {/* Skills */}
                    <div className="flex flex-wrap gap-6">
                      {experience.skills.map((skill, skillIndex) => (
                        <div
                          key={skillIndex}
                          className="relative"
                          onMouseEnter={() => setHoveredSkill(`${experience.id}-${skillIndex}`)}
                          onMouseLeave={() => setHoveredSkill(null)}
                        >
                          <img
                            src={skill.icon}
                            alt={skill.name}
                            className="w-8 h-8 transition-transform hover:scale-110"
                          />
                          {hoveredSkill === `${experience.id}-${skillIndex}` && (
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 
                                          bg-gray-900 px-3 py-1 rounded text-sm whitespace-nowrap">
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