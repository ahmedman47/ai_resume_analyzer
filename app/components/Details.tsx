
import { cn } from "~/lib/utils";
import { Accordion, AccordionItem, AccordionHeader, AccordionContent } from "~/components/Accordion";
import React from "react";

// Local helper components in the same file as requested
const ScoreBadge = ({ score }: { score: number }) => {
  const isGood = score > 69;
  const isOkay = !isGood && score > 39;
  const bg = isGood ? "bg-green-100" : isOkay ? "bg-yellow-100" : "bg-red-100";
  const text = isGood ? "text-green-700" : isOkay ? "text-yellow-700" : "text-red-700";
  const ring = isGood ? "ring-green-200" : isOkay ? "ring-yellow-200" : "ring-red-200";

  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ring-1", bg, text, ring)}>
      {/* Check icon only for good scores, per spec */}
      {isGood && (
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M20 6L9 17l-5-5" />
        </svg>
      )}
      <span>{score}/100</span>
    </span>
  );
};

const CategoryHeader = ({ title, categoryScore }: { title: string; categoryScore: number }) => {
  return (
    <div className="flex items-center justify-between w-full gap-4">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
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
    <div className="flex flex-col gap-4">
      {/* Two-column grid of tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {tips.map((t, idx) => (
          <div key={idx} className="flex items-start gap-2">
            {/* Icon differs by type */}
            {t.type === "good" ? (
              <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700 ring-1 ring-green-200">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </span>
            ) : (
              <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700 ring-1 ring-amber-200">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 8v4m0 4h.01" />
                </svg>
              </span>
            )}
            <p className={cn("text-sm", t.type === "good" ? "text-gray-800" : "text-gray-900 font-medium")}>{t.tip}</p>
          </div>
        ))}
      </div>

      {/* Explanations list */}
      <div className="flex flex-col gap-3">
        {tips.map((t, idx) => (
          <div
            key={`exp-${idx}`}
            className={cn(
              "rounded-lg border p-3 text-sm",
              t.type === "good"
                ? "bg-green-50 border-green-200 text-green-900"
                : "bg-amber-50 border-amber-200 text-amber-900"
            )}
          >
            <p className="font-medium mb-1">{t.type === "good" ? "Keep it up" : "How to improve"}</p>
            <p className="leading-relaxed">{t.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Details = ({ feedback }: { feedback: Feedback }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md w-full p-2 md:p-4">
      <Accordion allowMultiple className="divide-y divide-gray-200">
        <AccordionItem id="tone">
          <AccordionHeader itemId="tone">
            <CategoryHeader title="Tone & Style" categoryScore={feedback.toneAndStyle.score} />
          </AccordionHeader>
          <AccordionContent itemId="tone">
            <CategoryContent tips={feedback.toneAndStyle.tips as Tip[]} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="content">
          <AccordionHeader itemId="content">
            <CategoryHeader title="Content" categoryScore={feedback.content.score} />
          </AccordionHeader>
          <AccordionContent itemId="content">
            <CategoryContent tips={feedback.content.tips as Tip[]} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="structure">
          <AccordionHeader itemId="structure">
            <CategoryHeader title="Structure" categoryScore={feedback.structure.score} />
          </AccordionHeader>
          <AccordionContent itemId="structure">
            <CategoryContent tips={feedback.structure.tips as Tip[]} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem id="skills">
          <AccordionHeader itemId="skills">
            <CategoryHeader title="Skills" categoryScore={feedback.skills.score} />
          </AccordionHeader>
          <AccordionContent itemId="skills">
            <CategoryContent tips={feedback.skills.tips as Tip[]} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Details;