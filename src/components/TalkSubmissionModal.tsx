"use client";

import { useState, useEffect } from 'react';
import Image from "next/image";

declare global {
  interface Window {
    Tally?: {
      loadEmbeds: () => void;
    };
  }
}

interface TalkSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TalkSubmissionModal({ isOpen, onClose }: TalkSubmissionModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [iframeKey, setIframeKey] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setIsLoading(true);
      setIframeKey(prev => prev + 1);
      setTimeout(() => setIsVisible(true), 10);

      if (!document.querySelector('script[src="https://tally.so/widgets/embed.js"]')) {
        const script = document.createElement('script');
        script.src = 'https://tally.so/widgets/embed.js';
        script.async = true;
        script.onload = () => {
          setTimeout(() => {
            if (window.Tally) {
              window.Tally.loadEmbeds();
            }
            setIsLoading(false);
          }, 300);
        };
        document.body.appendChild(script);
      } else {
        setTimeout(() => {
          if (window.Tally) {
            window.Tally.loadEmbeds();
          }
          setIsLoading(false);
        }, 300);
      }
    } else {
      setIsVisible(false);
      setTimeout(() => setShouldRender(false), 300);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${isVisible ? 'bg-black/70' : 'bg-black/0'
        }`}
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden transition-all duration-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white p-6 pb-0">
          <div className="flex justify-center items-center relative">
            <div className="flex flex-row gap-3 items-center">
              <Image
                src="/brand_assets/cardano-logo-black.svg"
                width={55}
                height={30}
                alt="Cardano Logo"
                priority
              />
              <Image
                src="/brand_assets/CAT-logo-black.svg"
                width={240}
                height={120}
                alt="CAT Logo"
                priority
              />
            </div>
            <button
              onClick={onClose}
              className="absolute right-0 text-black text-3xl leading-none cursor-pointer hover:opacity-70 transition-opacity"
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <p className="text-sm text-black mt-4 font-poppins text-center">
            Apply to speak at the Cardano Africa Tech Summit and inspire innovation across the continent.
          </p>
        </div>

        <div className="w-full p-6 pt-0 relative" style={{ minHeight: '500px', maxHeight: '70vh', overflow: 'auto' }}>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white">
              <div className="spinner"></div>
            </div>
          )}
          <iframe
            key={iframeKey}
            data-tally-src="https://tally.so/embed/A7PLzD?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
            loading="lazy"
            width="100%"
            height="100%"
            title="Submit a Talk - Cardano Africa Tech Summit"
            style={{ border: 0, minHeight: '500px' }}
            className="tally-iframe"
          ></iframe>
        </div>
      </div>

      <style jsx>{`
        :global(.tally-iframe) {
          font-family: 'Poppins', sans-serif;
        }
        
        .spinner {
          width: 48px;
          height: 48px;
          border: 4px solid #e5e7eb;
          border-top-color: #80B741;
          border-radius: 50%;
          animation: spin 2s linear infinite;
        }
        
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
