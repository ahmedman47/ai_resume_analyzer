import React, {useEffect} from 'react'
import {usePuterStore} from "~/lib/puter";
import {useLocation, useNavigate} from "react-router";

export const meta : () => void = () => ([
    {title:'CareerCraft | Authentication'},
    {name: 'description', content: 'Secure access to your career optimization platform'},
])

const Auth: () => React.JSX.Element = () => {

    const { isLoading , auth} = usePuterStore();
    const location = useLocation();
    const next = location.search.split('next=')[1];
    const navigate = useNavigate();

    useEffect( () => {
        if(auth.isAuthenticated) navigate(next);
    } , [auth.isAuthenticated, next ])

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden flex items-center justify-center">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            {/* Floating decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-20 w-4 h-4 bg-blue-400/30 rounded-full animate-bounce delay-700"></div>
                <div className="absolute top-40 right-32 w-3 h-3 bg-purple-400/40 rounded-full animate-bounce delay-1000"></div>
                <div className="absolute bottom-32 left-40 w-5 h-5 bg-indigo-400/30 rounded-full animate-bounce delay-300"></div>
                <div className="absolute bottom-20 right-20 w-2 h-2 bg-cyan-400/50 rounded-full animate-bounce delay-500"></div>
            </div>

            {/* Main content */}
            <div className="relative z-10 w-full max-w-md mx-auto px-6">
                {/* Logo/Brand section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl mb-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
                        CareerCraft
                    </h1>
                    <p className="text-slate-500 text-sm">AI-Powered Career Optimization</p>
                </div>

                {/* Auth card */}
                <div className="relative group">
                    {/* Glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Main card */}
                    <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
                        {/* Header gradient */}
                        <div className="h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"></div>

                        <div className="p-10">
                            {/* Welcome section */}
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-full px-4 py-2 mb-6">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="text-sm font-medium text-slate-700">Secure Authentication</span>
                                </div>

                                <h2 className="text-2xl font-bold text-slate-800 mb-3">
                                    Welcome Back
                                </h2>
                                <p className="text-slate-600 leading-relaxed">
                                    Continue your journey to career success with AI-powered resume optimization
                                </p>
                            </div>

                            {/* Auth button */}
                            <div className="space-y-4">
                                {isLoading ? (
                                    <button className="w-full bg-gradient-to-r from-slate-300 to-slate-400 text-white font-semibold py-4 px-6 rounded-2xl cursor-not-allowed flex items-center justify-center gap-3 shadow-lg">
                                        <div className="relative">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        </div>
                                        <span>Signing you in...</span>
                                    </button>
                                ) : (
                                    <>
                                        {auth.isAuthenticated ? (
                                            <button
                                                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-red-500/25 transform hover:-translate-y-0.5 flex items-center justify-center gap-3 group"
                                                onClick={auth.signOut}
                                            >
                                                <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                </svg>
                                                <span>Sign Out</span>
                                            </button>
                                        ) : (
                                            <button
                                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transform hover:-translate-y-0.5 flex items-center justify-center gap-3 group"
                                                onClick={auth.signIn}
                                            >
                                                <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                </svg>
                                                <span>Continue with Account</span>
                                                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                </svg>
                                            </button>
                                        )}
                                    </>
                                )}
                            </div>

                            {/* Security notice */}
                            <div className="mt-8 pt-6 border-t border-slate-100">
                                <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    <span>Your data is encrypted and secure</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-8 space-y-2">
                    <p className="text-sm text-slate-500">
                        Transform your career with intelligent insights
                    </p>
                    <div className="flex items-center justify-center gap-4 text-xs text-slate-400">
                        <span>Privacy Policy</span>
                        <span>•</span>
                        <span>Terms of Service</span>
                        <span>•</span>
                        <span>Support</span>
                    </div>
                </div>
            </div>
        </main>
    )
}
export default Auth;