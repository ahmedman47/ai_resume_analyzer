import React from "react";

type ScoreBadgeProps = {
    score: number;
};

// Renders a single <p> inside a styled badge <div> with dynamic color and label
const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
    const isStrong = score > 70;
    const isGood = !isStrong && score > 49;

    const containerClass = isStrong
        ? "bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 shadow-sm"
        : isGood
            ? "bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 shadow-sm"
            : "bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 shadow-sm";

    const textClass = isStrong
        ? "text-emerald-700 font-semibold"
        : isGood
            ? "text-amber-700 font-semibold"
            : "text-red-700 font-semibold";

    const iconClass = isStrong
        ? "text-emerald-500"
        : isGood
            ? "text-amber-500"
            : "text-red-500";

    const label = isStrong ? "Strong" : isGood ? "Good Start" : "Needs Work";

    const getIcon = () => {
        if (isStrong) {
            return (
                <svg className={`w-3 h-3 ${iconClass} mr-1.5`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
            );
        } else if (isGood) {
            return (
                <svg className={`w-3 h-3 ${iconClass} mr-1.5`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
            );
        } else {
            return (
                <svg className={`w-3 h-3 ${iconClass} mr-1.5`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
            );
        }
    };

    const pulseClass = isStrong
        ? "animate-pulse"
        : "";

    return (
        <div className={`
      group relative inline-flex items-center px-3 py-1.5 rounded-full transition-all duration-200 
      hover:scale-105 hover:shadow-md cursor-default
      ${containerClass}
    `}>
            {/* Background glow effect */}
            <div className={`
        absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-200 blur-sm
        ${isStrong ? 'bg-emerald-400' : isGood ? 'bg-amber-400' : 'bg-red-400'}
      `} />

            {/* Status dot with pulse animation for strong scores */}
            <div className={`
        relative w-2 h-2 rounded-full mr-2 transition-all duration-200
        ${isStrong ? 'bg-emerald-500 shadow-sm' : isGood ? 'bg-amber-500' : 'bg-red-500'}
        ${isStrong ? pulseClass : ''}
      `} />

            {/* Icon */}
            <div className="relative">
                {getIcon()}
            </div>

            {/* Label text */}
            <p className={`relative text-xs tracking-wide ${textClass}`}>
                {label}
            </p>

            {/* Score indicator */}
            <span className={`
        relative ml-2 px-1.5 py-0.5 text-xs font-bold rounded-md
        ${isStrong ? 'bg-emerald-100 text-emerald-800' :
                isGood ? 'bg-amber-100 text-amber-800' :
                    'bg-red-100 text-red-800'}
      `}>
        {score}
      </span>
        </div>
    );
};

export default ScoreBadge;