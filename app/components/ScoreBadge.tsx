import React from "react";

type ScoreBadgeProps = {
  score: number;
};

// Renders a single <p> inside a styled badge <div> with dynamic color and label
const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  const isStrong = score > 70;
  const isGood = !isStrong && score > 49;

  const containerClass = isStrong
    ? "bg-badge-green/10 border border-badge-green/30"
    : isGood
    ? "bg-badge-yellow/10 border border-badge-yellow/30"
    : "bg-badge-red/10 border border-badge-red/30";

  const textClass = isStrong
    ? "text-green-600"
    : isGood
    ? "text-yellow-600"
    : "text-red-600";

  const label = isStrong ? "Strong" : isGood ? "Good Start" : "Needs Work";

  return (
    <div className={`inline-flex items-center px-2 py-0.5 rounded-full ${containerClass}`}>
      <p className={`text-xs font-medium ${textClass}`}>{label}</p>
    </div>
  );
};

export default ScoreBadge;
