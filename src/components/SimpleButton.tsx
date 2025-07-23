"use client";

import Link from 'next/link';

interface SimpleButtonProps {
  redirectTo: string;
  buttonText: string;
  className?: string;
}

const SimpleButton: React.FC<SimpleButtonProps> = ({ redirectTo, buttonText, className }) => {
  return (
    <Link href={redirectTo}>
      <button
        className={`simple-button ${className ?? ''}`}
      >
        {buttonText}
      </button>
    </Link>
  );
};

export default SimpleButton;
