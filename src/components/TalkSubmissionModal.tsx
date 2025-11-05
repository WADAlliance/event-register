"use client";

import { useState, useEffect } from 'react';
import Image from "next/image";
import Link from 'next/link';

interface TalkSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TalkSubmissionModal({ isOpen, onClose }: TalkSubmissionModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      setTimeout(() => setShouldRender(false), 300);
    }
  }, [isOpen]);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    country: '',
    city: '',
    currentRole: '',
    organization: '',
    company: '',
    countryOfResidence: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // Google Forms URL
      const formId = '1FAIpQLSffm9uXJGn-k2oD7ph4yD2wCcDDQBgc7Zs3FNHDNH8QZ872Dw';
      const formUrl = `https://docs.google.com/forms/d/e/${formId}/formResponse`;
      
      // Map form data to Google Forms entry IDs
      const formBody = new URLSearchParams({
        'entry.2082386034': formData.fullName,
        'entry.1518956792': formData.email,
        'entry.1513156153': formData.phoneNumber,
        'entry.1249549536': formData.country,
        'entry.1066551403': formData.city,
        'entry.2109282116': formData.currentRole,
        'entry.1264311192': formData.organization,
        'entry.1620997398': formData.company,
        'entry.2107178416': formData.countryOfResidence,
      });

      // Submit to Google Forms
      await fetch(formUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString(),
      });

      // Google Forms with no-cors doesn't return status, so assume success
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setFormData({
          fullName: '',
          email: '',
          phoneNumber: '',
          country: '',
          city: '',
          currentRole: '',
          organization: '',
          company: '',
          countryOfResidence: '',
        });
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!shouldRender) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isVisible ? 'bg-black/70' : 'bg-black/0'
      }`}
      onClick={onClose}
    >
      <div 
        className={`bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/10 transition-all duration-300 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white p-6 pb-0">
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
              className="absolute right-0 text-black text-3xl leading-none cursor-pointer"
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <p className="text-sm text-black mt-2 font-poppins text-center p-10 pb-0">
            Apply to speak at the Cardano Africa Tech Summit and inspire innovation across the continent.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6  space-y-6">
          {/* Success Message */}
          {success && (
            <div className="bg-cardano-c/20 border border-cardano-c text-cardano-c px-4 py-3 rounded font-poppins">
              Submission successful! Thank you.
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-wada-c/20 border border-wada-c text-wada-c px-4 py-3 rounded font-poppins">
              {error}
            </div>
          )}

          {/* Personal Information */}
          <div>
            <h3 className="text-xl font-telegraf font-extrabold text-black mb-4">Personal Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-poppins text-black mb-1">
                  Full Name*
                </label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-black/40 rounded-md focus:outline-none focus:ring-2 focus:ring-wada-c text-white font-poppins placeholder:text-black/60"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-poppins text-black mb-1">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-black/40 rounded-md focus:outline-none focus:ring-2 focus:ring-wada-c text-white font-poppins placeholder:text-black/60"
                  />
                </div>

                <div>
                  <label className="block text-sm font-poppins text-black mb-1">
                    Phone Number*
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-black/40 rounded-md focus:outline-none focus:ring-2 focus:ring-wada-c text-white font-poppins placeholder:text-black/60"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-poppins text-black mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-black/40 rounded-md focus:outline-none focus:ring-2 focus:ring-wada-c text-white font-poppins placeholder:text-black/60"
                  />
                </div>

                <div>
                  <label className="block text-sm font-poppins text-black mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-black/40 rounded-md focus:outline-none focus:ring-2 focus:ring-wada-c text-white font-poppins placeholder:text-black/60"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Professional Details */}
          <div>
            <h3 className="text-lg font-custom font-extrabold text-white mb-4">Professional Details</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-poppins text-black mb-1">
                    Current Role / Job Title*
                  </label>
                  <input
                    type="text"
                    name="currentRole"
                    placeholder="Role"
                    value={formData.currentRole}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-black/40 rounded-md focus:outline-none focus:ring-2 focus:ring-wada-c text-white font-poppins placeholder:text-black/60"
                  />
                </div>

                <div>
                  <label className="block text-sm font-poppins text-black mb-1">
                    Organization / Company*
                  </label>
                  <input
                    type="text"
                    name="organization"
                    placeholder="Organization / Company"
                    value={formData.organization}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-black/40 rounded-md focus:outline-none focus:ring-2 focus:ring-wada-c text-white font-poppins placeholder:text-black/60"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-poppins text-black mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    placeholder="Country"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white/5 border border-black/40 rounded-md focus:outline-none focus:ring-2 focus:ring-wada-c text-white font-poppins placeholder:text-black/60"
                  />
                </div>

                <div>
                  <label className="block text-sm font-poppins text-black mb-1">
                    Country / City of Residence
                  </label>
                  <input
                    type="text"
                    name="countryOfResidence"
                    placeholder="City"
                    value={formData.countryOfResidence}
                    onChange={handleChange}
                    className="w-full px-3 py-2 bg-white/5 border border-black/40 rounded-md focus:outline-none focus:ring-2 focus:ring-wada-c text-white font-poppins placeholder:text-black/60"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md bg-cardano-c px-8 py-3 font-medium font-poppins text-white transition hover:bg-cardano-c/90 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Register as a Speaker'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
