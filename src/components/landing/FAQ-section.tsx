"use client";

import React, { useState, useRef, useEffect, useId, createRef, RefObject } from "react";

type FAQItem = { question: string; answer?: string };

const defaultItems: FAQItem[] = [
    {
        question: "Who can attend the summit?",
        answer:
            "The summit is open to developers, blockchain enthusiasts, policymakers, students, investors, startups, and organizations interested in exploring blockchain solutions and Cardano's ecosystem in Africa. Whether you're new to Web3 or a seasoned expert, there's something for everyone.",
    },
    {
        question: "Are there opportunities for sponsors, exhibitors, or partners?",
        answer:
            "Yes. The summit welcomes sponsorships, exhibitors, and partnership collaborations from organizations and brands that align with Cardano's vision for a decentralized Africa. Interested parties can contact the organizing team via hello@catsummit.io",
    },
    {
        question: "When and where will the summit take place?",
        answer:
            "The summit will be held in Nairobi, Kenya, with the Exhibition happening at Sarit Centre and the Summit at Tamarind Hotel",
    },
    {
        question: "How can I register for the event?",
        answer:
            "You can register through the official Cardano Africa Tech Summit website. Early registration is encouraged as slots for physical attendance may be limited",
    },
];

function PatternDivider({ id = "p", className = "" }: { id?: string; className?: string }): React.ReactElement {
    const patternId = `${id}-pattern`;
    return (
        <div aria-hidden="true" className={`w-full overflow-visible ${className}`} style={{ lineHeight: 0 }}>
            <svg
                width="100%"
                height="16"
                viewBox="0 0 1200 16"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ display: "block" }}
            >
                <defs>
                    <pattern id={patternId} x="0" y="0" width="80" height="16" patternUnits="userSpaceOnUse">
                        <g fill="none" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M8 6 L16 6" stroke="#E85625" />
                            <polygon points="28,2 32,8 24,8" fill="#7AC3F1" />
                            <path d="M48 6 L56 6" stroke="#86C94C" />
                            <circle cx="68" cy="6" r="2.5" fill="#E85625" />
                        </g>
                    </pattern>
                </defs>
                <rect width="100%" height="16" fill={`url(#${patternId})`} />
            </svg>
        </div>
    );
}

export interface FAQSectionHandle {
    scrollToFAQ: () => void;
}

interface FAQSectionProps {
    items?: FAQItem[];
}

