'use client';

import React, { useState, useEffect } from 'react';

interface PreviewHeroProps {
  className?: string;
}

export default function PreviewHero({ className = '' }: PreviewHeroProps) {
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchToken = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/preview');
      
      if (!response.ok) {
        const status = response.status;
        if (status === 500) {
          throw new Error('Server error - preview token generation failed');
        }
        throw new Error(`Failed to fetch preview token: ${status}`);
      }

      const data = await response.json();
      
      if (data.token) {
        setToken(data.token);
      } else {
        throw new Error('No token received from server');
      }
    } catch (err) {
      console.error('Error fetching preview token:', err);
      const errorMessage = err instanceof Error ? err.message : 'Preview unavailable - please try again';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchToken();
  }, []);

  // Construct iframe src with token
  const iframeSrc = token 
    ? `https://potentialise-f7z35mxw2-prisma-collective.vercel.app/embed?token=${encodeURIComponent(token)}`
    : null;

  // Error state with retry option
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-black/40 backdrop-blur-sm border border-gray-800 rounded-lg ${className}`}>
        <div className="text-center p-8">
          <p className="text-white text-lg mb-2">Unable to load preview</p>
          <p className="text-gray-400 text-sm mb-4">{error}</p>
          <button
            onClick={fetchToken}
            className="px-4 py-2 bg-wada-a text-white rounded hover:bg-opacity-80 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading || !iframeSrc) {
    return (
      <div className={`flex items-center justify-center bg-black/40 backdrop-blur-sm border border-gray-800 rounded-lg ${className}`}>
        <div className="text-center p-8">
          <p className="text-white text-lg">Loading preview...</p>
        </div>
      </div>
    );
  }

  // Render iframe
  // Note: Cross-origin restrictions prevent detecting iframe load errors
  // App B will handle displaying errors (403, expired token, etc.) within the iframe
  return (
    <div className={`relative w-full h-full ${className}`}>
      <iframe
        src={iframeSrc}
        className="w-full h-full border-0"
        sandbox="allow-scripts allow-same-origin allow-forms"
        loading="eager"
        title="App B Preview"
      />
    </div>
  );
}
