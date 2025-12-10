import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useStayMutations } from "@/hooks/useStayMutations";
import { Loader2, MapPin, Home, List, DollarSign } from "lucide-react";

export default function EditStayDialog({ stay, open, onOpenChange }) {
  const { updateStay } = useStayMutations();
  const [activeTab, setActiveTab] = useState("basic");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      name: stay?.name || "",
      subtitle: stay?.subtitle || "",
      description: stay?.description || "",
      fullDescription: stay?.fullDescription || "",
      pricePerNight: stay?.pricePerNight || 0,
      location: stay?.location || "",
      address: stay?.locationDetails?.address || "",
      city: stay?.locationDetails?.city || "",
      region: stay?.locationDetails?.region || "",
      checkInTime: stay?.checkInTime || "",
      checkOutTime: stay?.checkOutTime || "",
      minStay: stay?.minStay || 1,
      maxGuests: stay?.maxGuests || 2,
      totalRooms: stay?.totalRooms || 0,
    },
  });

  // Reset form whenever stay changes or dialog opens
  useEffect(() => {
    if (stay && open) {
      reset({
        name: stay.name || "",
        subtitle: stay.subtitle || "",
        description: stay.description || "",
        fullDescription: stay.fullDescription || "",
        pricePerNight: stay.pricePerNight || 0,
        location: stay.location || "",
        address: stay.locationDetails?.address || "",
        city: stay.locationDetails?.city || "",
        region: stay.locationDetails?.region || "",
        checkInTime: stay.checkInTime || "",
        checkOutTime: stay.checkOutTime || "",
        minStay: stay.minStay || 1,
        maxGuests: stay.maxGuests || 2,
        totalRooms: stay.totalRooms || 0,
      });
    }
  }, [stay, open, reset]);

  const onSubmit = async (data) => {
    const updatedData = {
      name: data.name,
      subtitle: data.subtitle,
      description: data.description,
      fullDescription: data.fullDescription,
      pricePerNight: Number(data.pricePerNight),
      location: data.location,
      locationDetails: {
        ...stay.locationDetails,
        address: data.address,
        city: data.city,
        region: data.region,
      },
      checkInTime: data.checkInTime,
      checkOutTime: data.checkOutTime,
      minStay: Number(data.minStay),
      maxGuests: Number(data.maxGuests),
      totalRooms: Number(data.totalRooms),
    };

    console.log('Submitting update:', { id: stay._id, data: updatedData });
    
    await updateStay.mutateAsync({
      id: stay._id,
      data: updatedData,
    });
    onOpenChange(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(onSubmit)(e);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Edit Stay</DialogTitle>
          <DialogDescription>
            Update the details for {stay?.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic" className="flex items-center gap-2">
                <Home className="w-4 h-4" />
                Basic Info
              </TabsTrigger>
              <TabsTrigger value="location" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Location
              </TabsTrigger>
              <TabsTrigger value="details" className="flex items-center gap-2">
                <List className="w-4 h-4" />
                Details
              </TabsTrigger>
            </TabsList>

            {/* Basic Info Tab */}
            <TabsContent value="basic" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Stay Name *</Label>
                <Input
                  id="name"
                  {...register("name", { required: "Name is required" })}
                  placeholder="Swiss Inn Resort Dahab"
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="subtitle">Subtitle</Label>
                <Input
                  id="subtitle"
                  {...register("subtitle")}
                  placeholder="Luxury Resort"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Short Description *</Label>
                <Textarea
                  id="description"
                  {...register("description", {
                    required: "Description is required",
                  })}
                  placeholder="Brief description for card view..."
                  rows={3}
                />
                {errors.description && (
                  <p className="text-sm text-destructive">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullDescription">Full Description</Label>
                <Textarea
                  id="fullDescription"
                  {...register("fullDescription")}
                  placeholder="Detailed description for the stay page..."
                  rows={5}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pricePerNight">Price per Night (USD) *</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="pricePerNight"
                      type="number"
                      {...register("pricePerNight", {
                        required: "Price is required",
                        min: { value: 1, message: "Price must be at least 1" },
                      })}
                      className="pl-9"
                      placeholder="138"
                    />
                  </div>
                  {errors.pricePerNight && (
                    <p className="text-sm text-destructive">
                      {errors.pricePerNight.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="totalRooms">Total Rooms</Label>
                  <Input
                    id="totalRooms"
                    type="number"
                    {...register("totalRooms", { min: 1 })}
                    placeholder="152"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Location Tab */}
            <TabsContent value="location" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location Name *</Label>
                <Input
                  id="location"
                  {...register("location", {
                    required: "Location is required",
                  })}
                  placeholder="Lighthouse Beach"
                />
                {errors.location && (
                  <p className="text-sm text-destructive">
                    {errors.location.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Full Address</Label>
                <Input
                  id="address"
                  {...register("address")}
                  placeholder="Lighthouse Beach, Dahab, South Sinai"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    {...register("city")}
                    placeholder="Dahab"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="region">Region</Label>
                  <Input
                    id="region"
                    {...register("region")}
                    placeholder="South Sinai"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Details Tab */}
            <TabsContent value="details" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="checkInTime">Check-in Time</Label>
                  <Input
                    id="checkInTime"
                    {...register("checkInTime")}
                    placeholder="14:00"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="checkOutTime">Check-out Time</Label>
                  <Input
                    id="checkOutTime"
                    {...register("checkOutTime")}
                    placeholder="12:00"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minStay">Minimum Stay (nights)</Label>
                  <Input
                    id="minStay"
                    type="number"
                    {...register("minStay", { min: 1 })}
                    placeholder="1"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxGuests">Maximum Guests</Label>
                  <Input
                    id="maxGuests"
                    type="number"
                    {...register("maxGuests", { min: 1 })}
                    placeholder="4"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleFormSubmit}
              disabled={updateStay.isPending || !isDirty}
            >
              {updateStay.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}