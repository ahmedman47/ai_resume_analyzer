import React from "react";

export type AtsSuggestion = {
    type: "good" | "improve";
    tip: string;
};

type AtsProps = {
    score: number; // 0-100
    suggestions: AtsSuggestion[];
};

const getScoreLevel = (score: number) => {
    if (score > 69) return "good" as const;
    if (score > 49) return "warn" as const;
    return "bad" as const;
};

const Ats: React.FC<AtsProps> = ({ score, suggestions }) => {
    const level = getScoreLevel(score);

    const getScoreConfig = () => {
        switch (level) {
            case "good":
                return {
                    gradientClass: "from-emerald-50 via-green-50 to-white",
                    borderClass: "border-emerald-200/50",
                    iconBg: "bg-emerald-100",
                    iconColor: "text-emerald-600",
                    textColor: "text-emerald-800",
                    progressColor: "from-emerald-500 to-green-500",
                    badgeColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
                    icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    )
                };
            case "warn":
                return {
                    gradientClass: "from-amber-50 via-yellow-50 to-white",
                    borderClass: "border-amber-200/50",
                    iconBg: "bg-amber-100",
                    iconColor: "text-amber-600",
                    textColor: "text-amber-800",
                    progressColor: "from-amber-500 to-orange-500",
                    badgeColor: "bg-amber-100 text-amber-700 border-amber-200",
                    icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    )
                };
            default:
                return {
                    gradientClass: "from-red-50 via-rose-50 to-white",
                    borderClass: "border-red-200/50",
                    iconBg: "bg-red-100",
                    iconColor: "text-red-600",
                    textColor: "text-red-800",
                    progressColor: "from-red-500 to-rose-500",
                    badgeColor: "bg-red-100 text-red-700 border-red-200",
                    icon: (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    )
                };
        }
    };

    const config = getScoreConfig();

    const getSuggestionIcon = (type: AtsSuggestion["type"]) => {
        if (type === "good") {
            return (
                <div className="flex-shrink-0 w-5 h-5 bg-emerald-100 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            );
        } else {
            return (
                <div className="flex-shrink-0 w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
            );
        }
    };

    return (
        <div className={`relative group w-full rounded-3xl shadow-lg hover:shadow-xl border ${config.borderClass} bg-gradient-to-br ${config.gradientClass} transition-all duration-300 overflow-hidden`}>
            {/* Subtle glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>

            {/* Header Section */}
            <div className="relative p-8 pb-6">
                <div className="flex items-start gap-6">
                    {/* Icon */}
                    <div className={`flex-shrink-0 w-14 h-14 ${config.iconBg} rounded-2xl flex items-center justify-center shadow-sm ${config.iconColor}`}>
                        {config.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
                                ATS Compatibility
                            </h2>
                            <div className={`px-3 py-1 rounded-full text-sm font-medium border ${config.badgeColor}`}>
                                {level === 'good' ? 'Excellent' : level === 'warn' ? 'Good' : 'Needs Work'}
                            </div>
                        </div>

                        <p className="text-slate-600 text-base leading-relaxed">
                            Application Tracking System optimization score based on industry standards and keyword analysis.
                        </p>

                        {/* Score Display */}
                        <div className="flex items-center gap-4 mt-4">
                            <div className="text-4xl font-bold ${config.textColor}">{score}</div>
                            <div className="flex-1">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm font-medium text-slate-600">Score</span>
                                    <span className="text-sm text-slate-500">out of 100</span>
                                </div>
                                {/* Progress bar */}
                                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                                    <div
                                        className={`h-full bg-gradient-to-r ${config.progressColor} rounded-full transition-all duration-1000 ease-out shadow-sm`}
                                        style={{ width: `${Math.min(score, 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="mx-8 border-t border-slate-200/60"></div>

            {/* Analysis Section */}
            <div className="p-8 pt-6 space-y-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-slate-100 rounded-xl flex items-center justify-center">
                        <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-800">Detailed Analysis</h3>
                </div>

                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-sm">
                    <p className="text-slate-600 leading-relaxed mb-6">
                        Our AI has analyzed your resume against ATS requirements. Below are personalized recommendations to enhance your resume's visibility and improve your chances of passing automated screening filters.
                    </p>

                    {/* Suggestions */}
                    {suggestions.length > 0 ? (
                        <div className="space-y-4">
                            <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                                Optimization Recommendations
                            </h4>

                            <div className="space-y-3">
                                {suggestions.map((suggestion, idx) => (
                                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-white/40 hover:bg-white/60 transition-colors duration-200">
                                        {getSuggestionIcon(suggestion.type)}
                                        <span className="text-slate-700 text-sm leading-relaxed">{suggestion.tip}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-6">
                            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <p className="text-slate-500">No specific recommendations at this time.</p>
                        </div>
                    )}

                    {/* Call to Action */}
                    <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100/50">
                        <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-slate-800 mb-1">Pro Tip</p>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    Continuous optimization is key. Each improvement increases your chances of passing ATS filters and landing interviews. Focus on the highest-impact changes first.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ats;