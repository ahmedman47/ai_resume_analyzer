import type { ReactNode } from "react";
import React, { createContext, useContext, useState } from "react";
import { cn } from "~/lib/utils";

interface AccordionContextType {
    activeItems: string[];
    toggleItem: (id: string) => void;
    isItemActive: (id: string) => boolean;
}

const AccordionContext = createContext<AccordionContextType | undefined>(
    undefined
);

const useAccordion = () => {
    const context = useContext(AccordionContext);
    if (!context) {
        throw new Error("Accordion components must be used within an Accordion");
    }
    return context;
};

interface AccordionProps {
    children: ReactNode;
    defaultOpen?: string;
    allowMultiple?: boolean;
    className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
                                                        children,
                                                        defaultOpen,
                                                        allowMultiple = false,
                                                        className = "",
                                                    }) => {
    const [activeItems, setActiveItems] = useState<string[]>(
        defaultOpen ? [defaultOpen] : []
    );

    const toggleItem = (id: string) => {
        setActiveItems((prev) => {
            if (allowMultiple) {
                return prev.includes(id)
                    ? prev.filter((item) => item !== id)
                    : [...prev, id];
            } else {
                return prev.includes(id) ? [] : [id];
            }
        });
    };

    const isItemActive = (id: string) => activeItems.includes(id);

    return (
        <AccordionContext.Provider
            value={{ activeItems, toggleItem, isItemActive }}
        >
            <div className={`space-y-3 ${className}`}>{children}</div>
        </AccordionContext.Provider>
    );
};

interface AccordionItemProps {
    id: string;
    children: ReactNode;
    className?: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
                                                                id,
                                                                children,
                                                                className = "",
                                                            }) => {
    const { isItemActive } = useAccordion();
    const isActive = isItemActive(id);

    return (
        <div
            className={cn(
                "group overflow-hidden rounded-2xl border transition-all duration-300 shadow-sm hover:shadow-md",
                isActive
                    ? "bg-white border-blue-200/60 shadow-lg shadow-blue-500/10"
                    : "bg-white/80 border-slate-200/50 hover:border-slate-300/70",
                className
            )}
        >
            {children}
        </div>
    );
};

interface AccordionHeaderProps {
    itemId: string;
    children: ReactNode;
    className?: string;
    icon?: ReactNode;
    iconPosition?: "left" | "right";
}

export const AccordionHeader: React.FC<AccordionHeaderProps> = ({
                                                                    itemId,
                                                                    children,
                                                                    className = "",
                                                                    icon,
                                                                    iconPosition = "right",
                                                                }) => {
    const { toggleItem, isItemActive } = useAccordion();
    const isActive = isItemActive(itemId);

    const defaultIcon = (
        <div className={cn(
            "flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-300",
            isActive
                ? "bg-blue-100 text-blue-600"
                : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
        )}>
            <svg
                className={cn(
                    "w-4 h-4 transition-transform duration-300",
                    isActive ? "rotate-180" : "rotate-0"
                )}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                />
            </svg>
        </div>
    );

    const handleClick = () => {
        toggleItem(itemId);
    };

    return (
        <button
            onClick={handleClick}
            className={cn(
                "w-full px-6 py-5 text-left focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200",
                "flex items-center justify-between cursor-pointer group-hover:bg-slate-50/50",
                isActive && "bg-gradient-to-r from-blue-50/50 to-purple-50/30",
                className
            )}
        >
            <div className="flex items-center space-x-4 flex-1">
                {iconPosition === "left" && (icon || defaultIcon)}
                <div className={cn(
                    "flex-1 font-medium transition-colors duration-200",
                    isActive
                        ? "text-slate-800"
                        : "text-slate-700 group-hover:text-slate-800"
                )}>
                    {children}
                </div>
            </div>
            {iconPosition === "right" && (icon || defaultIcon)}
        </button>
    );
};

interface AccordionContentProps {
    itemId: string;
    children: ReactNode;
    className?: string;
}

export const AccordionContent: React.FC<AccordionContentProps> = ({
                                                                      itemId,
                                                                      children,
                                                                      className = "",
                                                                  }) => {
    const { isItemActive } = useAccordion();
    const isActive = isItemActive(itemId);

    return (
        <div
            className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                isActive ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0",
                className
            )}
        >
            <div className="px-6 pb-6 pt-0">
                <div className="border-t border-slate-100/80 pt-4">
                    <div className="text-slate-600 leading-relaxed">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};