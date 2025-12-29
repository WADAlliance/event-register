'use client';

import { useEffect } from "react";

export default function RegisterForSummitButton({ className = "", text="REGISTER" }) {
    useEffect(() => {
        // Ensure script is added only once
        if (!document.getElementById("luma-checkout")) {
            const script = document.createElement("script");
            script.id = "luma-checkout";
            script.src = "https://embed.lu.ma/checkout-button.js";
            script.async = true;
            document.body.appendChild(script);
        }
    }, []);

    return (
        <a
            href="https://luma.com/event/evt-VJAkEMPreTLI7RG"
            className={
                "inline-flex items-center justify-center gap-[10px] w-[230px] h-[44px] rounded-[6px] px-[20px] py-[15px] bg-[#EB5626] hover:bg-[#EB5626]/90 opacity-100 text-white transition " +
                className
            }
            data-luma-action="checkout"
            data-luma-event-id="evt-VJAkEMPreTLI7RG"
            data-leading-trim="NONE"
            style={{
                fontFamily: '"PP Telegraf", "Telegraf", sans-serif',
                fontWeight: 800,
                fontStyle: 'Ultrabold',
                fontSize: '16px',
                lineHeight: '14px',
                letterSpacing: '-1%',
            }}
        >
            {text}
        </a>
    );
}
