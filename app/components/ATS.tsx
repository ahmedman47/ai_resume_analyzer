
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

  const gradientClass =
    level === "good"
      ? "from-green-100"
      : level === "warn"
      ? "from-yellow-100"
      : "from-red-100";

  const bannerIcon =
    level === "good"
      ? "/icons/ats-good.svg"
      : level === "warn"
      ? "/icons/ats-warning.svg"
      : "/icons/ats-bad.svg";

  const suggestionIcon = (type: AtsSuggestion["type"]) =>
    type === "good" ? "/icons/check.svg" : "/icons/warning.svg";

  return (
    <div
      className={`w-full rounded-2xl shadow-md bg-gradient-to-br ${gradientClass} to-white`}
    >
      {/* Top section */}
      <div className="flex flex-row items-center gap-4 p-5 border-b border-gray-100">
        <img src={bannerIcon} alt="ATS status" className="w-10 h-10" />
        <div className="flex flex-col">
          <h2 className="text-xl md:text-2xl font-bold">
            ATS Score - {score}/100
          </h2>
          <p className="text-sm text-gray-600">
            Automated Tracking System alignment based on your resume content.
          </p>
        </div>
      </div>

      {/* Description section */}
      <div className="p-5 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <img src={bannerIcon} alt="ATS status" className="w-6 h-6" />
          <p className="text-lg font-semibold">How your resume stacks up</p>
        </div>
        <p className="text-sm text-gray-500">
          Below are tailored suggestions to improve your resume for ATS scanning. Focus on
          clarity, relevant keywords, and consistent formatting. Small changes can lead to
          meaningful improvements in your score.
        </p>

        {/* Suggestions list */}
        <ul className="mt-1 flex flex-col gap-2">
          {suggestions.map((s, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <img
                src={suggestionIcon(s.type)}
                alt={s.type === "good" ? "Good" : "Improve"}
                className="mt-0.5 w-4 h-4"
              />
              <span className="text-sm text-gray-800">{s.tip}</span>
            </li>
          ))}
        </ul>

        <p className="text-sm text-gray-600 mt-2">
          Keep iterating—each improvement increases your chances of passing ATS filters.
        </p>
      </div>
    </div>
  );
};

export default Ats;