import {type JSX, useEffect, useState} from "react";
import { Link } from "react-router";
import ScoreCircle from "~/components/ScoreCircle";
import resume from "~/routes/resume";
import {usePuterStore} from "~/lib/puter";

const ResumeCard = ({ resume:{id,companyName,jobTitle,feedback,imagePath
} }: { resume: Resume }): JSX.Element => {

    const {fs} = usePuterStore();
    const [resumUrl, setResumeUrl] = useState('');

    useEffect(() => {
        const loadResume = async () => {
            const blob = await fs.read(imagePath);
            if(!blob) return;
            let url = URL.createObjectURL(blob);
            setResumeUrl(url);
        }
        loadResume();
    }, [imagePath]);

    return (
        <Link
            to={`/resume/${id}`}
            className="group block w-full bg-white rounded-2xl border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 ease-out hover:scale-[1.02] overflow-hidden"
        >
            {/* Card Header */}
            <div className="p-6 pb-4 flex items-start justify-between">
                <div className="flex-1 min-w-0 space-y-1">
                    {companyName && (
                        <h2 className="text-xl font-bold text-gray-900 break-words group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                            {companyName}
                        </h2>
                    )}
                    {jobTitle && (
                        <h3 className="text-base font-medium text-gray-600 break-words line-clamp-2 group-hover:text-gray-700 transition-colors duration-200">
                            {jobTitle}
                        </h3>
                    )}
                    {!companyName && !jobTitle && (
                        <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                            Resume
                        </h2>
                    )}

                    {/* Status Badge */}
                    <div className="pt-2">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200">
                            <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5 animate-pulse"></div>
                            Ready for Review
                        </span>
                    </div>
                </div>

                {/* Score Circle with enhanced styling */}
                <div className="flex-shrink-0 ml-4">
                    <div className="relative group-hover:scale-110 transition-transform duration-200">
                        <ScoreCircle score={typeof feedback === 'object' && feedback ? feedback.overallScore ?? 0 : 0} />
                        <div className="absolute inset-0 bg-blue-400/20 rounded-full scale-0 group-hover:scale-150 transition-transform duration-300 -z-10"></div>
                    </div>
                </div>
            </div>

            {/* Resume Preview */}
            {resumUrl && (
                <div className="px-6 pb-6">
                    <div className="relative rounded-xl overflow-hidden border border-gray-100 group-hover:border-gray-200 transition-colors duration-200 bg-gradient-to-br from-gray-50 to-white">
                        {/* Loading shimmer overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 z-10"></div>

                        <img
                            src={resumUrl}
                            alt="resume preview"
                            className="w-full h-[280px] max-sm:h-[180px] object-cover object-top group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                        />

                        {/* Gradient overlay for better text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        {/* View overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-200 flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-200 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Bottom border gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Link>
    );
};

export default ResumeCard;