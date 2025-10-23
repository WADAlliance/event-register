'use client';

import { useEffect } from "react";

export default function RegisterButton({ className = "" }) {
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
            href="https://luma.com/event/evt-zibHKbFEswwj4vv"
            className={
                "bg-wada-a border-2 border-wada-a text-white font-telegraf px-6 py-[0.5rem] rounded-md cursor-pointer hover:scale-105 transition duration-200 " +
                className
            }
            data-luma-action="checkout"
            data-luma-event-id="evt-zibHKbFEswwj4vv"
        >
            Register Today
        </a>
    );
}
