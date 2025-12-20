"use client";

import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function BecomePartnerModal({ open, onOpenChange }: Props) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onOpenChange(false);
    }
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow || "";
    };
  }, [open]);

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (!e.data) return;
      if (
        e.data === "tally:submit:success" ||
        e.data?.type === "tally:submit:success" ||
        e.data?.status === "submitted"
      ) {
        onOpenChange(false);
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [onOpenChange]);

  if (!open) return null;

  const TALLY_EMBED = "https://tally.so/embed/PdDzzd?hideTitle=1&alignLeft=1";

  function handleBackdropClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) onOpenChange(false);
  }

  const modal = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="become-partner-title"
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4 py-6"
      onClick={handleBackdropClick}
    >
      <div className="absolute inset-0 bg-black/60" aria-hidden="true" />

      <div
        className="relative z-10 bg-white shadow-[0_18px_40px_rgba(2,6,23,0.35)] overflow-hidden"
        style={{
          width: 640,
          height: 600,
          maxWidth: "calc(100% - 32px)",
          maxHeight: "calc(100vh - 32px)",
          borderRadius: 16,
          paddingTop: 30,
          opacity: 1,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close dialog"
          onClick={() => onOpenChange(false)}
          className="absolute top-3 right-3 inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 3.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>

        <div className="flex flex-col items-center px-6" style={{ height: 120 }}>
          <Image src="/CATS Full Logo.png" alt="Cardano Africa Tech Summit 2026" width={220} height={44} priority />
          <h2
            id="become-partner-title"
            className="text-slate-900"
            style={{
              fontFamily: '"PP Telegraf"',
              fontWeight: 800,
              fontStyle: "normal",
              fontSize: 32,
              lineHeight: "39px",
              letterSpacing: "0%",
              textAlign: "center",
              marginTop: 8,
            }}
          >
            Become a partner at the Cardano
            <br />
            Africa Tech 2026
          </h2>
        </div>

        <div
          className="px-6 w-full"
          style={{
            flex: 1,
            minHeight: 0,
          }}
        >
          <div
            className="w-full h-full rounded-md"
            style={{ minHeight: 0, height: "100%", display: "flex", flexDirection: "column" }}
          >
            <iframe
              ref={iframeRef}
              src={TALLY_EMBED}
              title="Become a partner form"
              className="w-full flex-1"
              style={{ minHeight: 0, height: "100%", border: 0, display: "block" }}
              loading="lazy"
              allow="clipboard-read; clipboard-write; microphone; camera"
            />
          </div>
        </div>
      </div>
    </div>
  );

  if (typeof document !== "undefined") return createPortal(modal, document.body);
  return null;
}
