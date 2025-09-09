import {type FormEvent, useState} from "react";
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";
import {usePuterStore} from "~/lib/puter";
import {useNavigate} from "react-router";
import {convertPdfToImage} from "~/lib/pdf2img";
import {generateUUID} from "~/lib/utils";
import {prepareInstructions} from "../../constants";

const Upload = () => {

    const { auth, isLoading, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();

    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = (file: File | null) => {
        setFile(file);
    }

    const handleAnalyze = async ({companyName, jobTitle, jobDescription, file}: {companyName: string, jobTitle: string ,jobDescription: string, file: File}) => {
        setIsProcessing(true);
        setStatusText('Uploading the file ...');
        const uploadedFile = await fs.upload([file]);

        if(!uploadedFile) return setStatusText('Error: Failed to upload file');

        setStatusText('Converting to image ...');
        const imageFile = await convertPdfToImage(file);
        if(!imageFile.file) return setStatusText(`Error: Failed to convert PDF to image${imageFile.error ? ` - ${imageFile.error}` : ''}`);

        setStatusText('Uploading the image ...');
        const uploadedImage = await fs.upload([imageFile.file]);
        if(!uploadedImage) return setStatusText('Error: Failed to upload image');

        setStatusText('Preparing data ...');

        const uuid = generateUUID();
        const data = {
            id: uuid,
            resumePath: uploadedFile.path,
            imagePath: uploadedImage.path,
            companyName,
            jobTitle,
            jobDescription,
            feedback: '',
        }

        await kv.set(`resume:${uuid}` , JSON.stringify(data));

        setStatusText('Analyzing ...');

        const feedback = await ai.feedback(
            uploadedFile.path,
            prepareInstructions({
                jobTitle,
                jobDescription,
            })
        )
        if(!feedback) return setStatusText('Error: Failed to analyze');

        const feedbackText = typeof feedback.message.content === 'string'
            ? feedback.message.content
            : feedback.message.content[0].text;

        data.feedback = JSON.parse(feedbackText);
        await kv.set(`resume:${uuid}` , JSON.stringify(data));
        setStatusText('Analysis Done, redirecting ...');
        console.log(data);
        navigate(`/resume/${uuid}`);

    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if (!form) return;
        const formData = new FormData(form);
        const companyName = formData.get('company-name')as string;
        const jobTitle = formData.get('job-title')as string;
        const jobDescription = formData.get('job-description')as string;
        //const resume = file;

        if(!file) return;
        handleAnalyze({
            companyName,
            jobTitle,
            jobDescription,
            file,
        })

    }

    const getStatusIcon = () => {
        if (statusText.includes('Error')) {
            return (
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                </div>
            );
        }
        return (
            <div className="relative mb-4">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-purple-600 rounded-full animate-spin animate-reverse mx-auto"></div>
            </div>
        );
    };

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
                {/* Processing State */}
                {isProcessing ? (
                    <div className="max-w-2xl mx-auto">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-full px-6 py-2 mb-8 shadow-lg">
                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                                <span className="text-sm font-medium text-slate-700">AI Processing</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent leading-tight mb-6">
                                Analyzing Your Resume
                            </h1>
                        </div>

                        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 border border-white/50 shadow-2xl text-center">
                            {getStatusIcon()}

                            <h3 className="text-xl font-semibold text-slate-800 mb-2">
                                {statusText.includes('Error') ? 'Processing Error' : 'Processing...'}
                            </h3>
                            <p className={`text-lg ${statusText.includes('Error') ? 'text-red-600' : 'text-slate-600'} mb-8`}>
                                {statusText}
                            </p>

                            {!statusText.includes('Error') && (
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-2xl blur-2xl"></div>
                                    <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
                                        <img
                                            src="/images/resume-scan.gif"
                                            className="w-full max-w-md mx-auto rounded-xl"
                                            alt="AI analyzing resume"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    /* Upload Form */
                    <div className="max-w-4xl mx-auto">
                        {/* Hero Section */}
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-blue-200/50 rounded-full px-6 py-2 mb-8 shadow-lg">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-sm font-medium text-slate-700">AI-Powered Analysis</span>
                            </div>

                            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent leading-tight mb-6">
                                Smart Feedback for
                                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    Your Dream Job
                                </span>
                            </h1>

                            <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
                                Get instant ATS scoring and personalized improvement recommendations tailored to your target position
                            </p>
                        </div>

                        {/* Form Container */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-2xl"></div>
                            <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-white/50 shadow-2xl">
                                <form id="upload-form" onSubmit={handleSubmit} className="space-y-8">
                                    {/* Form Grid */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        {/* Company Name */}
                                        <div className="space-y-2">
                                            <label htmlFor="company-name" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                </svg>
                                                Company Name
                                            </label>
                                            <input
                                                type="text"
                                                name="company-name"
                                                placeholder="e.g. Google, Microsoft, Tesla..."
                                                id="company-name"
                                                className="w-full px-4 py-3 bg-white/80 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 placeholder:text-slate-400"
                                            />
                                        </div>

                                        {/* Job Title */}
                                        <div className="space-y-2">
                                            <label htmlFor="job-title" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 00-2 2H10a2 2 0 00-2-2V6m8 0h2a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h2" />
                                                </svg>
                                                Job Title
                                            </label>
                                            <input
                                                type="text"
                                                name="job-title"
                                                placeholder="e.g. Software Engineer, Product Manager..."
                                                id="job-title"
                                                className="w-full px-4 py-3 bg-white/80 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 placeholder:text-slate-400"
                                            />
                                        </div>
                                    </div>

                                    {/* Job Description */}
                                    <div className="space-y-2">
                                        <label htmlFor="job-description" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            Job Description
                                        </label>
                                        <textarea
                                            rows={5}
                                            name="job-description"
                                            placeholder="Paste the complete job description here for better analysis..."
                                            id="job-description"
                                            className="w-full px-4 py-3 bg-white/80 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 resize-none placeholder:text-slate-400"
                                        />
                                    </div>

                                    {/* File Upload */}
                                    <div className="space-y-2">
                                        <label htmlFor="uploader" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                                            </svg>
                                            Upload Resume
                                        </label>
                                        <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 hover:border-blue-300 transition-colors duration-300">
                                            <FileUploader onFileSelect={handleFileSelect}/>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="pt-4">
                                        <button
                                            className="group relative w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                            type="submit"
                                            disabled={!file}
                                        >
                                            <span className="relative z-10 flex items-center justify-center gap-3">
                                                <svg className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                </svg>
                                                Analyze Resume with AI
                                                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                </svg>
                                            </span>
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                        </button>

                                        {!file && (
                                            <p className="text-center text-sm text-slate-500 mt-3">
                                                Please upload a resume to continue
                                            </p>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </main>
    );
};

export default Upload;