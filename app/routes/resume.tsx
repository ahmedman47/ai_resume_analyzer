import {Link, useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import {usePuterStore} from "~/lib/puter";
import Summary from "~/components/Summary";
import Details from "~/components/Details";
import ATS from "~/components/ATS";

export const meta : () => void = () => ([
    {title:'CareerCraft | Resume Analysis'},
    {name: 'description', content: 'Comprehensive AI-powered resume analysis and optimization insights'},
])

const Resume = () => {

    const {auth, isLoading ,fs, kv} = usePuterStore();

    const { id } = useParams();

    const [imageUrl, setImageUrl] = useState('');
    const [resumeUrl, setResumeUrl] = useState('');
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const [isLoadingResume, setIsLoadingResume] = useState(true);
    const navigate = useNavigate();

    useEffect( () => {
        if(!isLoading && !auth.isAuthenticated) navigate(`/auth?next=/resume/${id}`);
    } , [isLoading])

    useEffect(() => {
        const loadResume = async () => {
            try {
                setIsLoadingResume(true);
                const resume = await kv.get(`resume:${id}`);
                if(!resume) return;

                const data = JSON.parse(resume);
                const resumeBlob = await fs.read(data.resumePath);
                if(!resumeBlob) return;

                const pdfBlob = new Blob([resumeBlob], {type: 'application/pdf'});
                const resumeUrl = URL.createObjectURL(pdfBlob);
                setResumeUrl(resumeUrl);

                const imageBlob = await fs.read(data.imagePath);
                if(!imageBlob) return;
                const imageUrl = URL.createObjectURL(imageBlob);
                setImageUrl(imageUrl);

                setFeedback(data.feedback);
                console.log({resumeUrl,imageUrl,feedback:data.feedback});
            } catch (error) {
                console.error('Error loading resume:', error);
            } finally {
                setIsLoadingResume(false);
            }
        }
        loadResume();
    }, [id]);

    return(
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-tr from-indigo-400/10 to-cyan-400/10 rounded-full blur-3xl"></div>
            </div>

            {/* Navigation */}
            <nav className="relative z-10 bg-white/80 backdrop-blur-sm border-b border-white/50 sticky top-0">
                <div className="container mx-auto px-6 py-4">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-3 text-slate-700 hover:text-slate-900 font-medium transition-all duration-300 group"
                    >
                        <div className="w-8 h-8 bg-white rounded-lg shadow-sm border border-slate-200 flex items-center justify-center group-hover:shadow-md group-hover:border-slate-300 transition-all duration-300">
                            <svg className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </div>
                        <span className="text-sm font-semibold">Back to Dashboard</span>
                    </Link>
                </div>
            </nav>

            <div className="relative z-10 flex flex-row w-full max-lg:flex-col-reverse">
                {/* Resume Preview Section */}
                <section className="w-1/2 max-lg:w-full bg-gradient-to-br from-white/90 to-slate-50/90 backdrop-blur-sm border-r border-white/50 max-lg:border-r-0 max-lg:border-t sticky top-[73px] h-[calc(100vh-73px)] max-lg:relative max-lg:h-auto max-lg:min-h-[400px]">
                    <div className="h-full flex items-center justify-center p-8">
                        {isLoadingResume ? (
                            <div className="flex flex-col items-center justify-center space-y-6">
                                <div className="relative">
                                    <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                                    <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-purple-600 rounded-full animate-spin animate-reverse"></div>
                                </div>
                                <p className="text-slate-600 font-medium animate-pulse">Loading your resume...</p>
                            </div>
                        ) : imageUrl && resumeUrl ? (
                            <div className="relative group max-w-full max-h-full">
                                {/* Glow effect */}
                                <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                {/* Main container */}
                                <div className="relative bg-white rounded-2xl shadow-2xl border border-white/50 overflow-hidden transform group-hover:scale-[1.02] transition-all duration-500">
                                    <a
                                        href={resumeUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block relative overflow-hidden group/image"
                                    >
                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 z-10"></div>

                                        {/* Open icon */}
                                        <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover/image:opacity-100 transform translate-y-2 group-hover/image:translate-y-0 transition-all duration-300">
                                            <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </div>

                                        <img
                                            src={imageUrl}
                                            className="w-full h-full object-contain max-h-[80vh] group-hover/image:scale-105 transition-transform duration-500"
                                            alt="Resume preview"
                                        />
                                    </a>
                                </div>

                                {/* Caption */}
                                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 border border-white/50 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <p className="text-sm text-slate-600 font-medium whitespace-nowrap">Click to open full PDF</p>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center space-y-4">
                                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                </div>
                                <p className="text-slate-600">Resume preview unavailable</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Feedback Section */}
                <section className="w-1/2 max-lg:w-full bg-white/50 backdrop-blur-sm overflow-y-auto max-h-[calc(100vh-73px)] max-lg:max-h-none">
                    <div className="p-8 space-y-8">
                        {/* Header */}
                        <div className="text-center max-lg:text-left">
                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full px-4 py-2 text-sm font-medium mb-4">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                                AI Analysis Complete
                            </div>
                            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
                                Resume Analysis
                            </h1>
                            <p className="text-slate-600 text-lg">Comprehensive insights to boost your career prospects</p>
                        </div>

                        {/* Content */}
                        {isLoadingResume ? (
                            <div className="space-y-6">
                                {/* Loading skeleton */}
                                <div className="animate-pulse space-y-6">
                                    <div className="bg-white/80 rounded-2xl p-6 space-y-4">
                                        <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                                        <div className="space-y-2">
                                            <div className="h-3 bg-slate-200 rounded"></div>
                                            <div className="h-3 bg-slate-200 rounded w-5/6"></div>
                                            <div className="h-3 bg-slate-200 rounded w-4/6"></div>
                                        </div>
                                    </div>
                                    <div className="bg-white/80 rounded-2xl p-6 space-y-4">
                                        <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                                        <div className="space-y-2">
                                            <div className="h-3 bg-slate-200 rounded"></div>
                                            <div className="h-3 bg-slate-200 rounded w-3/4"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : feedback ? (
                            <div className="space-y-8 animate-in fade-in duration-1000">
                                <div className="transform hover:scale-[1.01] transition-all duration-300">
                                    <Summary feedback={feedback}/>
                                </div>
                                <div className="transform hover:scale-[1.01] transition-all duration-300">
                                    <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
                                </div>
                                <div className="transform hover:scale-[1.01] transition-all duration-300">
                                    <Details feedback={feedback}/>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="relative inline-block">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl blur-2xl"></div>
                                    <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-white/50">
                                        <img
                                            src="/images/resume-scan-2.gif"
                                            className="w-80 h-80 object-contain mx-auto rounded-xl"
                                            alt="Analyzing resume"
                                        />
                                    </div>
                                </div>
                                <div className="mt-8 space-y-2">
                                    <h3 className="text-xl font-semibold text-slate-800">Analyzing Your Resume</h3>
                                    <p className="text-slate-600">Our AI is processing your document to provide detailed insights...</p>
                                </div>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </main>
    )
}
export default Resume;