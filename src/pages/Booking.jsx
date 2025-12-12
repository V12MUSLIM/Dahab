"use client";

import { useState, lazy, Suspense, useEffect, useCallback, useMemo,useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { toast } from "sonner";

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
import { useAuthStore } from "@/store/authStore";

import { TAX_RATE, BOOKING_STEPS } from "@/components/booking/Data/constants";
import { API_ENDPOINTS } from "@/components/booking/Data/endpoints";
import { isValidEmail, isValidPhone, validateDates } from "@/components/booking/servicesBooking/utils/validation";
import { sanitizeInput, safeArray } from "@/components/booking/servicesBooking/utils/sanitization";
import { PrimaryButton, SecondaryButton } from "@/components/customComponents/ButtonVarients";

import api from "@/api/axios";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-12">
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent" />
  </div>
);

const extractPrice = (priceString) => {
  if (typeof priceString === "number") return priceString;
  if (typeof priceString === "string") {
    const match = priceString.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  }
  return 0;
};

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const preselectedData = location?.state;

  const { user } = useAuthStore();

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
      id: d._id || `dest-${idx}`,
      price: extractPrice(d.price),
      name: d.title || d.name,
    }));
    return arr;
  }, [destinationsRaw]);

  const flatExperiences = useMemo(() => {
    const cats = safeArray(experiencesRaw);
    const flat = cats
      .flatMap((cat) => safeArray(cat?.experiences))
      .map((e, idx) => ({
        ...e,
        id: e._id || `exp-${idx}`,
        price: extractPrice(e.price || e.priceAmount),
        name: e.title || e.name,
      }));
    return flat;
  }, [experiencesRaw]);

  const restaurants = useMemo(() => {
    const arr = safeArray(restaurantsRaw).map((r, idx) => ({
      ...r,
      id: r._id || `rest-${idx}`,
      price: extractPrice(r.price),
      name: r.name || r.title,
    }));
    return arr;
  }, [restaurantsRaw]);

  const cafes = useMemo(() => {
    const arr = safeArray(cafesRaw).map((c, idx) => ({
      ...c,
      id: c._id || `cafe-${idx}`,
      price: extractPrice(c.price),
      name: c.name || c.title,
    }));
    return arr;
  }, [cafesRaw]);

  const hotels = useMemo(() => {
    const arr = safeArray(hotelsRaw).map((h, idx) => ({
      ...h,
      id: h._id || `hotel-${idx}`,
      pricePerNight: extractPrice(h.pricePerNight || h.price),
      name: h.title || h.name || `Hotel ${idx + 1}`,
    }));
    return arr;
  }, [hotelsRaw]);

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
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
    name: preselectedData?.preselected?.name || "",
    email: preselectedData?.preselected?.email || "",
    phone: preselectedData?.preselected?.phone || "",
    specialRequests: preselectedData?.preselected?.specialRequests || "",
  });
const istoast=useRef(false);
  useEffect(() => {
    if (
      (preselectedData?.type === "restaurant" || preselectedData?.type === "cafe") &&
      preselectedData.preselected &&
      preselectedData.preselected.checkIn &&
      preselectedData.preselected.name &&
      preselectedData.preselected.email &&
      preselectedData.preselected.phone
    ) {
      setCurrentStep(2);
    }
   
  }, [preselectedData]);

  useEffect(() => {
    if (!preselectedData?.type || !preselectedData?.item) return;

    const item = preselectedData.item;
    const id = item._id;

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
    } else if (field && id) {
      setBookingData((prev) => {
        const arr = safeArray(prev[field]);
        return arr.includes(id) ? prev : { ...prev, [field]: [...arr, id] };
      });
    }
    if(istoast.current)return;
     istoast.current = true;
    toast.success(`✅ ${item.name || item.title || "Item added successfully!"}`);
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
    if (!validateStep(currentStep)) return;

    setCurrentStep((s) => {
      if (
        s === 2 &&
        (preselectedData?.type === "restaurant" || preselectedData?.type === "cafe") &&
        bookingData.name &&
        bookingData.email &&
        bookingData.phone
      ) {
        return 4;
      }
      return Math.min(s + 1, 5);
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
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
      const mappedServices = [
        ...bookingData.selectedDestinations
          .map((id) => {
            const d = destinations.find((item) => item.id === id);
            if (!d || !d._id) return null;
            return { item: d._id, kind: "Destination" };
          })
          .filter(Boolean),
        ...bookingData.selectedExperiences
          .map((id) => {
            const e = flatExperiences.find((item) => item.id === id);
            if (!e || !e._id) return null;
            return { item: e._id, kind: "Experience" };
          })
          .filter(Boolean),
        ...bookingData.selectedRestaurants
          .map((id) => {
            const r = restaurants.find((item) => item.id === id);
            if (!r || !r._id) return null;
            return { item: r._id, kind: "Restaurant" };
          })
          .filter(Boolean),
        ...bookingData.selectedCafes
          .map((id) => {
            const c = cafes.find((item) => item.id === id);
            if (!c || !c._id) return null;
            return { item: c._id, kind: "Cafe" };
          })
          .filter(Boolean),
        ...(bookingData.includeStay && bookingData.roomType
          ? (() => {
              const h = hotels.find((item) => item.id === bookingData.roomType);
              if (!h || !h._id) return [];
              return [{ item: h._id, kind: "Stay" }];
            })()
          : []),
      ];

      const tempPaymentIntentId = paymentMethod?.id || `pending_${Date.now()}`;

      const payload = {
        userId: user?._id || user?.id || "674b09e04f4c369e1cc56e3e",
        tripDetails: {
          checkIn: bookingData.checkIn,
          checkOut: bookingData.checkOut,
          adults: bookingData.adults,
          children: bookingData.children,
        },
        services: mappedServices,
        userInfo: {
          name: bookingData.name,
          phone: bookingData.phone,
          email: bookingData.email,
          specialRequests: bookingData.specialRequests || "",
        },
        amount: total,
        paymentDetails: {
          paymentIntentId: tempPaymentIntentId,
          status: "pending",
          amount: total,
          currency: "usd",
        },
        phase: "trip-details",
      };

      const response = await api.post(API_ENDPOINTS.CREATE_BOOKING, payload);

      if (response.data?.success) {
        toast.success("🎉 Booking confirmed! Redirecting...");
        setTimeout(() => {
          navigate(`/booking-confirmation/${response.data.booking._id}`, {
            state: { total, booking: response.data.booking },
          });
        }, 1500);
      } else {
        toast.error(response.data?.message || "Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("❌ Booking error:", error);

      let errorMessage = "An unexpected error occurred. Please try again.";

      if (error.code === "TIMEOUT") {
        errorMessage = "Request timed out. Please check your connection.";
      } else if (error.code === "NETWORK_ERROR") {
        errorMessage = "Network error. Please check your internet connection.";
      } else if (error.response) {
        const status = error.response.status;
        if (status === 500) {
          errorMessage = error.response.data?.message || "Server error. Please check the data and try again.";
        } else if (status === 400) {
          errorMessage = error.response.data?.message || "Invalid booking data.";
        } else if (status === 404) {
          errorMessage = "Booking endpoint not found.";
        } else {
          errorMessage = error.response.data?.message || `Server error: ${status}`;
        }
      } else if (error.request) {
        errorMessage = "No response from server. Please try again.";
      }

      toast.error("❌ " + errorMessage);
      setPaymentError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const isDataLoading = destLoading || expLoading || dineLoading || stayLoading;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <BookingStepsNav steps={BOOKING_STEPS} currentStep={currentStep} />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 py-12 px-4">
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
  