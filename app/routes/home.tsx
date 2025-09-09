import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import ResumeCard from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {Link, useNavigate} from "react-router";
import {useEffect, useState} from "react";
import resume from "~/routes/resume";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "CareerCraft" },
        { name: "description", content: "AI-powered resume optimization for your dream career!" },
    ];
}

export default function Home() {

    const {auth,kv} = usePuterStore();
    const navigate = useNavigate();
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [loadingResumes, setLoadingResumes] = useState(false);

    useEffect( () => {
        if(!auth.isAuthenticated) navigate('/auth?next=/');
    } , [auth.isAuthenticated])

    useEffect(() => {
        const loadResumes = async () => {
            try {
                setLoadingResumes(true);
                const list = (await kv.list('resume:*', true)) as KVItem[];
                const parsedResumes = list?.map((item) => (
                    JSON.parse(item.value) as Resume
                ));
                setResumes(parsedResumes || []);
            } catch (e) {
                console.error('Failed to load resumes', e);
                setResumes([]);
            } finally {
                setLoadingResumes(false);
            }
        };
        // trigger initial load and also when auth state becomes authenticated
        if (auth.isAuthenticated) {
            loadResumes();
        }
    }, [auth.isAuthenticated, kv]);

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            <Navbar />

            <section className="relative z-10 container mx-auto px-6 py-12">
                {/* Hero Section */}
                <div className="text-center mb-16 max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-full px-6 py-2 mb-8 shadow-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-slate-700">AI-Powered Resume Analysis</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent leading-tight mb-6">
                        Track Your Applications &
                        <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Resume Performance
                        </span>
                    </h1>

                    {!loadingResumes && resumes?.length === 0 ? (
                        <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                            Ready to elevate your career? Upload your first resume and get instant AI-powered insights to land your dream job.
                        </p>
                    ) : (
                        <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                            Monitor your career journey with intelligent feedback and optimization recommendations.
                        </p>
                    )}
                </div>

                {/* Loading State */}
                {loadingResumes && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-purple-600 rounded-full animate-spin animate-reverse"></div>
                        </div>
                        <p className="mt-6 text-slate-600 font-medium">Loading your resumes...</p>
                    </div>
                )}

                {/* Empty State */}
                {!loadingResumes && resumes.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-16">
                        <div className="relative mb-12">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-3xl blur-2xl"></div>
                            <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-2xl">
                                <img
                                    src="/images/resume-scan-2.gif"
                                    className="w-48 h-48 object-contain mx-auto rounded-2xl"
                                    alt="Resume scanning animation"
                                />
                            </div>
                        </div>

                        <div className="text-center mb-12">
                            <h3 className="text-2xl font-bold text-slate-800 mb-4">Your Career Journey Starts Here</h3>
                            <p className="text-slate-600 max-w-md mx-auto leading-relaxed">
                                Upload your resume and discover how AI can transform your job application success rate.
                            </p>
                        </div>

                        <Link
                            to="/upload"
                            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg px-10 py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transform hover:-translate-y-1"
                        >
                            <span className="relative z-10">Upload Your First Resume</span>
                            <svg className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                            </svg>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                        </Link>
                    </div>
                )}

                {/* Resumes Grid */}
                {!loadingResumes && resumes.length > 0 && (
                    <div className="space-y-8">
                        {/* Stats Overview */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-slate-800">{resumes.length}</p>
                                        <p className="text-slate-600">Total Resumes</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-slate-800">AI</p>
                                        <p className="text-slate-600">Powered Analysis</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-slate-800">Smart</p>
                                        <p className="text-slate-600">Optimization</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Resumes List */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-slate-800">Your Resumes</h2>
                                <Link
                                    to="/upload"
                                    className="inline-flex items-center gap-2 bg-white/80 hover:bg-white text-slate-700 hover:text-slate-900 font-medium px-6 py-3 rounded-xl border border-slate-200 hover:border-slate-300 transition-all duration-300 shadow-sm hover:shadow-md"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                    Add New Resume
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                {resumes.map((resume) => (
                                    <div key={resume.id} className="transform hover:scale-105 transition-all duration-300">
                                        <ResumeCard resume={resume} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </main>
    );
}