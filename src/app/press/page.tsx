"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { FaTwitter, FaLinkedinIn, FaInstagram, FaRegBell } from "react-icons/fa6";
import { HiOutlineDownload } from "react-icons/hi";
import { NewsItem, SocialPost } from "@/lib/airtable";
import { useState, useEffect } from "react";

const stats = [
    { value: "500+", label: "Expected Attendees" },
    { value: "3", label: "Days of Innovation" },
    { value: "20+", label: "Countries Represented" },
    { value: "20+", label: "Speakers & Experts" },
];



const platformMetadata: Record<string, {
    name: string;
    handle: string;
    color: string;
    icon: React.ReactNode;
    cta: string;
    description: string;
}> = {
    "X": {
        name: "X (Twitter)",
        handle: "@cats_summit",
        color: "bg-[#0f1419]",
        icon: <FaTwitter />,
        cta: "View on X",
        description: "Join the conversation using #CATS2026 and #CardanoAfricaTechSummit"
    },
    "LinkedIn": {
        name: "LinkedIn",
        handle: "CATS Summit",
        color: "bg-[#0077b5]",
        icon: <FaLinkedinIn />,
        cta: "Follow on LinkedIn",
        description: "Connect with attendees and speakers from across the ecosystem"
    },
    "Instagram": {
        name: "Instagram",
        handle: "@CATS_Summit",
        color: "bg-[#bc2a8d]",
        icon: <FaInstagram />,
        cta: "View on Instagram",
        description: "Behind-the-scenes content, speaker highlights, and event updates"
    }
};

