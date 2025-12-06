// stores/useStayFormStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialFormData = {
  // category wrapper
  category: "",
  categoryId: "",
  categoryDescription: "",

  // stay basic info
  name: "",
  subtitle: "",
  description: "",
  fullDescription: "",
  badge: "",
  type: "hotel",
  propertyType: "",
  location: "",

  // numeric/meta
  rating: "",
  totalReviews: "",
  starRating: "",
  minStay: "",
  maxGuests: "",
  totalRooms: "",
  pricePerNight: "",
  currency: "USD",
  yearBuilt: "",
  lastRenovated: "",

  href: "",
  bookingUrl: "",

  // location details
  city: "",
  region: "",
  country: "",
  address: "",
  lat: "",
  lng: "",
  nearbyAttractions: "",

  // policies
  cancellation: "",
  payment: "",
  children: "",
  pets: "",
  smoking: "",
  checkInFrom: "",
  checkInUntil: "",
  checkOut: "",

  // amenities
  generalAmenities: "",
  recreationAmenities: "",
  servicesAmenities: "",
  diningAmenities: "",
  wellnessAmenities: "",

  // features / includes / languages
  features: "",
  priceIncludes: "",
  languages: "",

  // images
  images: "",
  galleryImages: "",
};

const initialRoom = {
  name: "",
  size: "",
  beds: "",
  maxOccupancy: "",
  price: "",
  amenities: "",
};

// Helper functions
function parseLines(str) {
  if (!str) return [];
  return str
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseNearby(str) {
  return parseLines(str).map((line) => {
    const [name, distance] = line.split("|").map((s) => s.trim());
    return { name, distance: distance || "" };
  });
}

export const useStayFormStore = create(
  persist(
    (set, get) => ({
      // State
      formData: initialFormData,
      rooms: [initialRoom],
      currentStep: 0,

      // Actions
      updateField: (field, value) =>
        set((state) => ({
          formData: { ...state.formData, [field]: value },
        })),

      updateMultipleFields: (fields) =>
        set((state) => ({
          formData: { ...state.formData, ...fields },
        })),

      updateRoom: (index, field, value) =>
        set((state) => ({
          rooms: state.rooms.map((room, i) =>
            i === index ? { ...room, [field]: value } : room
          ),
        })),

      addRoom: () =>
        set((state) => ({
          rooms: [...state.rooms, { ...initialRoom }],
        })),

      removeRoom: (index) =>
        set((state) => ({
          rooms: state.rooms.filter((_, i) => i !== index),
        })),

      setStep: (step) => set({ currentStep: step }),

      nextStep: () =>
        set((state) => ({
          currentStep: Math.min(state.currentStep + 1, 3),
        })),

      prevStep: () =>
        set((state) => ({
          currentStep: Math.max(state.currentStep - 1, 0),
        })),

      resetForm: () =>
        set({
          formData: initialFormData,
          rooms: [initialRoom],
          currentStep: 0,
        }),

      // Get complete payload
      getPayload: () => {
        const { formData, rooms } = get();
        return {
          category: formData.category,
          categoryId: formData.categoryId,
          description: formData.categoryDescription,
          stays: [
            {
              type: formData.type,
              IdPage:
                formData.categoryId ||
                formData.name.toLowerCase().replace(/\s+/g, "-"),
              name: formData.name,
              subtitle: formData.subtitle,
              description: formData.description,
              fullDescription: formData.fullDescription,
              badge: formData.badge,
              rating: formData.rating || undefined,
              totalReviews: formData.totalReviews
                ? Number(formData.totalReviews)
                : 0,
              location: formData.location,
              checkInTime: formData.checkInFrom,
              checkOutTime: formData.checkOut,
              minStay: formData.minStay ? Number(formData.minStay) : 1,
              maxGuests: formData.maxGuests ? Number(formData.maxGuests) : 1,
              totalRooms: formData.totalRooms
                ? Number(formData.totalRooms)
                : 0,
              pricePerNight: formData.pricePerNight
                ? Number(formData.pricePerNight)
                : 0,
              currency: formData.currency || "USD",
              priceIncludes: parseLines(formData.priceIncludes),

              roomTypes: rooms.map((room) => ({
                name: room.name,
                size: room.size,
                beds: room.beds,
                maxOccupancy: room.maxOccupancy
                  ? Number(room.maxOccupancy)
                  : 1,
                price: room.price ? Number(room.price) : 0,
                amenities: parseLines(room.amenities),
              })),

              features: parseLines(formData.features),
              languages: parseLines(formData.languages),
              propertyType: formData.propertyType,
              starRating: formData.starRating
                ? Number(formData.starRating)
                : undefined,
              yearBuilt: formData.yearBuilt
                ? Number(formData.yearBuilt)
                : undefined,
              lastRenovated: formData.lastRenovated
                ? Number(formData.lastRenovated)
                : undefined,
              href: formData.href,
              bookingUrl: formData.bookingUrl,

              images: parseLines(formData.images),
              galleryImages: parseLines(formData.galleryImages),

              locationDetails: {
                coordinates: {
                  lat: formData.lat ? Number(formData.lat) : undefined,
                  lng: formData.lng ? Number(formData.lng) : undefined,
                },
                city: formData.city,
                region: formData.region,
                country: formData.country,
                address: formData.address,
                nearbyAttractions: parseNearby(formData.nearbyAttractions),
              },

              amenities: {
                general: parseLines(formData.generalAmenities),
                recreation: parseLines(formData.recreationAmenities),
                services: parseLines(formData.servicesAmenities),
                dining: parseLines(formData.diningAmenities),
                wellness: parseLines(formData.wellnessAmenities),
              },

              policies: {
                cancellation: formData.cancellation,
                payment: formData.payment,
                children: formData.children,
                pets: formData.pets,
                smoking: formData.smoking,
                checkInFrom: formData.checkInFrom,
                checkInUntil: formData.checkInUntil,
                checkOut: formData.checkOut,
              },
            },
          ],
        };
      },

      // Check if form has unsaved changes
      hasUnsavedChanges: () => {
        const { formData, rooms } = get();
        const isFormEmpty =
          JSON.stringify(formData) === JSON.stringify(initialFormData);
        const isRoomsEmpty =
          rooms.length === 1 &&
          JSON.stringify(rooms[0]) === JSON.stringify(initialRoom);
        return !isFormEmpty || !isRoomsEmpty;
      },
    }),
    {
      name: "stay-form-storage",
      partialize: (state) => ({
        formData: state.formData,
        rooms: state.rooms,
        currentStep: state.currentStep,
      }),
    }
  )
);