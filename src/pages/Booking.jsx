"use client";

import { useState, lazy, Suspense, useEffect, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

// Lazy sections
const TestimonialsSection = lazy(() => import("@/components/sections/TestimonialsSection"));
const SocialMediaSection = lazy(() => import("@/components/sections/SocialMediaSection"));

// Components
import BookingStepsNav from "@/components/booking/BookingStepsNav";
import BookingSummary from "@/components/booking/BookingSummary";
import WhyBookWithUs from "@/components/booking/WhyBookWithUs";
import ErrorBanner from "@/components/booking/ErrorBanner";
import TripDetails from "@/components/booking/TripDetails";
import SelectServices from "@/components/booking/SelectServices";
import PersonalInfo from "@/components/booking/PersonalInfo";
import ReviewDetails from "@/components/booking/ReviewDetails";
import Payment from "@/components/booking/Payment";

// Hooks (data from backend)
import { useDestinations } from "@/hooks/useDestination";
import { useExperiences } from "@/hooks/useExperience";
import { useDine } from "@/hooks/useDine";
import { useStay } from "@/hooks/useStay";

// Utils & constants
import { TAX_RATE, BOOKING_STEPS } from "@/components/booking/Data/constants";
import { API_ENDPOINTS } from "@/components/booking/Data/endpoints";
import { isValidEmail, isValidPhone, validateDates } from "@/components/booking/servicesBooking/utils/validation";
import { sanitizeInput, safeArray } from "@/components/booking/servicesBooking/utils/sanitization";
import { getCsrfToken } from "@/components/booking/servicesBooking/utils/csrf";

// Stripe setup
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const preselectedData = location?.state;

  // Fetch data from backend APIs
  const { destinations: destinationsRaw } = useDestinations() ?? {};
  const { experiences: experiencesRaw } = useExperiences() ?? {};
  const { dine: dineRaw } = useDine() ?? {};
  const { stay: stayRaw } = useStay() ?? {};

  // Prepare safe arrays
  const destinations = useMemo(() => safeArray(destinationsRaw), [destinationsRaw]);
  const flatExperiences = useMemo(() => {
    const cats = safeArray(experiencesRaw);
    return cats.flatMap((cat) => safeArray(cat?.experiences));
  }, [experiencesRaw]);

  // Split dine data
  const restaurants = useMemo(() => safeArray(dineRaw).filter((d) => d.type?.toLowerCase() === "restaurant"), [dineRaw]);
  const cafes = useMemo(() => safeArray(dineRaw).filter((d) => d.type?.toLowerCase() === "cafe"), [dineRaw]);
  const hotels = useMemo(() => safeArray(stayRaw), [stayRaw]);

  // States
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  // Booking data
  const [bookingData, setBookingData] = useState({
    checkIn: preselectedData?.preselected?.checkIn || "",
    checkOut: preselectedData?.preselected?.checkOut || "",
    adults: Number(preselectedData?.preselected?.adults) || 2,
    children: Number(preselectedData?.preselected?.children) || 0,
    includeStay: !!preselectedData?.preselected?.includeStay || false,
    roomType: preselectedData?.preselected?.roomType || "",
    selectedDestinations: safeArray(preselectedData?.preselected?.selectedDestinations),
    selectedExperiences: safeArray(preselectedData?.preselected?.selectedExperiences),
    selectedRestaurants: safeArray(preselectedData?.preselected?.selectedRestaurants),
    selectedCafes: safeArray(preselectedData?.preselected?.selectedCafes),
    name: "",
    email: "",
    phone: "",
    specialRequests: "",
  });

  // Handle preselected data (from other pages)
  useEffect(() => {
    if (!preselectedData?.type || !preselectedData?.item) return;
    const id = preselectedData.item?.id || `ext-${Math.random().toString(36).slice(2, 8)}`;
    const fieldMap = {
      experience: "selectedExperiences",
      destination: "selectedDestinations",
      restaurant: "selectedRestaurants",
      cafe: "selectedCafes",
      stay: "includeStay",
    };
    const field = fieldMap[preselectedData.type];

    if (field === "includeStay") {
      setBookingData((prev) => ({ ...prev, includeStay: true }));
    } else if (field) {
      setBookingData((prev) => ({
        ...prev,
        [field]: safeArray(prev[field]).includes(id)
          ? prev[field]
          : [...safeArray(prev[field]), id],
      }));
    }

    setSuccessMessage(`✅ ${preselectedData.item?.name || "Added"}`);
    setTimeout(() => setSuccessMessage(null), 4000);
  }, [preselectedData]);

  // Update booking fields
  const updateBookingData = useCallback((field, value) => {
    const clean = typeof value === "string" ? sanitizeInput(value) : value;
    setBookingData((prev) => ({ ...prev, [field]: clean }));
    setValidationErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  // Toggle selected item
  const toggleItem = useCallback((field, id) => {
    setBookingData((prev) => {
      const arr = safeArray(prev[field]);
      const exists = arr.includes(id);
      return { ...prev, [field]: exists ? arr.filter((x) => x !== id) : [...arr, id] };
    });
  }, []);

  // Calculate nights
  const nights = useMemo(() => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 0;
    const diff = new Date(bookingData.checkOut) - new Date(bookingData.checkIn);
    return diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 0;
  }, [bookingData.checkIn, bookingData.checkOut]);

  // Calculate total price (client-side only)
  const { subtotal, taxes, total } = useMemo(() => {
    let sub = 0;

    // Stay
    if (bookingData.includeStay && bookingData.roomType) {
      const selectedHotel = hotels.find((h) => h.id === bookingData.roomType);
      sub += (selectedHotel?.pricePerNight || 0) * nights;
    }

    // Services
    sub += safeArray(bookingData.selectedDestinations).length * 50;
    sub += safeArray(bookingData.selectedExperiences).length * 75;
    sub += safeArray(bookingData.selectedRestaurants).length * 40;
    sub += safeArray(bookingData.selectedCafes).length * 15;

    const tax = Math.round(sub * TAX_RATE);
    return { subtotal: sub, taxes: tax, total: sub + tax };
  }, [bookingData, nights, hotels]);

  // Step validation
  const validateStep = useCallback(
    (step) => {
      const errors = {};
      if (step === 1) {
        const dv = validateDates(bookingData.checkIn, bookingData.checkOut);
        if (!dv.valid) errors.dates = dv.error;
      }
      if (step === 3) {
        if (bookingData.name.trim().length < 2) errors.name = "Name too short";
        if (!isValidEmail(bookingData.email)) errors.email = "Invalid email";
        if (!isValidPhone(bookingData.phone)) errors.phone = "Invalid phone";
      }
      setValidationErrors(errors);
      return Object.keys(errors).length === 0;
    },
    [bookingData]
  );

  // Step navigation
  const handleNext = () => validateStep(currentStep) && setCurrentStep((s) => Math.min(s + 1, 5));
  const handlePrev = () => setCurrentStep((s) => Math.max(s - 1, 1));

  // Submit booking to backend
  const handleSubmitBooking = async (paymentMethod) => {
    if (!validateStep(3)) return;
    setLoading(true);
    setPaymentError(null);

    try {
      const payload = {
        ...bookingData,
        total,
        nights,
        paymentMethodId: paymentMethod?.id,
      };
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}${API_ENDPOINTS.CREATE_BOOKING}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-CSRF-Token": getCsrfToken() },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (result?.success) {
        navigate(`/booking-confirmation/${result.bookingId}`, { state: { total } });
      } else {
        setPaymentError(result?.message || "Booking failed");
      }
    } catch {
      setPaymentError("Error processing booking");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Success message */}
      <AnimatePresence>
        {successMessage && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="fixed top-4 right-4 bg-green-50 border border-green-300 p-4 rounded-lg shadow">
              {successMessage}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero section */}
      <section className="h-[40vh] flex flex-col justify-center bg-gradient-to-br from-yellow-600 to-orange-600 text-white px-6">
        <h1 className="text-4xl font-bold">Plan Your Perfect Trip</h1>
        <p>Book stays, destinations, and experiences easily</p>
      </section>

      {/* Steps navigation */}
      <BookingStepsNav steps={BOOKING_STEPS} currentStep={currentStep} />

      {/* Main content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 py-12 px-4">
        {/* Left column */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            <motion.div key={currentStep} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {currentStep === 1 && (
                <TripDetails {...{ bookingData, updateBookingData, validationErrors, nights, hotels }} />
              )}
              {currentStep === 2 && (
                <SelectServices
                  {...{ bookingData, destinations, flatExperiences, toggleItem, restaurants, cafes }}
                />
              )}
              {currentStep === 3 && (
                <PersonalInfo {...{ bookingData, updateBookingData, validationErrors }} />
              )}
              {currentStep === 4 && (
                <ReviewDetails
                  {...{ bookingData, nights, subtotal, taxes, total, destinations, flatExperiences }}
                />
              )}
              {currentStep === 5 && (
                <Suspense fallback={<div>Loading payment...</div>}>
                  <Elements stripe={stripePromise}>
                    <Payment
                      {...{ bookingData, total, handleSubmitBooking, handlePrev, loading, paymentError }}
                    />
                  </Elements>
                </Suspense>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            <button onClick={handlePrev} disabled={currentStep === 1} className="btn-secondary">
              ← Previous
            </button>
            {currentStep < 5 && (
              <button onClick={handleNext} className="btn-primary">
                Next Step →
              </button>
            )}
          </div>
        </div>

        {/* Right column */}
        <div className="lg:col-span-1 space-y-6 sticky top-24">
          <BookingSummary {...{ bookingData, nights, subtotal, taxes, total }} />
          <WhyBookWithUs />
        </div>
      </div>

      {/* Testimonials and social media sections */}
      <Suspense fallback={<div />}>
        <TestimonialsSection />
        <SocialMediaSection
          badge="Connect"
          header="Stay Connected"
          description="Follow our latest adventures and offers"
        />
      </Suspense>
    </div>
  );
}
