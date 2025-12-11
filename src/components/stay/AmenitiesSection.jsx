import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function AmenitiesSection({ amenities, amenityIcons = {} }) {
  if (!amenities || !Object.keys(amenities).length) return null;

  const categories = Object.entries(amenities);

  return (
    <Card className="border border-gray-200 dark:border-gray-800">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Property Amenities</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {categories.map(([category, items]) => (
          <div key={category} className="space-y-4">
            <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground border-b border-gray-200 dark:border-gray-800 pb-2">
              {category.replace(/([A-Z])/g, " $1").trim()}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {items.map((item, index) => {
                const Icon = amenityIcons[item] || Check;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-sm"
                  >
                    <Icon className="w-5 h-5 text-amber-600 shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}