import React, { useState } from "react";
import { useEffect } from "react";
import api from "../api/api";
import { makeMediaUrl } from "../utils/media";

const Experience = () => {
    const [experiences, setExperiences] = useState([]);
    const [hoveredSkill, setHoveredSkill] = useState(null);

    useEffect(() => {
        api.get("experience/")
            .then((response) => {
                const sorted = response.data.sort(
                    (a, b) => new Date(b.start_date) - new Date(a.start_date)
                );
                setExperiences(sorted);
            })
            .catch((error) => console.error("Error fetching experiences:", error));
    }, []);

    const formatDateRange = (startDate, endDate) => {
        const start = new Date(startDate)
            .toLocaleDateString("en-US", { month: "short", year: "numeric" })
            .replace(",", "");
        const end = endDate
            ? new Date(endDate)
                  .toLocaleDateString("en-US", { month: "short", year: "numeric" })
                  .replace(",", "")
            : "Present";
        return `${start} - ${end}`;
    };

    return (
        <div
            className="w-full text-white py-32"
            style={{ background: "linear-gradient(to bottom, #1a202c, #2e3a50)" }}
        >
            {/* Section Title */}
            <h1
                className="text-5xl text-[#32a8ff] font-audiowide text-center mb-24"
                style={{ textShadow: "0px 4px 6px rgba(50, 168, 255, 0.5)" }}
            >
                Experience
            </h1>

            {/* Vertical Timeline */}
            <div className="relative max-w-6xl mx-auto px-8">

                {/* Center vertical line */}
                <div
                    className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
                    style={{ background: "linear-gradient(to bottom, #32a8ff88, #32a8ff, #32a8ff88)" }}
                />

                <div className="flex flex-col gap-16">
                    {experiences.map((experience, index) => {
                        const isLeft = index % 2 === 0;
                        return (
                            <div key={experience.id} className="relative flex items-center">

                                {/* Left side */}
                                <div className="w-1/2 pr-12 flex justify-end">
                                    {isLeft ? (
                                        <div className="group w-full max-w-xl">
                                            <ExperienceCard
                                                experience={experience}
                                                formatDateRange={formatDateRange}
                                                hoveredSkill={hoveredSkill}
                                                setHoveredSkill={setHoveredSkill}
                                                align="right"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-end gap-1 py-4">
                                            <span className="font-audiowide text-sm text-[#32a8ff]">
                                                {formatDateRange(experience.start_date, experience.end_date)}
                                            </span>
                                            <span className="font-audiowide text-xs text-gray-500">
                                                {experience.company}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Center dot + logo */}
                                <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
                                    <div
                                        className="w-16 h-16 rounded-full border-2 border-blue-400 bg-gray-800 overflow-hidden shadow-lg"
                                        style={{ boxShadow: "0 0 12px rgba(50, 168, 255, 0.3)" }}
                                    >
                                        <img
                                            src={makeMediaUrl(experience.image)}
                                            alt={experience.company}
                                            className="w-full h-full object-contain p-1.5"
                                        />
                                    </div>
                                </div>

                                {/* Right side */}
                                <div className="w-1/2 pl-12 flex justify-start">
                                    {!isLeft ? (
                                        <div className="group w-full max-w-xl">
                                            <ExperienceCard
                                                experience={experience}
                                                formatDateRange={formatDateRange}
                                                hoveredSkill={hoveredSkill}
                                                setHoveredSkill={setHoveredSkill}
                                                align="left"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-start gap-1 py-4">
                                            <span className="font-audiowide text-sm text-[#32a8ff]">
                                                {formatDateRange(experience.start_date, experience.end_date)}
                                            </span>
                                            <span className="font-audiowide text-xs text-gray-500">
                                                {experience.company}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const ExperienceCard = ({ experience, formatDateRange, hoveredSkill, setHoveredSkill, align }) => {
    return (
        <div
            className="relative rounded-lg p-6 flex flex-col gap-4 transition-all duration-300 hover:shadow-blue-900/40 hover:shadow-xl"
            style={{
                backgroundColor: "#111827",
                border: "1px solid rgba(50, 168, 255, 0.15)",
            }}
        >
            {/* Watermark */}
            <div className="absolute inset-0 opacity-5 pointer-events-none rounded-lg overflow-hidden">
                <img
                    src={makeMediaUrl(experience.image)}
                    alt=""
                    className="w-full h-full object-contain"
                />
            </div>

            <div className="relative z-10 flex flex-col gap-3">
                {/* Title */}
                <h2
                    className="text-xl font-audiowide text-[#32a8ff]"
                    style={{ textShadow: "0px 4px 6px rgba(50, 168, 255, 0.4)" }}
                >
                    {experience.title}
                </h2>

                {/* Company + dates */}
                <p className="font-audiowide text-xs text-gray-400">
                    {experience.company} &middot;{" "}
                    {formatDateRange(experience.start_date, experience.end_date)}
                </p>

                {/* Lead */}
                {experience.lead && (
                    <p className="font-azeret_mono text-sm text-gray-300 leading-relaxed">
                        {experience.lead}
                    </p>
                )}

                {/* Bullets */}
                {experience.bullets_list && experience.bullets_list.length > 0 && (
                    <ul className="flex flex-col gap-2">
                        {experience.bullets_list.map((bullet, i) => (
                            <li
                                key={i}
                                className="font-azeret_mono text-xs text-gray-400 leading-relaxed flex gap-2"
                            >
                                <span className="text-[#32a8ff] mt-0.5 shrink-0">▸</span>
                                <span>{bullet}</span>
                            </li>
                        ))}
                    </ul>
                )}

                {/* Skills */}
                {experience.skills && experience.skills.length > 0 && (
                    <div className="flex flex-wrap gap-3 pt-1">
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
                                    src={makeMediaUrl(skill.icon)}
                                    alt={skill.name}
                                    className="w-7 h-7 transition-transform hover:scale-110"
                                />
                                {hoveredSkill === `${experience.id}-${skillIndex}` && (
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 px-3 py-1 rounded text-xs whitespace-nowrap z-10 border border-gray-700">
                                        {skill.name}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Experience;