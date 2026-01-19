"use client";

import React from "react";
import Image from "next/image";
import { ShoppingCart } from 'lucide-react';
import { jsPDF } from "jspdf";
import RegisterForSummitButton from "@/components/RegisterForSummitButton";

export default function TripPlanner() {
  type CartItem = { id: string; title: string; price: number; dateLabel?: string; time?: string; quantity: number };

  const [isMounted, setIsMounted] = React.useState(false);
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);


  React.useEffect(() => {
    setIsMounted(true);
    try {
      const savedCart = localStorage.getItem('cats-trip-planner-cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
    }
  }, []);


  React.useEffect(() => {
    if (isMounted) {
      try {
        localStorage.setItem('cats-trip-planner-cart', JSON.stringify(cartItems));
      } catch (error) {
        console.error('Failed to save cart to localStorage:', error);
      }
    }
  }, [cartItems, isMounted]);

  const [toast, setToast] = React.useState<{ visible: boolean; message?: string }>({ visible: false });
  const showToast = React.useCallback((message: string) => {
    setToast({ visible: true, message });
    window.setTimeout(() => setToast({ visible: false }), 3000);
  }, []);

  const [showVisaModal, setShowVisaModal] = React.useState(false);
  const [visaForm, setVisaForm] = React.useState({
    fullName: "",
    dob: "",
    passport: "",
    nationality: "",
    email: "",
    phone: "",
    arrival: "",
    departure: "",
  });
  const handleVisaChange = (k: string, v: string) => setVisaForm((s) => ({ ...s, [k]: v }));

  const [pdfPreviewUrl, setPdfPreviewUrl] = React.useState<string | null>(null);

  const generatePdfDoc = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("Visa Application Support", 20, 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("To Whom It May Concern,", 20, 35);
    doc.text("This document serves as support for the visa application for the following traveler:", 20, 42);

    doc.setFontSize(12);
    let y = 60;
    const lineHeight = 10;

    const addField = (label: string, val: string) => {
      doc.setFont("helvetica", "bold");
      doc.text(`${label}:`, 20, y);
      doc.setFont("helvetica", "normal");
      doc.text(val || "N/A", 80, y);
      y += lineHeight;
    };

    addField("Full Name", visaForm.fullName);
    addField("Date of Birth", visaForm.dob);
    addField("Passport Number", visaForm.passport);
    addField("Nationality", visaForm.nationality);
    addField("Email Address", visaForm.email);
    addField("Phone Number", visaForm.phone);
    addField("Arrival Date", visaForm.arrival ? new Date(visaForm.arrival + "T00:00").toLocaleDateString() : "");
    addField("Departure Date", visaForm.departure ? new Date(visaForm.departure + "T00:00").toLocaleDateString() : "");

    y += 10;
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.text("Confirmed booking details for accommodation and safari experiences are enclosed.", 20, y);

    y += 20;
    doc.setFont("helvetica", "bold");
    doc.text("CATS Trip Planner Team", 20, y);

    return doc;
  };

  const handleGeneratePdf = () => {
    if (!visaForm.fullName || !visaForm.passport) {
      showToast("Please fill in at least Name and Passport");
      return;
    }
    const doc = generatePdfDoc();
    const blobUrl = doc.output("bloburl");
    setPdfPreviewUrl(String(blobUrl));
  };

  const handleDownloadPdf = () => {
    const doc = generatePdfDoc();
    doc.save("Visa_Support_Document.pdf");
    showToast("PDF downloaded successfully");
  };

  const closeVisaModal = () => {
    setShowVisaModal(false);
    setPdfPreviewUrl(null);
  };

  const addToCart = (item: Omit<CartItem, 'quantity'>, quantity: number = 1) => {

    setCartItems((prev) => {
      const existingItem = prev.find((p) => p.id === item.id);
      if (existingItem) {
        return prev.map((p) => p.id === item.id ? { ...p, quantity: p.quantity + quantity } : p);
      }
      return [...prev, { ...item, quantity }];
    });
  };

  const updateItemQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } else {
      setCartItems((prev) => prev.map((item) => item.id === id ? { ...item, quantity } : item));
    }
  };

  const [selectedAddonDates, setSelectedAddonDates] = React.useState<string[]>([]);
  const [checkoutLoading, setCheckoutLoading] = React.useState<boolean>(false);
  const [termsAccepted, setTermsAccepted] = React.useState<boolean>(false);


  const [dawnIndex, setDawnIndex] = React.useState(0);
  const [maasaiIndex, setMaasaiIndex] = React.useState(0);


  const dawnImages = [
    "/Frame%202147207770.png",
    "/Frame%2018.png",
  ];
  const maasaiImages = [
    "/Frame%2018.png",
    "/Frame%202147207770.png",
  ];

  const nextSlide = (setter: React.Dispatch<React.SetStateAction<number>>, length: number) => {
    setter((prev) => (prev + 1) % length);
  };

  const prevSlide = (setter: React.Dispatch<React.SetStateAction<number>>, length: number) => {
    setter((prev) => (prev - 1 + length) % length);
  };


  const [hotelBooking, setHotelBooking] = React.useState({
    checkIn: "",
    checkOut: "",
    persons: 1,
  });
  const addonDateOptions = [
    { id: "2026-02-10", label: "February 10th", time: "Early Morning", price: 320 },
    { id: "2026-02-14", label: "February 14th", time: "Early Morning", price: 320 },
  ];


  const calculateNights = (checkIn: string, checkOut: string): number => {
    if (!checkIn || !checkOut) return 0;
    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);
    const timeDiff = endDate.getTime() - startDate.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return nights > 0 ? nights : 0;
  };

  const formatDateRange = (checkIn: string, checkOut: string): string => {
    if (!checkIn || !checkOut) return "";
    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);
    const options: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
    return `${startDate.toLocaleDateString('en-US', options)} - ${endDate.toLocaleDateString('en-US', options)}`;
  };
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const isDawnInCart = cartItems.some(item => item.id.startsWith('dawn-wild'));
  const isBodaInCart = cartItems.some(item => item.id.startsWith('boda-boda'));
  const isMaasaiInCart = cartItems.some(item => item.id.startsWith('maasai'));

  const handleCheckout = React.useCallback(async () => {
    if (!cartItems.length) {
      showToast("Cart is empty");
      return;
    }
    setCheckoutLoading(true);
    try {
      const itemsForApi = cartItems.map((item) => ({
        id: item.id,
        title: item.title,
        unit_price: Math.round((item.price || 0) * 100),
        quantity: item.quantity,
        metadata: { dateLabel: item.dateLabel || "", time: item.time || "" },
      }));
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: itemsForApi }),
      });

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        console.error("Non-JSON response from API:", text);
        throw new Error(`API returned unexpected response: ${res.status} ${res.statusText}`);
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Failed to create checkout session");

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (err: unknown) {
      console.error(err);
      const message = err instanceof Error ? err.message : String(err || "Checkout failed");
      showToast(message);
      setCheckoutLoading(false);
    }
  }, [cartItems, showToast]);

  return (
    <div className="w-full">
      <section
        className="relative w-full text-white overflow-hidden"
        style={{
          width: "100%",
          minHeight: "440px",
          padding: "120px 20px 40px",
          transform: "rotate(0deg)",
          opacity: 1,
        }}
      >

        <div
          className="absolute inset-0 -z-10 bg-center bg-cover"
          style={{
            backgroundImage: "url('/addon.jpg')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "cover",
          }}
          aria-hidden
        />

        <div className="relative z-10 w-[1440px] max-w-full mx-auto px-6 text-center flex flex-col h-full">
          <div>
            <div className="uppercase text-sm tracking-widest text-gray-300 mb-6">EXCLUSIVE EXPERIENCES</div>
            <h1 className="hero-title mb-4">CATS Trip Planner</h1>
            <p className="max-w-3xl mx-auto text-lg text-gray-300 mb-8">
              Cardano Africa Tech Summit is not just a conference, it is also an experience.
              We want to give you an incredibly experience that forge a lifetime of memories--without the hassle of planning.
            </p>
          </div>

          <div className="mt-auto mb-4">
            <div
              role="button"
              tabIndex={0}
              aria-label="Scroll to Choose Your Adventure"
              className="scroll-bounce cursor-pointer"
              onClick={() => {
                const el = document.getElementById('choose-adventure');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  const el = document.getElementById('choose-adventure');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              style={{
                fontFamily: "'Poppins'",
                fontWeight: 400,
                fontStyle: "normal",
                fontSize: "13px",
                lineHeight: "28px",
                letterSpacing: "0.32em",
                textAlign: "center",
                color: "rgba(209, 213, 219, 1)",
              }}
            >
              CURATE YOUR EXPERIENCE
            </div>
            <div className="mt-2 text-2xl text-gray-300 arrow-bounce">⌄</div>
          </div>
        </div>
      </section>


      <section className="w-full bg-white text-black py-16">
        <div className="max-w-225 mx-auto px-4 text-center">
          <h2 className="choose-title mb-2">Plan Your Trip</h2>
          <p className="text-sm mb-8">
            Choose from the menu below to secure your unforgettable Cardano Africa Tech Summit 2026 adventure!
          </p>

          <div className="space-y-8">
            {[
              {
                num: "1",
                title: "Register on lu.ma",
                desc: "First thing first, register on the lu.ma so we know who's coming and can plan to accommodate everyone!",
                ctas: [{ label: "Register on lu.ma", variant: "solid" }]
              },
              {
                num: "2",
                title: "Book Your Flight",
                desc: "Secure your flights to Jomo Kenyatta International Airport (NBO) in Nairobi. We recommend booking early for the best rates and availability. Here is a local trusted partner to help with discounted group flights.",
                ctas: [{ label: "Search for Flight", variant: "solid" }]
              },
              {
                num: "3",
                title: "Arrange Accommodation",
                desc: "Stay at the Venue hotel for a discounted CATS Summit rate.",
                ctas: [{ label: "Book Our Partner Hotel", variant: "solid" }, { label: "View Airbnb Recommendations", variant: "outline" }]
              },
              {
                num: "4",
                title: "Get Your Visa (eTA)",
                desc: "All other visitors require an Electronic Travel Authorisation (eTA) before traveling to Kenya. Complete our form to generate a support document for CATS 2026 Summit attendees.",
                ctas: [
                  { label: "Generate Visa Support Document", variant: "solid" },
                  { label: "Apply for eTA", variant: "solid" }
                ]
              }
            ].map((step) => {
              const bigCardStyle = {
                width: "100%",
                maxWidth: 1000,
                transform: "rotate(0deg)",
                opacity: 1,
                borderRadius: 15,
                boxSizing: "border-box",
              } as React.CSSProperties;
              const smallClass = "bg-white rounded-xl shadow-lg p-5 md:p-6 text-left flex flex-col md:flex-row items-start gap-4 md:gap-6";
              const bigClass = "bg-white shadow-lg text-left flex flex-col md:flex-row items-start p-5 md:p-[30px] gap-4 md:gap-6 md:min-h-[594px]";
              return (
                <div
                  key={step.title}
                  className={step.title === "Arrange Accommodation" ? bigClass : smallClass}
                  style={step.title === "Arrange Accommodation" ? bigCardStyle : undefined}
                >
                  <div className="shrink-0">
                    <div
                      className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center"
                      style={{
                        fontFamily: "'PP Telegraf', 'Poppins', sans-serif",
                        fontWeight: 800,
                        fontSize: "22px",
                      }}
                    >
                      {step.num}
                    </div>
                  </div>


                  {step.title === "Arrange Accommodation" ? (
                    <div className="flex-1">
                      <h3 className="text-3xl md:text-4xl font-extrabold mb-3">{step.title}</h3>
                      <p className="mb-4" style={{ color: "#0E0E0E" }}>{step.desc}</p>


                      <div
                        style={{
                          width: "100%",
                          maxWidth: 855,
                          borderRadius: 15,
                          padding: 20,
                          background: "#fff0ec",
                          display: "flex",
                          boxSizing: "border-box",
                          overflow: "hidden",
                        }}
                        className="mx-auto shadow-md relative min-h-72.5 h-auto flex-col md:flex-row gap-4 md:gap-5"
                      >
                        <div style={{ flex: 1 }}>
                          <div className="flex justify-between items-start mb-1">
                            <div className="text-xl font-extrabold" style={{ fontFamily: "'PP Telegraf', 'Poppins', sans-serif" }}>Tamarind Tree Hotel</div>
                            <div className="flex gap-1 shrink-0 ml-4">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <svg key={i} className="w-4 h-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.164c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.59 2.676c-.784.57-1.84-.197-1.54-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.421 9.383c-.783-.57-.38-1.81.588-1.81h4.164a1 1 0 00.95-.69L9.05 2.927z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                          <div className="text-sm text-gray-600 mb-6">
                            Luxury 5-star accommodation in central Nairobi
                          </div>

                          <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-[#2D3748] text-sm md:text-[15px] pr-2 mt-4" style={{ lineHeight: 1.4 }}>
                            <div className="flex items-center gap-2">
                              <span className="w-1 h-1 bg-black rounded-full" />
                              Free WiFi
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="w-1 h-1 bg-black rounded-full" />
                              Fitness Center
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="w-1 h-1 bg-black rounded-full" />
                              Swimming Pool
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="w-1 h-1 bg-black rounded-full" />
                              24/7 Room Service
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="w-1 h-1 bg-black rounded-full" />
                              Spa & Wellness
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="w-1 h-1 bg-black rounded-full" />
                              Airport Shuttle
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="w-1 h-1 bg-black rounded-full" />
                              Restaurant & Bar
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="w-1 h-1 bg-black rounded-full" />
                              Concierge
                            </div>
                          </div>

                          <div className="mt-6 text-wada-a font-bold text-sm" style={{ fontFamily: "'PP Telegraf', 'Poppins', sans-serif" }}>
                            Exclusive discounted rates for safari guests
                          </div>
                        </div>
                      </div>


                      <div className="mt-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label htmlFor="check-in" className="block text-sm font-medium text-gray-700 mb-1">
                              Check-in Date
                            </label>
                            <input
                              id="check-in"
                              type="date"
                              value={hotelBooking.checkIn}
                              onChange={(e) => setHotelBooking(prev => ({ ...prev, checkIn: e.target.value }))}
                              min={new Date().toISOString().split('T')[0]}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
                              style={{
                                colorScheme: 'light',
                                WebkitAppearance: 'none',
                                MozAppearance: 'textfield',
                                position: 'relative',
                              }}
                            />
                          </div>

                          <div>
                            <label htmlFor="check-out" className="block text-sm font-medium text-gray-700 mb-1">
                              Check-out Date
                            </label>
                            <input
                              id="check-out"
                              type="date"
                              value={hotelBooking.checkOut}
                              onChange={(e) => setHotelBooking(prev => ({ ...prev, checkOut: e.target.value }))}
                              min={hotelBooking.checkIn || new Date().toISOString().split('T')[0]}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
                              style={{
                                colorScheme: 'light',
                                WebkitAppearance: 'none',
                                MozAppearance: 'textfield',
                                position: 'relative',
                              }}
                            />
                          </div>

                          <div>
                            <label htmlFor="persons" className="block text-sm font-medium text-gray-700 mb-1">
                              Persons
                            </label>
                            <select
                              id="persons"
                              value={hotelBooking.persons}
                              onChange={(e) => setHotelBooking(prev => ({ ...prev, persons: parseInt(e.target.value) }))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-orange-500"
                            >
                              {Array.from({ length: 2 }, (_, i) => i + 1).map(num => (
                                <option key={num} value={num}>{num} {num === 1 ? 'Person' : 'Persons'}</option>
                              ))}
                            </select>
                          </div>
                        </div>


                        {hotelBooking.checkIn && hotelBooking.checkOut && (
                          <div className="bg-gray-50 p-4 rounded-lg border">
                            <div className="text-sm text-gray-600 space-y-1">
                              <div>Stay: {formatDateRange(hotelBooking.checkIn, hotelBooking.checkOut)}</div>
                              <div>Nights: {calculateNights(hotelBooking.checkIn, hotelBooking.checkOut)}</div>
                              <div>Persons: {hotelBooking.persons}</div>
                              <div className="text-xs text-gray-500 mt-2">Rate: $145 per night</div>
                              <div className="text-lg font-bold text-orange-500 pt-2">
                                Total: ${145 * calculateNights(hotelBooking.checkIn, hotelBooking.checkOut)}
                              </div>
                            </div>
                          </div>
                        )}

                        <button
                          type="button"
                          className="transition-all duration-200"
                          disabled={!hotelBooking.checkIn || !hotelBooking.checkOut || calculateNights(hotelBooking.checkIn, hotelBooking.checkOut) === 0}
                          style={{
                            background: (!hotelBooking.checkIn || !hotelBooking.checkOut || calculateNights(hotelBooking.checkIn, hotelBooking.checkOut) === 0) ? "#9CA3AF" : "#80b741",
                            color: "#ffffff",
                            width: "100%",
                            maxWidth: "521px",
                            height: "54px",
                            padding: "20px 40px",
                            gap: "10px",
                            borderRadius: "6px",
                            border: "none",
                            cursor: (!hotelBooking.checkIn || !hotelBooking.checkOut || calculateNights(hotelBooking.checkIn, hotelBooking.checkOut) === 0) ? "not-allowed" : "pointer",
                            boxSizing: "border-box",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontFamily: "'PP Telegraf', 'Poppins', sans-serif",
                            fontWeight: 800,
                            fontSize: "16px",
                            opacity: 1,
                          }}
                          onClick={() => {
                            const nights = calculateNights(hotelBooking.checkIn, hotelBooking.checkOut);
                            if (nights === 0) {
                              showToast("Please select valid check-in and check-out dates");
                              return;
                            }

                            const totalPrice = 145 * nights;
                            const dateLabel = formatDateRange(hotelBooking.checkIn, hotelBooking.checkOut);

                            const item = {
                              id: `tamarind-${Date.now().toString()}`,
                              title: `Tamarind Tree Hotel – ${nights} ${nights === 1 ? 'Night' : 'Nights'} (${hotelBooking.persons} ${hotelBooking.persons === 1 ? 'Person' : 'Persons'})`,
                              price: totalPrice,
                              dateLabel,
                              time: `${nights} ${nights === 1 ? 'night' : 'nights'}, ${hotelBooking.persons} ${hotelBooking.persons === 1 ? 'person' : 'persons'}`,
                            };
                            addToCart(item);
                            showToast("Room added to cart! Select new dates to book another room.");
                            setHotelBooking({
                              checkIn: "",
                              checkOut: "",
                              persons: 1,
                            });
                          }}
                        >
                          {(!hotelBooking.checkIn || !hotelBooking.checkOut || calculateNights(hotelBooking.checkIn, hotelBooking.checkOut) === 0) ?
                            "Select dates to continue" :
                            `Add Room to Cart – $${145 * calculateNights(hotelBooking.checkIn, hotelBooking.checkOut)}`
                          }
                        </button>

                        <div className="mt-5 text-[15px] text-black">
                          <div className="mb-1.5">
                            Need a different room?{" "}
                            <a
                              target="_blank"
                              rel="nofollow"
                              href="https://www.tamarindtree-hotels.com/rooms"
                              className="font-bold"
                              style={{ color: '#f05a28' }}
                            >
                              Book directly through the hotel
                            </a>
                          </div>
                          <div>
                            Prefer a local experience?{" "}
                            <a
                              target="_blank"
                              rel="nofollow"
                              href="https://www.airbnb.com/s/Nairobi--Kenya"
                              className="font-bold"
                              style={{ color: '#f05a28' }}
                            >
                              Browse Airbnb options in Nairobi
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : step.title === "Book Your Flight" ? (
                    <div className="flex-1 relative">
                      <h3 className="text-3xl md:text-4xl font-extrabold mb-3">{step.title}</h3>
                      <p className="mb-4" style={{ color: "#0E0E0E" }}>{step.desc}</p>


                      <div
                        style={{
                          width: "100%",
                          maxWidth: 855,
                          borderRadius: 15,
                          background: "#f0f9f0",
                          display: "flex",
                          boxSizing: "border-box",
                          overflow: "hidden",
                        }}
                        className="mx-auto shadow-md relative min-h-67.5 h-auto] flex-col md:flex-row"
                      >
                        <div style={{ flex: 1 }} className="relative z-10 max-w-2/3 p-6 pr-20">
                          <div className="text-xl font-extrabold mb-1" style={{ fontFamily: "'PP Telegraf', 'Poppins', sans-serif" }}>
                            Fly with Texperience
                          </div>
                          <div className="text-sm text-gray-600 mb-4 pr-0">
                            We handle every detail so you focus on the Summit, and experience <br />Africa.
                          </div>

                          <div className="flex flex-col gap-2 pr-0 text-gray-700" style={{ lineHeight: 1.9 }}>
                            <div>✈️ Ease of mind flight booking</div>
                            <div>🚗 Premium car transfers</div>
                            <div>💰Discounted Group Rates</div>
                            <div>🎫 Optional Nairobi Top Tourist Experience</div>
                          </div>
                        </div>

                        <div className="block md:hidden w-full h-48 relative">
                          <Image
                            fill
                            className="object-cover object-center"
                            alt='texperience logo'
                            src='/brand_assets/texperience-logo.jpeg'
                            quality={100}
                          />
                        </div>

                        <div className="hidden md:block absolute right-0 top-0 h-full w-[300px] pointer-events-none">
                          <div className="relative w-full h-full">
                            <Image
                              fill
                              className="object-cover object-right-top"
                              alt='texperience logo'
                              src='/brand_assets/texperience-logo.jpeg'
                              quality={100}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <button
                          type="button"
                          className='px-4 py-2 flex gap-2 flex-nowrap'
                          style={{
                            background: "#80b741",
                            color: "#ffffff",
                            width: "auto",
                            height: "44px",
                            borderRadius: "8px",
                            border: "none",
                            cursor: "pointer",
                            boxSizing: "border-box",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontFamily: "'PP Telegraf', 'Poppins', sans-serif",
                            fontWeight: 800,
                            fontSize: "16px",
                          }}
                          onClick={() => {
                            window.open('https://www.kayak.com/flights/NBO', '_blank');
                          }}
                        >
                          <span>
                            Connect with texperience
                          </span>
                          <span
                            aria-hidden
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: 34,
                              height: 34,
                              borderRadius: 8,
                              background: "rgba(255,255,255,0.12)",
                              flexShrink: 0,
                            }}
                          >
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                              <path d="M15.75 9.75V14.25C15.75 14.6478 15.592 15.0294 15.3107 15.3107C15.0294 15.592 14.6478 15.75 14.25 15.75H3.75C3.35218 15.75 2.97064 15.592 2.68934 15.3107C2.40804 15.0294 2.25 14.6478 2.25 14.25V3.75C2.25 3.35218 2.40804 2.97064 2.68934 2.68934C2.97064 2.40804 3.35218 2.25 3.75 2.25H8.25" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M15.75 2.25L9 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M11.25 2.25H15.75V6.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1">
                      <h3 className="text-3xl md:text-4xl font-extrabold mb-3">{step.title}</h3>

                      {step.num === "4" && (
                        <div className="mb-6 p-4 rounded-xl bg-[#F0F9F0] flex items-start gap-4">
                          <div className="mt-1 shrink-0">
                            <div className="flex items-center justify-center w-[22px] h-[22px] rounded-full bg-[#3B82F6] text-white">
                              <span className="font-serif italic font-extrabold text-[14px] leading-none">i</span>
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="font-bold text-black text-lg mb-1" style={{ fontFamily: "'PP Telegraf', 'Poppins', sans-serif" }}>Note to African Citizens</div>
                            <div className="text-sm text-[#333] leading-relaxed font-poppins">
                              Most African countries are exempt from requiring a visa. Check your eligibility at{" "}
                              <a
                                href="http://etakenya.go.ke/eligibility"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: '#f05a28', fontWeight: 500, textDecoration: 'none' }}
                              >
                                http://etakenya.go.ke/eligibility
                              </a>
                            </div>
                          </div>
                        </div>
                      )}

                      <p className="mb-4" style={{ color: "#0E0E0E" }}>{step.desc}</p>
                      <div className="flex flex-wrap gap-3">
                        {step.ctas.map((cta) => {
                          const isCustomGreen = [
                            "Search for Flight",
                            "Book Our Partner Hotel",
                            "Generate Visa Support Document",
                          ].includes(cta.label);

                          const solidClasses = "text-white rounded-md text-sm hover:opacity-90";
                          const outlineClasses = "border border-wada-a text-wada-a px-4 py-2 rounded-md text-sm hover:bg-wada-a/5";

                          const baseInline = isCustomGreen && cta.variant === "solid" ? { backgroundColor: "#80b741", color: "#fff" } : undefined;

                          const telegrafLabelStyle: React.CSSProperties = {
                            fontFamily: "'PP Telegraf', 'Poppins', sans-serif",
                            fontWeight: 800,
                            fontSize: 16,
                            display: "inline-block",
                          };


                          if (cta.label === "Register on lu.ma") {
                            return (
                              <div className='text-white' key='register-on-luma' style={{
                                ...(baseInline || {}),
                                pointerEvents: "auto",
                              }}>
                                <RegisterForSummitButton text="Register" className="text-white font-telegraf" />
                              </div>
                            );
                          }



                          if (cta.label === "Search for Flight") {
                            return (
                              <button
                                key={cta.label}
                                type="button"
                                className={solidClasses}
                                style={{
                                  ...(baseInline || {}),
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: 12,
                                  padding: "12px 20px",
                                  borderRadius: 8,
                                }}
                              >
                                <span style={telegrafLabelStyle}>{cta.label}</span>
                                <span
                                  aria-hidden
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: 34,
                                    height: 34,
                                    borderRadius: 8,
                                    background: "rgba(255,255,255,0.12)",
                                    flexShrink: 0,
                                  }}
                                >
                                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                    <path d="M15.75 9.75V14.25C15.75 14.6478 15.592 15.0294 15.3107 15.3107C15.0294 15.592 14.6478 15.75 14.25 15.75H3.75C3.35218 15.75 2.97064 15.592 2.68934 15.3107C2.40804 15.0294 2.25 14.6478 2.25 14.25V3.75C2.25 3.35218 2.40804 2.97064 2.68934 2.68934C2.97064 2.40804 3.35218 2.25 3.75 2.25H8.25" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M15.75 2.25L9 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M11.25 2.25H15.75V6.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                </span>
                              </button>
                            );
                          }


                          if (cta.label === "Generate Visa Support Document") {
                            return (
                              <button
                                key={cta.label}
                                type="button"
                                className={solidClasses}
                                tabIndex={0}
                                role="button"
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    setShowVisaModal(true);
                                  }
                                }}
                                onMouseDown={(e) => e.stopPropagation()}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowVisaModal(true);
                                }}
                                style={{
                                  backgroundColor: "#8AB74A",
                                  color: "#fff",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: 10,
                                  padding: "12px 20px",
                                  borderRadius: 8,
                                  cursor: "pointer",
                                  position: "relative",
                                  zIndex: 30,
                                  pointerEvents: "auto",
                                }}
                              >
                                <span style={telegrafLabelStyle}>{cta.label}</span>
                                <span
                                  aria-hidden
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0,
                                  }}
                                >
                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M14 2V8H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M8 13H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M8 17H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                </span>
                              </button>
                            );
                          }


                          if (cta.label === "Apply for eTA") {
                            return (
                              <button
                                key={cta.label}
                                type="button"
                                className={solidClasses}
                                onClick={() => window.open('https://www.etakenya.go.ke/', '_blank')}
                                style={{
                                  backgroundColor: "#F05A28",
                                  color: "#fff",
                                  display: "inline-flex",
                                  alignItems: "center",
                                  gap: 10,
                                  padding: "12px 20px",
                                  borderRadius: 8,
                                  cursor: "pointer",
                                  position: "relative",
                                  zIndex: 30,
                                  pointerEvents: "auto",
                                }}
                              >
                                <span style={telegrafLabelStyle}>{cta.label}</span>
                                <span
                                  aria-hidden
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0,
                                  }}
                                >
                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M15 3H21V9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M10 14L21 3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                </span>
                              </button>
                            );
                          }


                          return (
                            <button
                              key={cta.label}
                              type="button"
                              className={cta.variant === "solid" ? solidClasses + " px-4 py-2" : outlineClasses}
                              style={baseInline || undefined}
                            >
                              <span style={telegrafLabelStyle}>{cta.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>



      <section id="choose-adventure" className="w-full bg-white text-black py-16">
        <div className="max-w-[1440px] mx-auto px-4">
          <h2 className="choose-title">Choose Your Adventure</h2>

          <div className="h-4" aria-hidden />

          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Each add-on is all‑inclusive and seamlessly integrated into your itinerary.
          </p>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-[70px] items-start mb-16">
            <div className="flex flex-col justify-center order-2 md:order-1">
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "fit-content",
                  height: "44px",
                  gap: "10px",
                  paddingTop: "15px",
                  paddingRight: "20px",
                  paddingBottom: "15px",
                  paddingLeft: "20px",
                  borderRadius: "32px",
                  border: "1px solid #f05a28",
                  color: "#f05a28",
                  background: "#fff0ec",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: "12px",
                  textTransform: "uppercase",
                  opacity: 1,
                  boxSizing: "border-box",
                }}
                className="mb-3"
              >
                HACKATHON SPECIAL
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold mb-3">
                City Pulse <span style={{ color: "#f05a28" }}>Boda Boda</span> Experience
              </h3>
              <div className="flex items-center text-sm text-amber-500 mb-4">
                <svg className="w-4 h-4 mr-2 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2"></path></svg>
                <span className="date-telegraf text-wada-a">February 11 & 12</span>
                <span className="ml-2 text-gray-500">| To Sarit Centre</span>
              </div>
              <p className="text-gray-700 mb-4">
                Experience authentic Nairobi urban culture! Navigate the city <br className="hidden md:block" />
                like a local on the back of a Boda Boda motorcycle taxi to <br className="hidden md:block" />
                reach the Cardano Corner. Feel the pulse of the city as you <br className="hidden md:block" />
                weave through Nairobi&apos;s vibrant streets.
              </p>


              <div className="mb-4 space-y-3">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#f05a28] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-bold text-[#f05a28]">Complete Luxury Package</div>
                    <div className="text-sm text-gray-600">Arrive at the Hackathon venue quickly and efficiently, avoiding traffic jams</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#f05a28] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-bold text-[#f05a28]">Authentic photo opportunities</div>
                    <div className="text-sm text-gray-600">Capture the vibrant street life and energy of Nairobi&apos;s urban landscape</div>
                  </div>
                </div>
              </div>


              <div
                style={{
                  background: "#FFF5F2",
                  width: "100%",
                  maxWidth: "505.5px",
                  minHeight: "auto",
                  height: "auto",
                  padding: "20px",
                  borderRadius: "12px",
                  opacity: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  boxSizing: "border-box",
                  marginBottom: "16px"
                }}
              >
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#f05a28]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div className="panel-header-telegraf text-[#f05a28]">Priority is on your Safety</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700">
                  <div>• Approved safety helmets provided for all riders</div>
                  <div>• 5-star rated riders with verified credentials</div>
                  <div>• GPS tracking for entire journey</div>
                  <div>• Insurance coverage included</div>
                  <div>• Experienced riders with 1000+ completed trips</div>
                  <div>• 24/7 support hotline available during experience</div>
                </div>
              </div>

              <div style={{ marginTop: 12 }}>
                <button
                  type="button"
                  style={{
                    background: isBodaInCart ? "#000000" : "#80b741",
                    color: "#ffffff",
                    width: isBodaInCart ? "218px" : "100%",
                    maxWidth: isBodaInCart ? "218px" : "505.5px",
                    height: "54px",
                    padding: "20px 40px",
                    gap: "10px",
                    borderRadius: "6px",
                    border: "none",
                    cursor: isBodaInCart ? "default" : "pointer",
                    boxSizing: "border-box",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'PP Telegraf', 'Poppins', sans-serif",
                    fontWeight: 800,
                    fontSize: "16px",
                    lineHeight: "20px",
                    position: "relative",
                    zIndex: 20,
                    pointerEvents: "auto",
                    transition: "all 0.2s ease"
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={() => {
                    if (isBodaInCart) return;
                    const item = {
                      id: `boda-boda-${Date.now()}`,
                      title: "City Pulse Boda Boda Experience",
                      price: 15,
                      dateLabel: "February 11 & 12",
                      time: "To Sarit Centre",
                    };
                    addToCart(item);
                    showToast("Added to Cart");
                  }}
                >
                  {isBodaInCart ? "Added to Cart" : "Add to Cart – $15 per person"}
                </button>
                <div className="text-xs text-gray-500 mt-2">
                  * Available February 11th & 12th. Booking required in advance.
                </div>
              </div>
            </div>

            <div className="w-full order-1 md:order-2 relative group h-[462px] rounded-2xl overflow-hidden shadow-xl">
              <iframe
                src="https://drive.google.com/file/d/1hw3ghdzzHeunecnNr4LiWEtAeLzHfR4w/preview"
                className="w-full h-full border-none"
                allow="autoplay"
                title="Boda Boda Experience Video"
              />
            </div>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-[70px] items-start mb-16">
            <div className="w-full relative group h-[462px] rounded-2xl overflow-hidden">
              <div
                className="w-full h-full relative transition-transform duration-500 ease-in-out"
              >
                <Image
                  src={dawnImages[dawnIndex]}
                  alt="Dawn in the Wild"
                  fill
                  className="object-cover"
                  priority={false}
                />
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prevSlide(setDawnIndex, dawnImages.length);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#f05a28] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 hover:bg-[#d84a1d]"
                aria-label="Previous image"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  nextSlide(setDawnIndex, dawnImages.length);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#f05a28] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 hover:bg-[#d84a1d]"
                aria-label="Next image"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {dawnImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setDawnIndex(idx);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === dawnIndex ? "bg-[#f05a28] w-4" : "bg-white/50 hover:bg-white"
                      }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <button
                type="button"
                aria-label="Jump to Add-on One"
                className="mb-3"
                onClick={() => {
                  const el = document.getElementById("choose-adventure");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    const el = document.getElementById("choose-adventure");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "139px",
                  height: "44px",
                  gap: "10px",
                  paddingTop: "15px",
                  paddingRight: "20px",
                  paddingBottom: "15px",
                  paddingLeft: "20px",
                  borderRadius: "32px",
                  border: "1px solid #f05a28",
                  color: "#f05a28",
                  background: "#fff0ec",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: "12px",
                  textTransform: "uppercase",
                  opacity: 1,
                  boxSizing: "border-box",
                  cursor: "pointer",
                  position: "relative",
                  zIndex: 20,
                }}
              >
                ADD-ON ONE
              </button>
              <h3 className="text-3xl md:text-4xl font-extrabold mb-3">Dawn in the Wild</h3>
              <div className="mb-4">
                <div className="flex flex-wrap gap-3">
                  {addonDateOptions.map((opt) => {
                    const selected = selectedAddonDates.includes(opt.id);
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() =>
                          setSelectedAddonDates((prev) =>
                            prev.includes(opt.id) ? prev.filter((p) => p !== opt.id) : [...prev, opt.id]
                          )
                        }
                        aria-pressed={selected}
                        style={{
                          width: 245.25,
                          maxWidth: "100%",
                          height: 90,
                          padding: "10px 15px",
                          gap: 15,
                          display: "flex",
                          alignItems: "center",
                          boxSizing: "border-box",
                          borderRadius: 10,
                          border: selected ? "1px solid #f05a28" : "1px solid #E5E7EB",
                          background: "#ffffff",
                          transform: "rotate(0deg)",
                          opacity: 1,
                          cursor: "pointer",
                          flex: "0 0 auto",
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={selected}
                          onChange={(e) => {
                            e.stopPropagation();
                            setSelectedAddonDates((prev) =>
                              prev.includes(opt.id) ? prev.filter((p) => p !== opt.id) : [...prev, opt.id]
                            );
                          }}
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`Select ${opt.label}`}
                          style={{ cursor: "pointer", width: 18, height: 18, flex: "0 0 auto", accentColor: "#ee6b41" }}
                        />

                        <div style={{ marginLeft: 12, textAlign: "left", flex: "1 1 auto", minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                          <div style={{ fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{opt.label}</div>
                          <div className="text-sm text-gray-400" style={{ marginTop: 4 }}>{opt.time}</div>
                          <div style={{ marginTop: 8, color: "#f05a28", fontWeight: 700 }}>{`$${opt.price}`}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  ✓ Select the best date that works for you (or both!)
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                Begin your day with a breathtaking early morning game drive <br className="hidden md:block" />through Nairobi National Park, where the city skyline forms a <br className="hidden md:block" />stunning backdrop to lions, rhinos, and giraffes in their natural <br className="hidden md:block" />habitat. As the African sun rises, enjoy a gourmet breakfast in <br className="hidden md:block" /> the heart of the park, surrounded by the sights and sounds of <br className="hidden md:block" />the wilderness.
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6 list-disc pl-5 text-gray-700 mb-4">
                <li>Guided game drive</li>
                <li>Bush breakfast</li>
                <li>Park entry fees</li>
                <li>Transport included</li>
              </ul>
              <div className="mt-2">
                <div
                  style={{
                    background: "#e6f6e8",
                    width: "100%",
                    maxWidth: "505.5px",
                    minHeight: "89px",
                    height: "auto",
                    padding: "20px",
                    borderRadius: "12px",
                    transform: "rotate(0deg)",
                    opacity: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    boxSizing: "border-box",
                  }}
                >
                  <div className="panel-header-telegraf text-green-700">All‑Inclusive Experience</div>
                  <div className="text-gray-700 text-sm">Every detail taken care of, from sunrise to your return</div>
                </div>

                <div style={{ marginTop: 12 }}>
                  <div style={{ width: "100%", maxWidth: 505.5, marginTop: 0 }}>
                    <button
                      type="button"
                      disabled={selectedAddonDates.length === 0 && !isDawnInCart}
                      style={{
                        background: isDawnInCart ? "#000000" : (selectedAddonDates.length === 0 ? "#9CA3AF" : "#80b741"),
                        color: "#ffffff",
                        width: isDawnInCart ? "218px" : "100%",
                        height: "54px",
                        padding: "20px 40px",
                        gap: "10px",
                        borderRadius: "6px",
                        border: "none",
                        cursor: isDawnInCart ? "default" : (selectedAddonDates.length === 0 ? "not-allowed" : "pointer"),
                        boxSizing: "border-box",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "'PP Telegraf', 'Poppins', sans-serif",
                        fontWeight: 800,
                        fontSize: "16px",
                        lineHeight: "20px",
                        position: "relative",
                        zIndex: 20,
                        pointerEvents: "auto",
                        opacity: (selectedAddonDates.length === 0 && !isDawnInCart) ? 0.6 : 1,
                        transition: "all 0.2s ease"
                      }}
                      onMouseDown={(e) => e.stopPropagation()}
                      onClick={() => {
                        if (isDawnInCart) return;
                        if (selectedAddonDates.length === 0) {
                          showToast("Please select at least one date for Dawn in the Wild");
                          return;
                        }

                        const selectedDateOptions = addonDateOptions.filter(opt => selectedAddonDates.includes(opt.id));
                        const dateLabel = selectedDateOptions.length === 1
                          ? selectedDateOptions[0].label
                          : selectedDateOptions.map(opt => opt.label).join(" & ");
                        const time = selectedDateOptions[0].time;

                        const item = {
                          id: `dawn-wild-${Date.now()}`,
                          title: "Dawn in the Wild",
                          price: 320,
                          dateLabel,
                          time,
                        };
                        addToCart(item, selectedAddonDates.length);
                        showToast("Added to Cart");
                      }}
                    >
                      {isDawnInCart ? "Added to Cart" : (selectedAddonDates.length === 0
                        ? "Select a date to add to cart"
                        : `Add Selected Items to cart – $${320 * selectedAddonDates.length}`)
                      }
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-[70px] items-start">
            <div className="flex flex-col justify-center order-2 md:order-1">
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "139px",
                  height: "44px",
                  gap: "10px",
                  paddingTop: "15px",
                  paddingRight: "20px",
                  paddingBottom: "15px",
                  paddingLeft: "20px",
                  borderRadius: "32px",
                  border: "1px solid #f05a28",
                  color: "#f05a28",
                  background: "#fff0ec",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: "12px",
                  textTransform: "uppercase",
                  opacity: 1,
                  boxSizing: "border-box",
                }}
                className="mb-3"
              >
                ADD-ON TWO
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold mb-3">Maasai Mara Overnight</h3>
              <div className="flex items-center text-sm text-amber-500 mb-4">
                <svg className="w-4 h-4 mr-2 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2"></path></svg>
                <span className="date-telegraf text-wada-a">February 14–15</span>
                <span className="ml-2 text-gray-500"> | Overnight Stay</span>
              </div>
              <p className="text-gray-700 mb-4">
                Experience the magic of the Maasai Mara with an exclusive <br className="hidden md:block" />one-night safari adventure. Departing on February 14th,<br className="hidden md:block" /> immerse yourself in one of Africa&apos;s most spectacular wildlife <br className="hidden md:block" /> reserves. From sweeping savannas to abundant wildlife, this <br className="hidden md:block" /> overnight journey offers an intimate encounter with nature&apos;s  <br className="hidden md:block" />grandeur, returning refreshed on the 15th.
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6 list-disc pl-5 text-gray-700 mb-4">
                <li>Luxury accommodation</li>
                <li>Multiple game drives</li>
                <li>All meals included</li>
                <li>Expert guides</li>
                <li>Round-trip transport</li>
                <li>Park fees covered</li>
              </ul>
              <div className="mt-2">
                <div
                  style={{
                    background: "#e6f6e8",
                    width: "100%",
                    maxWidth: "505.5px",
                    minHeight: "89px",
                    height: "auto",
                    padding: "20px",
                    borderRadius: "12px",
                    transform: "rotate(0deg)",
                    opacity: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    boxSizing: "border-box",
                  }}
                >
                  <div className="panel-header-telegraf text-green-700">Complete All‑Inclusive Package</div>
                  <div className="text-gray-700 text-sm">Seamlessly integrated into Day 4 of the Summit</div>
                </div>

                <div style={{ marginTop: 12 }}>
                  <button
                    type="button"
                    style={{
                      background: isMaasaiInCart ? "#000000" : "#80b741",
                      color: "#ffffff",
                      width: isMaasaiInCart ? "218px" : "100%",
                      maxWidth: isMaasaiInCart ? "218px" : "505.5px",
                      height: "54px",
                      padding: "20px 40px",
                      gap: "10px",
                      borderRadius: "6px",
                      border: "none",
                      cursor: isMaasaiInCart ? "default" : "pointer",
                      boxSizing: "border-box",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'PP Telegraf', 'Poppins', sans-serif",
                      fontWeight: 800,
                      fontSize: "16px",
                      lineHeight: "20px",
                      position: "relative",
                      zIndex: 20,
                      pointerEvents: "auto",
                      transition: "all 0.2s ease"
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={() => {
                      if (isMaasaiInCart) return;
                      console.log("Add-on Two button clicked");
                      const item = {
                        id: `maasai-${Date.now()}`,
                        title: "Maasai Mara Overnight Safari",
                        price: 600,
                        dateLabel: "February 14–15",
                        time: "Overnight Stay",
                      };
                      addToCart(item);
                      showToast("Added to Cart");
                    }}
                  >
                    {isMaasaiInCart ? "Added to Cart" : "Add to Cart – $600"}
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full order-1 md:order-2 relative group h-[462px] rounded-2xl overflow-hidden">
              <div
                className="w-full h-full relative transition-transform duration-500 ease-in-out"
              >
                <Image
                  src={maasaiImages[maasaiIndex]}
                  alt="Maasai Mara Overnight"
                  fill
                  className="object-cover"
                  priority={false}
                />
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prevSlide(setMaasaiIndex, maasaiImages.length);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#f05a28] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 hover:bg-[#d84a1d]"
                aria-label="Previous image"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  nextSlide(setMaasaiIndex, maasaiImages.length);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#f05a28] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 hover:bg-[#d84a1d]"
                aria-label="Next image"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {maasaiImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setMaasaiIndex(idx);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === maasaiIndex ? "bg-[#f05a28] w-4" : "bg-white/50 hover:bg-white"
                      }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      <section id="your-cart" className="w-full bg-black text-white py-16">
        <div className="max-w-[760px] mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center mb-4" style={{ fontFamily: "'PP Telegraf', 'Poppins', sans-serif" }}>Your Cart</h2>
          <p className="text-center text-gray-300 max-w-xl mx-auto mb-8">Review your selections and proceed to checkout</p>


          {!isMounted ? (
            <div className="bg-white text-gray-600 rounded-xl p-12 flex flex-col items-center justify-center">
              <div className="animate-pulse text-xl font-semibold mt-4">Loading your cart...</div>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="bg-white text-gray-600 rounded-xl p-12 flex flex-col items-center justify-center">
              <ShoppingCart size={130} aria-hidden className="text-gray-700" />
              <div className="text-xl font-semibold mt-4">Your cart is empty</div>
              <div className="text-sm mt-2">Add safari experiences above to get started</div>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white text-black rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-bold" style={{ fontFamily: "'PP Telegraf', 'Poppins', sans-serif" }}>{item.title}</div>
                      <div className="text-sm text-gray-600">
                        {item.dateLabel ? (
                          <div>
                            <div>{item.dateLabel}</div>
                            <div className="text-xs text-gray-500" style={{ marginTop: 4 }}>
                              {item.time ? `${item.time} • ` : ""}${item.price} per person
                            </div>
                          </div>
                        ) : (
                          `$${item.price} per person`
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      aria-label={`Remove ${item.title}`}
                      className="text-orange-500 hover:opacity-80"
                      onClick={() => setCartItems((prev) => prev.filter((ci) => ci.id !== item.id))}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 24,
                        height: 24,
                        padding: 2,
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        boxSizing: "border-box",
                      }}
                    >
                      <span
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          padding: "2px 3px",
                          isolation: "isolate",
                          width: 24,
                          height: 24,
                          flex: "none",
                          order: 1,
                          flexGrow: 0,
                        }}
                      >
                        <svg
                          width="15.4"
                          height="20.4"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden
                          style={{ color: "currentColor" }}
                        >
                          <path d="M3 6h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M8 6v12a2 2 0 002 2h4a2 2 0 002-2V6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M10 11v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M14 11v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <label className="text-sm text-gray-700">Quantity:</label>
                      <div className="flex items-center border rounded">
                        <button
                          type="button"
                          onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 hover:bg-gray-100 text-gray-600"
                          style={{ cursor: "pointer" }}
                        >
                          −
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          min={1}
                          className="w-16 px-2 py-1 text-center border-l border-r"
                          onChange={(e) => {
                            const quantity = Math.max(1, parseInt(e.target.value) || 1);
                            updateItemQuantity(item.id, quantity);
                          }}
                          style={{ outline: "none" }}
                        />
                        <button
                          type="button"
                          onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-gray-100 text-gray-600"
                          style={{ cursor: "pointer" }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="text-xl font-bold text-orange-500">${item.price * item.quantity}</div>
                  </div>
                </div>
              ))}

              <div className="bg-white text-black rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold" style={{ fontFamily: "'PP Telegraf', 'Poppins', sans-serif" }}>Total</div>
                  <div className="text-2xl font-extrabold text-orange-500">${total}</div>
                </div>
              </div>

              <div
                className="bg-white text-black rounded-xl p-6 mx-auto shadow-sm"
                style={{
                  width: "100%",
                  maxWidth: 760,
                  display: "flex",
                  alignItems: "center",
                  gap: 15,
                  boxSizing: "border-box",
                  marginTop: 16,
                  minHeight: 90,
                  position: "relative",
                  zIndex: 200,
                  pointerEvents: "auto",
                }}
              >
                <input
                  id="agree-terms"
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  style={{ width: 18, height: 18, flex: "0 0 auto", position: "relative", zIndex: 201, pointerEvents: "auto", cursor: "pointer", accentColor: "#ee6b41" }}
                />
                <label htmlFor="agree-terms" style={{ marginLeft: 12, color: "#0F172A", lineHeight: 1.4, pointerEvents: "auto", cursor: "pointer" }}>
                  I agree to the{" "}
                  <a href="#" style={{ color: "#f05a28", fontWeight: 600, textDecoration: "underline" }}>
                    Terms and Conditions
                  </a>
                  . I understand that all bookings are subject to availability and that cancellation policies apply as outlined in the terms.
                </label>
              </div>

              <button
                type="button"
                className={`mt-6 rounded-md px-8 py-3 ${!termsAccepted || checkoutLoading ? "bg-gray-400 cursor-not-allowed" : "bg-orange-500 hover:opacity-90 cursor-pointer"
                  } text-white transition-all`}
                style={{
                  fontFamily: "'PP Telegraf', 'Poppins', sans-serif",
                  fontWeight: 700,
                  display: "block",
                  margin: "24px auto 0",
                  position: "relative",
                  zIndex: 502,
                  pointerEvents: "auto",
                }}
                onClick={handleCheckout}
                disabled={!termsAccepted || checkoutLoading}
              >
                {checkoutLoading ? "Redirecting to Checkout…" : "Proceed to Checkout →"}
              </button>
            </div>
          )}
        </div>
      </section>

      {toast.visible && (
        <div
          aria-live="polite"
          style={{
            position: "fixed",
            right: 20,
            bottom: 20,
            background: "#111827",
            color: "#fff",
            padding: "12px 16px",
            borderRadius: 8,
            boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
            zIndex: 60,
          }}
        >
          {toast.message}
        </div>
      )}

      {isMounted && (
        <div
          aria-hidden={false}
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            gap: 8,
            pointerEvents: "auto",
          }}
        >
          <button
            type="button"
            aria-label="Open cart"
            onClick={() => {
              const el = document.getElementById("your-cart");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              background: "#F05A28",
              color: "#fff",
              border: "none",
              borderRadius: 28,
              padding: "10px 20px",
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              cursor: "pointer",
              boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
              pointerEvents: "auto",
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <ShoppingCart size={18} aria-hidden />
            </div>
            <div
              style={{
                minWidth: 24,
                height: 24,
                borderRadius: 12,
                background: "#000",
                color: "#fff",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: 700,
                padding: "0 6px",
                boxSizing: "border-box",
              }}
            >
              {cartItems.reduce((acc, ci) => acc + ci.quantity, 0)}
            </div>
          </button>
        </div>
      )}

      {showVisaModal && (
        <div role="dialog" aria-modal="true" aria-label="Visa Application Modal">
          <div
            onClick={closeVisaModal}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(0,0,0,0.6)",
              zIndex: 9998,
            }}
          />

          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 640,
              height: 669,
              gap: 16,
              display: "flex",
              flexDirection: "column",
              padding: 30,
              borderRadius: 16,
              transformOrigin: "center",
              opacity: 1,
              background: "#ffffff",
              boxSizing: "border-box",
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
              zIndex: 9999,
              overflowY: "auto",
            }}
          >
            <button
              aria-label="close"
              onClick={closeVisaModal}
              style={{ cursor: "pointer", alignSelf: "flex-end", background: "transparent", border: "none", fontSize: 20 }}
            >
              ✕
            </button>

            {pdfPreviewUrl ? (
              <div className="flex flex-col h-full">
                <div className="flex-1 border rounded bg-gray-100 overflow-hidden mb-4 relative" style={{ minHeight: "400px" }}>
                  <iframe src={pdfPreviewUrl} className="w-full h-full absolute inset-0" title="PDF Preview" style={{ width: "100%", height: "100%" }}></iframe>
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <button
                    onClick={handleDownloadPdf}
                    type="button"
                    style={{
                      cursor: "pointer",
                      flex: 1,
                      background: "#f05a28",
                      color: "#fff",
                      padding: "12px 16px",
                      borderRadius: 8,
                      fontWeight: 700,
                    }}
                  >
                    Download
                  </button>
                  <button
                    onClick={() => setPdfPreviewUrl(null)}
                    type="button"
                    style={{
                      cursor: "pointer",
                      width: 120,
                      border: "1px solid #f05a28",
                      color: "#f05a28",
                      background: "#fff",
                      padding: "12px 8px",
                      borderRadius: 8,
                      fontWeight: 700,
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <h2 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "#000000" }}>Visa Application Support</h2>
                  <p style={{ margin: 0, color: "#6B7280", fontSize: 14 }}>
                    Fill in your details below and we&apos;ll generate a PDF document to support your Kenya visa application.
                  </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 8 }}>
                  <div>
                    <label htmlFor="visa-fullName" className="text-sm font-medium text-gray-700">Full Name *</label>
                    <input id="visa-fullName" value={visaForm.fullName} onChange={(e) => handleVisaChange("fullName", e.target.value)} placeholder="Full Name" className="border rounded px-3 py-2 w-full mt-1 text-black placeholder-gray-600" style={{ color: "#000" }} />
                  </div>
                  <div>
                    <label htmlFor="visa-dob" className="text-sm font-medium text-gray-700">Date of Birth *</label>
                    <input id="visa-dob" type="date" value={visaForm.dob} onChange={(e) => handleVisaChange("dob", e.target.value)} className="border rounded px-3 py-2 w-full mt-1 text-black" style={{ color: "#000" }} />
                  </div>

                  <div>
                    <label htmlFor="visa-passport" className="text-sm font-medium text-gray-700">Passport Number *</label>
                    <input id="visa-passport" value={visaForm.passport} onChange={(e) => handleVisaChange("passport", e.target.value)} placeholder="Passport Number" className="border rounded px-3 py-2 w-full mt-1 text-black placeholder-gray-600" style={{ color: "#000" }} />
                  </div>
                  <div>
                    <label htmlFor="visa-nationality" className="text-sm font-medium text-gray-700">Nationality *</label>
                    <input id="visa-nationality" value={visaForm.nationality} onChange={(e) => handleVisaChange("nationality", e.target.value)} placeholder="Nationality" className="border rounded px-3 py-2 w-full mt-1 text-black placeholder-gray-600" style={{ color: "#000" }} />
                  </div>

                  <div style={{ gridColumn: "1 / -1" }}>
                    <label htmlFor="visa-email" className="text-sm font-medium text-gray-700">Email Address *</label>
                    <input id="visa-email" value={visaForm.email} onChange={(e) => handleVisaChange("email", e.target.value)} placeholder="Email Address" className="border rounded px-3 py-2 w-full mt-1 text-black placeholder-gray-600" style={{ color: "#000" }} />
                  </div>

                  <div style={{ gridColumn: "1 / -1" }}>
                    <label htmlFor="visa-phone" className="text-sm font-medium text-gray-700">Phone Number *</label>
                    <input id="visa-phone" value={visaForm.phone} onChange={(e) => handleVisaChange("phone", e.target.value)} placeholder="Phone Number" className="border rounded px-3 py-2 w-full mt-1 text-black placeholder-gray-600" style={{ color: "#000" }} />
                  </div>

                  <div>
                    <label htmlFor="visa-arrival" className="text-sm font-medium text-gray-700">Arrival Date *</label>
                    <input id="visa-arrival" type="date" value={visaForm.arrival} onChange={(e) => handleVisaChange("arrival", e.target.value)} className="border rounded px-3 py-2 w-full mt-1 text-black" style={{ color: "#000" }} />
                  </div>
                  <div>
                    <label htmlFor="visa-departure" className="text-sm font-medium text-gray-700">Departure Date *</label>
                    <input id="visa-departure" type="date" value={visaForm.departure} onChange={(e) => handleVisaChange("departure", e.target.value)} className="border rounded px-3 py-2 w-full mt-1 text-black" style={{ color: "#000" }} />
                  </div>
                </div>

                <div style={{ display: "flex", gap: 12, marginTop: 16, alignItems: "center" }}>
                  <button
                    onClick={handleGeneratePdf}
                    type="button"
                    style={{
                      cursor: "pointer",
                      flex: 1,
                      background: "#f05a28",
                      color: "#fff",
                      padding: "12px 16px",
                      borderRadius: 8,
                      fontWeight: 700,
                    }}
                  >
                    Generate PDF Document
                  </button>
                  <button
                    onClick={() => setShowVisaModal(false)}
                    type="button"
                    style={{
                      cursor: "pointer",
                      width: 120,
                      border: "1px solid #f05a28",
                      color: "#f05a28",
                      background: "#fff",
                      padding: "12px 8px",
                      borderRadius: 8,
                      fontWeight: 700,
                    }}
                  >
                    Cancel
                  </button>
                </div>

                <p style={{ marginTop: 8, fontSize: 12, color: "#6B7280" }}>Fields marked with * are required.</p>
              </>
            )}
          </div>
        </div>
      )}

      <section className="w-full bg-black text-white py-20 border-t-4 border-t-wada-a">
        <div className="max-w-[1440px] mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Essential <span className="text-[#f05a28]">Travel Info</span>
          </h2>
          <p className="text-lg text-white mb-16 max-w-2xl mx-auto">
            Everything you need to know for a comfortable visit to Kenya
          </p>

          <div className="flex flex-wrap justify-center gap-8">
            <div
              className="bg-white text-black flex flex-col items-center shadow-lg"
              style={{ width: '320px', height: '386px', gap: '12px', borderRadius: '15px', padding: '20px 20px 32px 20px', opacity: 1, transform: 'rotate(0deg)' }}
            >
              <div className="w-14 h-14 rounded-full bg-[#FFF1F2] flex items-center justify-center mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f05a28" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.5 19c.703 0 1.332-.332 1.767-.833a3 3 0 0 0-1.767-5.167 3 3 0 0 0-5.102-2.142A5 5 0 1 0 5 13.633V15a4 4 0 0 0 4 4h8.5Z" />
                </svg>
              </div>
              <h3 className="text-2xl font-black mb-4 text-center w-full">Weather & Packing</h3>
              <ul className="space-y-3 text-sm text-black w-full mb-4">
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Temperature: 26–30°C</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Light, breathable clothing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Smart-casual attire for summit</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>•</span>
                  <span>Sunscreen, hat & sunglasses</span>
                </li>
              </ul>
            </div>

            <div
              className="bg-white text-black flex flex-col items-center shadow-lg"
              style={{ width: '320px', height: '386px', gap: '12px', borderRadius: '15px', padding: '20px 20px 32px 20px', opacity: 1, transform: 'rotate(0deg)' }}
            >
              <div className="w-14 h-14 rounded-full bg-[#FFF1F2] flex items-center justify-center mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f05a28" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v2m0 16v2M18 7v4a6 6 0 0 1-12 0V7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1Z" />
                  <path d="M8 2v4m8-4v4" />
                </svg>
              </div>
              <h3 className="text-2xl font-black mb-4 text-center w-full">Electricity & Adapters</h3>

              <div
                className="bg-[#FFF1F2] text-center flex flex-col justify-center mx-auto mb-4"
                style={{ width: '280px', height: '84px', borderRadius: '15px', padding: '10px', gap: '5px' }}
              >
                <div className="text-2xl font-black text-[#f05a28]">Type G</div>
                <div className="text-sm text-gray-500">UK-Style Plug</div>
              </div>

              <div className="w-full space-y-2 mb-4" style={{ width: '280px' }}>
                <div className="flex justify-between items-center text-[15px]">
                  <span style={{ color: '#9CA3AF' }}>Voltage:</span>
                  <span className="font-extrabold text-black">240V</span>
                </div>
                <div className="flex justify-between items-center text-[15px]">
                  <span style={{ color: '#9CA3AF' }}>Frequency:</span>
                  <span className="font-extrabold text-black">50Hz</span>
                </div>
              </div>

              <div className="mt-auto w-full">
                <div className="border-t border-gray-100 mb-3 w-full" />
                <div className="text-[13px] text-center leading-relaxed" style={{ color: '#6B7280' }}>
                  <span className="font-bold" style={{ color: '#374151' }}>Tip:</span> Bring a universal travel adapter<br />for your electronics
                </div>
              </div>
            </div>

            <div
              className="bg-white text-black flex flex-col items-center shadow-lg"
              style={{ width: '320px', height: '386px', gap: '12px', borderRadius: '15px', padding: '20px 20px 32px 20px', opacity: 1, transform: 'rotate(0deg)' }}
            >
              <div className="w-14 h-14 rounded-full bg-[#FFF1F2] flex items-center justify-center mb-4">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f05a28" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C20.1 10.7 19 10.3 18 10V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v6c-1 .3-2.1.7-2.5 1.1C2.7 11.3 2 12.1 2 13v3c0 .6.4 1 1 1h2" />
                  <path d="M7 17v1c0 .6.4 1 1 1h8c.6 0 1-.4 1-1v-1" />
                  <circle cx="7" cy="17" r="2" />
                  <circle cx="17" cy="17" r="2" />
                </svg>
              </div>
              <h3 className="text-2xl font-black mb-2 text-center w-full">Transportation</h3>

              <p className="text-[14px] text-center mb-4 leading-normal px-2" style={{ color: '#333' }}>
                We can arrange convenient transportation  for your stay in Kenya
              </p>

              <ul className="space-y-3 w-full mb-6 text-[14px]" style={{ color: '#333' }}>
                <li className="flex items-start gap-2">
                  <span className="shrink-0">•</span>
                  <span>Airport pickup service</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="shrink-0">•</span>
                  <span>Local transport to events</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="shrink-0">•</span>
                  <span>Safari transfers included</span>
                </li>
              </ul>

              <div className="mt-auto w-full">
                <div className="border-t border-gray-100 mb-3 w-full" />
                <div className="text-[13px] text-center leading-relaxed px-4" style={{ color: '#9CA3AF' }}>
                  Contact us to arrange your <br />transportation needs
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
