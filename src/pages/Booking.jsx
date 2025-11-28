"use client";

import { useState, lazy, Suspense, useEffect, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckCircle2, X } from "lucide-react";

const TestimonialsSection = lazy(() => import("@/components/sections/TestimonialsSection"));
const SocialMediaSection = lazy(() => import("@/components/sections/SocialMediaSection"));

import BookingStepsNav from "@/components/booking/BookingStepsNav";
import BookingSummary from "@/components/booking/BookingSummary";
import WhyBookWithUs from "@/components/booking/WhyBookWithUs";
import TripDetails from "@/components/booking/TripDetails";
import SelectServices from "@/components/booking/SelectServices";
import PersonalInfo from "@/components/booking/PersonalInfo";
import ReviewDetails from "@/components/booking/ReviewDetails";
import Payment from "@/components/booking/Payment";

import { useDestinations } from "@/hooks/useDestination";
import { useExperiences } from "@/hooks/useExperience";
import { useDine } from "@/hooks/useDine";
import { useStay } from "@/hooks/useStay";

import { TAX_RATE, BOOKING_STEPS } from "@/components/booking/Data/constants";
import { API_ENDPOINTS } from "@/components/booking/Data/endpoints";
import { isValidEmail, isValidPhone, validateDates } from "@/components/booking/servicesBooking/utils/validation";
import { sanitizeInput, safeArray } from "@/components/booking/servicesBooking/utils/sanitization";
import { getCsrfToken } from "@/components/booking/servicesBooking/utils/csrf";
import { PrimaryButton, SecondaryButton } from "@/components/customComponents/ButtonVarients";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-12">
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent" />
  </div>
);

