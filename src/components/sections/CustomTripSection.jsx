"use client";

import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Badge } from "../ui/badge";
import {
  PrimaryButton,
  SecondaryButton,
} from "../customComponents/ButtonVarients";
import {
  Hotel,
  UtensilsCrossed,
  MapPin,
  Sparkles,
  CheckCircle2,
  Calendar,
} from "lucide-react";

const stayOptions = [
  { id: 1, name: "Luxury Beach Resort", price: "$150/night" },
  { id: 2, name: "Desert Camp Experience", price: "$80/night" },
  { id: 3, name: "Mountain Lodge", price: "$120/night" },
  { id: 4, name: "Beachfront Villa", price: "$200/night" },
];

const diningOptions = [
  { id: 1, name: "Traditional Bedouin Feast", type: "Local" },
  { id: 2, name: "Fresh Seafood Platter", type: "Coastal" },
  { id: 3, name: "International Buffet", type: "International" },
  { id: 4, name: "Vegetarian Delight", type: "Healthy" },
];

const destinations = [
  { id: 1, name: "Blue Hole", rating: "4.9★" },
  { id: 2, name: "Mount Sinai", rating: "4.8★" },
  { id: 3, name: "Colored Canyon", rating: "4.7★" },
  { id: 4, name: "Ras Abu Galum", rating: "4.9★" },
];

const experiences = [
  { id: 1, name: "Scuba Diving Adventure", duration: "Half Day" },
  { id: 2, name: "Desert Safari", duration: "Full Day" },
  { id: 3, name: "Yoga & Wellness Retreat", duration: "3 Hours" },
  { id: 4, name: "Rock Climbing", duration: "4 Hours" },
];

