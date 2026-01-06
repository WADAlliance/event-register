"use client";

import React from "react";
import Image from "next/image";

export default function TripPlanner() {
  type CartItem = { id: string; title: string; price: number; dateLabel?: string; time?: string };
  const [cartItems, setCartItems] = React.useState<CartItem[]>([
    // leave Dawn out so it only appears when user selects dates
    { id: "2", title: "Maasai Mara Overnight Safari", price: 350 },
  ]);

  // toast for success feedback
  const [toast, setToast] = React.useState<{ visible: boolean; message?: string }>({ visible: false });
  const showToast = (message: string) => {
    setToast({ visible: true, message });
    window.setTimeout(() => setToast({ visible: false }), 3000);
  };

  // Visa modal state + form (open from the "Generate Visa Support Document" CTA)
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
  const handleGeneratePdf = () => {
    // TODO: actual PDF generation - close modal for now and log
    setShowVisaModal(false);
    console.log("Generate visa PDF with", visaForm);
    showToast("Visa support document generated");
  };

  // helper to add an item but avoid duplicates by id
  const addToCart = (item: CartItem) => {
    setCartItems((prev) => {
      if (prev.some((p) => p.id === item.id)) return prev;
      return [...prev, item];
    });
    // no per-item toast here; batch toast will be used when adding multiple
  };

  // helper to add multiple items at once and show a single success toast
  const addMultipleToCart = (items: CartItem[]) => {
    setCartItems((prev) => {
      const next = [...prev];
      items.forEach((it) => {
        if (!next.some((p) => p.id === it.id)) next.push(it);
      });
      return next;
    });
    showToast(`${items.length} item${items.length === 1 ? "" : "s"} added to cart`);
  };

  const [guests, setGuests] = React.useState<number>(2);
  const [selectedAddonDates, setSelectedAddonDates] = React.useState<string[]>([]);
  const addonDateOptions = [
    { id: "2026-02-10", label: "February 10th", time: "Early Morning", price: 150 },
    { id: "2026-02-14", label: "February 14th", time: "Early Morning", price: 150 },
  ];
  const subtotal = cartItems.reduce((s, i) => s + i.price, 0);
  const total = subtotal * (guests || 1);
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
        {/* Full-bleed background image */}
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
              Elevate your journey with curated experiences that take you deeper into <br /> the heart of Africa&apos;s wilderness. Two extraordinary
              opportunities to <br />witness the raw beauty of Kenya&apos;s most iconic landscapes, thoughtfully <br />designed to complement your four-day
              adventure.
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
              DISCOVER MORE
            </div>
            <div className="mt-2 text-2xl text-gray-300 arrow-bounce">⌄</div>
          </div>
        </div>
      </section>

      {/*  Plan Your Trip steps section */}
      <section className="w-full bg-white text-black py-16">
        <div className="max-w-[900px] mx-auto px-4 text-center">
          <h2 className="choose-title mb-2">Plan Your Trip</h2>
          <p className="text-sm mb-8">Follow these simple steps to prepare for your unforgettable safari adventure</p>

          <div className="space-y-8">
            {[
              {
                num: "1",
                title: "Book Your Flight",
                desc: "Secure your flights to Jomo Kenyatta International Airport (NBO) in Nairobi. We recommend booking early for the best rates and availability.",
                ctas: [{ label: "Search for Flight", variant: "solid" }]
              },
              {
                num: "2",
                title: "Arrange Accommodation",
                desc: "Choose from our curated hotel partner or explore Airbnb options for a personalized stay in Nairobi.",
                ctas: [{ label: "Book Our Partner Hotel", variant: "solid" }, { label: "View Airbnb Recommendations", variant: "outline" }]
              },
              {
                num: "3",
                title: "Get Your Visa",
                desc: "Most visitors need a visa to enter Kenya. Complete our quick form and we'll generate a PDF document you can submit with your visa application.",
                ctas: [{ label: "Generate Visa Support Document", variant: "solid" }]
              }
            ].map((step) => {
              const bigCardStyle = {
                width: "100%",
                maxWidth: 1000,
                 height: 594,
                 gap: 15,
                 transform: "rotate(0deg)",
                 opacity: 1,
                 borderRadius: 15,
                 padding: 30,
                 boxSizing: "border-box",
               } as React.CSSProperties;
              const smallClass = "bg-white rounded-xl shadow-lg p-6 text-left flex items-start gap-6";
              const bigClass = "bg-white shadow-lg text-left flex items-start";
              return (
                <div
                  key={step.title}
                  className={step.title === "Arrange Accommodation" ? bigClass : smallClass}
                  style={step.title === "Arrange Accommodation" ? bigCardStyle : undefined}
                >
                  <div className="flex-shrink-0">
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

                  {/* Special rendering for "Arrange Accommodation" to match the design in the provided image */}
                  {step.title === "Arrange Accommodation" ? (
                    <div className="flex-1">
                      {/* keep the step heading & description above the hotel card */}
                      <h3 className="text-3xl md:text-4xl font-extrabold mb-3">{step.title}</h3>
                      <p className="mb-4" style={{ color: "#0E0E0E" }}>{step.desc}</p>

                      {/* Tamarind Tree Hotel card (matches provided layout) */}
                      <div
                        style={{
                          width: "100%",
                          maxWidth: 855,
                          height: 290,
                          gap: 20,
                          borderRadius: 15,
                          padding: 20,
                          background: "#fff0ec",
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: "space-between",
                          boxSizing: "border-box",
                          overflow: "hidden",
                        }}
                        className="mx-auto shadow-md"
                      >
                        <div style={{ flex: 1 }}>
                          <div className="text-xl font-extrabold mb-1" style={{ fontFamily: "'PP Telegraf', 'Poppins', sans-serif" }}>Tamarind Tree Hotel</div>
                          <div className="text-sm text-gray-600 mb-4">Luxury 5-star accommodation in central Nairobi</div>

                          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-gray-700 list-disc pl-5" style={{ lineHeight: 1.9 }}>
                            <div>Free WiFi</div>
                            <div>Fitness Center</div>
                            <div>Swimming Pool</div>
                            <div>24/7 Room Service</div>
                            <div>Spa &amp; Wellness</div>
                            <div>Airport Shuttle</div>
                            <div>Restaurant &amp; Bar</div>
                            <div>Concierge Service</div>
                          </div>

                          <div className="mt-4 text-sm" style={{ color: "#EB5626", fontWeight: 600 }}>Exclusive discounted rates for safari guests</div>
                        </div>

                        <div style={{ width: 140, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>
                          <div aria-hidden>
                            <div style={{ display: "flex", gap: 6 }}>
                              {Array.from({ length: 5 }).map((_, i) => (
                                <svg key={i} className="w-5 h-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.164c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.59 2.676c-.784.57-1.84-.197-1.54-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.421 9.383c-.783-.57-.38-1.81.588-1.81h4.164a1 1 0 00.95-.69L9.05 2.927z" />
                                </svg>
                              ))}
                            </div>
                          </div>

                          {/* removed Figma comment badge */}
                        </div>
                      </div>

                      <div className="mt-4">
                        <button
                          type="button"
                          style={{
                            background: "#80b741",
                            color: "#ffffff",
                            width: "100%",
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
                            const item = {
                              id: `tamarind-${Date.now().toString()}`,
                              title: "Tamarind Tree Hotel – Discounted Room",
                              price: 120,
                            };
                            addToCart(item);
                          }}
                        >
                          Book Our Discounted Rooms – $120 per night
                        </button>

                        <div className="mt-3 text-sm">
                          <div>Need a different room? <button type="button" className="text-orange-500 font-semibold" style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer" }}>Book directly through the hotel</button></div>
                          <div className="mt-1">Prefer a local experience? <button type="button" className="text-orange-500 font-semibold" style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer" }}>Browse Airbnb options in Nairobi</button></div>
                        </div>
                      </div>
                   </div>
                 ) : (
                    <div className="flex-1">
                      <h3 className="text-3xl md:text-4xl font-extrabold mb-3">{step.title}</h3>
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

                          // restore icon + layout for "Search for Flight"
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
                                    <path d="M15.75 9.75V14.25C15.75 14.6478 15.592 15.0294 15.3107 15.3107C15.0294 15.592 14.6478 15.75 14.25 15.75H3.75C3.35218 15.75 2.97064 15.592 2.68934 15.3107C2.40804 15.0294 2.25 14.6478 2.25 14.25V3.75C2.25 3.35218 2.40804 2.97064 2.68934 2.68934C2.97064 2.40804 3.35218 2.25 3.75 2.25H8.25" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M15.75 2.25L9 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M11.25 2.25H15.75V6.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </span>
                              </button>
                            );
                          }

                          // restore icon + layout for "Generate Visa Support Document"
                          if (cta.label === "Generate Visa Support Document") {
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
                                  cursor: "pointer",
                                  pointerEvents: "auto",
                                  position: "relative",
                                  zIndex: 9999,
                                }}
                               tabIndex={0}
                               role="button"
                               onKeyDown={(e) => {
                                 if (e.key === "Enter" || e.key === " ") {
                                   e.preventDefault();
                                   setShowVisaModal(true);
                                 }
                               }}
                                onClick={() => {
                                 console.log("Generate Visa button clicked");
                                  setShowVisaModal(true);
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
                                    background: "#2FAF3A",
                                    flexShrink: 0,
                                  }}
                                >
                                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                    <path d="M4 2h6l4 4v8a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M10 2v4h4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M6.5 9.5h5" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
                                    <path d="M6.5 11.5h5" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
                                  </svg>
                                </span>
                              </button>
                            );
                          }

                          // default CTA rendering
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
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">Each add-on is all‑inclusive and seamlessly integrated into your itinerary.</p>

          {/* Row 1 — Image Left / Content Right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[70px] items-start mb-16">
            <div className="w-full">
              <Image
                src="/Frame%202147207770.png"
                alt="Dawn in the Wild"
                width={575.5}
                height={462}
                style={{ transform: "rotate(0deg)", opacity: 1 }}
                className="object-cover rounded-2xl"
                priority={false}
              />
            </div>

            <div className="flex flex-col justify-center">
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
                    border: "1px solid #EB5626",
                    color: "#EB5626",
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
                ADD-ON ONE
              </div>
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
                          border: selected ? "1px solid #EB5626" : "1px solid #E5E7EB",
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
                          style={{ cursor: "pointer", width: 18, height: 18, flex: "0 0 auto" }}
                        />

                        <div style={{ marginLeft: 12, textAlign: "left", flex: "1 1 auto", minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                          <div style={{ fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{opt.label}</div>
                          <div className="text-sm text-gray-400" style={{ marginTop: 4 }}>{opt.time}</div>
                          <div style={{ marginTop: 8, color: "#EB5626", fontWeight: 700 }}>{`$${opt.price} per person`}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
                <div className="text-sm text-gray-500 mt-2">✓ Select both dates for a complete experience</div>
              </div>
              <p className="text-gray-700 mb-4">
                Begin your day with a breathtaking early morning game drive <br />through Nairobi National Park, where the city skyline forms a <br />stunning backdrop to lions, rhinos, and giraffes in their natural <br />habitat. As the African sun rises, enjoy a gourmet breakfast in <br /> the heart of the park, surrounded by the sights and sounds of <br />the wilderness.
              </p>
              <ul className="grid grid-cols-2 gap-y-2 gap-x-6 list-disc pl-5 text-gray-700 mb-4">
                <li>Guided game drive</li>
                <li>Bush breakfast</li>
                <li>Park entry fees</li>
                <li>Transport included</li>
              </ul>
              <div className="mt-2">
                <div
                  style={{
                    background: "#e6f6e8",
                    width: "505.5px",
                    height: "89px",
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
                  <div style={{ width: 505.5, marginTop: 0 }}>
                    <button
                      type="button"
                      style={{
                        background: "#80b741",
                        color: "#ffffff",
                        width: "100%",
                        height: "44px",
                        borderRadius: "8px",
                        border: "none",
                        cursor: "pointer",
                        pointerEvents: "auto",
                        position: "relative",
                        zIndex: 999,
                        boxSizing: "border-box",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "'PP Telegraf', 'Poppins', sans-serif",
                        fontWeight: 800,
                        fontSize: "16px",
                        lineHeight: "20px",
                      }}
                      onClick={() => {
                        // add only the currently selected addon date items to the cart (one item per date)
                        if (!selectedAddonDates.length) {
                          showToast("Select at least one date");
                          return;
                        }
                        const toAdd = selectedAddonDates
                          .map((id) => addonDateOptions.find((o) => o.id === id))
                          .filter(Boolean)
                          .map((opt) => ({
                            id: `addon-${opt!.id}`,
                            title: `Dawn in the Wild`,
                            price: opt!.price,
                            dateLabel: opt!.label,
                            time: opt!.time,
                          })) as CartItem[];
                        addMultipleToCart(toAdd);
                      }}
                    >
                      Add Selected Date(s) to cart
                    </button>
                    <div className="text-gray-700 text-sm mt-2 text-center">Please select at least one date above</div>
                  </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Row 2 — Content Left / Image Right */}
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
                  border: "1px solid #EB5626",
                  color: "#EB5626",
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
              Experience the magic of the Maasai Mara with an exclusive <br />one-night safari adventure. Departing on February 14th,<br /> immerse yourself in one of Africa&apos;s most spectacular wildlife <br /> reserves. From sweeping savannas to abundant wildlife, this <br /> overnight journey offers an intimate encounter with nature&apos;s  <br />grandeur, returning refreshed on the 15th.
              </p>
              <ul className="grid grid-cols-2 gap-y-2 gap-x-6 list-disc pl-5 text-gray-700 mb-4">
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
                    width: "505.5px",
                    height: "89px",
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
                      background: "#80b741",
                      color: "#ffffff",
                      width: "505.5px",
                      height: "44px",
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                      pointerEvents: "auto",
                      position: "relative",
                      zIndex: 999,
                      boxSizing: "border-box",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'PP Telegraf', 'Poppins', sans-serif",
                      fontWeight: 800,
                      fontSize: "16px",
                      lineHeight: "20px",
                    }}
                    onClick={() => {
                      const item = {
                        id: "maasai-2026-02-14",
                        title: "Maasai Mara Overnight Safari",
                        price: 350,
                        dateLabel: "February 14–15",
                        time: "Overnight Stay",
                      };
                      addToCart(item);
                      showToast(`${item.title} added to cart`);
                    }}
                  >
                    Add to Cart – $350 per person
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full order-1 md:order-2">
              <Image
                src="/Frame%2018.png"
                alt="Maasai Mara Overnight"
                width={575.5}
                height={462}
                style={{ transform: "rotate(0deg)", opacity: 1 }}
                className="object-cover rounded-2xl"
                priority={false}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Cart section (added below Choose Your Adventure) */}
      <section className="w-full bg-black text-white py-16">
        <div className="max-w-[760px] mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-center mb-4" style={{ fontFamily: "'PP Telegraf', 'Poppins', sans-serif" }}>Your Cart</h2>
          <p className="text-center text-gray-300 max-w-xl mx-auto mb-8">Review your selections and proceed to checkout</p>

          {/* Cart items */}
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white text-black rounded-xl p-5 flex items-center justify-between">
                <div>
                  <div className="font-bold" style={{ fontFamily: "'PP Telegraf', 'Poppins', sans-serif" }}>{item.title}</div>
                  <div className="text-sm text-gray-600">
                    {item.dateLabel ? (
                      <div>
                        <div>{item.dateLabel}</div>
                        <div className="text-xs text-gray-500" style={{ marginTop: 4 }}>
                          {item.time ? `${item.time} • ` : ""}Per person
                        </div>
                      </div>
                    ) : (
                      "Per person"
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-xl font-bold text-orange-500">${item.price}</div>
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
                    {/* Frame */}
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
                        <path d="M3 6h18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 6v12a2 2 0 002 2h4a2 2 0 002-2V6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M10 11v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M14 11v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            ))}

            {/* Subtotal / guests */}
            <div className="bg-white text-black rounded-xl p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-2xl font-bold mb-2" style={{ fontFamily: "'PP Telegraf', 'Poppins', sans-serif" }}>Subtotal:</div>
                  <div className="text-sm text-gray-600">Price shown is per person. Final amount will be calculated at checkout.</div>
                </div>
                <div className="text-2xl font-extrabold text-orange-500">${subtotal}</div>
              </div>

              <div className="mt-6">
                <label className="block text-sm text-gray-700 mb-2">Number of Guests</label>
                <input
                  type="number"
                  value={guests}
                  min={1}
                  step={1}
                  inputMode="numeric"
                  aria-label="Number of guests"
                  onChange={(e) => {
                    const v = Math.max(1, Math.floor(Number(e.target.value) || 1));
                    setGuests(v);
                  }}
                  onWheel={(e) => (e.currentTarget as HTMLInputElement).blur()}
                  className="w-full rounded border px-3 py-2"
                  style={{ cursor: "text", pointerEvents: "auto", position: "relative", zIndex: 50 }}
                />

                {/* divider line between guests input and total */}
                <hr className="my-6 border-t border-gray-200 w-full" />

                {/* Total & CTA */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-full max-w-[760px] flex items-center justify-between px-2">
                <div className="text-2xl font-bold" style={{ fontFamily: "'PP Telegraf', 'Poppins', sans-serif" }}>Total</div>
                <div className="text-2xl font-extrabold text-orange-500">${total}</div>
              </div>
              </div>
            </div>

      
            </div>

            <button
                type="button"
                className="mt-6 bg-orange-500 text-white rounded-md px-8 py-3"
                style={{ fontFamily: "'PP Telegraf', 'Poppins', sans-serif", fontWeight: 700, display: "block", margin: "24px auto 0" }}
              >
                Proceed to Checkout →
              </button>
          </div>
        </div>
      </section>

      {/* toast / popup */}
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

      {/* Visa Application Modal */}
      {showVisaModal && (
        <div role="dialog" aria-modal="true" aria-label="Visa Application Modal">
          {/* backdrop */}
          <div
            onClick={() => setShowVisaModal(false)}
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

          {/* centered modal */}
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
              onClick={() => setShowVisaModal(false)}
              style={{ cursor: "pointer", alignSelf: "flex-end", background: "transparent", border: "none", fontSize: 20 }}
            >
              ✕
            </button>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <h2 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "#000000" }}>Visa Application Support</h2>
               <p style={{ margin: 0, color: "#6B7280", fontSize: 14 }}>
Fill in your details below and we&amp;apos;ll generate a PDF document to support your Kenya visa application.
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
                <input id="visa-arrival" type="datetime-local" value={visaForm.arrival} onChange={(e) => handleVisaChange("arrival", e.target.value)} className="border rounded px-3 py-2 w-full mt-1 text-black" style={{ color: "#000" }} />
               </div>
               <div>
                 <label htmlFor="visa-departure" className="text-sm font-medium text-gray-700">Departure Date *</label>
                <input id="visa-departure" type="datetime-local" value={visaForm.departure} onChange={(e) => handleVisaChange("departure", e.target.value)} className="border rounded px-3 py-2 w-full mt-1 text-black" style={{ color: "#000" }} />
               </div>
             </div>
 
            <div style={{ display: "flex", gap: 12, marginTop: 16, alignItems: "center" }}>
              <button
                onClick={handleGeneratePdf}
                type="button"
                style={{
                  cursor: "pointer",
                  flex: 1,
                  background: "#EB5626",
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
                  border: "1px solid #EB5626",
                  color: "#EB5626",
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
          </div>
        </div>
      )}
    </div>
  );
}
