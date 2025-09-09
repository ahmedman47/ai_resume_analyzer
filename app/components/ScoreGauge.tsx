import { useEffect, useRef, useState } from "react";

const ScoreGauge = ({ score = 75 }: { score: number }) => {
    const [pathLength, setPathLength] = useState(0);
    const pathRef = useRef<SVGPathElement>(null);
    const [animationTriggered, setAnimationTriggered] = useState(false);

    const percentage = score / 100;

    // Determine score tier and styling
    const getScoreConfig = (score: number) => {
        if (score >= 85) {
            return {
                gradient: "gaugeExcellent",
                colors: { start: "#10B981", end: "#34D399" }, // Emerald
                glowColor: "shadow-emerald-500/25",
                label: "Excellent",
                bgGradient: "from-emerald-50 to-green-50",
                textColor: "text-emerald-700",
                accentColor: "bg-emerald-500"
            };
        } else if (score >= 70) {
            return {
                gradient: "gaugeGood",
                colors: { start: "#3B82F6", end: "#60A5FA" }, // Blue
                glowColor: "shadow-blue-500/25",
                label: "Good",
                bgGradient: "from-blue-50 to-indigo-50",
                textColor: "text-blue-700",
                accentColor: "bg-blue-500"
            };
        } else if (score >= 50) {
            return {
                gradient: "gaugeFair",
                colors: { start: "#F59E0B", end: "#FBBF24" }, // Amber
                glowColor: "shadow-amber-500/25",
                label: "Fair",
                bgGradient: "from-amber-50 to-yellow-50",
                textColor: "text-amber-700",
                accentColor: "bg-amber-500"
            };
        } else {
            return {
                gradient: "gaugePoor",
                colors: { start: "#EF4444", end: "#F87171" }, // Red
                glowColor: "shadow-red-500/25",
                label: "Needs Work",
                bgGradient: "from-red-50 to-rose-50",
                textColor: "text-red-700",
                accentColor: "bg-red-500"
            };
        }
    };

    const config = getScoreConfig(score);

    useEffect(() => {
        if (pathRef.current) {
            setPathLength(pathRef.current.getTotalLength());
            // Trigger animation after path length is set
            setTimeout(() => setAnimationTriggered(true), 100);
        }
    }, []);

    return (
        <div className="flex flex-col items-center group">
            <div className={`
                relative w-48 h-24 rounded-t-full transition-all duration-500 ease-out
                bg-gradient-to-br ${config.bgGradient} p-4 shadow-lg group-hover:shadow-xl ${config.glowColor}
                border border-white/50 group-hover:scale-105
            `}>
                {/* Background glow effect */}
                <div className={`
                    absolute inset-0 rounded-t-full opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl
                    ${config.accentColor}
                `} />

                <svg viewBox="0 0 100 50" className="w-full h-full relative z-10">
                    <defs>
                        <linearGradient
                            id={config.gradient}
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                        >
                            <stop offset="0%" stopColor={config.colors.start} />
                            <stop offset="50%" stopColor={config.colors.end} />
                            <stop offset="100%" stopColor={config.colors.start} />
                        </linearGradient>

                        {/* Shimmer gradient */}
                        <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                            <stop offset="50%" stopColor="rgba(255,255,255,0.4)" />
                            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                        </linearGradient>

                        {/* Glowing filter */}
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                            <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Background arc with subtle pattern */}
                    <path
                        d="M10,50 A40,40 0 0,1 90,50"
                        fill="none"
                        stroke="#f1f5f9"
                        strokeWidth="8"
                        strokeLinecap="round"
                        className="drop-shadow-sm"
                    />

                    {/* Tick marks */}
                    {[0, 25, 50, 75, 100].map((tick, index) => {
                        const angle = (tick / 100) * Math.PI - Math.PI;
                        const x1 = 50 + 35 * Math.cos(angle);
                        const y1 = 50 + 35 * Math.sin(angle);
                        const x2 = 50 + 40 * Math.cos(angle);
                        const y2 = 50 + 40 * Math.sin(angle);

                        return (
                            <line
                                key={tick}
                                x1={x1}
                                y1={y1}
                                x2={x2}
                                y2={y2}
                                stroke="#cbd5e1"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                className="opacity-60"
                            />
                        );
                    })}

                    {/* Progress arc with animation */}
                    <path
                        ref={pathRef}
                        d="M10,50 A40,40 0 0,1 90,50"
                        fill="none"
                        stroke={`url(#${config.gradient})`}
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={pathLength}
                        strokeDashoffset={animationTriggered ? pathLength * (1 - percentage) : pathLength}
                        filter="url(#glow)"
                        className="transition-all duration-2000 ease-out drop-shadow-lg"
                    />

                    {/* Shimmer effect overlay */}
                    <path
                        d="M10,50 A40,40 0 0,1 90,50"
                        fill="none"
                        stroke="url(#shimmer)"
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeDasharray={pathLength}
                        strokeDashoffset={animationTriggered ? pathLength * (1 - percentage) : pathLength}
                        className="opacity-0 group-hover:opacity-100 transition-all duration-2000 ease-out"
                    />

                    {/* Score indicator dot */}
                    {animationTriggered && (
                        <circle
                            cx={50 + 40 * Math.cos((percentage * Math.PI) - Math.PI)}
                            cy={50 + 40 * Math.sin((percentage * Math.PI) - Math.PI)}
                            r="4"
                            fill={config.colors.start}
                            stroke="white"
                            strokeWidth="2"
                            className="animate-pulse drop-shadow-lg"
                        />
                    )}
                </svg>

                {/* Score display */}
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-2 z-20">
                    <div className="text-center space-y-1">
                        <div className={`text-2xl font-bold ${config.textColor} transition-all duration-300 group-hover:scale-110`}>
                            {score}
                        </div>
                        <div className="text-xs text-gray-500 font-medium">
                            out of 100
                        </div>
                    </div>
                </div>

                {/* Performance label */}
                <div className={`
                    absolute -bottom-8 left-1/2 transform -translate-x-1/2 
                    px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap
                    opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0
                    bg-white shadow-lg border ${config.textColor}
                `}>
                    {config.label}
                </div>

                {/* Percentage indicators */}
                <div className="absolute top-1 left-2 text-xs text-gray-400 font-medium">0</div>
                <div className="absolute top-1 right-2 text-xs text-gray-400 font-medium">100</div>
            </div>
        </div>
    );
};

export default ScoreGauge;