const FAQSection = React.forwardRef<FAQSectionHandle, FAQSectionProps>(
    ({ items = defaultItems }, ref) => {
        const idRoot = useId();
        const [openIndex, setOpenIndex] = useState<number>(-1);
        const headerRefs = useRef<RefObject<HTMLButtonElement>[]>([]);
        const contentRefs = useRef<RefObject<HTMLDivElement>[]>([]);
        const sectionRef = useRef<HTMLElement>(null);

        if (headerRefs.current.length !== items.length) {
            headerRefs.current = Array.from({ length: items.length }, (_, i) => headerRefs.current[i] ?? createRef<HTMLButtonElement>());
        }
        if (contentRefs.current.length !== items.length) {
            contentRefs.current = Array.from({ length: items.length }, (_, i) => contentRefs.current[i] ?? createRef<HTMLDivElement>());
        }

        React.useImperativeHandle(ref, () => ({
            scrollToFAQ: () => {
                sectionRef.current?.scrollIntoView({ behavior: "smooth" });
            },
        }));

        useEffect(() => {
            items.forEach((_, i) => {
                const el = contentRefs.current[i]?.current;
                if (!el) return;
                if (i === openIndex) {
                    el.style.maxHeight = `${el.scrollHeight}px`;
                } else {
                    el.style.maxHeight = "0px";
                }
            });

            const onResize = () => {
                const el = contentRefs.current[openIndex]?.current;
                if (el) el.style.maxHeight = `${el.scrollHeight}px`;
            };
            window.addEventListener("resize", onResize);
            return () => window.removeEventListener("resize", onResize);
        }, [openIndex, items]);

        const toggleIndex = (i: number): void => {
            setOpenIndex((prev) => (prev === i ? -1 : i));
            setTimeout(() => headerRefs.current[i]?.current?.focus(), 150);
        };

        const onHeaderKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, idx: number): void => {
            const last = items.length - 1;
            switch (e.key) {
                case "ArrowDown":
                    e.preventDefault();
                    headerRefs.current[(idx + 1) % items.length].current?.focus();
                    break;
                case "ArrowUp":
                    e.preventDefault();
                    headerRefs.current[(idx - 1 + items.length) % items.length].current?.focus();
                    break;
                case "Home":
                    e.preventDefault();
                    headerRefs.current[0].current?.focus();
                    break;
                case "End":
                    e.preventDefault();
                    headerRefs.current[last].current?.focus();
                    break;
                case " ":
                case "Enter":
                    e.preventDefault();
                    toggleIndex(idx);
                    break;
                default:
                    break;
            }
        };

        return (
            <section
                ref={sectionRef}
                style={{
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "50px 20px",
                    width: "100%",
                    minHeight: "646px",
                    background: "#FFFFFF",
                    flex: "none",
                    order: 4,
                    alignSelf: "stretch",
                    flexGrow: 0,
                    zIndex: 1,
                    overflow: "visible",
                    position: "relative",
                }}
            >
                {/* left border: single image column */}
                <div
                    aria-hidden="true"
                    style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: "24px",
                        zIndex: 0,
                        pointerEvents: "none",
                    }}
                >
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            backgroundImage: `url('/CATS-Pattern1.png')`,
                            backgroundRepeat: "repeat-y",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                        }}
                    />
                </div>

                {/* Main content container wrapped to leave small horizontal edges only */}
                <div
                    className="w-full px-0 sm:px-1"
                    style={{
                        backgroundImage: "url('/CATS-Pattern.jpg')",
                        backgroundRepeat: 'repeat',
                        backgroundPosition: 'center',
                        backgroundSize: '150px',
                    }}
                >
                    <div
                        className="w-full md:max-w-7xl mx-auto px-0 bg-white"
                        style={{ position: "relative", zIndex: 1, width: 'calc(100% - 300px)', maxWidth: '1280px' }}
                    >
                    <h2
                        className="mb-12 text-black"
                        data-leading-trim="NONE"
                        style={{
                            fontFamily: '"PP Telegraf", "Telegraf", sans-serif',
                            fontWeight: 800,
                            fontStyle: 'Ultrabold',
                            fontSize: '36px',
                            lineHeight: '39px',
                            letterSpacing: '0%',
                            textAlign: 'center',
                        }}
                    >
                        Frequently Asked Questions
                    </h2>

                    <div className="flex flex-col gap-6 w-full">
                        {items.map((item, idx) => {
                            const isOpen = openIndex === idx;
                            const headerId = `${idRoot}-faq-header-${idx}`;
                            const panelId = `${idRoot}-faq-panel-${idx}`;

                            return (
                                <div
                                    key={idx}
                                    style={{
                                        boxSizing: "border-box",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        padding: "1px 1px 0px",
                                        isolation: "isolate",
                                        width: "100%",
                                        minHeight: "72.9px",
                                        background: isOpen ? "#E85625" : "#FFFFFF",
                                        boxShadow: "10px 4px 60px rgba(199, 199, 199, 0.3)",
                                        borderRadius: "10px",
                                        flex: "none",
                                        order: idx,
                                        alignSelf: "stretch",
                                        flexGrow: 0,
                                        transition: "all 300ms ease-in-out",
                                        overflow: "hidden",
                                    }}
                                >
                                    <PatternDivider id={`${idRoot}-${idx}-top`} className={isOpen ? "" : "opacity-40"} />

                                    <div className="flex items-center justify-between px-6 md:px-8 py-4 md:py-4 w-full" style={isOpen ? { backgroundColor: "#E85625" } : { backgroundColor: "#FFFFFF" }}>
                                        <button
                                            id={headerId}
                                            ref={headerRefs.current[idx]}
                                            aria-controls={panelId}
                                            aria-expanded={isOpen}
                                            onClick={() => toggleIndex(idx)}
                                            onKeyDown={(e) => onHeaderKeyDown(e, idx)}
                                            type="button"
                                            className={`text-left flex-1 focus:outline-none transition-colors`}
                                            data-leading-trim="NONE"
                                        >
                                            <span
                                                className="inline-block mr-3"
                                                style={{
                                                    fontFamily: '"PP Telegraf", "Telegraf", sans-serif',
                                                    fontWeight: 800,
                                                    fontStyle: 'Ultrabold',
                                                    fontSize: '23px',
                                                    lineHeight: '32px',
                                                    letterSpacing: '0%',
                                                    verticalAlign: 'bottom',
                                                    color: isOpen ? '#FFFFFF' : '#000000',
                                                }}
                                            >
                                                {`${idx + 1}.`}
                                            </span>
                                            <span
                                                style={{
                                                    fontFamily: '"PP Telegraf", "Telegraf", sans-serif',
                                                    fontWeight: 800,
                                                    fontStyle: 'Ultrabold',
                                                    fontSize: '23px',
                                                    lineHeight: '32px',
                                                    letterSpacing: '0%',
                                                    verticalAlign: 'bottom',
                                                    color: isOpen ? '#FFFFFF' : '#000000',
                                                }}
                                            >
                                                {item.question}
                                            </span>
                                        </button>

                                        <button
                                            onClick={() => toggleIndex(idx)}
                                            type="button"
                                            className="ml-4 flex-shrink-0 focus:outline-none"
                                            aria-label="Toggle answer"
                                        >
                                            <div
                                                className={`w-10 h-10 rounded-full flex items-center justify-center transform transition-transform duration-300 ${
                                                    isOpen ? "bg-black/20" : "bg-black/90"
                                                }`}
                                            >
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    width="20"
                                                    height="20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        d="M6 9l6 6 6-6"
                                                        stroke="white"
                                                        strokeWidth="2.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </div>
                                        </button>
                                    </div>

                                    {!isOpen && <PatternDivider id={`${idRoot}-${idx}-bottom-closed`} className="opacity-40" />}

                                    <div
                                        id={panelId}
                                        role="region"
                                        aria-labelledby={headerId}
                                        ref={contentRefs.current[idx]}
                                        className="overflow-hidden transition-[max-height] duration-300 ease-in-out w-full"
                                        style={{ maxHeight: "0px" }}
                                    >
                                        <div className="px-6 md:px-8 py-2 md:py-2 bg-[#E85625] w-full">
                                            {item.answer ? (
                                                <p
                                                    data-leading-trim="NONE"
                                                    style={{
                                                        fontFamily: "'Poppins', sans-serif",
                                                        fontWeight: 400,
                                                        fontStyle: 'Regular',
                                                        fontSize: '18px',
                                                        lineHeight: '28px',
                                                        letterSpacing: '0%',
                                                        color: '#FFFFFF',
                                                    }}
                                                >
                                                    {item.answer}
                                                </p>
                                            ) : (
                                                <p
                                                    data-leading-trim="NONE"
                                                    style={{
                                                        fontFamily: "'Poppins', sans-serif",
                                                        fontWeight: 400,
                                                        fontSize: '18px',
                                                        lineHeight: '28px',
                                                        letterSpacing: '0%',
                                                        color: 'rgba(255,255,255,0.7)',
                                                        fontStyle: 'italic',
                                                    }}
                                                >
                                                    (Content to be added)
                                                </p>
                                            )}
                                        </div>
                                        <PatternDivider id={`${idRoot}-${idx}-bottom-open`} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                </div>

                {/* right border: single image column */}
                <div
                    aria-hidden="true"
                    style={{
                        position: "absolute",
                        right: 0,
                        top: 0,
                        bottom: 0,
                        width: "24px",
                        zIndex: 0,
                        pointerEvents: "none",
                    }}
                >
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            backgroundImage: `url('/CATS-Pattern1.png')`,
                            backgroundRepeat: "repeat-y",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                        }}
                    />
                </div>
            </section>
        );
    }
);

FAQSection.displayName = "FAQSection";

export default FAQSection;
