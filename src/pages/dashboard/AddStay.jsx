import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/api/axios";
import { toast } from "sonner";
import { useStayFormStore } from "@/store/useStayFormStore";
import { FormField } from "@/components/admin/enttityForm/FormField";
import { FormSection } from "@/components/admin/enttityForm/FormSection";
import { ResponsiveFormStepper } from "@/components/admin/enttityForm/ResponsiveFormStepper";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { MultiItemManager } from "@/components/admin/enttityForm/MultiItemManager";
import {
  Loader2,
  ArrowLeft,
  ArrowRight,
  Check,
  Save,
  RotateCcw,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ImageManager } from "@/components/admin/enttityForm/ImageManager";
const steps = [
  "Basic Info",
  "Location & Policies",
  "Amenities & Features",
  "Rooms & Media",
];

export default function AddStay() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    formData,
    rooms,
    currentStep,
    updateField,
    updateRoom,
    addRoom,
    removeRoom,
    nextStep,
    prevStep,
    resetForm,
    getPayload,
    hasUnsavedChanges,
  } = useStayFormStore();

  const addStayMutation = useMutation({
    mutationFn: async (payload) => {
      const res = await api.post("/stay/add", payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Stay added successfully");
      queryClient.invalidateQueries({ queryKey: ["stays"] });
      resetForm();
      navigate("/dashboard/stays");
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Failed to add stay, please try again."
      );
    },
  });

  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    updateField(
      name,
      type === "number" && value !== "" ? Number(value) : value
    );
  };

  const handleRoomChange = (index, field, rawValue) => {
    const isNumberField = ["maxOccupancy", "price"].includes(field);
    const value =
      isNumberField && rawValue !== "" ? Number(rawValue) : rawValue;
    updateRoom(index, field, value);
  };

  const handleSubmit = () => {
    const payload = getPayload();
    addStayMutation.mutate(payload);
  };

  const onPrimaryAction = () => {
    if (isLastStep) {
      handleSubmit();
    } else {
      nextStep();
    }
  };

  const handleCancel = () => {
    if (hasUnsavedChanges()) {
      return;
    }
    navigate("/dashboard/stays");
  };

  return (
    <div className="min-h-screen p-6 bg-background">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Add New Stay
              </h1>
              <p className="text-muted-foreground text-sm">
                Create a new stay by filling in the details step by step.
              </p>
            </div>
            {hasUnsavedChanges() && (
              <Badge variant="outline" className="flex items-center gap-2">
                <Save className="w-3 h-3" />
                Draft Auto-Saved
              </Badge>
            )}
          </div>
        </header>

        <ResponsiveFormStepper steps={steps} currentStep={currentStep} />

        {/* Card with step content */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>{steps[currentStep]}</CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6 space-y-6">
            {currentStep === 0 && (
              <StepBasicInfo formData={formData} onChange={handleChange} />
            )}
            {currentStep === 1 && (
              <StepLocationPolicies
                formData={formData}
                onChange={handleChange}
              />
            )}
            {currentStep === 2 && (
              <StepAmenitiesFeatures
                formData={formData}
                onChange={handleChange}
              />
            )}
            {currentStep === 3 && (
              <StepRoomsMedia
                formData={formData}
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
                onClick={prevStep}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              <div className="flex gap-2">
                {hasUnsavedChanges() ? (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        type="button"
                        disabled={addStayMutation.isPending}
                      >
                        Cancel
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Discard changes?</AlertDialogTitle>
                        <AlertDialogDescription>
                          You have unsaved changes. Are you sure you want to
                          leave? Your progress is saved as a draft and will be
                          available when you return.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Continue Editing</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => navigate("/dashboard/stays")}
                        >
                          Leave Anyway
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                ) : (
                  <Button
                    variant="outline"
                    type="button"
                    onClick={handleCancel}
                    disabled={addStayMutation.isPending}
                  >
                    Cancel
                  </Button>
                )}

                {hasUnsavedChanges() && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        type="button"
                        disabled={addStayMutation.isPending}
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Reset form?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will clear all your progress and cannot be
                          undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={resetForm}
                          className="bg-destructive hover:bg-destructive/90"
                        >
                          Reset Form
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}

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

/* ---------- Step Components with FormField & FormSection ---------- */

function StepBasicInfo({ formData, onChange }) {
  return (
    <div className="space-y-6">
      <FormSection
        title="Category Information"
        description="Define the category and grouping for this stay"
      >
        <div className="grid md:grid-cols-3 gap-4">
          <FormField
            label="Category Name"
            name="category"
            value={formData.category}
            onChange={onChange}
            placeholder="Mid-Range Hotels"
            helpText='Group of stays (e.g. "Mid-Range Hotels").'
          />
          <FormField
            label="Category ID (slug)"
            name="categoryId"
            value={formData.categoryId}
            onChange={onChange}
            placeholder="mid-range-hotels"
          />
          <FormField
            label="Property Type"
            name="propertyType"
            value={formData.propertyType}
            onChange={onChange}
            placeholder="Hotel / Boutique Hotel / Resort"
          />
        </div>

        <FormField
          label="Category Description"
          name="categoryDescription"
          value={formData.categoryDescription}
          onChange={onChange}
          placeholder="Comfortable stays with great value and amenities"
          component="textarea"
          rows={2}
        />
      </FormSection>

      <FormSection
        title="Property Details"
        description="Basic information about the property"
        withSeparator
      >
        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            label="Stay Name"
            name="name"
            value={formData.name}
            onChange={onChange}
            placeholder="Bedouin Moon Hotel"
          />
          <FormField
            label="Subtitle"
            name="subtitle"
            value={formData.subtitle}
            onChange={onChange}
            placeholder="Sea View Hotel."
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <FormField
            label="Badge"
            name="badge"
            value={formData.badge}
            onChange={onChange}
            placeholder="Great Value / Boutique Luxury"
          />
          <FormField
            label="Type"
            name="type"
            value={formData.type}
            onChange={onChange}
            placeholder="hotel / boutique / resort"
          />
          <FormField
            label="Location Label"
            name="location"
            value={formData.location}
            onChange={onChange}
            placeholder="Mashraba / Lighthouse / Dahab City"
          />
        </div>

        <FormField
          label="Short Description"
          name="description"
          value={formData.description}
          onChange={onChange}
          placeholder="Stunning views between mountains and sea..."
          component="textarea"
          rows={2}
        />

        <FormField
          label="Full Description"
          name="fullDescription"
          value={formData.fullDescription}
          onChange={onChange}
          placeholder="Experience the perfect blend of natural beauty and comfort..."
          component="textarea"
          rows={4}
        />
      </FormSection>

      <FormSection
        title="Pricing & Capacity"
        description="Configure pricing, guest limits, and room availability"
        withSeparator
      >
        <div className="grid md:grid-cols-4 gap-4">
          <FormField
            label="Price per Night (USD)"
            name="pricePerNight"
            type="number"
            value={formData.pricePerNight}
            onChange={onChange}
            placeholder="71"
          />
          <FormField
            label="Currency"
            name="currency"
            value={formData.currency}
            onChange={onChange}
            placeholder="USD"
          />
          <FormField
            label="Min Stay (nights)"
            name="minStay"
            type="number"
            value={formData.minStay}
            onChange={onChange}
            placeholder="1"
          />
          <FormField
            label="Max Guests"
            name="maxGuests"
            type="number"
            value={formData.maxGuests}
            onChange={onChange}
            placeholder="3"
          />
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <FormField
            label="Total Rooms"
            name="totalRooms"
            type="number"
            value={formData.totalRooms}
            onChange={onChange}
            placeholder="42"
          />
          <FormField
            label="Rating"
            name="rating"
            value={formData.rating}
            onChange={onChange}
            placeholder="4.7"
          />
          <FormField
            label="Total Reviews"
            name="totalReviews"
            type="number"
            value={formData.totalReviews}
            onChange={onChange}
            placeholder="189"
          />
          <FormField
            label="Star Rating"
            name="starRating"
            type="number"
            value={formData.starRating}
            onChange={onChange}
            placeholder="3"
          />
        </div>
      </FormSection>

      <FormSection
        title="Property History"
        description="Construction and renovation timeline"
        withSeparator
      >
        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            label="Year Built"
            name="yearBuilt"
            type="number"
            value={formData.yearBuilt}
            onChange={onChange}
            placeholder="2005"
          />
          <FormField
            label="Last Renovated"
            name="lastRenovated"
            type="number"
            value={formData.lastRenovated}
            onChange={onChange}
            placeholder="2019"
          />
        </div>
      </FormSection>

      <FormSection
        title="URLs & Links"
        description="Configure page and booking URLs"
        withSeparator
      >
        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            label="Stay Page URL (href)"
            name="href"
            value={formData.href}
            onChange={onChange}
            placeholder="/stay/bedouin-moon"
          />
          <FormField
            label="Booking URL"
            name="bookingUrl"
            value={formData.bookingUrl}
            onChange={onChange}
            placeholder="/book/bedouin-moon"
          />
        </div>
      </FormSection>
    </div>
  );
}

function StepLocationPolicies({ formData, onChange }) {
  return (
    <div className="space-y-6">
      <FormSection
        title="Location Details"
        description="Geographic information and address"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            label="City"
            name="city"
            value={formData.city}
            onChange={onChange}
            placeholder="Dahab"
          />
          <FormField
            label="Region"
            name="region"
            value={formData.region}
            onChange={onChange}
            placeholder="South Sinai"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            label="Country"
            name="country"
            value={formData.country}
            onChange={onChange}
            placeholder="Egypt"
          />
          <FormField
            label="Address"
            name="address"
            value={formData.address}
            onChange={onChange}
            placeholder="Mashraba, Dahab"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            label="Latitude"
            name="lat"
            value={formData.lat}
            onChange={onChange}
            placeholder="28.51"
          />
          <FormField
            label="Longitude"
            name="lng"
            value={formData.lng}
            onChange={onChange}
            placeholder="34.52"
          />
        </div>

        <FormField
          label="Nearby Attractions"
          name="nearbyAttractions"
          value={formData.nearbyAttractions}
          onChange={onChange}
          component="textarea"
          placeholder={`Mashraba Beach | 0.1 km\nLighthouse | 2 km\nDahab Market | 3 km`}
          rows={4}
          helpText={
            <>
              <code>One per line, format: de{">"}Name | distance</code>
            </>
          }
        />
      </FormSection>

      <FormSection
        title="Guest Policies"
        description="Cancellation, payment, and guest rules"
        withSeparator
      >
        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            label="Cancellation Policy"
            name="cancellation"
            value={formData.cancellation}
            onChange={onChange}
            placeholder="Free cancellation up to 24 hours before arrival"
          />
          <FormField
            label="Payment Policy"
            name="payment"
            value={formData.payment}
            onChange={onChange}
            placeholder="Pay at property"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <FormField
            label="Children Policy"
            name="children"
            value={formData.children}
            onChange={onChange}
            placeholder="All ages welcome"
          />
          <FormField
            label="Pets Policy"
            name="pets"
            value={formData.pets}
            onChange={onChange}
            placeholder="Not allowed"
          />
          <FormField
            label="Smoking Policy"
            name="smoking"
            value={formData.smoking}
            onChange={onChange}
            placeholder="Smoking allowed in designated areas"
          />
        </div>
      </FormSection>

      <FormSection
        title="Check-in & Check-out Times"
        description="Configure arrival and departure times"
        withSeparator
      >
        <div className="grid md:grid-cols-3 gap-4">
          <FormField
            label="Check-in From"
            name="checkInFrom"
            value={formData.checkInFrom}
            onChange={onChange}
            placeholder="14:00"
          />
          <FormField
            label="Check-in Until"
            name="checkInUntil"
            value={formData.checkInUntil}
            onChange={onChange}
            placeholder="21:00"
          />
          <FormField
            label="Check-out"
            name="checkOut"
            value={formData.checkOut}
            onChange={onChange}
            placeholder="12:00"
          />
        </div>
      </FormSection>
    </div>
  );
}

function StepAmenitiesFeatures({ formData, onChange }) {
  return (
    <div className="space-y-6">
      <FormSection
        title="Property Amenities"
        description="List all available amenities by category"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            label="General Amenities"
            name="generalAmenities"
            value={formData.generalAmenities}
            onChange={onChange}
            component="textarea"
            placeholder={`Free WiFi\nAir Conditioning (in some rooms)\nRestaurant\n24-Hour Reception`}
            rows={4}
          />
          <FormField
            label="Recreation Amenities"
            name="recreationAmenities"
            value={formData.recreationAmenities}
            onChange={onChange}
            component="textarea"
            placeholder={`Private Beach\nPanoramic Pool\nDiving Center\nSnorkeling`}
            rows={4}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            label="Service Amenities"
            name="servicesAmenities"
            value={formData.servicesAmenities}
            onChange={onChange}
            component="textarea"
            placeholder={`Tour Booking\nAirport Shuttle (extra charge)\nLaundry`}
            rows={4}
          />
          <FormField
            label="Dining Amenities"
            name="diningAmenities"
            value={formData.diningAmenities}
            onChange={onChange}
            component="textarea"
            placeholder={`On-site Restaurant\nBreakfast Room\nPacked Lunches`}
            rows={4}
          />
        </div>

        <FormField
          label="Wellness Amenities"
          name="wellnessAmenities"
          value={formData.wellnessAmenities}
          onChange={onChange}
          component="textarea"
          placeholder="Daily Yoga Classes\nBeach Massages\nWellness Programs"
          rows={3}
        />
      </FormSection>

      <FormSection
        title="Features & Languages"
        description="Highlight key features and spoken languages"
        withSeparator
      >
        <div className="grid md:grid-cols-3 gap-4">
          <FormField
            className="md:col-span-2"
            label="Features"
            name="features"
            value={formData.features}
            onChange={onChange}
            component="textarea"
            placeholder={`Mountain & Sea Views\nPrivate Beach\nDiving Center\nPanoramic Pool\nBudget Friendly`}
            rows={4}
            helpText="One feature per line."
          />

          <FormField
            label="Languages"
            name="languages"
            value={formData.languages}
            onChange={onChange}
            component="textarea"
            placeholder={`English\nArabic\nRussian`}
            rows={4}
            helpText="One language per line."
          />
        </div>
      </FormSection>

      <FormSection
        title="What's Included"
        description="Services and benefits included in the price"
        withSeparator
      >
        <FormField
          label="Price Includes"
          name="priceIncludes"
          value={formData.priceIncludes}
          onChange={onChange}
          component="textarea"
          placeholder={`Continental breakfast\nWiFi access\nBeach access\nPool usage\nDaily room cleaning`}
          rows={4}
          helpText="One item per line."
        />
      </FormSection>
    </div>
  );
}


function StepRoomsMedia({
  formData,
  onChange,
  rooms,
  onRoomChange,
  onAddRoom,
  onRemoveRoom,
}) {
  return (
    <div className="space-y-6">
      <FormSection
        title="Property Images"
        description="Upload main and gallery images"
      >
        <ImageManager
          label="Main Images"
          name="images"
          value={formData.images}
          onChange={onChange}
          helpText="Main images for the stay's primary gallery"
          maxImages={10}
          showPreview={true}
        />

        <ImageManager
          label="Gallery Images"
          name="galleryImages"
          value={formData.galleryImages}
          onChange={onChange}
          helpText="Additional images for the extended gallery"
          maxImages={15}
          showPreview={true}
        />
      </FormSection>

      <FormSection
        title="Room Types"
        description="Define different room categories and their details"
        withSeparator
      >
        <MultiItemManager
          itemName="Room"
          itemNamePlural="Room Types"
          items={rooms}
          onAdd={onAddRoom}
          onRemove={onRemoveRoom}
          minItems={1}
          maxItems={10}
          emptyMessage="No room types defined. Add at least one room type."
          renderItem={(room, index) => (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  label="Room Name"
                  name={`room-${index}-name`}
                  value={room.name}
                  onChange={(e) => onRoomChange(index, "name", e.target.value)}
                  placeholder="Standard Mountain View"
                  required
                />
                <FormField
                  label="Room Size"
                  name={`room-${index}-size`}
                  value={room.size}
                  onChange={(e) => onRoomChange(index, "size", e.target.value)}
                  placeholder="22 m²"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <FormField
                  label="Bed Configuration"
                  name={`room-${index}-beds`}
                  value={room.beds}
                  onChange={(e) => onRoomChange(index, "beds", e.target.value)}
                  placeholder="2 Single Beds"
                />
                <FormField
                  label="Max Occupancy"
                  name={`room-${index}-maxOccupancy`}
                  type="number"
                  value={room.maxOccupancy}
                  onChange={(e) => onRoomChange(index, "maxOccupancy", e.target.value)}
                  placeholder="2"
                />
                <FormField
                  label="Price per Night"
                  name={`room-${index}-price`}
                  type="number"
                  value={room.price}
                  onChange={(e) => onRoomChange(index, "price", e.target.value)}
                  placeholder="55"
                />
              </div>

              <FormField
                label="Room Amenities"
                name={`room-${index}-amenities`}
                value={room.amenities}
                onChange={(e) => onRoomChange(index, "amenities", e.target.value)}
                component="textarea"
                placeholder={`Mountain View\nFan\nPrivate Bathroom\nWardrobe`}
                rows={3}
                helpText="One amenity per line."
              />
            </div>
          )}
        />
      </FormSection>
    </div>
  );
}
