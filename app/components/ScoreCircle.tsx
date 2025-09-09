const ScoreCircle = ({ score = 75 }: { score: number }) => {
    const radius = 40;
    const stroke = 8;
    const normalizedRadius = radius - stroke / 2;
    const circumference = 2 * Math.PI * normalizedRadius;
    const progress = score / 100;
    const strokeDashoffset = circumference * (1 - progress);

    // Determine colors and labels based on score
    const getScoreConfig = (score: number) => {
        if (score >= 85) {
            return {
                gradient: "gradientExcellent",
                colors: { start: "#10B981", end: "#059669" }, // Emerald
                bgColor: "bg-emerald-50",
                textColor: "text-emerald-700",
                label: "Excellent",
                pulseColor: "bg-emerald-400"
            };
        } else if (score >= 70) {
            return {
                gradient: "gradientGood",
                colors: { start: "#3B82F6", end: "#1D4ED8" }, // Blue
                bgColor: "bg-blue-50",
                textColor: "text-blue-700",
                label: "Good",
                pulseColor: "bg-blue-400"
            };
        } else if (score >= 50) {
            return {
                gradient: "gradientFair",
                colors: { start: "#F59E0B", end: "#D97706" }, // Amber
                bgColor: "bg-amber-50",
                textColor: "text-amber-700",
                label: "Fair",
                pulseColor: "bg-amber-400"
            };
        } else {
            return {
                gradient: "gradientPoor",
                colors: { start: "#EF4444", end: "#DC2626" }, // Red
                bgColor: "bg-red-50",
                textColor: "text-red-700",
                label: "Needs Work",
                pulseColor: "bg-red-400"
            };
        }
    };

    const config = getScoreConfig(score);

    return (
        <div className="group relative">
            {/* Animated background glow */}
            <div className={`
                absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-all duration-500 blur-xl scale-110
                ${config.pulseColor}
            `} />

            <div className={`
                relative w-[100px] h-[100px] rounded-full transition-all duration-300 ease-out
                ${config.bgColor} group-hover:scale-110 group-hover:shadow-lg
                border-2 border-white shadow-sm group-hover:shadow-xl
            `}>
                {/* Animated pulse rings */}
                {score >= 85 && (
                    <>
                        <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping" />
                        <div className="absolute inset-2 rounded-full bg-emerald-400/10 animate-pulse" />
                    </>
                )}

                <svg
                    height="100%"
                    width="100%"
                    viewBox="0 0 100 100"
                    className="transform -rotate-90 relative z-10"
                >
                    {/* Background circle with subtle pattern */}
                    <circle
                        cx="50"
                        cy="50"
                        r={normalizedRadius}
                        stroke="#f3f4f6"
                        strokeWidth={stroke}
                        fill="transparent"
                        className="drop-shadow-sm"
                    />

                    {/* Progress circle with dynamic gradient */}
                    <defs>
                        <linearGradient id={config.gradient} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor={config.colors.start} />
                            <stop offset="100%" stopColor={config.colors.end} />
                        </linearGradient>

                        {/* Shimmer effect */}
                        <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                            <stop offset="50%" stopColor="rgba(255,255,255,0.3)" />
                            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                        </linearGradient>
                    </defs>

                    <circle
                        cx="50"
                        cy="50"
                        r={normalizedRadius}
                        stroke={`url(#${config.gradient})`}
                        strokeWidth={stroke}
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="drop-shadow-sm transition-all duration-1000 ease-out filter"
                        style={{
                            animation: 'scoreProgress 2s ease-out',
                        }}
                    />

                    {/* Shimmer overlay on progress */}
                    <circle
                        cx="50"
                        cy="50"
                        r={normalizedRadius}
                        stroke="url(#shimmer)"
                        strokeWidth={stroke * 0.5}
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                </svg>

                {/* Score content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                    <div className="text-center space-y-0.5">
                        <div className={`font-bold text-lg leading-tight ${config.textColor}`}>
                            {score}
                        </div>
                        <div className="text-xs text-gray-500 font-medium">
                            / 100
                        </div>
                    </div>

                    {/* Status label */}
                    <div className={`
                        absolute -bottom-6 left-1/2 transform -translate-x-1/2 
                        px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap
                        opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0
                        ${config.bgColor} ${config.textColor} border border-current/20
                    `}>
                        {config.label}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes scoreProgress {
                    from {
                        stroke-dashoffset: ${circumference};
                    }
                    to {
                        stroke-dashoffset: ${strokeDashoffset};
                    }
                }
            `}</style>
        </div>
    );
};

export default ScoreCircle;