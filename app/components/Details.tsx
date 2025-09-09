import { cn } from "~/lib/utils";
import { Accordion, AccordionItem, AccordionHeader, AccordionContent } from "~/components/Accordion";
import React from "react";

// Local helper components in the same file as requested
const ScoreBadge = ({ score }: { score: number }) => {
    const isGood = score > 69;
    const isOkay = !isGood && score > 39;

    const getScoreConfig = () => {
        if (isGood) {
            return {
                bg: "bg-gradient-to-r from-emerald-500 to-green-500",
                text: "text-white",
                ring: "ring-emerald-200/50",
                bgContainer: "bg-white",
                icon: (
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M20 6L9 17l-5-5" />
                    </svg>
                )
            };
        } else if (isOkay) {
            return {
                bg: "bg-gradient-to-r from-amber-500 to-orange-500",
                text: "text-white",
                ring: "ring-amber-200/50",
                bgContainer: "bg-white",
                icon: (
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M12 8v4m0 4h.01" />
                    </svg>
                )
            };
        } else {
            return {
                bg: "bg-gradient-to-r from-red-500 to-rose-500",
                text: "text-white",
                ring: "ring-red-200/50",
                bgContainer: "bg-white",
                icon: (
                    <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M12 8v4m0 4h.01" />
                    </svg>
                )
            };
        }
    };

    const config = getScoreConfig();

    return (
        <div className={cn("inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ring-2 shadow-lg", config.bgContainer, config.ring)}>
            <div className={cn("flex items-center justify-center w-6 h-6 rounded-full", config.bg, config.text)}>
                {config.icon}
            </div>
            <span className="font-bold text-slate-800">{score}/100</span>
        </div>
    );
};

const CategoryHeader = ({ title, categoryScore }: { title: string; categoryScore: number }) => {
    const getCategoryIcon = (title: string) => {
        switch (title) {
            case "Tone & Style":
                return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5H9m12 0v12a4 4 0 01-4 4H9m12-16L9 21" />
                    </svg>
                );
            case "Content":
                return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                );
            case "Structure":
                return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                );
            case "Skills":
                return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                );
            default:
                return (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                );
        }
    };

    return (
        <div className="flex items-center justify-between w-full gap-4">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-100 rounded-xl flex items-center justify-center text-slate-600">
                    {getCategoryIcon(title)}
                </div>
                <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
            </div>
            <ScoreBadge score={categoryScore} />
        </div>
    );
};

type Tip = {
    type: "good" | "improve";
    tip: string;
    explanation: string;
};

const CategoryContent = ({ tips }: { tips: Tip[] }) => {
    return (
        <div className="space-y-6">
            {/* Tips Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {tips.map((t, idx) => (
                    <div key={idx} className="group flex items-start gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-white/50 hover:bg-white/80 hover:shadow-md transition-all duration-200">
                        {/* Icon differs by type */}
                        {t.type === "good" ? (
                            <div className="flex-shrink-0 w-7 h-7 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl flex items-center justify-center shadow-sm">
                                <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 6L9 17l-5-5" />
                                </svg>
                            </div>
                        ) : (
                            <div className="flex-shrink-0 w-7 h-7 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-sm">
                                <svg className="h-4 w-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        )}
                        <div className="flex-1 min-w-0">
                            <p className={cn("text-sm font-medium leading-relaxed", t.type === "good" ? "text-slate-700" : "text-slate-800")}>{t.tip}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Detailed Explanations */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h4 className="font-semibold text-slate-800">Detailed Insights</h4>
                </div>

                {tips.map((t, idx) => (
                    <div
                        key={`exp-${idx}`}
                        className={cn(
                            "relative rounded-2xl border p-5 text-sm transition-all duration-200 hover:shadow-md",
                            t.type === "good"
                                ? "bg-gradient-to-br from-emerald-50 to-green-50/50 border-emerald-200/60 hover:border-emerald-300"
                                : "bg-gradient-to-br from-blue-50 to-indigo-50/50 border-blue-200/60 hover:border-blue-300"
                        )}
                    >
                        <div className="flex items-start gap-3">
                            <div className={cn(
                                "flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center",
                                t.type === "good"
                                    ? "bg-emerald-100 text-emerald-600"
                                    : "bg-blue-100 text-blue-600"
                            )}>
                                {t.type === "good" ? (
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                ) : (
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                )}
                            </div>

                            <div className="flex-1">
                                <p className={cn(
                                    "font-semibold mb-2",
                                    t.type === "good" ? "text-emerald-800" : "text-blue-800"
                                )}>
                                    {t.type === "good" ? "✨ Strength Identified" : "🎯 Improvement Opportunity"}
                                </p>
                                <p className={cn(
                                    "leading-relaxed",
                                    t.type === "good" ? "text-emerald-700" : "text-blue-700"
                                )}>
                                    {t.explanation}
                                </p>
                            </div>
                        </div>

                        {/* Subtle decoration */}
                        <div className={cn(
                            "absolute top-3 right-3 w-2 h-2 rounded-full opacity-30",
                            t.type === "good" ? "bg-emerald-400" : "bg-blue-400"
                        )}></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Details = ({ feedback }: { feedback: Feedback }) => {
    return (
        <div className="relative group w-full">
            {/* Subtle glow effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>

            <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-2">
                {/* Header */}
                <div className="p-6 pb-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800">Detailed Analysis</h2>
                            <p className="text-slate-600">In-depth feedback across key resume categories</p>
                        </div>
                    </div>
                </div>

                {/* Accordion Container */}
                <div className="px-4 pb-4">
                    <Accordion allowMultiple className="space-y-0">
                        <AccordionItem id="tone" className="mb-3">
                            <AccordionHeader itemId="tone">
                                <CategoryHeader title="Tone & Style" categoryScore={feedback.toneAndStyle.score} />
                            </AccordionHeader>
                            <AccordionContent itemId="tone">
                                <CategoryContent tips={feedback.toneAndStyle.tips as Tip[]} />
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem id="content" className="mb-3">
                            <AccordionHeader itemId="content">
                                <CategoryHeader title="Content" categoryScore={feedback.content.score} />
                            </AccordionHeader>
                            <AccordionContent itemId="content">
                                <CategoryContent tips={feedback.content.tips as Tip[]} />
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem id="structure" className="mb-3">
                            <AccordionHeader itemId="structure">
                                <CategoryHeader title="Structure" categoryScore={feedback.structure.score} />
                            </AccordionHeader>
                            <AccordionContent itemId="structure">
                                <CategoryContent tips={feedback.structure.tips as Tip[]} />
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem id="skills" className="mb-0">
                            <AccordionHeader itemId="skills">
                                <CategoryHeader title="Skills" categoryScore={feedback.skills.score} />
                            </AccordionHeader>
                            <AccordionContent itemId="skills">
                                <CategoryContent tips={feedback.skills.tips as Tip[]} />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </div>
    );
};

export default Details;