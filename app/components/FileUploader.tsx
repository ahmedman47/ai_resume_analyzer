import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import {formatSize} from "~/lib/utils";

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({onFileSelect} : FileUploaderProps) => {
    //const [file,setFile] = useState();
    const onDrop = useCallback((acceptedFiles: File[]) => {

        const file = acceptedFiles[0] || null;
        onFileSelect?.(file);


    }, [onFileSelect]);

    const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({
        onDrop,
        multiple: false,
        accept: {
            'application/pdf': ['.pdf']
        },
        maxSize: 20 * 1024 * 1024
    })

    const file = acceptedFiles[0] || null;

    return(
        <div className="w-full">
            <div
                {...getRootProps()}
                className={`
                    relative overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 ease-out
                    ${isDragActive
                    ? 'border-blue-400 bg-blue-50/50 scale-[1.02] shadow-lg'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/30'
                }
                    ${file ? 'bg-white border-solid border-green-200 shadow-sm' : 'bg-gradient-to-br from-gray-50 to-white'}
                `}
            >
                <input {...getInputProps()} />

                {/* Background Pattern */}
                {!file && (
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='0.1'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
                            backgroundSize: '40px 40px'
                        }} />
                    </div>
                )}

                <div className="relative p-8 space-y-6 cursor-pointer">
                    {file ? (
                        <div
                            className="flex items-center justify-between p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 shadow-sm hover:shadow-md transition-all duration-200"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0 w-14 h-14 bg-red-500 rounded-xl flex items-center justify-center shadow-lg">
                                    <img src="/images/pdf.png" alt="pdf" className="w-8 h-8"/>
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-semibold text-gray-900 truncate max-w-xs mb-1">
                                        {file.name}
                                    </p>
                                    <div className="flex items-center space-x-2">
                                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            PDF
                                        </span>
                                        <span className="text-xs text-gray-500 font-medium">
                                            {formatSize(file.size)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <button
                                className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 hover:bg-red-50 hover:border-red-200 hover:scale-110 transition-all duration-200 cursor-pointer group shadow-sm"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onFileSelect?.(null);
                                }}
                            >
                                <img src="/icons/cross.svg" alt="remove" className="w-4 h-4 opacity-60 group-hover:opacity-100"/>
                            </button>
                        </div>
                    ) : (
                        <div className="text-center">
                            <div className={`
                                mx-auto w-20 h-20 flex items-center justify-center mb-6 rounded-2xl transition-all duration-300
                                ${isDragActive
                                ? 'bg-blue-100 scale-110 animate-pulse'
                                : 'bg-gradient-to-br from-gray-100 to-gray-50 hover:scale-105'
                            }
                            `}>
                                <img
                                    src="/icons/info.svg"
                                    alt="upload"
                                    className={`w-10 h-10 transition-all duration-300 ${isDragActive ? 'scale-110' : ''}`}
                                />
                            </div>

                            <div className="space-y-2">
                                <p className={`
                                    text-lg transition-colors duration-200
                                    ${isDragActive ? 'text-blue-600' : 'text-gray-600'}
                                `}>
                                    <span className="font-semibold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                                        Click to upload
                                    </span> or drag and drop
                                </p>
                                <p className="text-sm text-gray-500 font-medium">
                                    PDF files only • Maximum 20 MB
                                </p>
                            </div>

                            {isDragActive && (
                                <div className="mt-4">
                                    <div className="inline-flex items-center px-3 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium animate-bounce">
                                        Drop your file here
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default FileUploader