export default function PressPage() {
    const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [visibleCount, setVisibleCount] = useState(2);


    const [socialPosts, setSocialPosts] = useState<Record<string, SocialPost>>({});
    const [socialLoading, setSocialLoading] = useState(true);
    const [socialError, setSocialError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchNews() {
            try {
                const response = await fetch('/api/press-items');
                if (!response.ok) {
                    throw new Error(`API error: ${response.status} ${response.statusText}`);
                }
                const items = await response.json();

                if (items.length !== 0) {
                    setNewsItems(items);
                }
            } catch (err: unknown) {
                const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
                setError(errorMessage || "Failed to connect to the news server.");
            } finally {
                setLoading(false);
            }
        }
        fetchNews();
    }, []);


    useEffect(() => {
        async function fetchSocialPosts() {
            try {
                const response = await fetch('/api/social-posts');
                if (!response.ok) {
                    throw new Error(`API error: ${response.status} ${response.statusText}`);
                }
                const posts = await response.json();
                setSocialPosts(posts);
            } catch (err: unknown) {
                const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
                setSocialError(errorMessage || "Failed to connect to the social posts server.");
            } finally {
                setSocialLoading(false);
            }
        }
        fetchSocialPosts();
    }, []);

    const featuredNews = newsItems.find(item => item.isFeatured) || newsItems[0];
    const regularNews = newsItems.filter(item => item.id !== (featuredNews?.id || ''));
    const visibleRegular = regularNews.slice(0, visibleCount);

    const allVisible = featuredNews ? [featuredNews, ...visibleRegular] : visibleRegular;

    const batches = [];
    for (let i = 0; i < allVisible.length; i += 3) {
        batches.push(allVisible.slice(i, i + 3));
    }
    return (
        <div className="min-h-screen bg-white text-black font-poppins overflow-x-hidden">
            <Navbar />

            <section className="pt-32 pb-16 px-6 text-center max-w-5xl mx-auto">
                <p
                    className="mb-4 uppercase"
                    style={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 400,
                        fontStyle: 'normal',
                        fontSize: '13px',
                        lineHeight: '28px',
                        letterSpacing: '0.32em',
                        textAlign: 'center',
                        color: '#000000'
                    }}
                >
                    MEDIA CENTRE
                </p>
                <h1 className="text-4xl md:text-5xl font-extrabold font-telegraf mb-6 leading-tight text-black">
                    Press & <span className="text-[#eb5626]">Media</span>
                </h1>
                <p className="text-sm text-black max-w-2xl mx-auto leading-relaxed">
                    Resources and information for journalists, media professionals, and <br />content creators covering CATS 2026.
                </p>
            </section>


            <section className="bg-[#0a0a0a] w-full py-8">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-white font-telegraf font-extrabold text-2xl mb-2">Press Inquiries</h2>
                    <p className="text-white/80 text-sm font-poppins">For media requests and interview opportunities</p>
                </div>
            </section>


            <section className="py-20 px-6 max-w-7xl mx-auto">
                <h2 className="text-4xl font-extrabold font-telegraf mb-2">Latest News</h2>
                <p className="text-black mb-12">Recent announcements and updates.</p>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#eb5626]"></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-20 bg-red-50 rounded-2xl border border-dashed border-red-200">
                        <p className="text-red-500 font-bold mb-2">Connection Error</p>
                        <p className="text-red-400 text-sm">{error}</p>
                        <p className="text-gray-500 text-xs mt-4">Check your environment variables and internet connection.</p>
                    </div>
                ) : newsItems.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                        <p className="text-gray-400 mb-2">No news items found in Airtable.</p>
                        <p className="text-gray-400 text-xs text-balance">Ensure your table is named &apos;Press Items&apos; and has correctly named fields.</p>
                    </div>
                ) : (
                    <>
                        <div className="flex flex-col gap-8">
                            {batches.map((batch, bIdx) => (
                                <React.Fragment key={bIdx}>
                                    {batch[0] && (
                                        <div className="bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-8 relative overflow-hidden group">
                                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                                <div className="bg-[#fff5f2] p-5 rounded-full text-[#eb5626] shrink-0">
                                                    <FaRegBell size={28} />
                                                </div>

                                                <div className="flex-1">
                                                    <p
                                                        className="text-[#eb5626] mb-2 uppercase"
                                                        style={{
                                                            fontFamily: "'Poppins', sans-serif",
                                                            fontWeight: 600,
                                                            fontSize: '14px',
                                                            lineHeight: '20px',
                                                            letterSpacing: '0.18em'
                                                        }}
                                                    >
                                                        {batch[0].isFeatured ? "Featured Announcement" : batch[0].type}
                                                    </p>
                                                    <h3
                                                        className="mb-4 text-black"
                                                        style={{
                                                            fontFamily: '"PP Telegraf", sans-serif',
                                                            fontWeight: 800,
                                                            fontSize: '24px',
                                                            lineHeight: '32px',
                                                            letterSpacing: '0%'
                                                        }}
                                                    >
                                                        {batch[0].title}
                                                    </h3>
                                                    <p className="text-black mb-6 leading-relaxed font-poppins text-[15px]">
                                                        {batch[0].description}
                                                    </p>
                                                    <div className="flex items-center gap-3 text-[14px]">
                                                        <span className="text-gray-400">{batch[0].date}</span>
                                                        <span className="text-gray-300">•</span>
                                                        <Link href={batch[0].readMoreUrl || "#"} className="text-[#eb5626] font-bold">Read More</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {(batch[1] || batch[2]) && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {batch.slice(1).map((item, idx) => (
                                                <div key={item.id || idx} className="bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl p-8 relative overflow-hidden group">
                                                    <div className="flex flex-col gap-1 items-start">
                                                        <p
                                                            className="text-[#eb5626] mb-2 uppercase"
                                                            style={{
                                                                fontFamily: "'Poppins', sans-serif",
                                                                fontWeight: 600,
                                                                fontSize: '14px',
                                                                lineHeight: '20px',
                                                                letterSpacing: '0.18em'
                                                            }}
                                                        >
                                                            {item.type}
                                                        </p>
                                                        <h3
                                                            className="mb-4 text-black"
                                                            style={{
                                                                fontFamily: '"PP Telegraf", sans-serif',
                                                                fontWeight: 800,
                                                                fontSize: '22px',
                                                                lineHeight: '30px',
                                                                letterSpacing: '0%'
                                                            }}
                                                        >
                                                            {item.title}
                                                        </h3>
                                                        <p className="text-black mb-6 leading-relaxed font-poppins text-[14px]">
                                                            {item.description}
                                                        </p>
                                                        <div className="flex items-center gap-3 text-[13px]">
                                                            <span className="text-gray-400">{item.date}</span>
                                                            <span className="text-gray-300">•</span>
                                                            <Link href={item.readMoreUrl || "#"} className="text-[#eb5626] font-bold">Read More</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>

                        {visibleCount < regularNews.length && (
                            <div className="mt-16 text-center">
                                <button
                                    onClick={() => setVisibleCount(prev => prev + 3)}
                                    className="bg-[#eb5626] text-white px-10 py-3 rounded-full font-telegraf font-bold hover:bg-[#d84a1d] transition-all duration-300 shadow-md"
                                >
                                    View More
                                </button>
                            </div>
                        )}
                    </>
                )}
            </section>

            <section className="bg-gray-50 py-24 px-6 border-y border-gray-100">
                <div className="max-w-7xl mx-auto text-center">
                    <h2
                        className="mb-16"
                        style={{
                            fontFamily: '"PP Telegraf", sans-serif',
                            fontWeight: 800,
                            fontSize: '48px',
                            lineHeight: '47px',
                            letterSpacing: '0%',
                            textAlign: 'center'
                        }}
                    >
                        Key Facts & Figures
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="flex flex-col items-center">
                                <span className="text-[#eb5626] text-5xl font-extrabold font-telegraf mb-4 tracking-tight">
                                    {stat.value}
                                </span>
                                <span className="text-black font-medium text-sm">
                                    {stat.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 px-6 bg-[#0a0a0a] text-white overflow-hidden relative">
                <div className="relative z-10 max-w-7xl mx-auto">
                    <h2
                        className="text-center mb-16"
                        style={{
                            fontFamily: '"PP Telegraf", sans-serif',
                            fontWeight: 800,
                            fontSize: '48px',
                            lineHeight: '47px',
                            letterSpacing: '0%',
                            textAlign: 'center'
                        }}
                    >
                        Media Kit & Assets
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="bg-white rounded-2xl p-10 text-center flex flex-col items-center group cursor-pointer transition-transform hover:-translate-y-1">
                            <div className="bg-[#eb5626]/10 w-12 h-12 rounded-lg flex items-center justify-center text-[#eb5626] mb-6">
                                <HiOutlineDownload size={24} />
                            </div>
                            <h3 className="text-black font-bold text-xl mb-3">Logo Pack</h3>
                            <p className="text-gray-500 text-sm mb-8">Logo files in various formats (PNG, JPG, PDF) with usage guidelines.</p>
                            <a
                                href="https://drive.google.com/drive/folders/1m7_8MQehqy35U32hGOWwsG7QHKsWZsvO"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#eb5626] text-white px-8 py-3 rounded-md font-bold text-[14px] hover:bg-[#d84a1d] transition-colors w-full block"
                            >
                                Download Logos
                            </a>
                        </div>

                        <div className="bg-white rounded-2xl p-10 text-center flex flex-col items-center group cursor-pointer transition-transform hover:-translate-y-1">
                            <div className="bg-[#eb5626]/10 w-12 h-12 rounded-lg flex items-center justify-center text-[#eb5626] mb-6">
                                <HiOutlineDownload size={24} />
                            </div>
                            <h3 className="text-black font-bold text-xl mb-3">Brand Guideline</h3>
                            <p className="text-gray-500 text-sm mb-8">Complete brand style guide and usage instructions.</p>
                            <a
                                href=" https://drive.google.com/file/d/1B1xzdJql0mxuWblPPr4tL79pLJZ_iEon/view?usp=sharing"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-[#eb5626] text-white px-8 py-3 rounded-md font-bold text-[14px] hover:bg-[#d84a1d] transition-colors w-full block"
                            >
                                Download Logos
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section id="social-buzz" className="py-24 px-6 max-w-7xl mx-auto">
                <h2
                    className="text-center mb-4"
                    style={{
                        fontFamily: '"PP Telegraf", sans-serif',
                        fontWeight: 800,
                        fontSize: '48px',
                        lineHeight: '47px',
                        letterSpacing: '0%',
                        textAlign: 'center'
                    }}
                >
                    Social Media Buzz
                </h2>
                <p className="text-black text-center mb-16 max-w-2xl mx-auto">
                    Follow the conversation and see what people are saying about CATS 2026 across social platforms.
                </p>

                {socialLoading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#eb5626]"></div>
                    </div>
                ) : socialError ? (
                    <div className="text-center py-20 bg-red-50 rounded-2xl border border-dashed border-red-200">
                        <p className="text-red-500 font-bold mb-2">Connection Error</p>
                        <p className="text-red-400 text-sm">{socialError}</p>
                        <p className="text-gray-500 text-xs mt-4">Check your Airtable configuration and internet connection.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {Object.entries(platformMetadata).map(([platformKey, platform]) => {
                            const post = socialPosts[platformKey];

                            return (
                                <div key={platformKey} className="flex flex-col gap-4">
                                    <div className={`${platform.color} rounded-xl p-6 text-white`}>
                                        <div className="flex items-center gap-3 mb-4 text-xl">
                                            {platform.icon}
                                            <span className="font-bold">{platform.name}</span>
                                        </div>
                                        <p className="text-white/60 text-sm mb-5">{platform.handle}</p>
                                        <p className="text-[14px] mb-6 leading-relaxed">
                                            {platform.description}
                                        </p>
                                        <Link
                                            href="#"
                                            className="bg-white/20 hover:bg-white/30 transition-all w-full py-2.5 rounded-lg font-bold text-sm block text-center"
                                        >
                                            {platform.cta}
                                        </Link>
                                    </div>

                                    {post ? (
                                        <a
                                            href={post.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-gray-50 rounded-xl p-5 border border-gray-100 flex flex-col gap-4 group hover:bg-white hover:shadow-xl hover:shadow-black/5 transition-all duration-300 no-underline"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center font-bold text-xs text-[#eb5626]">
                                                    {post.avatar}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm text-black group-hover:text-[#eb5626] transition-colors">{post.user}</p>
                                                    <p className="text-gray-400 text-xs">{post.handle} • {post.time}</p>
                                                </div>
                                            </div>

                                            {post.image && (
                                                <div className="relative aspect-video rounded-lg overflow-hidden my-1">
                                                    <Image
                                                        src={post.image}
                                                        alt="Social post media"
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                    />
                                                </div>
                                            )}

                                            <p className="text-sm leading-relaxed text-gray-700">
                                                {post.content}
                                            </p>

                                            <div className="flex items-center gap-4 text-gray-400 text-xs">
                                                <span className="hover:text-[#eb5626] cursor-pointer">Reply</span>
                                                <span className="hover:text-[#eb5626] cursor-pointer">Like</span>
                                                <span className="hover:text-[#eb5626] cursor-pointer">Share</span>
                                            </div>
                                        </a>
                                    ) : (
                                        <div className="bg-gray-50 rounded-xl p-5 border border-dashed border-gray-200 text-center">
                                            <p className="text-gray-400 text-sm">No posts available yet</p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>

        </div>
    );
}
