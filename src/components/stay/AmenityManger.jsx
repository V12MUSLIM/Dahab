import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';

export function AmenityManager({ 
  label = "Amenities",
  selectedAmenities = [],
  onChange,
  defaultAmenities = []
}) {
  const [customAmenity, setCustomAmenity] = useState('');
  const [allAmenities, setAllAmenities] = useState(defaultAmenities);

  const handleToggleAmenity = (amenity) => {
    const newSelected = selectedAmenities.includes(amenity)
      ? selectedAmenities.filter(a => a !== amenity)
      : [...selectedAmenities, amenity];
    onChange(newSelected);
  };

  const handleAddCustomAmenity = () => {
    if (customAmenity.trim() && !allAmenities.includes(customAmenity.trim())) {
      const newAmenity = customAmenity.trim();
      setAllAmenities([...allAmenities, newAmenity]);
      onChange([...selectedAmenities, newAmenity]);
      setCustomAmenity('');
    }
  };

  const handleRemoveFromList = (amenity) => {
    // Remove from available amenities list
    setAllAmenities(allAmenities.filter(a => a !== amenity));
    // Also remove from selected if it was selected
    if (selectedAmenities.includes(amenity)) {
      onChange(selectedAmenities.filter(a => a !== amenity));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddCustomAmenity();
    }
  };

  return (
    <div className="space-y-3">
      <Label>{label}</Label>
      
      {/* Add Custom Amenity */}
      <div className="flex gap-2">
        <Input
          placeholder="Add custom amenity..."
          value={customAmenity}
          onChange={(e) => setCustomAmenity(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1"
        />
        <Button
          type="button"
          size="sm"
          onClick={handleAddCustomAmenity}
          disabled={!customAmenity.trim()}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* Available Amenities Grid */}
      <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto p-3 border rounded-md bg-muted/30">
        {allAmenities.length === 0 ? (
          <p className="text-sm text-muted-foreground col-span-2 text-center py-4">
            No amenities available. Add custom amenities above.
          </p>
        ) : (
          allAmenities.map((amenity) => (
            <div
              key={amenity}
              className="flex items-center justify-between gap-2 p-2 rounded border bg-background hover:border-primary/50 transition-colors"
            >
              <label className="flex items-center gap-2 cursor-pointer flex-1">
                <input
                  type="checkbox"
                  checked={selectedAmenities.includes(amenity)}
                  onChange={() => handleToggleAmenity(amenity)}
                  className="rounded"
                />
                <span className="text-sm">{amenity}</span>
              </label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveFromList(amenity)}
                className="h-6 w-6 p-0 hover:bg-destructive/10 hover:text-destructive"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          ))
        )}
      </div>

      {/* Selected Amenities Preview */}
      {selectedAmenities.length > 0 && (
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">
            Selected ({selectedAmenities.length})
          </Label>
          <div className="flex flex-wrap gap-1">
            {selectedAmenities.map((amenity) => (
              <Badge
                key={amenity}
                variant="secondary"
                className="cursor-pointer hover:bg-destructive/10"
                onClick={() => handleToggleAmenity(amenity)}
              >
                {amenity}
                <X className="w-3 h-3 ml-1" />
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// For AddStay.jsx - Property Amenities (General, Recreation, Services, etc.)
export function PropertyAmenitiesManager({ formData, onChange }) {
  const [activeCategory, setActiveCategory] = useState('general');

  const amenityCategories = {
    general: {
      label: "General Amenities",
      field: "generalAmenities",
      defaults: [
        "Free WiFi",
        "Air Conditioning",
        "Restaurant",
        "24-Hour Reception",
        "Elevator",
        "Parking",
        "Garden",
        "Terrace"
      ]
    },
    recreation: {
      label: "Recreation Amenities",
      field: "recreationAmenities",
      defaults: [
        "Private Beach",
        "Pool",
        "Diving Center",
        "Snorkeling",
        "Water Sports",
        "Gym",
        "Spa",
        "Kids Club"
      ]
    },
    services: {
      label: "Service Amenities",
      field: "servicesAmenities",
      defaults: [
        "Tour Booking",
        "Airport Shuttle",
        "Laundry",
        "Room Service",
        "Concierge",
        "Currency Exchange",
        "Car Rental"
      ]
    },
    dining: {
      label: "Dining Amenities",
      field: "diningAmenities",
      defaults: [
        "On-site Restaurant",
        "Breakfast Room",
        "Bar",
        "Room Service",
        "Packed Lunches",
        "BBQ Facilities"
      ]
    },
    wellness: {
      label: "Wellness Amenities",
      field: "wellnessAmenities",
      defaults: [
        "Yoga Classes",
        "Beach Massages",
        "Wellness Programs",
        "Spa",
        "Sauna",
        "Hot Tub"
      ]
    }
  };

  const category = amenityCategories[activeCategory];

  // Parse the current value (could be string with newlines or array)
  const getCurrentAmenities = () => {
    const value = formData[category.field];
    if (!value) return [];
    if (Array.isArray(value)) return value;
    return value.split('\n').filter(Boolean);
  };

  const handleAmenitiesChange = (newAmenities) => {
    // Create a synthetic event to match the onChange signature
    onChange({
      target: {
        name: category.field,
        value: newAmenities.join('\n'),
        type: 'text'
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {Object.entries(amenityCategories).map(([key, cat]) => (
          <Button
            key={key}
            type="button"
            variant={activeCategory === key ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(key)}
          >
            {cat.label}
          </Button>
        ))}
      </div>

      <AmenityManager
        label={category.label}
        selectedAmenities={getCurrentAmenities()}
        onChange={handleAmenitiesChange}
        defaultAmenities={category.defaults}
      />
    </div>
  );
}

export default PropertyAmenitiesManager;