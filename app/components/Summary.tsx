import ScoreGauge from "~/components/ScoreGauge";
import ScoreBadge from "~/components/ScoreBadge";

const Category = ({title,score}: {title: string,score: number}) => {

    const textColor = score > 70 ? 'text-emerald-600'
        : score >= 50 ? 'text-amber-600' : 'text-red-600';

    const getBgGradient = (score: number) => {
        if (score > 70) return 'from-emerald-50 via-green-50 to-emerald-50';
        if (score >= 50) return 'from-amber-50 via-yellow-50 to-amber-50';
        return 'from-red-50 via-rose-50 to-red-50';
    };

    const getBorderColor = (score: number) => {
        if (score > 70) return 'border-emerald-100 hover:border-emerald-200';
        if (score >= 50) return 'border-amber-100 hover:border-amber-200';
        return 'border-red-100 hover:border-red-200';
    };

    const getIconColor = (score: number) => {
        if (score > 70) return 'text-emerald-500';
        if (score >= 50) return 'text-amber-500';
        return 'text-red-500';
    };

    const getCategoryIcon = (title: string) => {
        const iconClass = `w-6 h-6 ${getIconColor(score)}`;

        switch (title.toLowerCase()) {
            case 'tone & style':
                return (
                    <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                    </svg>
                );
            case 'content':
                return (
                    <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                );
            case 'structure':
                return (
                    <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-7H5m14 14H5" />
                    </svg>
                );
            case 'skills':
                return (
                    <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                );
            default:
                return (
                    <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
        }
    };

    return(
        <div className={`
            group relative p-6 mx-4 mb-4 rounded-xl border transition-all duration-300 ease-out
            bg-gradient-to-br ${getBgGradient(score)} ${getBorderColor(score)}
            hover:shadow-lg hover:scale-[1.02] overflow-hidden
        `}>
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-[0.02]" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='0.1'%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '20px 20px'
            }} />

            {/* Content */}
            <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    {/* Category Icon */}
                    <div className="flex-shrink-0 w-12 h-12 bg-white/60 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-200">
                        {getCategoryIcon(title)}
                    </div>

                    {/* Title and Badge */}
                    <div className="flex flex-col gap-2">
                        <h3 className="text-xl font-semibold text-gray-800 group-hover:text-gray-900 transition-colors duration-200">
                            {title}
                        </h3>
                        <ScoreBadge score={score} />
                    </div>
                </div>

                {/* Score Display */}
                <div className="flex items-center gap-3">
                    <div className="text-right">
                        <div className="text-sm text-gray-500 font-medium mb-1">Score</div>
                        <p className="text-2xl font-bold">
                            <span className={`${textColor} transition-colors duration-200`}>{score}</span>
                            <span className="text-gray-400 text-lg font-medium">/100</span>
                        </p>
                    </div>

                    {/* Progress Ring Mini */}
                    <div className="relative w-12 h-12">
                        <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                            <circle
                                cx="18"
                                cy="18"
                                r="16"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeDasharray="100, 100"
                                className="text-gray-200"
                            />
                            <circle
                                cx="18"
                                cy="18"
                                r="16"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeDasharray={`${score}, 100`}
                                strokeLinecap="round"
                                className={textColor}
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className={`text-xs font-bold ${textColor}`}>
                                {score}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Summary = ({feedback}: {feedback: Feedback}) => {
    return(
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 w-full overflow-hidden">
            {/* Header Section */}
            <div className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 border-b border-gray-100">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='0.1'%3E%3Ccircle cx='20' cy='20' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '40px 40px'
                }} />

                <div className="relative z-10 flex flex-row items-center p-8 gap-8">
                    {/* Score Gauge */}
                    <div className="flex-shrink-0">
                        <ScoreGauge score={feedback.overallScore}/>
                    </div>

                    {/* Header Content */}
                    <div className="flex-1 space-y-4">
                        <div>
                            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
                                Your Resume Score
                            </h2>
                            <p className="text-base text-gray-600 leading-relaxed max-w-2xl">
                                This comprehensive score analyzes your resume across multiple key areas.
                                Each category below contributes to your overall performance rating.
                            </p>
                        </div>

                        {/* Quick Stats */}
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2 px-3 py-2 bg-white/60 backdrop-blur-sm rounded-lg border border-white/40">
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                <span className="text-sm font-medium text-gray-700">Analysis Complete</span>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Updated just now</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories Section */}
            <div className="p-6 space-y-2">
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Category Breakdown</h3>
                    <p className="text-sm text-gray-500">Detailed analysis of each resume component</p>
                </div>

                <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
                <Category title="Content" score={feedback.content.score} />
                <Category title="Structure" score={feedback.structure.score} />
                <Category title="Skills" score={feedback.skills.score} />
            </div>
        </div>
    )
}

export default Summary;