const extractPrice = (priceString) => {
  if (typeof priceString === 'number') return priceString;
  if (typeof priceString === 'string') {
    const match = priceString.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  }
  return 0;
};

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const preselectedData = location?.state;

  const destinationsData = useDestinations();
  const experiencesData = useExperiences();
  const dineData = useDine();
  const stayData = useStay();

  const destinationsRaw = destinationsData?.destinations || [];
  const experiencesRaw = experiencesData?.experiences || [];
  
  const restaurantsRaw = dineData?.restaurants || [];
  const cafesRaw = dineData?.cafes || [];
  const hotelsRaw = stayData?.data || [];

  const destLoading = destinationsData?.loading || false;
  const expLoading = experiencesData?.loading || false;
  const dineLoading = dineData?.isLoading || false;
  const stayLoading = stayData?.isLoading || false;

  const destinations = useMemo(() => {
    const arr = safeArray(destinationsRaw).map((d, idx) => ({
      ...d,
      id: d._id || d.id || d.IdPage || `dest-${idx}`,
      price: extractPrice(d.price),
      name: d.title || d.name
    }));
    return arr;
  }, [destinationsRaw]);

  const flatExperiences = useMemo(() => {
    const cats = safeArray(experiencesRaw);
    const flat = cats.flatMap((cat) => safeArray(cat?.experiences)).map((e, idx) => ({
      ...e,
      id: e._id || e.id || e.IdPage || `exp-${idx}`,
      price: extractPrice(e.price || e.priceAmount),
      name: e.title || e.name
    }));
    return flat;
  }, [experiencesRaw]);

  const restaurants = useMemo(() => {
    const arr = safeArray(restaurantsRaw).map((r, idx) => ({
      ...r,
      id: r._id || r.id || `rest-${idx}`,
      price: extractPrice(r.price),
      name: r.name || r.title
    }));
    return arr;
  }, [restaurantsRaw]);

  const cafes = useMemo(() => {
    const arr = safeArray(cafesRaw).map((c, idx) => ({
      ...c,
      id: c._id || c.id || `cafe-${idx}`,
      price: extractPrice(c.price),
      name: c.name || c.title
    }));
    return arr;
  }, [cafesRaw]);

  const hotels = useMemo(() => {
    const arr = safeArray(hotelsRaw).map((h, idx) => ({
      ...h,
      id: h._id || h.id || `hotel-${idx}`,
      pricePerNight: extractPrice(h.pricePerNight || h.price),
      name: h.title || h.name || `Hotel ${idx + 1}`
    }));
    return arr;
  }, [hotelsRaw]);

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

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

  useEffect(() => {
    if (!preselectedData?.type || !preselectedData?.item) return;
    
    const item = preselectedData.item;
    const id = item._id || item.id || item.IdPage || `ext-${Math.random().toString(36).slice(2, 8)}`;
    
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
        [field]: safeArray(prev[field]).includes(id) ? prev[field] : [...safeArray(prev[field]), id],
      }));
    }

    setSuccessMessage(`✅ ${item.title || item.name || "Item added successfully!"}`);
    setTimeout(() => setSuccessMessage(null), 4000);
  }, [preselectedData]);

  const updateBookingData = useCallback((field, value) => {
    const clean = typeof value === "string" ? sanitizeInput(value) : value;
    setBookingData((prev) => ({ ...prev, [field]: clean }));
    setValidationErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const toggleItem = useCallback((field, id) => {
    setBookingData((prev) => {
      const arr = safeArray(prev[field]);
      const exists = arr.includes(id);
      return { ...prev, [field]: exists ? arr.filter((x) => x !== id) : [...arr, id] };
    });
  }, []);

  const nights = useMemo(() => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 0;
    const diff = new Date(bookingData.checkOut) - new Date(bookingData.checkIn);
    return diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 0;
  }, [bookingData.checkIn, bookingData.checkOut]);

  const { subtotal, taxes, total } = useMemo(() => {
    let sub = 0;

    if (bookingData.includeStay && bookingData.roomType) {
      const selectedHotel = hotels.find((h) => h.id === bookingData.roomType);
      if (selectedHotel) {
        sub += (selectedHotel.pricePerNight || 0) * nights;
      } else {
        const selectedRoom = BOOKING_STEPS.find((r) => r.value === bookingData.roomType);
        sub += (selectedRoom?.price || 0) * nights;
      }
    }

    safeArray(bookingData.selectedDestinations).forEach((id) => {
      const dest = destinations.find((d) => d.id === id);
      sub += dest?.price || 50;
    });

    safeArray(bookingData.selectedExperiences).forEach((id) => {
      const exp = flatExperiences.find((e) => e.id === id);
      sub += exp?.price || 75;
    });

    safeArray(bookingData.selectedRestaurants).forEach((id) => {
      const restaurant = restaurants.find((r) => r.id === id);
      sub += restaurant?.price || 40;
    });

    safeArray(bookingData.selectedCafes).forEach((id) => {
      const cafe = cafes.find((c) => c.id === id);
      sub += cafe?.price || 15;
    });

    const tax = Math.round(sub * TAX_RATE);
    return { subtotal: sub, taxes: tax, total: sub + tax };
  }, [bookingData, nights, hotels, destinations, flatExperiences, restaurants, cafes]);

  const validateStep = useCallback(
    (step) => {
      const errors = {};
      if (step === 1) {
        const dv = validateDates(bookingData.checkIn, bookingData.checkOut);
        if (!dv.valid) errors.dates = dv.error;
      }
      if (step === 3) {
        if (bookingData.name.trim().length < 2) errors.name = "Name must be at least 2 characters";
        if (!isValidEmail(bookingData.email)) errors.email = "Please enter a valid email address";
        if (!isValidPhone(bookingData.phone)) errors.phone = "Please enter a valid phone number";
      }
      setValidationErrors(errors);
      return Object.keys(errors).length === 0;
    },
    [bookingData]
  );

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((s) => Math.min(s + 1, 5));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    setCurrentStep((s) => Math.max(s - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
      const res = await fetch(`${import.meta.env.VITE_API_URL}${API_ENDPOINTS.CREATE_BOOKING}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-CSRF-Token": getCsrfToken() },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const result = await res.json();

      if (result?.success) {
        setSuccessMessage("🎉 Booking confirmed! Redirecting...");
        setTimeout(() => {
          navigate(`/booking-confirmation/${result.bookingId}`, { state: { total } });
        }, 1500);
      } else {
        setPaymentError(result?.message || "Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      setPaymentError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const isDataLoading = destLoading || expLoading || dineLoading || stayLoading;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <AnimatePresence>
        {successMessage && (
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed top-6 right-6 z-[9999]"
          >
            <div className="relative overflow-hidden bg-gradient-to-r from-green-50 via-emerald-50 to-green-50 dark:from-green-900/30 dark:via-emerald-900/30 dark:to-green-900/30 border-2 border-green-400 dark:border-green-600 rounded-xl shadow-2xl shadow-green-500/20 dark:shadow-green-900/40 backdrop-blur-xl min-w-[320px] max-w-md">
              <div className="flex items-start gap-3 p-4">
                <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <p className="flex-1 font-medium text-sm text-green-900 dark:text-green-100 leading-relaxed">
                  {successMessage}
                </p>
                <button
                  onClick={() => setSuccessMessage(null)}
                  className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 hover:bg-green-100 dark:hover:bg-green-900/30 rounded p-1 transition-all duration-200"
                  aria-label="Dismiss"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="h-[40vh] flex flex-col justify-center items-center text-center bg-gradient-to-br from-amber-600 to-orange-600 dark:from-amber-700 dark:to-orange-700 text-white px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Plan Your Perfect Trip
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-white/90"
        >
          Book stays, destinations, and experiences easily
        </motion.p>
      </section>

      <BookingStepsNav steps={BOOKING_STEPS} currentStep={currentStep} />

      <div className="max-w-7xl  mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 py-12 px-4">
        <div className="lg:col-span-2">
          {isDataLoading && currentStep === 2 ? (
            <LoadingSpinner />
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {currentStep === 1 && (
                  <TripDetails
                    bookingData={bookingData}
                    updateBookingData={updateBookingData}
                    validationErrors={validationErrors}
                    nights={nights}
                    hotels={hotels}
                  />
                )}
                {currentStep === 2 && (
                  <SelectServices
                    bookingData={bookingData}
                    destinations={destinations}
                    flatExperiences={flatExperiences}
                    toggleItem={toggleItem}
                    updateBookingData={updateBookingData}
                    restaurants={restaurants}
                    cafes={cafes}
                    hotels={hotels}
                  />
                )}
                {currentStep === 3 && (
                  <PersonalInfo
                    bookingData={bookingData}
                    updateBookingData={updateBookingData}
                    validationErrors={validationErrors}
                  />
                )}
                {currentStep === 4 && (
                  <ReviewDetails
                    bookingData={bookingData}
                    nights={nights}
                    subtotal={subtotal}
                    taxes={taxes}
                    total={total}
                    destinations={destinations}
                    flatExperiences={flatExperiences}
                    restaurants={restaurants}
                    cafes={cafes}
                  />
                )}
                {currentStep === 5 && (
                  <Suspense fallback={<LoadingSpinner />}>
                    <Elements stripe={stripePromise}>
                      <Payment
                        bookingData={bookingData}
                        total={total}
                        handleSubmitBooking={handleSubmitBooking}
                        handlePrev={handlePrev}
                        loading={loading}
                        paymentError={paymentError}
                      />
                    </Elements>
                  </Suspense>
                )}
              </motion.div>
            </AnimatePresence>
          )}

          <div className="flex justify-between gap-4 mt-8">
            <SecondaryButton onClick={handlePrev} disabled={currentStep === 1} className="flex-1 sm:flex-none">
              ← Previous
            </SecondaryButton>
            {currentStep < 5 && (
              <PrimaryButton onClick={handleNext} className="flex-1 sm:flex-none">
                Next Step →
              </PrimaryButton>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
            <BookingSummary
              bookingData={bookingData}
              nights={nights}
              subtotal={subtotal}
              taxes={taxes}
              total={total}
              destinations={destinations}
              flatExperiences={flatExperiences}
              restaurants={restaurants}
              cafes={cafes}
              hotels={hotels}
            />
            <WhyBookWithUs />
          </div>
        </div>
      </div>

      <Suspense fallback={<div className="h-64" />}>
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
