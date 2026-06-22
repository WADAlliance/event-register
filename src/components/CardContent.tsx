import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

type CardContentProps = {
    name: string;
    description: string;
    extraInfo: string;
    isHovered: boolean;
    disabled: boolean;
};

export const CardContent = ({ name, description, extraInfo, isHovered, disabled }: CardContentProps) => {
    const extraRef = useRef<HTMLDivElement>(null);
    const [extraHeight, setExtraHeight] = useState(0);


    useEffect(() => {
        if (isHovered && extraRef.current && !disabled) {
            setExtraHeight(Math.min(extraRef.current.scrollHeight, 160)); // tailwind h-40 is 160px
        }
    }, [isHovered, extraInfo, disabled]);

    return (
        <div className="relative z-10 bg-wada-e/90 pl-6 pr-3 py-2 md:p-6 md:pr-3 overflow-hidden flex flex-col transition-all duration-300">
            <h2 className="md:text-2xl font-custom font-bold text-white mb-1 md:mb-2 truncate">
                {name}
            </h2>
            <p className="font-custom text-gray-300 mb-1 md:mb-4 truncate">
                {disabled ? "Coming soon" : description}
            </p>


            <div
                className="overflow-hidden transition-all duration-300"
                style={{
                    height: isHovered && !disabled ? extraHeight : 0,
                }}
            >
                <div ref={extraRef} className="md:max-h-40 overflow-y-auto font-custom text-gray-200 text-sm pt-2">
                    <ReactMarkdown
                        components={{
                            h1: ({ ...props }) => (
                                <h1 className="text-xl font-bold text-white my-2" {...props} />
                            ),
                            h2: ({ ...props }) => (
                                <h2 className="text-lg font-semibold text-white my-2" {...props} />
                            ),
                            p: ({ ...props }) => (
                                <p className="text-gray-200 mb-2" {...props} />
                            ),
                            ul: ({ ...props }) => (
                                <ul className="list-disc list-inside mb-2" {...props} />
                            ),
                            li: ({ ...props }) => <li className="ml-4 mb-1" {...props} />,
                            em: ({ ...props }) => <em className="italic" {...props} />,
                            strong: ({ ...props }) => <strong className="font-bold" {...props} />,
                        }}
                    >{disabled ? "Coming soon" : extraInfo}</ReactMarkdown>
                </div>
            </div>
        </div>
    );
};
