'use client';

import { useEffect } from "react";

export default function RegisterForHackathonButton({ className = "", text="REGISTER" }) {
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
                "rounded-md  px-8 py-3 font-medium font-telegraf transition" +
                className
            }
            data-luma-action="checkout"
            data-luma-event-id="evt-zibHKbFEswwj4vv"
        >
            {text}
        </a>
    );
}