export default function CustomTripSection({id}) {
  const [selectedStay, setSelectedStay] = useState("");
  const [selectedDining, setSelectedDining] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCustomizeTrip = () => {
    if (
      !selectedStay ||
      !selectedDining ||
      !selectedDestination ||
      !selectedExperience
    ) {
      return;
    }
    setIsDialogOpen(true);
  };

  const handleConfirm = () => {
    // Handle the trip booking logic here
    setIsDialogOpen(false);
    // Reset selections
    setSelectedStay("");
    setSelectedDining("");
    setSelectedDestination("");
    setSelectedExperience("");
  };

  const isFormComplete =
    selectedStay && selectedDining && selectedDestination && selectedExperience;

  return (
    <motion.section
     id={id}  
      className="w-full py-20 px-4 bg-muted/30 dark:bg-muted/20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Badge className="mb-4 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700">
            <Sparkles className="w-4 h-4 mr-2" />
            Personalized Experience
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Customize Your Trip
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Create your perfect Dahab adventure by selecting your preferences
            for accommodation, dining, destinations, and experiences.
          </p>
        </motion.div>

        {/* Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {/* Stay Selector */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardHeader>
                <Hotel className="w-8 h-8 text-yellow-600 dark:text-yellow-500 mb-2" />
                <CardTitle className="text-xl">Stay</CardTitle>
              </CardHeader>
              <CardContent>
                <Label
                  htmlFor="stay-select"
                  className="text-sm text-muted-foreground mb-2 block"
                >
                  Choose your accommodation
                </Label>
                <Select onValueChange={setSelectedStay} value={selectedStay}>
                  <SelectTrigger id="stay-select">
                    <SelectValue placeholder="Select stay option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {stayOptions.map((stay) => (
                        <SelectItem key={stay.id} value={stay.name}>
                          <div className="flex justify-between items-center w-full">
                            <span>{stay.name}</span>
                            <span className="text-xs text-muted-foreground ml-2">
                              {stay.price}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </motion.div>

          {/* Dining Selector */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardHeader>
                <UtensilsCrossed className="w-8 h-8 text-yellow-600 dark:text-yellow-500 mb-2" />
                <CardTitle className="text-xl">Dine</CardTitle>
              </CardHeader>
              <CardContent>
                <Label
                  htmlFor="dine-select"
                  className="text-sm text-muted-foreground mb-2 block"
                >
                  Choose your dining experience
                </Label>
                <Select
                  onValueChange={setSelectedDining}
                  value={selectedDining}
                >
                  <SelectTrigger id="dine-select">
                    <SelectValue placeholder="Select dining option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {diningOptions.map((dine) => (
                        <SelectItem key={dine.id} value={dine.name}>
                          <div className="flex justify-between items-center w-full">
                            <span>{dine.name}</span>
                            <span className="text-xs text-muted-foreground ml-2">
                              {dine.type}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </motion.div>

          {/* Destination Selector */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardHeader>
                <MapPin className="w-8 h-8 text-yellow-600 dark:text-yellow-500 mb-2" />
                <CardTitle className="text-xl">Destinations</CardTitle>
              </CardHeader>
              <CardContent>
                <Label
                  htmlFor="destination-select"
                  className="text-sm text-muted-foreground mb-2 block"
                >
                  Choose your destination
                </Label>
                <Select
                  onValueChange={setSelectedDestination}
                  value={selectedDestination}
                >
                  <SelectTrigger id="destination-select">
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {destinations.map((dest) => (
                        <SelectItem key={dest.id} value={dest.name}>
                          <div className="flex justify-between items-center w-full">
                            <span>{dest.name}</span>
                            <span className="text-xs text-muted-foreground ml-2">
                              {dest.rating}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </motion.div>

          {/* Experience Selector */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card className="hover:shadow-lg transition-shadow h-full">
              <CardHeader>
                <Sparkles className="w-8 h-8 text-yellow-600 dark:text-yellow-500 mb-2" />
                <CardTitle className="text-xl">Experiences</CardTitle>
              </CardHeader>
              <CardContent>
                <Label
                  htmlFor="experience-select"
                  className="text-sm text-muted-foreground mb-2 block"
                >
                  Choose your experience
                </Label>
                <Select
                  onValueChange={setSelectedExperience}
                  value={selectedExperience}
                >
                  <SelectTrigger id="experience-select">
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {experiences.map((exp) => (
                        <SelectItem key={exp.id} value={exp.name}>
                          <div className="flex justify-between items-center w-full">
                            <span>{exp.name}</span>
                            <span className="text-xs text-muted-foreground ml-2">
                              {exp.duration}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* CTA Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <PrimaryButton
            onClick={handleCustomizeTrip}
            className={`px-10 py-6 text-lg ${
              !isFormComplete ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!isFormComplete}
            icon={Calendar}
          >
            Customize My Trip
          </PrimaryButton>
          {!isFormComplete && (
            <p className="text-sm text-muted-foreground mt-4">
              Please select all options to continue
            </p>
          )}
        </motion.div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-yellow-600 dark:text-yellow-500" />
              Confirm Your Custom Trip
            </DialogTitle>
            <DialogDescription className="text-base">
              Review your selections before finalizing your personalized Dahab
              adventure.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Trip Summary */}
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-muted/50 dark:bg-muted/20 rounded-lg">
                <Hotel className="w-5 h-5 text-yellow-600 dark:text-yellow-500 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">
                    Accommodation
                  </p>
                  <p className="text-base font-medium">{selectedStay}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-muted/50 dark:bg-muted/20 rounded-lg">
                <UtensilsCrossed className="w-5 h-5 text-yellow-600 dark:text-yellow-500 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">
                    Dining
                  </p>
                  <p className="text-base font-medium">{selectedDining}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-muted/50 dark:bg-muted/20 rounded-lg">
                <MapPin className="w-5 h-5 text-yellow-600 dark:text-yellow-500 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">
                    Destination
                  </p>
                  <p className="text-base font-medium">
                    {selectedDestination}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-muted/50 dark:bg-muted/20 rounded-lg">
                <Sparkles className="w-5 h-5 text-yellow-600 dark:text-yellow-500 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-muted-foreground">
                    Experience
                  </p>
                  <p className="text-base font-medium">
                    {selectedExperience}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <SecondaryButton
              onClick={() => setIsDialogOpen(false)}
              className="w-full sm:w-auto"
            >
              Modify Selection
            </SecondaryButton>
            <PrimaryButton
              onClick={handleConfirm}
              className="w-full sm:w-auto"
            >
              Confirm & Book
            </PrimaryButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.section>
  );
}
