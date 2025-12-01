import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/axios";
import { toast } from "sonner";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Loader2, ArrowLeft, ArrowRight, Check } from "lucide-react";

const steps = [
  "Basic Info",
  "Location & Policies",
  "Amenities & Features",
  "Rooms & Media",
];

const initialForm = {
  // category wrapper (for your top-level category document)
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
  nearbyAttractions: "", // each line: "Name | 0.5 km"

  // policies
  cancellation: "",
  payment: "",
  children: "",
  pets: "",
  smoking: "",
  checkInFrom: "",
  checkInUntil: "",
  checkOut: "",

  // amenities (each textarea: one item per line)
  generalAmenities: "",
  recreationAmenities: "",
  servicesAmenities: "",
  diningAmenities: "",
  wellnessAmenities: "",

  // features / includes / languages (one per line)
  features: "",
  priceIncludes: "",
  languages: "",

  // images
  images: "",        // each line = image URL
  galleryImages: "", // each line = image URL
};

function parseLines(str) {
  if (!str) return [];
  return str
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseNearby(str) {
  // format per line: "Name | 0.5 km"
  return parseLines(str).map((line) => {
    const [name, distance] = line.split("|").map((s) => s.trim());
    return { name, distance: distance || "" };
  });
}

export default function AddStay() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [rooms, setRooms] = useState([
    { name: "", size: "", beds: "", maxOccupancy: "", price: "", amenities: "" },
  ]);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const addStayMutation = useMutation({
    mutationFn: async (payload) => {
      const res = await api.post("/stay/add", payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Stay added successfully");
      queryClient.invalidateQueries({ queryKey: ["stays"] });
      navigate("/dashboard/stays");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Failed to add stay, please try again."
      );
    },
  });

  const isLastStep = step === steps.length - 1;
  const isFirstStep = step === 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoomChange = (index, field, value) => {
    setRooms((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const addRoom = () => {
    setRooms((prev) => [
      ...prev,
      { name: "", size: "", beds: "", maxOccupancy: "", price: "", amenities: "" },
    ]);
  };

  const removeRoom = (index) => {
    setRooms((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    if (!isLastStep) setStep((s) => s + 1);
  };

  const handleBack = () => {
    if (!isFirstStep) setStep((s) => s - 1);
  };

  const handleSubmit = () => {
    // build payload that matches your example JSON
    const payload = {
      category: form.category,
      categoryId: form.categoryId,
      description: form.categoryDescription,
      stays: [
        {
          type: form.type,
          IdPage: form.categoryId || form.name.toLowerCase().replace(/\s+/g, "-"),
          name: form.name,
          subtitle: form.subtitle,
          description: form.description,
          fullDescription: form.fullDescription,
          badge: form.badge,
          rating: form.rating || undefined,
          totalReviews: form.totalReviews ? Number(form.totalReviews) : 0,
          location: form.location,
          checkInTime: form.checkInFrom,
          checkOutTime: form.checkOut,
          minStay: form.minStay ? Number(form.minStay) : 1,
          maxGuests: form.maxGuests ? Number(form.maxGuests) : 1,
          totalRooms: form.totalRooms ? Number(form.totalRooms) : 0,
          pricePerNight: form.pricePerNight
            ? Number(form.pricePerNight)
            : 0,
          currency: form.currency || "USD",
          priceIncludes: parseLines(form.priceIncludes),

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

          features: parseLines(form.features),
          languages: parseLines(form.languages),
          propertyType: form.propertyType,
          starRating: form.starRating ? Number(form.starRating) : undefined,
          yearBuilt: form.yearBuilt ? Number(form.yearBuilt) : undefined,
          lastRenovated: form.lastRenovated
            ? Number(form.lastRenovated)
            : undefined,
          href: form.href,
          bookingUrl: form.bookingUrl,

          images: parseLines(form.images),
          galleryImages: parseLines(form.galleryImages),

          locationDetails: {
            coordinates: {
              lat: form.lat ? Number(form.lat) : undefined,
              lng: form.lng ? Number(form.lng) : undefined,
            },
            city: form.city,
            region: form.region,
            country: form.country,
            address: form.address,
            nearbyAttractions: parseNearby(form.nearbyAttractions),
          },

          amenities: {
            general: parseLines(form.generalAmenities),
            recreation: parseLines(form.recreationAmenities),
            services: parseLines(form.servicesAmenities),
            dining: parseLines(form.diningAmenities),
            wellness: parseLines(form.wellnessAmenities),
          },

          policies: {
            cancellation: form.cancellation,
            payment: form.payment,
            children: form.children,
            pets: form.pets,
            smoking: form.smoking,
            checkInFrom: form.checkInFrom,
            checkInUntil: form.checkInUntil,
            checkOut: form.checkOut,
          },
        },
      ],
    };

    addStayMutation.mutate(payload);
  };

  const onPrimaryAction = () => {
    if (isLastStep) {
      handleSubmit();
    } else {
      handleNext();
    }
  };

  return (
    <div className="min-h-screen p-6 bg-background">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Add New Stay
          </h1>
          <p className="text-muted-foreground text-sm">
            Create a new stay by filling in the details step by step.
          </p>
        </header>

        {/* Stepper header */}
        <div className="flex items-center gap-4">
          {steps.map((label, index) => {
            const isActive = index === step;
            const isCompleted = index < step;

            return (
              <div
                key={label}
                className="flex items-center gap-2 flex-1 min-w-0"
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm
                    ${
                      isActive
                        ? "border-primary bg-primary text-primary-foreground"
                        : isCompleted
                        ? "border-emerald-500 bg-emerald-500 text-emerald-50"
                        : "border-muted text-muted-foreground"
                    }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className={`truncate text-sm font-medium ${
                      isActive ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {label}
                  </p>
                  <div className="h-1 mt-1 rounded-full bg-muted">
                    <div
                      className={`h-1 rounded-full transition-all ${
                        isActive || isCompleted
                          ? "bg-primary w-full"
                          : "bg-transparent w-0"
                      }`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Card with step content */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>{steps[step]}</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6 space-y-6">
            {step === 0 && (
              <StepBasicInfo form={form} onChange={handleChange} />
            )}
            {step === 1 && (
              <StepLocationPolicies form={form} onChange={handleChange} />
            )}
            {step === 2 && (
              <StepAmenitiesFeatures form={form} onChange={handleChange} />
            )}
            {step === 3 && (
              <StepRoomsMedia
                form={form}
                onChange={handleChange}
                rooms={rooms}
                onRoomChange={handleRoomChange}
                onAddRoom={addRoom}
                onRemoveRoom={removeRoom}
              />
            )}

            <Separator />

            {/* Footer buttons */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                disabled={isFirstStep || addStayMutation.isPending}
                onClick={handleBack}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => navigate("/dashboard/stays")}
                  disabled={addStayMutation.isPending}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  onClick={onPrimaryAction}
                  className="min-w-[140px]"
                  disabled={addStayMutation.isPending}
                >
                  {addStayMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : isLastStep ? (
                    <>
                      Create Stay
                      <Check className="w-4 h-4 ml-2" />
                    </>
                  ) : (
                    <>
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/* ---------- Step 0: Basic Info ---------- */

function StepBasicInfo({ form, onChange }) {
  return (
    <div className="grid gap-6">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Category Name</label>
          <Input
            name="category"
            value={form.category}
            onChange={onChange}
            placeholder="Mid-Range Hotels"
          />
          <p className="text-xs text-muted-foreground">
            Group of stays (e.g. “Mid-Range Hotels”).
          </p>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Category ID (slug)</label>
          <Input
            name="categoryId"
            value={form.categoryId}
            onChange={onChange}
            placeholder="mid-range-hotels"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Property Type</label>
          <Input
            name="propertyType"
            value={form.propertyType}
            onChange={onChange}
            placeholder="Hotel / Boutique Hotel / Resort"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">Category Description</label>
        <Textarea
          name="categoryDescription"
          value={form.categoryDescription}
          onChange={onChange}
          placeholder="Comfortable stays with great value and amenities"
          rows={2}
        />
      </div>

      <Separator />

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Stay Name</label>
          <Input
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="Bedouin Moon Hotel"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Subtitle</label>
          <Input
            name="subtitle"
            value={form.subtitle}
            onChange={onChange}
            placeholder="Sea View Hotel."
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Badge</label>
          <Input
            name="badge"
            value={form.badge}
            onChange={onChange}
            placeholder="Great Value / Boutique Luxury"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Type</label>
          <Input
            name="type"
            value={form.type}
            onChange={onChange}
            placeholder="hotel / boutique / resort"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Location Label</label>
          <Input
            name="location"
            value={form.location}
            onChange={onChange}
            placeholder="Mashraba / Lighthouse / Dahab City"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">Short Description</label>
        <Textarea
          name="description"
          value={form.description}
          onChange={onChange}
          placeholder="Stunning views between mountains and sea..."
          rows={2}
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">Full Description</label>
        <Textarea
          name="fullDescription"
          value={form.fullDescription}
          onChange={onChange}
          placeholder="Experience the perfect blend of natural beauty and comfort..."
          rows={4}
        />
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Price per Night (USD)</label>
          <Input
            name="pricePerNight"
            type="number"
            value={form.pricePerNight}
            onChange={onChange}
            placeholder="71"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Currency</label>
          <Input
            name="currency"
            value={form.currency}
            onChange={onChange}
            placeholder="USD"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Min Stay (nights)</label>
          <Input
            name="minStay"
            type="number"
            value={form.minStay}
            onChange={onChange}
            placeholder="1"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Max Guests</label>
          <Input
            name="maxGuests"
            type="number"
            value={form.maxGuests}
            onChange={onChange}
            placeholder="3"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Total Rooms</label>
          <Input
            name="totalRooms"
            type="number"
            value={form.totalRooms}
            onChange={onChange}
            placeholder="42"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Rating</label>
          <Input
            name="rating"
            value={form.rating}
            onChange={onChange}
            placeholder="4.7"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Total Reviews</label>
          <Input
            name="totalReviews"
            type="number"
            value={form.totalReviews}
            onChange={onChange}
            placeholder="189"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Star Rating</label>
          <Input
            name="starRating"
            type="number"
            value={form.starRating}
            onChange={onChange}
            placeholder="3"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Year Built</label>
          <Input
            name="yearBuilt"
            type="number"
            value={form.yearBuilt}
            onChange={onChange}
            placeholder="2005"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Last Renovated</label>
          <Input
            name="lastRenovated"
            type="number"
            value={form.lastRenovated}
            onChange={onChange}
            placeholder="2019"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Total Rooms (again)</label>
          <Input
            name="totalRooms"
            type="number"
            value={form.totalRooms}
            onChange={onChange}
            placeholder="42"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Stay Page URL (href)</label>
          <Input
            name="href"
            value={form.href}
            onChange={onChange}
            placeholder="/stay/bedouin-moon"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Booking URL</label>
          <Input
            name="bookingUrl"
            value={form.bookingUrl}
            onChange={onChange}
            placeholder="/book/bedouin-moon"
          />
        </div>
      </div>
    </div>
  );
}

/* ---------- Step 1: Location & Policies ---------- */

function StepLocationPolicies({ form, onChange }) {
  return (
    <div className="grid gap-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">City</label>
          <Input
            name="city"
            value={form.city}
            onChange={onChange}
            placeholder="Dahab"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Region</label>
          <Input
            name="region"
            value={form.region}
            onChange={onChange}
            placeholder="South Sinai"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Country</label>
          <Input
            name="country"
            value={form.country}
            onChange={onChange}
            placeholder="Egypt"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Address</label>
          <Input
            name="address"
            value={form.address}
            onChange={onChange}
            placeholder="Mashraba, Dahab"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Latitude</label>
          <Input
            name="lat"
            value={form.lat}
            onChange={onChange}
            placeholder="28.51"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Longitude</label>
          <Input
            name="lng"
            value={form.lng}
            onChange={onChange}
            placeholder="34.52"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">Nearby Attractions</label>
        <Textarea
          name="nearbyAttractions"
          value={form.nearbyAttractions}
          onChange={onChange}
          placeholder={`Mashraba Beach | 0.1 km\nLighthouse | 2 km\nDahab Market | 3 km`}
          rows={4}
        />
        <p className="text-xs text-muted-foreground">
          One per line, format: <code>Name | distance</code>
        </p>
      </div>

      <Separator />

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Cancellation Policy</label>
          <Input
            name="cancellation"
            value={form.cancellation}
            onChange={onChange}
            placeholder="Free cancellation up to 24 hours before arrival"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Payment Policy</label>
          <Input
            name="payment"
            value={form.payment}
            onChange={onChange}
            placeholder="Pay at property"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Children Policy</label>
          <Input
            name="children"
            value={form.children}
            onChange={onChange}
            placeholder="All ages welcome"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Pets Policy</label>
          <Input
            name="pets"
            value={form.pets}
            onChange={onChange}
            placeholder="Not allowed"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Smoking Policy</label>
          <Input
            name="smoking"
            value={form.smoking}
            onChange={onChange}
            placeholder="Smoking allowed in designated areas"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Check-in From</label>
          <Input
            name="checkInFrom"
            value={form.checkInFrom}
            onChange={onChange}
            placeholder="14:00"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Check-in Until</label>
          <Input
            name="checkInUntil"
            value={form.checkInUntil}
            onChange={onChange}
            placeholder="21:00"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Check-out</label>
          <Input
            name="checkOut"
            value={form.checkOut}
            onChange={onChange}
            placeholder="12:00"
          />
        </div>
      </div>
    </div>
  );
}

/* ---------- Step 2: Amenities & Features ---------- */

function StepAmenitiesFeatures({ form, onChange }) {
  return (
    <div className="grid gap-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">General Amenities</label>
          <Textarea
            name="generalAmenities"
            value={form.generalAmenities}
            onChange={onChange}
            placeholder={`Free WiFi\nAir Conditioning (in some rooms)\nRestaurant\n24-Hour Reception`}
            rows={4}
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Recreation Amenities</label>
          <Textarea
            name="recreationAmenities"
            value={form.recreationAmenities}
            onChange={onChange}
            placeholder={`Private Beach\nPanoramic Pool\nDiving Center\nSnorkeling`}
            rows={4}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Service Amenities</label>
          <Textarea
            name="servicesAmenities"
            value={form.servicesAmenities}
            onChange={onChange}
            placeholder={`Tour Booking\nAirport Shuttle (extra charge)\nLaundry`}
            rows={4}
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Dining Amenities</label>
          <Textarea
            name="diningAmenities"
            value={form.diningAmenities}
            onChange={onChange}
            placeholder={`On-site Restaurant\nBreakfast Room\nPacked Lunches`}
            rows={4}
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">Wellness Amenities</label>
        <Textarea
          name="wellnessAmenities"
          value={form.wellnessAmenities}
          onChange={onChange}
          placeholder="Daily Yoga Classes\nBeach Massages\nWellness Programs"
          rows={3}
        />
      </div>

      <Separator />

      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-1 md:col-span-2">
          <label className="text-sm font-medium">Features</label>
          <Textarea
            name="features"
            value={form.features}
            onChange={onChange}
            placeholder={`Mountain & Sea Views\nPrivate Beach\nDiving Center\nPanoramic Pool\nBudget Friendly`}
            rows={4}
          />
          <p className="text-xs text-muted-foreground">
            One feature per line.
          </p>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Languages</label>
          <Textarea
            name="languages"
            value={form.languages}
            onChange={onChange}
            placeholder={`English\nArabic\nRussian`}
            rows={4}
          />
          <p className="text-xs text-muted-foreground">
            One language per line.
          </p>
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">Price Includes</label>
        <Textarea
          name="priceIncludes"
          value={form.priceIncludes}
          onChange={onChange}
          placeholder={`Continental breakfast\nWiFi access\nBeach access\nPool usage\nDaily room cleaning`}
          rows={4}
        />
        <p className="text-xs text-muted-foreground">
          One item per line.
        </p>
      </div>
    </div>
  );
}

/* ---------- Step 3: Rooms & Media ---------- */

function StepRoomsMedia({
  form,
  onChange,
  rooms,
  onRoomChange,
  onAddRoom,
  onRemoveRoom,
}) {
  return (
    <div className="grid gap-6">
      <div className="space-y-1">
        <label className="text-sm font-medium">Main Images</label>
        <Textarea
          name="images"
          value={form.images}
          onChange={onChange}
          placeholder={`https://example.com/image1.jpg\nhttps://example.com/image2.jpg`}
          rows={3}
        />
        <p className="text-xs text-muted-foreground">
          One image URL per line.
        </p>
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium">Gallery Images</label>
        <Textarea
          name="galleryImages"
          value={form.galleryImages}
          onChange={onChange}
          placeholder={`https://example.com/gallery1.jpg`}
          rows={3}
        />
        <p className="text-xs text-muted-foreground">
          One image URL per line.
        </p>
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold">Room Types</h3>
        <Button type="button" size="sm" onClick={onAddRoom}>
          Add Room
        </Button>
      </div>

      <div className="space-y-4">
        {rooms.map((room, index) => (
          <Card key={index} className="border-dashed border-primary/40">
            <CardHeader className="flex flex-row items-center justify-between py-3">
              <CardTitle className="text-sm">
                Room #{index + 1}
              </CardTitle>
              {rooms.length > 1 && (
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  onClick={() => onRemoveRoom(index)}
                >
                  ✕
                </Button>
              )}
            </CardHeader>
            <Separator />
            <CardContent className="pt-4 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    value={room.name}
                    onChange={(e) =>
                      onRoomChange(index, "name", e.target.value)
                    }
                    placeholder="Standard Mountain View"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Size</label>
                  <Input
                    value={room.size}
                    onChange={(e) =>
                      onRoomChange(index, "size", e.target.value)
                    }
                    placeholder="22 m²"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Beds</label>
                  <Input
                    value={room.beds}
                    onChange={(e) =>
                      onRoomChange(index, "beds", e.target.value)
                    }
                    placeholder="2 Single"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">
                    Max Occupancy
                  </label>
                  <Input
                    type="number"
                    value={room.maxOccupancy}
                    onChange={(e) =>
                      onRoomChange(index, "maxOccupancy", e.target.value)
                    }
                    placeholder="2"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Price</label>
                  <Input
                    type="number"
                    value={room.price}
                    onChange={(e) =>
                      onRoomChange(index, "price", e.target.value)
                    }
                    placeholder="55"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">
                  Room Amenities
                </label>
                <Textarea
                  value={room.amenities}
                  onChange={(e) =>
                    onRoomChange(index, "amenities", e.target.value)
                  }
                  placeholder={`Mountain View\nFan\nPrivate Bathroom\nWardrobe`}
                  rows={3}
                />
                <p className="text-xs text-muted-foreground">
                  One amenity per line.
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
