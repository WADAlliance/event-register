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
                "inline-flex items-center justify-center gap-[10px] w-[230px] h-[44px] rounded-[6px] px-[20px] py-[15px] bg-[#EB5626] hover:bg-[#EB5626]/90 opacity-100 font-telegraf font-[800] text-[16px] leading-[14px] tracking-[-0.01em] text-white transition " +
                className
            }
            data-luma-action="checkout"
            data-luma-event-id="evt-VJAkEMPreTLI7RG"
        >
            {text}
        </a>
    );
}
