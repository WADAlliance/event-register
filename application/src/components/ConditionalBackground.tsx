'use client';

import { usePathname } from 'next/navigation';
import BackgroundBlobScene from './Blobs';

export default function ConditionalBackground() {
  const pathname = usePathname();
  
  // Don't render BackgroundBlobScene on enrolment or register routes
  if (pathname === '/enrolment' || pathname === '/register') {
    return null;
  }
  
  return (
    <div className="absolute inset-0 w-full overflow-hidden">
      <BackgroundBlobScene />
    </div>
  );
}
