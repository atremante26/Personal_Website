import React, { useState, useEffect } from "react";
import api from "../api/api";

const STATUS_LABELS = {
    published: "Published",
    under_review: "Under Review",
    in_preparation: "In Preparation",
};

const STATUS_COLORS = {
    published: "text-green-400 border-green-400",
    under_review: "text-yellow-400 border-yellow-400",
    in_preparation: "text-gray-400 border-gray-400",
};

const Publications = () => {
    const [publications, setPublications] = useState([]);

    useEffect(() => {
        api.get("publication/")
            .then((response) => setPublications(response.data))
            .catch((error) => console.error("Error fetching publications:", error));
    }, []);

    // Group by status for display ordering
    const published = publications.filter((p) => p.status === "published");
    const underReview = publications.filter((p) => p.status === "under_review");
    const inPrep = publications.filter((p) => p.status === "in_preparation");
    const grouped = [
        { label: "Published", items: published },
        { label: "Under Review", items: underReview },
        { label: "In Preparation", items: inPrep },
    ].filter((g) => g.items.length > 0);

    return (
        <div
            className="min-h-screen flex flex-col items-center pt-32 pb-20 px-10"
            style={{
                background: "linear-gradient(to bottom, #2d3748, #1a202c)",
            }}
        >
            {/* Section Title */}
            <h1
                className="text-5xl font-audiowide text-[#32a8ff] mb-16"
                style={{ textShadow: "0px 4px 6px rgba(50, 168, 255, 0.4)" }}
            >
                Publications
            </h1>

            <div className="w-full max-w-5xl flex flex-col gap-16">
                {grouped.map((group) => (
                    <div key={group.label}>
                        {/* Group heading */}
                        <h2 className="font-audiowide text-xl text-gray-400 mb-6 uppercase tracking-widest border-b border-gray-700 pb-3">
                            {group.label}
                        </h2>

                        <div className="flex flex-col gap-6">
                            {group.items.map((pub) => (
                                <div
                                    key={pub.id}
                                    className="bg-gray-800 rounded-lg p-6 flex flex-col gap-3 shadow-lg hover:shadow-blue-900/30 transition-shadow duration-300"
                                >
                                    {/* Title + link */}
                                    <div className="flex items-start justify-between gap-4">
                                        <h3 className="font-audiowide text-lg text-white leading-snug">
                                            {pub.url ? (
                                                <a
                                                    href={pub.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="hover:text-[#32a8ff] transition-colors duration-200"
                                                >
                                                    {pub.title}
                                                </a>
                                            ) : (
                                                pub.title
                                            )}
                                        </h3>
                                        <span
                                            className={`font-azeret_mono text-xs border rounded-full px-3 py-1 whitespace-nowrap ${STATUS_COLORS[pub.status]}`}
                                        >
                                            {STATUS_LABELS[pub.status]}
                                        </span>
                                    </div>

                                    {/* Authors */}
                                    <p className="font-azeret_mono text-sm text-gray-400">
                                        {pub.authors}
                                    </p>

                                    {/* Venue + Year */}
                                    <p
                                        className="font-audiowide text-sm text-[#32a8ff]"
                                        style={{ textShadow: "0px 2px 4px rgba(50, 168, 255, 0.3)" }}
                                    >
                                        {pub.venue} &middot; {pub.year}
                                    </p>

                                    {/* Description (optional) */}
                                    {pub.description && (
                                        <p className="font-azeret_mono text-sm text-gray-400 leading-relaxed">
                                            {pub.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {publications.length === 0 && (
                    <p className="font-azeret_mono text-gray-500 text-center">
                        Loading publications...
                    </p>
                )}
            </div>
        </div>
    );
};

export default Publications;