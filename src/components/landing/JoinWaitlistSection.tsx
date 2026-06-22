'use client';

import React from 'react';
import RegisterForSummitButton from '../RegisterForSummitButton';

export default function JoinWaitlistSection() {
    return (
        <section className="bg-[#0A0A0A] py-24 md:py-32 px-4 border-t border-white/5">
            <div className="max-w-[1000px] mx-auto text-center">
                <h2 className="text-white mb-4 tracking-normal" style={{
                    fontFamily: '"PP Telegraf", "Telegraf", sans-serif',
                    fontWeight: 800,
                    fontSize: '70px',
                    lineHeight: '53px',
                    letterSpacing: '0%'
                }}>
                    The Story Doesn&apos;t End Here.
                </h2>

                <p className="text-gray-300 text-base md:text-[20px] mb-12 leading-[1.6] max-w-[800px] mx-auto font-normal" style={{ fontFamily: '"PP Telegraf", "Telegraf", sans-serif' }}>
                    CATS 2026 was just the beginning. Be first in line for CATS 2027, and access all recordings, resources, and community<br className="hidden md:block" />
                    tools in your member portal today.
                </p>

                <div className="flex justify-center relative">
                    <div className="absolute inset-0 bg-[#f05a28] blur-[40px] opacity-20 w-[200px] h-full mx-auto rounded-full"></div>
                    <RegisterForSummitButton
                        text="Join the CATS2027 Waitlist"
                        className="relative z-10 bg-[#f05a28] hover:bg-[#f05a28]/90 text-white font-bold inline-flex items-center justify-center transition-all duration-300 shadow-[0_0_20px_rgba(240,90,40,0.15)] !w-[253px] !h-[44px] !pt-[15px] !pr-[20px] !pb-[15px] !pl-[20px] !gap-[10px] !rounded-[6px] !opacity-100"
                    />
                </div>
            </div>
        </section>
    );
}
