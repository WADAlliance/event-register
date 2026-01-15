'use client';

import React, { useEffect } from "react";

export default function RegisterForSummitButton({ className = "", text = "REGISTER" }) {
    const [mounted, setMounted] = React.useState(false);

    useEffect(() => {
        setMounted(true);
        // Ensure script is added only once
        if (!document.getElementById("luma-checkout")) {
            const script = document.createElement("script");
            script.id = "luma-checkout";
            script.src = "https://embed.lu.ma/checkout-button.js";
            script.async = true;
            document.body.appendChild(script);
        }
    }, []);

    if (!mounted) {
        return (
            <a
                href="https://luma.com/event/evt-VJAkEMPreTLI7RG"
                className={`inline-flex items-center justify-center gap-2.5 w-57.5 h-11 rounded-md px-5 py-3.75 bg-wada-a opacity-100 !text-white transition ${className}`}
                style={{
                    fontFamily: '"PP Telegraf", "Telegraf", sans-serif',
                    fontWeight: 800,
                    fontSize: '16px',
                    lineHeight: '14px',
                    letterSpacing: '-1%',
                }}
            >
                {text}
            </a>
        );
    }

    return (
        <a
            href="https://luma.com/event/evt-VJAkEMPreTLI7RG"
            className={`inline-flex items-center justify-center gap-2.5 w-57.5 h-11 rounded-md px-5 py-3.75 bg-wada-a hover:bg-wada-a/90 opacity-100 !text-white transition ${className}`}
            data-luma-action="checkout"
            data-luma-event-id="evt-VJAkEMPreTLI7RG"
            data-leading-trim="NONE"
            style={{
                fontFamily: '"PP Telegraf", "Telegraf", sans-serif',
                fontWeight: 800,
                fontSize: '16px',
                lineHeight: '14px',
                letterSpacing: '-1%',
            }}
        >
            {text}
        </a>
    );
}
