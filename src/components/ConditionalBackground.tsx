'use client';

import { usePathname } from 'next/navigation';
import BackgroundBlobScene from './Blobs';

export default function ConditionalBackground() {
  const pathname = usePathname();
  
  // Don't render BackgroundBlobScene on Enrollment or register routes and home page
  if (pathname === '/enrolment' || pathname === '/register' || pathname === '/') {
    return null;
  }
  
  return (
    <div className="absolute inset-0 w-full overflow-hidden">
      <BackgroundBlobScene />
    </div>
  );
}
